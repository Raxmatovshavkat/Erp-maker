import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './entities/auth.entity';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly refreshService:RefreshTokenService
  ) { }

  async register(registerDto:RegisterDto): Promise<any> {
    const { password, ...rest } = registerDto
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new this.userModel({ ...rest, password: hashedPassword });
    return user.save();
  }

  async login(loginUserDto:LoginUserDto): Promise<any> {
    const accesSecret = process.env.ACCESS_TOKEN_SECRET
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET
    const { email, password } = loginUserDto
    const user = await this.userModel.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { secret: accesSecret, expiresIn: '5m' });
    const refreshToken = this.jwtService.sign(payload, { secret: refreshSecret, expiresIn: '7d' });

    await this.refreshService.storeRefreshToken({ token: refreshToken, userId: user.id, expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  async getAll(): Promise<any> {
    const user=await this.userModel.findAll()
    if(!user){
      throw new NotAcceptableException()
    }
    return user
  }

  async me(id:number) {
    const user = await this.userModel.findByPk(id)
    if (!user) {
      throw new NotAcceptableException()
    }
    return user
  }

  async update(id:number,updateAuthDto:UpdateAuthDto){
    const user = await this.userModel.findByPk(id)
    if (!user) {
      throw new NotAcceptableException()
    }
    return user.update(updateAuthDto)
  }

  async logout(userId: string) {
    await this.refreshService.removeTokensForUser(userId);
    return this.userModel.findByPk(userId);
  }

  async refreshAccessToken(refreshToken: string): Promise<{ access_token: string }> {
    return this.refreshService.refreshAccessToken(refreshToken);
  }
}
