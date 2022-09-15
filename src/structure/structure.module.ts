import { Module } from '@nestjs/common';
import { StructureService } from './structure.service';
import { StructureController } from './structure.controller';
import { CreateStructureUseCase } from '../@core/application/usecase/CreateStructureUseCase';
import { StructureGatewayInterface } from '../@core/domain/gateway/StructureGatewayInterface';
import { StructureGatewayTypeORM } from '../@core/infra/db/typeorm/gateway/StructureGatewayTypeORM';
import { DataSource } from 'typeorm';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { Structure as StructureSchema } from '../@core/infra/db/typeorm/entity/Structure';
import { FindStructuresUseCase } from '../@core/application/usecase/FindStructureUseCase';
import { FindAllStructureUseCase } from '../@core/application/usecase/FindAllStructureUseCase';
import { DeleteStructureUseCase } from '../@core/application/usecase/DeleteStructureUseCase';

@Module({
    imports: [TypeOrmModule.forFeature([StructureSchema])],
    controllers: [StructureController],
    providers: [
        StructureService,
        {
            provide: DeleteStructureUseCase,
            useFactory: (repository: StructureGatewayInterface) =>
                new DeleteStructureUseCase(repository),
            inject: [StructureGatewayTypeORM],
        },
        {
            provide: FindAllStructureUseCase,
            useFactory: (repository: StructureGatewayInterface) =>
                new FindAllStructureUseCase(repository),
            inject: [StructureGatewayTypeORM],
        },
        {
            provide: FindStructuresUseCase,
            useFactory: (repository: StructureGatewayInterface) =>
                new FindStructuresUseCase(repository),
            inject: [StructureGatewayTypeORM],
        },
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
