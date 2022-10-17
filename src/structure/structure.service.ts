import { Injectable } from '@nestjs/common';
import { FindStructuresUseCase } from '../@core/application/usecase/FindStructureUseCase';
import { CreateStructureUseCase } from '../@core/application/usecase/CreateStructureUseCase';
import { CreateStructureDto } from './dto/create-structure.dto';
import { UpdateStructureDto } from './dto/update-structure.dto';
import { FindAllStructureUseCase } from '../@core/application/usecase/FindAllStructureUseCase';
import { DeleteStructureUseCase } from '../@core/application/usecase/DeleteStructureUseCase';
import { UpdateStructureUseCase } from '../@core/application/usecase/UpdateStructureUseCase';

@Injectable()
export class StructureService {
    constructor(
        private createStructureUseCase: CreateStructureUseCase,
        private findStructureUseCase: FindStructuresUseCase,
        private findAllStructureUseCase: FindAllStructureUseCase,
        private deleteStructureUseCase: DeleteStructureUseCase,
        private updateStructureUseCase: UpdateStructureUseCase,
    ) {}

    async create(createStructureDto: CreateStructureDto) {
        return this.createStructureUseCase.execute(createStructureDto);
    }

    async findAll() {
        return this.findAllStructureUseCase.execute();
    }

    async findOne(id: number) {
        return this.findStructureUseCase.execute(id);
    }

    update(id: string, updateStructureDto: UpdateStructureDto) {
        return this.updateStructureUseCase.execute(id, updateStructureDto);
    }

    async remove(id: string) {
        return this.deleteStructureUseCase.execute(id);
    }
}
