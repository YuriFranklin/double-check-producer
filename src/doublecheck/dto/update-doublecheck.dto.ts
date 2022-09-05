import { PartialType } from '@nestjs/mapped-types';
import { CreateDoublecheckDto } from './create-doublecheck.dto';

export class UpdateDoublecheckDto extends PartialType(CreateDoublecheckDto) {}
