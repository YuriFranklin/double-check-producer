import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { CreateTemplateDto } from './create-template.dto';

export class UpdateTemplateDto extends PartialType(
    OmitType(CreateTemplateDto, ['id'] as const),
) {
    @Exclude()
    id?: string;
}
