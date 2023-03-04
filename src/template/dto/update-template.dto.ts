import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateTemplateDto } from './create-template.dto';

export class UpdateTemplateDto extends PartialType(
    OmitType(CreateTemplateDto, ['children'] as const),
) {}
