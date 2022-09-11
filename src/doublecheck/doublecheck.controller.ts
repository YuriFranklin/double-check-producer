import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Inject,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { DoublecheckService } from './doublecheck.service';
import { CreateDoublecheckDto } from './dto/create-doublecheck.dto';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

@Controller('doublecheck')
export class DoublecheckController {
    constructor(
        private readonly doublecheckService: DoublecheckService,
        @Inject('KAFKA_PRODUCER')
        private kafkaProducer: Producer,
    ) {}

    @Post()
    async create(@Body() createDoublecheckDto: CreateDoublecheckDto) {
        const doubleCheck = await this.doublecheckService.create(
            createDoublecheckDto,
        );

        doubleCheck.courses?.length &&
            this.kafkaProducer.send({
                topic: 'double-check',
                messages: doubleCheck.courses?.map((course) => {
                    return {
                        key: 'double-check',
                        value: JSON.stringify({
                            structureId: doubleCheck.structureId,
                            course,
                        }),
                    };
                }),
            });

        return doubleCheck;
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
