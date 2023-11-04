import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO, AuthRegisterDTO, AuthTokenDTO } from './auth.dto';
import { User } from '@/app/public/user/user.entity';
import { Auth } from '@/shared/decorators/auth.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  signUp(@Body() body: AuthRegisterDTO): Promise<User> {
    return this.authService.register(body);
  }

  @Post('/login')
  signIn(@Body() body: AuthLoginDTO): Promise<AuthTokenDTO> {
    return this.authService.login(body);
  }

  @Get('/me')
  @Auth()
  getMe(): Promise<User> {
    return this.authService.getMe();
  }
}
