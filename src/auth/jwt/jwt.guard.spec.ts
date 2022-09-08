import { JwtGuard } from './jwt.guard';

describe('AuthGuard', () => {
    it('should be defined', () => {
        expect(new JwtGuard()).toBeDefined();
    });
});
