import { StructureGatewayInterface } from '../../../../domain/gateway/StructureGatewayInterface';
import { Structure } from '../../../../domain/entity/Structure';
import { DataSource, Repository } from 'typeorm';
import { Structure as StructureSchema } from '../entity/Structure';
import { StructureTypeORMMapper } from '../mapper/StructureTypeORMMapper';

export class StructureGatewayTypeORM implements StructureGatewayInterface {
    private ormRepository: Repository<StructureSchema>;

    constructor(private dataSource: DataSource) {
        this.ormRepository = this.dataSource.getRepository(StructureSchema);
    }

    findAll(): Promise<Structure[]> {
        throw new Error('Method not implemented.');
    }

    async insert(structure: Structure): Promise<void> {
        const ormStructure = StructureTypeORMMapper.toOrmEntity(structure);
        await this.ormRepository.insert(ormStructure);
    }

    async listAll(): Promise<Structure[]> {
        const ormStructures = await this.ormRepository.find();

        return ormStructures.map((ormStructure) =>
            StructureTypeORMMapper.toDomainEntity(ormStructure),
        );
    }

    async find(structureId: string): Promise<Structure> {
        const ormStructure = await this.ormRepository.findOne({
            where: { id: structureId },
        });

        if (!ormStructure) throw new Error('Structure has not founded');

        return StructureTypeORMMapper.toDomainEntity(ormStructure);
    }
}
