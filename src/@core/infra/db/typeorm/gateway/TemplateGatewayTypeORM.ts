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
            relations: ['children', 'parent'],
        });

        if (!template) throw new NotFoundException('Template has not founded.');

        const templateWithChildren = {
            ...template,
            children: template.children?.length
                ? await Promise.all(
                      template.children.map((template) =>
                          this.findTemplateRecurrence(template),
                      ),
                  )
                : [],
        };
        return TemplateTypeORMMapper.toDomainEntity(templateWithChildren);
    }

    async findTemplateRecurrence(
        template: TemplateSchema,
    ): Promise<TemplateSchema> {
        return this.dataSource.manager
            .getTreeRepository(TemplateSchema)
            .findDescendantsTree(template, {
                depth: 10,
            }); // TODO: FIND EFFICIENT METHOD TO DO IT
    }

    async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }

    async update(id: string, template: Template): Promise<void> {
        const ormTemplate = TemplateTypeORMMapper.toOrmEntity(template);

        await this.ormRepository.save(ormTemplate);
    }
}
/*
where: { id },
relations: ['children', 'parent'], */
