import { DoubleCheckGatewayInterface } from '../../../../domain/gateway/DoubleCheckGatewayInterface';
import { DoubleCheck } from '../../../../domain/entity/DoubleCheck';

export class DoubleCheckGatewayMemory implements DoubleCheckGatewayInterface {
    private doubleChecks: DoubleCheck[] = [];

    async update(id: string, doubleCheck: DoubleCheck): Promise<DoubleCheck> {
        const index = this.doubleChecks.findIndex(
            (dCheck) => dCheck.props.id === id,
        );
        if (!index) throw new Error('Item not founded.');

        return (this.doubleChecks[index] = doubleCheck);
    }

    async delete(id: string): Promise<void> {
        const index = this.doubleChecks.findIndex(
            (dCheck) => dCheck.props.id === id,
        );
        if (!index) throw new Error('Item not founded.');

        this.doubleChecks.splice(index, 1);
    }

    async find(id: string): Promise<DoubleCheck> {
        return this.doubleChecks.find(
            (doubleCheck) => doubleCheck.props.id === id,
        );
    }

    async insert(doubleCheck: DoubleCheck): Promise<void> {
        this.doubleChecks.push(doubleCheck);
    }

    async findAll(): Promise<DoubleCheck[]> {
        return this.doubleChecks;
    }
}
