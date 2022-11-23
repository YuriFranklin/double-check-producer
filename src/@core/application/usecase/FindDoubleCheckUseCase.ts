import { DoubleCheckGatewayInterface } from '../../domain/gateway/DoubleCheckGatewayInterface';

export class FindDoubleCheckUseCase {
    constructor(private repository: DoubleCheckGatewayInterface) {}

    public async execute(id: Input): Promise<Output> {
        const doubleCheck = await this.repository.find(id);
        return doubleCheck.toJSON();
    }
}

export type Input = string;

export type Output = {
    id: string;
    courses: Course[];
    checked: boolean;
    createdAt: string;
    structureId: string;
};

export type Course = {
    name?: string;
    id: string;
    errors: Error[];
    createdAt: string;
    editedAt: string;
};

export type Error = {
    id: string;
    name: string;
    type: 'error' | 'warning';
    severity: 'high' | 'low' | 'medium';
    itemId: string;
    itemName: string;
    itemType: string;
    errorId: string;
    message: string;
};
