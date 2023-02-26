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

export class CreateDoublecheckDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Course)
    courses: Course[];

    @IsBoolean()
    @IsOptional()
    checked?: boolean;

    @IsDateString()
    @IsOptional()
    createdAt?: Date;

    @IsNotEmpty()
    structureId: string;

    @IsEmail({}, { each: true })
    @IsOptional()
    emailTo?: string[];

    @IsArray()
    @ValidateNested({ each: true })
    @IsIn(
        [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
        ],
        { each: true },
    )
    @IsOptional()
    repeatDays?: (
        | 'monday'
        | 'tuesday'
        | 'wednesday'
        | 'thursday'
        | 'friday'
        | 'saturday'
        | 'sunday'
    )[];

    @IsNotEmpty()
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
        message: 'queueAt must be in formatt HH:MM:SS',
    })
    queueAt: string;

    @IsNotEmpty()
    @IsBoolean()
    queueNow: boolean;
}

class Course {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    courseId: string;

    @IsOptional()
    errors?: Error[];

    @IsDateString()
    @IsOptional()
    createdAt?: Date;

    @IsDateString()
    @IsOptional()
    editedAt?: Date;
}

type Error = {
    id?: string;
    name: string;
    type: 'error' | 'warning';
    severity: 'high' | 'low' | 'medium';
    itemId?: string;
    itemName: string;
    itemType: string;
    errorId: string;
    message: string;
};
