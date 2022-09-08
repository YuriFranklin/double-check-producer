import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from './jwt/jwt-strategy.service';

@Module({
    imports: [
        JwtModule.register({
            secret: '123test',
            signOptions: {
                expiresIn: '60m',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategyService],
})
export class AuthModule {}
