import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Inject,
    Query,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { DoublecheckService } from './doublecheck.service';
import { CreateDoublecheckDto } from './dto/create-doublecheck.dto';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { FindAllDoubleCheckDto } from './dto/find-all-doublecheck.dto';

@Controller('doublecheck')
export class DoublecheckController {
    constructor(
        private readonly doublecheckService: DoublecheckService,
        @Inject('KAFKA_PRODUCER') private kafkaProducer: Producer,
    ) {}

    @Post()
    async create(@Body() createDoublecheckDto: CreateDoublecheckDto) {
        const doubleCheck = await this.doublecheckService.create(
            createDoublecheckDto,
        );

        await doubleCheck.courses?.forEach(async (course) => {
            await this.kafkaProducer.send({
                topic: 'double-check-course',
                messages: [
                    {
                        value: JSON.stringify({
                            ...course,
                            structureId: doubleCheck.structureId,
                            doubleCheckId: doubleCheck.id,
                        }),
                    },
                ],
            });
        });

        return doubleCheck;
    }

    //@UseGuards(JwtGuard)
    @Get()
    async findAll(@Query() reqParam: FindAllDoubleCheckDto) {
        return this.doublecheckService.findAll(reqParam);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.doublecheckService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.doublecheckService.remove(id);
    }
}
