import { DoubleCheck } from '../../../../domain/entity/DoubleCheck';
import { DoubleCheck as DoubleCheckSchema } from '../entity/DoubleCheck';
import { DataSource, Repository } from 'typeorm';
import { DoubleCheckGatewayInterface } from '../../../../domain/gateway/DoubleCheckGatewayInterface';
import { DoubleCheckTypeORMMapper } from '../mapper/DoubleCheckTypeORMMapper';

export class DoubleCheckGatewayTypeORM implements DoubleCheckGatewayInterface {
    private ormRepository: Repository<DoubleCheckSchema>;
    constructor(private dataSource: DataSource) {
        this.ormRepository = this.dataSource.getRepository(DoubleCheckSchema);
    }

    async insert(doubleCheck: DoubleCheck): Promise<void> {
        const ormEntity = DoubleCheckTypeORMMapper.toOrmEntity(doubleCheck);
        await this.dataSource.manager.transaction(
            async (transactionalEntityManager) => {
                await Promise.all(
                    ormEntity.courses.map(
                        async (course) =>
                            await transactionalEntityManager.save(course),
                    ),
                );

                await transactionalEntityManager.save(ormEntity);
            },
        );
    }

    async update(id: string, doubleCheck: DoubleCheck): Promise<DoubleCheck> {
        const findedEntity = await this.ormRepository.findOne({
            where: { id },
        });

        if (!findedEntity) throw new Error('Item not finded.');

        const ormEntity = DoubleCheckTypeORMMapper.toOrmEntity(doubleCheck);

        const updated = (await (
            await this.ormRepository.update(findedEntity, ormEntity)
        ).raw) as DoubleCheckSchema;

        return DoubleCheckTypeORMMapper.toDomainEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await this.ormRepository.delete({ id });
    }

    async findAll(): Promise<DoubleCheck[]> {
        const ormEntities = await this.ormRepository.find({
            relations: ['courses'],
        });

        return ormEntities.map((entity) =>
            DoubleCheckTypeORMMapper.toDomainEntity(entity),
        );
    }

    async find(id: string): Promise<DoubleCheck> {
        const ormEntity = await this.ormRepository.findOne({
            where: { id },
            relations: ['courses'],
        });

        if (!ormEntity) throw new Error('Item not finded.');

        return DoubleCheckTypeORMMapper.toDomainEntity(ormEntity);
    }
}
