import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { Template as TemplateSchema } from '../@core/infra/db/typeorm/entity/Template';
import { TemplateGatewayTypeORM } from '../@core/infra/db/typeorm/gateway/TemplateGatewayTypeORM';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { FindTemplateUseCase } from '../@core/application/usecase/FindTemplateUseCase';
import { TemplateGatewayInterface } from '../@core/domain/gateway/TemplateGatewayInterface';

@Module({
    imports: [TypeOrmModule.forFeature([TemplateSchema])],
    controllers: [TemplateController],
    providers: [
        TemplateService,
        {
            provide: FindTemplateUseCase,
            useFactory: (repository: TemplateGatewayInterface) =>
                new FindTemplateUseCase(repository),
            inject: [TemplateGatewayTypeORM],
        },
        {
            provide: TemplateGatewayTypeORM,
            useFactory: (dataSource: DataSource) =>
                new TemplateGatewayTypeORM(dataSource),
            inject: [getDataSourceToken()],
        },
    ],
})
export class TemplateModule {}
