import { DoubleCheckGatewayInterface } from '../../domain/gateway/DoubleCheckGatewayInterface';

export class FindAllDoubleCheckUseCase {
    constructor(private repository: DoubleCheckGatewayInterface) {}

    public async execute(): Promise<Output[]> {
        const doubleChecks = await this.repository.findAll();
        return doubleChecks.map((doubleCheck) => doubleCheck.toJSON());
    }
}

export type Output = {
    id: string;
    courses: Course[];
    checked: boolean;
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
