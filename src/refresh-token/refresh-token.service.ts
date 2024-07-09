import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { RefreshToken } from './entities/refresh-token.entity';
import { RefreshTokenDto } from './dto/create-refresh-token.dto';
import * as dotenv from 'dotenv';
dotenv.config()

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel(RefreshToken) private readonly refreshTokenModel: typeof RefreshToken,
    private readonly jwtService: JwtService,
  ) { }

  async storeRefreshToken(refreshTokenDto: RefreshTokenDto) {
    await this.refreshTokenModel.create({ ...refreshTokenDto });
  }

  async refreshAccessToken(refreshToken: string): Promise<{ access_token: string }> {
    const tokenData = await this.refreshTokenModel.findOne({ where: { token: refreshToken } });
    if (!tokenData) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = this.jwtService.verify(refreshToken, { secret: process.env.REFRESH_TOKEN_SECRET });
    const newAccessToken = this.jwtService.sign(
      { sub: payload.sub, email: payload.email },
      { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: '5m' },
    );

    return {
      access_token: newAccessToken,
    };
  }

  async removeTokensForUser(userId: string): Promise<{ acknowledged: boolean; deletedCount: number }> {
    const result = await this.refreshTokenModel.destroy({ where: { userId } });
    return { acknowledged: true, deletedCount: result };
  }
}
