import { Test, TestingModule } from '@nestjs/testing';
import { DoublecheckService } from './doublecheck.service';

describe('DoublecheckService', () => {
    let service: DoublecheckService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DoublecheckService],
        }).compile();

        service = module.get<DoublecheckService>(DoublecheckService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
