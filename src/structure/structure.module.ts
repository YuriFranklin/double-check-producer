import { Module } from '@nestjs/common';
import { StructureService } from './structure.service';
import { StructureController } from './structure.controller';
import { CreateStructureUseCase } from '../@core/application/usecase/CreateStructureUseCase';
import { StructureGatewayInterface } from '../@core/domain/gateway/StructureGatewayInterface';
import { StructureGatewayTypeORM } from '../@core/infra/db/typeorm/gateway/StructureGatewayTypeORM';
import { DataSource } from 'typeorm';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { Structure as StructureSchema } from '../@core/infra/db/typeorm/entity/Structure';

@Module({
    imports: [TypeOrmModule.forFeature([StructureSchema])],
    controllers: [StructureController],
    providers: [
        StructureService,
        {
            provide: CreateStructureUseCase,
            useFactory: (repository: StructureGatewayInterface) =>
                new CreateStructureUseCase(repository),
            inject: [StructureGatewayTypeORM],
        },
        {
            provide: StructureGatewayTypeORM,
            useFactory: (dataSource: DataSource) =>
                new StructureGatewayTypeORM(dataSource),
            inject: [getDataSourceToken()],
        },
    ],
})
export class StructureModule {}
