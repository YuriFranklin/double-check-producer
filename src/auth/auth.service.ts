import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    login(loginAuthDto: LoginAuthDto) {
        const user = this.validateCredentials(loginAuthDto);
        const payload = {
            sub: user.id,
            username: user.username,
        };
        return this.jwtService.sign(payload);
    }

    validateCredentials(loginAuthDto: LoginAuthDto) {
        return {
            id: '1',
            username: 'test',
            password: 'test',
        };
    }
}
