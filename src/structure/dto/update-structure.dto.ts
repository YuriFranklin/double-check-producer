import { PartialType } from '@nestjs/mapped-types';
import { CreateStructureDto } from './create-structure.dto';

export class UpdateStructureDto extends PartialType(CreateStructureDto) {}
