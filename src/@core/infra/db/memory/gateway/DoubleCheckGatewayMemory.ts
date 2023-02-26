import {
    DoubleCheckGatewayInterface,
    findAllInput,
    findAllOutput,
} from '../../../../domain/gateway/DoubleCheckGatewayInterface';
import { DoubleCheck } from '../../../../domain/entity/DoubleCheck';

export class DoubleCheckGatewayMemory implements DoubleCheckGatewayInterface {
    findAll({ limit, sortBy, start }: findAllInput): Promise<findAllOutput> {
        throw new Error('Method not implemented.');
    }
    private doubleChecks: DoubleCheck[] = [];

    async update(id: string, doubleCheck: DoubleCheck): Promise<DoubleCheck> {
        const index = this.doubleChecks.findIndex(
            (dCheck) => dCheck.toJSON().id === id,
        );
        if (!index) throw new Error('Item not founded.');

        return (this.doubleChecks[index] = doubleCheck);
    }

    async delete(id: string): Promise<void> {
        const index = this.doubleChecks.findIndex(
            (dCheck) => dCheck.toJSON().id === id,
        );
        if (!index) throw new Error('Item not founded.');

        this.doubleChecks.splice(index, 1);
    }

    async find(id: string): Promise<DoubleCheck> {
        const founded = this.doubleChecks.find(
            (doubleCheck) => doubleCheck.toJSON().id === id,
        );
        if (!founded) throw new Error('Item not founded.');
        return founded;
    }

    async insert(doubleCheck: DoubleCheck): Promise<void> {
        this.doubleChecks.push(doubleCheck);
    }
}
