import { Structure } from '../../../../domain/entity/Structure';
import { StructureGatewayInterface } from '../../../../domain/gateway/StructureGatewayInterface';

export class StructureGatewayMemory implements StructureGatewayInterface {
    private contents: Structure[] = [];

    async find(id: string): Promise<Structure> {
        return this.contents.find((structure) => structure.props.id === id);
    }

    async insert(structure: Structure): Promise<void> {
        this.contents.push(structure);
    }

    async findAll(): Promise<Structure[]> {
        return this.contents;
    }
}
