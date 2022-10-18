import { Injectable } from '@nestjs/common';
import { CreateDoubleCheckUseCase } from '../@core/application/usecase/CreateDoubleCheckUseCase';
import { CreateDoublecheckDto } from './dto/create-doublecheck.dto';
import { UpdateDoublecheckDto } from './dto/update-doublecheck.dto';
import { FindAllDoubleCheckUseCase } from '../@core/application/usecase/FindAllDoubleCheckUseCase';
import { FindDoubleCheckUseCase } from '../@core/application/usecase/FindDoubleCheckUseCase';
import { FindAllDoubleCheckDto } from './dto/find-all-doublecheck.dto';

@Injectable()
export class DoublecheckService {
    constructor(
        private createUseCase: CreateDoubleCheckUseCase,
        private findAllUseCase: FindAllDoubleCheckUseCase,
        private findUseCase: FindDoubleCheckUseCase,
    ) {}

    async create(createDoublecheckDto: CreateDoublecheckDto) {
        return this.createUseCase.execute(createDoublecheckDto);
    }

    async findAll(findAllDoubleCheckDto: FindAllDoubleCheckDto) {
        return this.findAllUseCase.execute(findAllDoubleCheckDto);
    }

    findOne(id: string) {
        return this.findUseCase.execute(id);
    }

    update(id: number, updateDoublecheckDto: UpdateDoublecheckDto) {
        return `This action updates a #${id} doublecheck`;
    }

    remove(id: number) {
        return `This action removes a #${id} doublecheck`;
    }
}
