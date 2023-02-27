import { Module } from '@nestjs/common';
import { DoublecheckService } from './doublecheck.service';
import { DoublecheckController } from './doublecheck.controller';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DoubleCheck as DoubleCheckSchema } from '../@core/infra/db/typeorm/entity/DoubleCheck';
import { DoubleCheckGatewayTypeORM } from '../@core/infra/db/typeorm/gateway/DoubleCheckGatewayTypeORM';
import { DataSource } from 'typeorm';
import { CreateDoubleCheckUseCase } from '../@core/application/usecase/CreateDoubleCheckUseCase';
import { DoubleCheckGatewayInterface } from '../@core/domain/gateway/DoubleCheckGatewayInterface';
import { FindAllDoubleCheckUseCase } from '../@core/application/usecase/FindAllDoubleCheckUseCase';
import { FindDoubleCheckUseCase } from '../@core/application/usecase/FindDoubleCheckUseCase';
import { ClientsModule, Transport, ClientKafka } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { Template as TemplateSchema } from '../@core/infra/db/typeorm/entity/Template';
import { DeleteDoubleCheckUseCase } from '../@core/application/usecase/DeleteDoubleCheckUseCase';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([DoubleCheckSchema, TemplateSchema]),
        ClientsModule.register([
            {
                name: 'KAFKA_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: [
                            `${process.env.KAFKA_HOSTNAME}:${process.env.KAFKA_PORT}`,
                        ],
                    },
                    consumer: {
                        groupId: 'double-check-producer',
                    },
                },
            },
        ]),
    ],
    controllers: [DoublecheckController],
    providers: [
        DoublecheckService,
        {
            provide: FindDoubleCheckUseCase,
            useFactory: (repository: DoubleCheckGatewayInterface) =>
                new FindDoubleCheckUseCase(repository),
            inject: [DoubleCheckGatewayTypeORM],
        },
        {
            provide: CreateDoubleCheckUseCase,
            useFactory: (repository: DoubleCheckGatewayInterface) =>
                new CreateDoubleCheckUseCase(repository),
            inject: [DoubleCheckGatewayTypeORM],
        },
        {
            provide: FindAllDoubleCheckUseCase,
            useFactory: (repository: DoubleCheckGatewayInterface) =>
                new FindAllDoubleCheckUseCase(repository),
            inject: [DoubleCheckGatewayTypeORM],
        },
        {
            provide: DeleteDoubleCheckUseCase,
            useFactory: (repository: DoubleCheckGatewayInterface) =>
                new DeleteDoubleCheckUseCase(repository),
            inject: [DoubleCheckGatewayTypeORM],
        },
        {
            provide: DoubleCheckGatewayTypeORM,
            useFactory: (dataSource: DataSource) =>
                new DoubleCheckGatewayTypeORM(dataSource),
            inject: [getDataSourceToken()],
        },
        {
            provide: 'KAFKA_PRODUCER',
            useFactory: async (kafkaService: ClientKafka) => {
                return kafkaService.connect();
            },
            inject: ['KAFKA_SERVICE'],
        },
    ],
})
export class DoublecheckModule {}
