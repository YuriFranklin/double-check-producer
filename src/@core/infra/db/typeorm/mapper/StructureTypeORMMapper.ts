import { Structure } from '../../../../domain/entity/Structure';
import { Template } from '../../../../domain/entity/Template';
import {
    Structure as StructureSchema,
    Template as TemplateProps,
} from '../entity/Structure';

export class StructureTypeORMMapper {
    public static toOrmEntity(structure: Structure): StructureSchema {
        const { id, name, templates } = structure.props;

        const ormStructureSchema = new StructureSchema();

        ormStructureSchema.id = id;
        ormStructureSchema.name = name;
        ormStructureSchema.templates = templates.map((template) =>
            template.toJSON(),
        );

        return ormStructureSchema;
    }

    private static createTemplateRecurrences(
        inputs: TemplateProps[],
    ): Template[] {
        if (!Array.isArray(inputs)) return [];

        return inputs.map(
            (input) =>
                new Template({
                    ...input,
                    children: this.createTemplateRecurrences(input.children),
                }),
        );
    }

    public static toDomainEntity(structure: StructureSchema): Structure {
        const { _id, name, templates: rawTemplates } = structure;

        const templates = this.createTemplateRecurrences(rawTemplates);

        const domainStructure = Structure.create({
            id: _id,
            name,
            templates,
        });

        return domainStructure;
    }
}
