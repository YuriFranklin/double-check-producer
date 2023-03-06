import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindTemplateUseCase } from '../@core/application/usecase/FindTemplateUseCase';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import NotFoundException from '../@core/domain/exception/NotFoundException';
import { DeleteTemplateUseCase } from '../@core/application/usecase/DeleteTemplateUseCase';
import { CreateTemplateUseCase } from '../@core/application/usecase/CreateTemplateUseCase';
import { UpdateTemplateUseCase } from '../@core/application/usecase/UpdateTemplateUseCase';

@Injectable()
export class TemplateService {
    constructor(
        private findTemplateUseCase: FindTemplateUseCase,
        private deleteTemplateUseCase: DeleteTemplateUseCase,
        private createTemplateUseCase: CreateTemplateUseCase,
        private updateTemplateUseCase: UpdateTemplateUseCase,
    ) {}

    create(createTemplateDto: CreateTemplateDto) {
        return this.createTemplateUseCase.execute(createTemplateDto);
    }

    findAll() {
        return `This action returns all template`;
    }

    async findOne(id: string) {
        try {
            const founded = await this.findTemplateUseCase.execute(id);
            return founded;
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new HttpException(e.message, HttpStatus.NOT_FOUND);
            } else {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
            }
        }
    }

    async update(id: string, updateTemplateDto: UpdateTemplateDto) {
        try {
            const updated = await this.updateTemplateUseCase.execute(
                id,
                updateTemplateDto,
            );
            return updated;
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new HttpException(e.message, HttpStatus.NOT_FOUND);
            } else {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
            }
        }
    }

    async remove(id: string) {
        try {
            await this.deleteTemplateUseCase.execute(id);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new HttpException(e.message, HttpStatus.NOT_FOUND);
            } else {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
            }
        }
    }
}
