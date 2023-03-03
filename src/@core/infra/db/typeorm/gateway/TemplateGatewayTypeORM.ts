import { Template } from 'src/@core/domain/entity/Template';
import { Template as TemplateSchema } from '../entity/Template';
import { DataSource, Repository } from 'typeorm';
import { TemplateGatewayInterface } from '../../../../domain/gateway/TemplateGatewayInterface';
import { TemplateTypeORMMapper } from '../mapper/TemplateTypeORMMapper';
import NotFoundException from '../../../../domain/exception/NotFoundException';

export class TemplateGatewayTypeORM implements TemplateGatewayInterface {
    private ormRepository: Repository<TemplateSchema>;

    constructor(private dataSource: DataSource) {
        this.ormRepository = this.dataSource.getRepository(TemplateSchema);
    }

    async insert(template: Template): Promise<void> {
        const ormTemplate = TemplateTypeORMMapper.toOrmEntity(template);

        await this.dataSource.manager.transaction(
            async (transactionalEntityManager) => {
                await transactionalEntityManager.save(ormTemplate);
            },
        );
    }

    async find(id: string): Promise<Template> {
        const template = await this.ormRepository.findOne({
            where: { id },
            relations: ['templates'],
        });

        if (!template) throw new NotFoundException('Template has not founded.');

        return TemplateTypeORMMapper.toDomainEntity(template);
    }

    async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }

    async update(id: string, template: Template): Promise<void> {
        const ormTemplate = TemplateTypeORMMapper.toOrmEntity(template);
        await this.ormRepository.update(id, ormTemplate);
    }
}
