import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { DoublecheckService } from './doublecheck.service';
import { CreateDoublecheckDto } from './dto/create-doublecheck.dto';

@Controller('doublecheck')
export class DoublecheckController {
    constructor(private readonly doublecheckService: DoublecheckService) {}

    @Post()
    async create(@Body() createDoublecheckDto: CreateDoublecheckDto) {
        return this.doublecheckService.create(createDoublecheckDto);
    }

    @UseGuards(JwtGuard)
    @Get()
    async findAll() {
        return this.doublecheckService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.doublecheckService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.doublecheckService.remove(+id);
    }
}
