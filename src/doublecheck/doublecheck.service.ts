import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateDoubleCheckUseCase } from '../@core/application/usecase/CreateDoubleCheckUseCase';
import { CreateDoublecheckDto } from './dto/create-doublecheck.dto';
import { UpdateDoublecheckDto } from './dto/update-doublecheck.dto';
import { FindAllDoubleCheckUseCase } from '../@core/application/usecase/FindAllDoubleCheckUseCase';
import { FindDoubleCheckUseCase } from '../@core/application/usecase/FindDoubleCheckUseCase';
import { FindAllDoubleCheckDto } from './dto/find-all-doublecheck.dto';
import NotFoundException from '../@core/domain/exceptions/NotFoundException';

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

    async findOne(id: string) {
        try {
            const founded = await this.findUseCase.execute(id);
            return founded;
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new HttpException(
                    {
                        status: HttpStatus.NOT_FOUND,
                        error: e.message,
                    },
                    HttpStatus.NOT_FOUND,
                );
            }
        }
    }

    update(id: number, updateDoublecheckDto: UpdateDoublecheckDto) {
        return `This action updates a #${id} doublecheck`;
    }

    remove(id: number) {
        return `This action removes a #${id} doublecheck`;
    }
}
