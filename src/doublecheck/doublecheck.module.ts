import { Module } from '@nestjs/common';
import { DoublecheckService } from './doublecheck.service';
import { DoublecheckController } from './doublecheck.controller';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DoubleCheck as DoubleCheckSchema } from '../@core/infra/db/typeorm/entity/DoubleCheck';
import { DoubleCheckGatewayTypeORM } from '../@core/infra/db/typeorm/gateway/DoubleCheckGatewayTypeORM';
import { DataSource } from 'typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([DoubleCheckSchema])],
    controllers: [DoublecheckController],
    providers: [
        DoublecheckService,
        {
            provide: DoubleCheckGatewayTypeORM,
            useFactory: (dataSource: DataSource) =>
                new DoubleCheckGatewayTypeORM(dataSource),
            inject: [getDataSourceToken()],
        },
    ],
})
export class DoublecheckModule {}
