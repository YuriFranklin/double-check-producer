import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateStructureDto } from './create-structure.dto';

export class UpdateStructureDto extends PartialType(
    OmitType(CreateStructureDto, ['templates'] as const),
) {}
