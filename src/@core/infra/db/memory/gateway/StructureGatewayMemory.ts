import { Structure } from '../../../../domain/entity/Structure';
import { StructureGatewayInterface } from '../../../../domain/gateway/StructureGatewayInterface';

export class StructureGatewayMemory implements StructureGatewayInterface {
    private structures: Structure[] = [];

    async update(id: any, structure: Structure): Promise<void> {
        const index = this.structures.findIndex(
            (dCheck) => dCheck.props.id === id,
        );
        if (!index) throw new Error('Item not founded.');

        this.structures[index] = structure;
    }

    async find(id: string): Promise<Structure> {
        const finded = this.structures.find(
            (structure) => structure.props.id === id,
        );

        if (!finded) throw new Error('Item not finded.');

        return finded;
    }

    async insert(structure: Structure): Promise<void> {
        this.structures.push(structure);
    }

    async findAll(): Promise<Structure[]> {
        return this.structures;
    }

    async delete(id: string): Promise<void> {
        const index = this.structures.findIndex(
            (dCheck) => dCheck.props.id === id,
        );
        if (!index) throw new Error('Item not founded.');

        this.structures.splice(index, 1);
    }
}
