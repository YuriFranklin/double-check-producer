import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() loginAuthDto: LoginAuthDto) {
        return { token: this.authService.login(loginAuthDto) };
    }

    @UseGuards(JwtGuard)
    @Get('test')
    test() {
        return {
            test: true,
        };
    }
}
