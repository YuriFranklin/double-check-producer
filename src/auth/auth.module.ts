import { Module } from '@nestjs/common';
import { JwtStrategyService } from './jwt/jwt-strategy.service';

@Module({
    providers: [JwtStrategyService],
})
export class AuthModule {}
