import { StructureGatewayInterface } from '../../domain/gateway/StructureGatewayInterface';

export class DeleteStructureUseCase {
    constructor(private structureGateway: StructureGatewayInterface) {}

    public async execute(id: DeleteStructureUseCaseInput): Promise<void> {
        await this.structureGateway.delete(id);
    }
}

export type DeleteStructureUseCaseInput = string;
