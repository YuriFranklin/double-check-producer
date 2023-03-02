import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsBoolean,
    IsDateString,
    IsOptional,
    IsEmail,
    IsString,
    ValidateNested,
    IsIn,
    IsArray,
    Matches,
} from 'class-validator';

export class CreateStructureDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Template)
    templates?: Template[];
}

class Template {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    nameAlt?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    descriptionAlt?: string;

    @IsBoolean()
    isOptional: boolean;

    @IsBoolean()
    warnIfNotFound: boolean;

    @IsString()
    @IsOptional()
    beforeId?: string;

    @IsString()
    @IsOptional()
    beforeAlt?: string[];

    @IsArray()
    @IsString()
    @IsOptional()
    xor?: string[];

    @IsBoolean()
    hasNameOfCourseInContent: boolean;

    @IsBoolean()
    disponibility: boolean;

    @IsString()
    type: string;

    @IsBoolean()
    hasChildren: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Template)
    @IsOptional()
    children?: Template[];

    @IsString()
    @IsOptional()
    parentId?: string;
}
