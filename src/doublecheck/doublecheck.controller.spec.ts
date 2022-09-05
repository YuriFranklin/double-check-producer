import { Test, TestingModule } from '@nestjs/testing';
import { DoublecheckController } from './doublecheck.controller';
import { DoublecheckService } from './doublecheck.service';

describe('DoublecheckController', () => {
    let controller: DoublecheckController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DoublecheckController],
            providers: [DoublecheckService],
        }).compile();

        controller = module.get<DoublecheckController>(DoublecheckController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
