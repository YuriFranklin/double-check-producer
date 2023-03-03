import { Structure } from '../../../../domain/entity/Structure';
import { Template } from '../../../../domain/entity/Template';
import { Structure as StructureSchema } from '../entity/Structure';
import { TemplateTypeORMMapper } from './TemplateTypeORMMapper';

export class StructureTypeORMMapper {
    public static toOrmEntity(structure: Structure): StructureSchema {
        const { id, name, templates, createdAt } = structure.toJSON();

        const ormStructureSchema = new StructureSchema();

        ormStructureSchema.id = id;
        ormStructureSchema.name = name;
        ormStructureSchema.createdAt = new Date(createdAt);
        templates.length &&
            (ormStructureSchema.templates = templates.map((template) =>
                TemplateTypeORMMapper.toOrmEntity(Template.create(template)),
            ));

        return ormStructureSchema;
    }

    public static toDomainEntity(structure: StructureSchema): Structure {
        const { id, name, templates } = structure;

        const domainStructure = Structure.create({
            id,
            name,
            templates,
        });

        return domainStructure;
    }
}
