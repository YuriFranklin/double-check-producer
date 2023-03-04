import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindTemplateUseCase } from '../@core/application/usecase/FindTemplateUseCase';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import NotFoundException from '../@core/domain/exception/NotFoundException';
import { DeleteTemplateUseCase } from '../@core/application/usecase/DeleteTemplateUseCase';

@Injectable()
export class TemplateService {
    constructor(
        private findTemplateUseCase: FindTemplateUseCase,
        private deleteTemplateUseCase: DeleteTemplateUseCase,
    ) {}

    create(createTemplateDto: CreateTemplateDto) {
        return 'This action adds a new template';
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

    async update(id: number, updateTemplateDto: UpdateTemplateDto) {
        return `This action updates a #${id} template`;
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
