import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { StructureService } from './structure.service';
import { CreateStructureDto } from './dto/create-structure.dto';
import { UpdateStructureDto } from './dto/update-structure.dto';

@Controller('structure')
export class StructureController {
    constructor(private readonly structureService: StructureService) {}

    @Post()
    create(@Body() createStructureDto: CreateStructureDto) {
        return this.structureService.create(createStructureDto);
    }

    @Get()
    findAll() {
        return this.structureService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.structureService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateStructureDto: UpdateStructureDto,
    ) {
        return this.structureService.update(+id, updateStructureDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.structureService.remove(+id);
    }
}
