import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtAuthGuard } from 'src/guard/guard';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @UsePipes(ValidationPipe)
  signUp(@Body() createRegister: RegisterDto) {
    return this.authService.register(createRegister);
  }
  @Post('login')
  @UsePipes(ValidationPipe)
  signIn(@Body() createLogin: LoginUserDto) {
    return this.authService.login(createLogin);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.authService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.authService.me(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete('logout/:id')
  async logout(@Param('id') id: string) {
    return await this.authService.logout(id);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }
}
