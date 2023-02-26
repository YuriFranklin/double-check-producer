import { Structure } from '../../../../domain/entity/Structure';
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
                TemplateTypeORMMapper.toOrmEntity(template),
            ));

        return ormStructureSchema;
    }

    public static toDomainEntity(structure: StructureSchema): Structure {
        const { id, name, templates: rawTemplates } = structure;

        const templates = rawTemplates.map((template) =>
            TemplateTypeORMMapper.toDomainEntity(template),
        );

        const domainStructure = Structure.create({
            id,
            name,
            templates,
        });

        return domainStructure;
    }
}
