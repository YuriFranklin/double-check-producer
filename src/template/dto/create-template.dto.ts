import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsOptional,
    IsString,
    ValidateNested,
    IsArray,
} from 'class-validator';

export class CreateTemplateDto {
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
    @Type(() => CreateTemplateDto)
    @IsOptional()
    children?: CreateTemplateDto[];

    @IsString()
    @IsOptional()
    parentId?: string;
}
