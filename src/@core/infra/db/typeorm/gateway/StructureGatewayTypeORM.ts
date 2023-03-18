import { StructureGatewayInterface } from '../../../../domain/gateway/StructureGatewayInterface';
import { Structure } from '../../../../domain/entity/Structure';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Structure as StructureSchema } from '../entity/Structure';
import { StructureTypeORMMapper } from '../mapper/StructureTypeORMMapper';
import { Template as TemplateSchema } from '../entity/Template';
import NotFoundException from '../../../../domain/exception/NotFoundException';

export class StructureGatewayTypeORM implements StructureGatewayInterface {
    private ormRepository: Repository<StructureSchema>;

    constructor(private dataSource: DataSource) {
        this.ormRepository = this.dataSource.getRepository(StructureSchema);
    }

    async findAll(): Promise<Structure[]> {
        const ormStructures = await this.ormRepository.find({
            relations: ['templates'],
        });

        return Promise.all(
            ormStructures.map(async (ormStructure) => {
                ormStructure.templates = await Promise.all(
                    ormStructure.templates?.map((template) =>
                        this.findTemplateRecurrence(template),
                    ),
                );
                return StructureTypeORMMapper.toDomainEntity(ormStructure);
            }),
        );
    }

    async findTemplateRecurrence(
        template: TemplateSchema,
    ): Promise<TemplateSchema> {
        return this.dataSource.manager
            .getTreeRepository(TemplateSchema)
            .findDescendantsTree(template, { depth: 10 }); // TODO: FIND EFFICIENT METHOD TO DO IT
    }

    async insert(structure: Structure): Promise<void> {
        const ormStructure = StructureTypeORMMapper.toOrmEntity(structure);

        await this.dataSource.manager.transaction(
            async (transactionalEntityManager) => {
                await transactionalEntityManager.save(ormStructure);
            },
        );
    }

    private async insertTemplateRecurrence(
        template: TemplateSchema,
        transactionalEntityManager: EntityManager,
    ) {
        await transactionalEntityManager.save(template);
        template.children?.length &&
            (await Promise.all(
                template.children?.map((t) =>
                    this.insertTemplateRecurrence(
                        t,
                        transactionalEntityManager,
                    ),
                ),
            ));
    }

    async find(structureId: string): Promise<Structure> {
        const ormStructure = await this.ormRepository.findOne({
            where: { id: structureId },
            relations: ['templates'],
        });

        if (!ormStructure)
            throw new NotFoundException('Structure has not founded');

        return StructureTypeORMMapper.toDomainEntity(ormStructure);
    }

    async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }

    async update(id: string, structure: Structure): Promise<void> {
        const ormStructure = StructureTypeORMMapper.toOrmEntity(structure);
        await this.ormRepository.update(id, ormStructure);
    }
}
