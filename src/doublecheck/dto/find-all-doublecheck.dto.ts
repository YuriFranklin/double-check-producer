import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsDateString,
    IsOptional,
    ValidateNested,
    IsIn,
    IsNumber,
    Min,
    Max,
    IsString,
} from 'class-validator';
import CreateArrayWithLengthX from 'src/types/CreateArrayWithLength';
import NumericRange from 'src/types/NumericRange';

class SortBy {
    @IsIn(['id', 'checked', 'structureId', 'name', 'createdAt'])
    property: 'id' | 'checked' | 'structureId' | 'name' | 'createdAt';

    @IsIn(['ascending', 'descending'])
    order: 'ascending' | 'descending';
}

class Filter {
    @IsOptional()
    @IsString()
    value?: string;

    @IsOptional()
    @IsIn(['id', 'structureId', 'name'], {
        each: true,
    })
    properties?: ['id' | 'structureId' | 'name'];

    @IsOptional()
    @IsBoolean()
    checked?: boolean;

    @IsOptional()
    @IsDateString()
    dateStart?: Date;

    @IsOptional()
    @IsDateString()
    dateEnd?: Date;
}

export class FindAllDoubleCheckDto {
    @IsNumber()
    @Min(1)
    @Max(1000)
    @IsOptional()
    limit?: NumericRange<CreateArrayWithLengthX<1>, 1000>;

    @IsNumber()
    @IsOptional()
    start?: number;

    @ValidateNested()
    @IsOptional()
    @Type(() => SortBy)
    sortBy?: SortBy;

    @ValidateNested()
    @IsOptional()
    @Type(() => Filter)
    filter?: Filter;
}
