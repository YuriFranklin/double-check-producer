import { Test, TestingModule } from '@nestjs/testing';
import { StructureController } from './structure.controller';
import { StructureService } from './structure.service';

describe('StructureController', () => {
  let controller: StructureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StructureController],
      providers: [StructureService],
    }).compile();

    controller = module.get<StructureController>(StructureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
