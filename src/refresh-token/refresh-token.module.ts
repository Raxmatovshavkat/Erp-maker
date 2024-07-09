import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenService } from './refresh-token.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from './entities/refresh-token.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([RefreshToken]),
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule { }
