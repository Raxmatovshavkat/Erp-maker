import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/auth.entity';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    RefreshTokenModule,
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
