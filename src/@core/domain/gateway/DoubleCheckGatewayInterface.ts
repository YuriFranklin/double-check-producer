import CreateArrayWithLengthX from '../../../types/CreateArrayWithLength';
import NumericRange from '../../../types/NumericRange';
import { DoubleCheck } from '../entity/DoubleCheck';

export interface DoubleCheckGatewayInterface {
    insert(doubleCheck: DoubleCheck): Promise<void>;
    update(id: string, doubleCheck: DoubleCheck): Promise<DoubleCheck>;
    delete(id: string): Promise<void>;
    findAll({
        limit = 50,
        sortBy,
        start,
    }: findAllInput): Promise<findAllOutput>;
    find(id: string): Promise<DoubleCheck>;
}

export type findAllInput = {
    limit?: NumericRange<CreateArrayWithLengthX<1>, 1000>;
    start?: number;
    sortBy?: {
        property: 'id' | 'checked' | 'structureId' | 'name' | 'createdAt';
        order: 'ascending' | 'descending';
    };
};

export type findAllOutput = {
    totalItems: number;
    result: DoubleCheck[];
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
};
