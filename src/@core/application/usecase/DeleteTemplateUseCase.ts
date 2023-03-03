import { TemplateGatewayInterface } from '../../domain/gateway/TemplateGatewayInterface';

export class DeleteTemplateUseCase {
    constructor(private repository: TemplateGatewayInterface) {}

    public async execute(id: Input): Promise<void> {
        await this.repository.delete(id);
    }
}

export type Input = string;
