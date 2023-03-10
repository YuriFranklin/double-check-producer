import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateDoubleCheckUseCase } from '../@core/application/usecase/CreateDoubleCheckUseCase';
import { CreateDoublecheckDto } from './dto/create-doublecheck.dto';
import { UpdateDoublecheckDto } from './dto/update-doublecheck.dto';
import { FindAllDoubleCheckUseCase } from '../@core/application/usecase/FindAllDoubleCheckUseCase';
import { FindDoubleCheckUseCase } from '../@core/application/usecase/FindDoubleCheckUseCase';
import { FindAllDoubleCheckDto } from './dto/find-all-doublecheck.dto';
import NotFoundException from '../@core/domain/exception/NotFoundException';
import { DeleteDoubleCheckUseCase } from '../@core/application/usecase/DeleteDoubleCheckUseCase';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class DoublecheckService {
    constructor(
        @Inject('KAFKA_SERVICE') private kafkaService: ClientKafka,
        private createUseCase: CreateDoubleCheckUseCase,
        private findAllUseCase: FindAllDoubleCheckUseCase,
        private findUseCase: FindDoubleCheckUseCase,
        private deleteUseCase: DeleteDoubleCheckUseCase,
    ) {}

    async create(createDoublecheckDto: CreateDoublecheckDto) {
        try {
            const doubleCheck = await this.createUseCase.execute(
                createDoublecheckDto,
            );

            doubleCheck.courses?.forEach((course) =>
                this.kafkaService.emit('double-check', JSON.stringify(course)),
            );
            return doubleCheck;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
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
                throw new HttpException(e.message, HttpStatus.NOT_FOUND);
            } else {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
            }
        }
    }

    update(id: number, updateDoublecheckDto: UpdateDoublecheckDto) {
        return `This action updates a #${id} doublecheck`;
    }

    async remove(id: string) {
        try {
            await this.deleteUseCase.execute(id);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new HttpException(e.message, HttpStatus.NOT_FOUND);
            } else {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
            }
        }
    }
}
