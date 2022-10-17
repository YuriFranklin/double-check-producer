import { DoubleCheck } from '../../../../domain/entity/DoubleCheck';
import { DoubleCheck as DoubleCheckSchema } from '../entity/DoubleCheck';
import {
    DataSource,
    FindOptionsOrder,
    FindOptionsWhere,
    LessThanOrEqual,
    Like,
    MoreThanOrEqual,
    Repository,
} from 'typeorm';
import {
    DoubleCheckGatewayInterface,
    findAllOutput,
} from '../../../../domain/gateway/DoubleCheckGatewayInterface';
import { DoubleCheckTypeORMMapper } from '../mapper/DoubleCheckTypeORMMapper';
import NumericRange from 'src/types/NumericRange';
import CreateArrayWithLengthX from 'src/types/CreateArrayWithLength';

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

    async findAll({
        limit = 25,
        start,
        sortBy,
        filter,
    }: {
        limit?: NumericRange<CreateArrayWithLengthX<1>, 1000>;
        start?: number;
        sortBy?: {
            property: 'id' | 'checked' | 'structureId' | 'name' | 'createdAt';
            order: 'ascending' | 'descending';
        };
        filter?: {
            value?: string;
            properties?: ['id' | 'structureId' | 'name'];
            checked?: boolean;
            dateStart?: Date;
            dateEnd?: Date;
        };
    }): Promise<findAllOutput> {
        const order = this.orderFindAll(sortBy);
        const mountFilter = this.filterFindAll(filter);

        const ormResult = await this.ormRepository.findAndCount({
            relations: ['courses'],
            take: limit,
            skip: start,
            cache: true,
            order,
            where: mountFilter,
        });

        const totalItems = ormResult[1];
        const itemsPerPage = limit;
        const currentPage = Math.ceil((start || 0) / itemsPerPage);
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const result =
            ormResult[0]?.map((entity) =>
                DoubleCheckTypeORMMapper.toDomainEntity(entity),
            ) || [];

        return {
            totalItems,
            totalPages,
            currentPage,
            itemsPerPage,
            result,
        };
    }

    private orderFindAll(sortBy?: {
        property: 'id' | 'checked' | 'structureId' | 'name' | 'createdAt';
        order: 'ascending' | 'descending';
    }) {
        let sort: FindOptionsOrder<DoubleCheckSchema>;
        const order = sortBy?.order === 'ascending' ? 'ASC' : 'DESC';

        switch (sortBy?.property) {
            case 'id':
                sort = { id: order };
                break;
            case 'name':
                sort = { name: order };
                break;
            case 'checked':
                sort = { checked: order };
                break;
            case 'structureId':
                sort = { structureId: order };
                break;
            case 'createdAt':
                sort = { createdAt: order };
                break;
            default:
                sort = { createdAt: 'DESC' };
        }

        return sort;
    }

    private filterFindAll(filter?: {
        value?: string;
        properties?: ['id' | 'structureId' | 'name'];
        checked?: boolean;
        dateStart?: Date;
        dateEnd?: Date;
    }):
        | FindOptionsWhere<DoubleCheckSchema>
        | FindOptionsWhere<DoubleCheckSchema>[] {
        const dateStart =
            filter?.dateStart &&
            new Date(
                filter.dateStart.getFullYear(),
                filter.dateStart.getMonth(),
                filter.dateStart.getDate(),
            );
        const dateEnd =
            filter?.dateEnd &&
            new Date(
                filter.dateEnd.getFullYear(),
                filter.dateEnd.getMonth(),
                filter.dateEnd.getDate(),
            );

        const trimValue = filter?.value?.trim();

        const appliedFilter:
            | FindOptionsWhere<DoubleCheckSchema>
            | FindOptionsWhere<DoubleCheckSchema>[] = [];

        filter?.properties?.includes('id') &&
            appliedFilter.push({
                id: Like(`%${trimValue}%`),
            });

        filter?.properties?.includes('structureId') &&
            appliedFilter.push({
                structureId: Like(`%${trimValue}%`),
            });

        filter?.properties?.includes('name') &&
            appliedFilter.push({
                name: Like(`%${trimValue}%`),
            });

        dateStart && appliedFilter.length
            ? appliedFilter.forEach(
                  (filter, index) =>
                      (appliedFilter[index] = {
                          ...filter,
                          createdAt: MoreThanOrEqual(dateStart),
                      }),
              )
            : appliedFilter.push({ createdAt: MoreThanOrEqual(dateStart) });

        dateEnd && appliedFilter.length
            ? appliedFilter.forEach(
                  (filter, index) =>
                      (appliedFilter[index] = {
                          ...filter,
                          createdAt: LessThanOrEqual(dateEnd),
                      }),
              )
            : appliedFilter.push({ createdAt: LessThanOrEqual(dateEnd) });

        filter && typeof filter.checked === 'undefined' && appliedFilter.length
            ? appliedFilter.forEach(
                  (filter, index) =>
                      (appliedFilter[index] = {
                          ...filter,
                          checked: filter.checked,
                      }),
              )
            : appliedFilter.push({ checked: filter.checked });

        return appliedFilter;
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
