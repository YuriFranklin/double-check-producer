import CreateArrayWithLengthX from 'src/types/CreateArrayWithLength';
import NumericRange from 'src/types/NumericRange';

export class FindAllDoubleCheckDto {
    limit?: NumericRange<CreateArrayWithLengthX<1>, 1000>;
    start?: number;
    sortBy?: {
        property: 'id' | 'checked' | 'structureId' | 'name' | 'createdAt';
        order: 'ascending' | 'descending';
    };
    filter?: {
        value?: string;
        properties?: ['id' | 'structureId' | 'name'];
        checked?: boolean;
        dateStart?: Date;
        dateEnd?: Date;
    };
}
