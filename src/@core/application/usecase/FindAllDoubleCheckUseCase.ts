import CreateArrayWithLengthX from '../../../types/CreateArrayWithLength';
import NumericRange from '../../../types/NumericRange';
import { DoubleCheckGatewayInterface } from '../../domain/gateway/DoubleCheckGatewayInterface';

export class FindAllDoubleCheckUseCase {
    constructor(private repository: DoubleCheckGatewayInterface) {}

    public async execute(input: Input): Promise<Output> {
        const resultRepoFindAll = await this.repository.findAll(input);
        return {
            ...resultRepoFindAll,
            result: resultRepoFindAll.result.map((doubleCheck) =>
                doubleCheck.toJSON(),
            ),
        };
    }
}

export type Input = {
    limit?: NumericRange<CreateArrayWithLengthX<1>, 1000>;
    start?: number;
    sortBy?: {
        property: 'id' | 'checked' | 'structureId' | 'name' | 'createdAt';
        order: 'ascending' | 'descending';
    };
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

export type Output = {
    totalItems: number;
    result: DoubleCheck[];
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
};

export type DoubleCheck = {
    id: string;
    courses: Course[];
    checked: boolean;
    name: string;
    createdAt: string;
};
