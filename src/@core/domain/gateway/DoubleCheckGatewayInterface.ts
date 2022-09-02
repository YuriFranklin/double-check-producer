import { DoubleCheck } from '../entity/DoubleCheck';

export interface DoubleCheckGatewayInterface {
    insert(doubleCheck: DoubleCheck): Promise<void>;
    update(id: string, doubleCheck: DoubleCheck): Promise<DoubleCheck>;
    delete(id: string): Promise<void>;
    findAll(): Promise<DoubleCheck[]>;
    find(id: string): Promise<DoubleCheck>;
}
