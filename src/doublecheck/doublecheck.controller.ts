import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { DoublecheckService } from './doublecheck.service';
import { CreateDoublecheckDto } from './dto/create-doublecheck.dto';
import { UpdateDoublecheckDto } from './dto/update-doublecheck.dto';

@Controller('doublecheck')
export class DoublecheckController {
    constructor(private readonly doublecheckService: DoublecheckService) {}

    @Post()
    create(@Body() createDoublecheckDto: CreateDoublecheckDto) {
        return this.doublecheckService.create(createDoublecheckDto);
    }

    @Get()
    findAll() {
        return this.doublecheckService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.doublecheckService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateDoublecheckDto: UpdateDoublecheckDto,
    ) {
        return this.doublecheckService.update(+id, updateDoublecheckDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.doublecheckService.remove(+id);
    }
}
