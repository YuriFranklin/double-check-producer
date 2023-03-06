import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { Template as TemplateSchema } from '../@core/infra/db/typeorm/entity/Template';
import { TemplateGatewayTypeORM } from '../@core/infra/db/typeorm/gateway/TemplateGatewayTypeORM';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { FindTemplateUseCase } from '../@core/application/usecase/FindTemplateUseCase';
import { TemplateGatewayInterface } from '../@core/domain/gateway/TemplateGatewayInterface';
import { DeleteTemplateUseCase } from '../@core/application/usecase/DeleteTemplateUseCase';
import { CreateTemplateUseCase } from '../@core/application/usecase/CreateTemplateUseCase';
import { UpdateTemplateUseCase } from '../@core/application/usecase/UpdateTemplateUseCase';

@Module({
    imports: [TypeOrmModule.forFeature([TemplateSchema])],
    controllers: [TemplateController],
    providers: [
        TemplateService,
        {
            provide: TemplateGatewayTypeORM,
            useFactory: (dataSource: DataSource) =>
                new TemplateGatewayTypeORM(dataSource),
            inject: [getDataSourceToken()],
        },
        {
            provide: FindTemplateUseCase,
            useFactory: (repository: TemplateGatewayInterface) =>
                new FindTemplateUseCase(repository),
            inject: [TemplateGatewayTypeORM],
        },
        {
            provide: DeleteTemplateUseCase,
            useFactory: (repository: TemplateGatewayInterface) =>
                new DeleteTemplateUseCase(repository),
            inject: [TemplateGatewayTypeORM],
        },
        {
            provide: CreateTemplateUseCase,
            useFactory: (repository: TemplateGatewayInterface) =>
                new CreateTemplateUseCase(repository),
            inject: [TemplateGatewayTypeORM],
        },
        {
            provide: UpdateTemplateUseCase,
            useFactory: (repository: TemplateGatewayInterface) =>
                new UpdateTemplateUseCase(repository),
            inject: [TemplateGatewayTypeORM],
        },
    ],
})
export class TemplateModule {}
