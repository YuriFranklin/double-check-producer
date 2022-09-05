import { Injectable } from '@nestjs/common';
import { CreateDoublecheckDto } from './dto/create-doublecheck.dto';
import { UpdateDoublecheckDto } from './dto/update-doublecheck.dto';

@Injectable()
export class DoublecheckService {
    create(createDoublecheckDto: CreateDoublecheckDto) {
        return 'This action adds a new doublecheck';
    }

    findAll() {
        return `This action returns all doublecheck`;
    }

    findOne(id: number) {
        return `This action returns a #${id} doublecheck`;
    }

    update(id: number, updateDoublecheckDto: UpdateDoublecheckDto) {
        return `This action updates a #${id} doublecheck`;
    }

    remove(id: number) {
        return `This action removes a #${id} doublecheck`;
    }
}
