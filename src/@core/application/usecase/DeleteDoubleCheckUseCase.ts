import { DoubleCheckGatewayInterface } from '../../domain/gateway/DoubleCheckGatewayInterface';

export class DeleteDoubleCheckUseCase {
    constructor(private repository: DoubleCheckGatewayInterface) {}

    async execute(input: Input) {
        await this.repository.delete(input);
    }
}

export type Input = string;
