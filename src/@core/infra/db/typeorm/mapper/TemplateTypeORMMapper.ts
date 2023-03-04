import { Template } from '../../../../domain/entity/Template';
import { Template as TemplateSchema } from '../entity/Template';

export class TemplateTypeORMMapper {
    public static toOrmEntity(
        template: Template,
        parent?: TemplateSchema,
    ): TemplateSchema {
        const {
            beforeAlt,
            beforeId,
            description,
            descriptionAlt,
            disponibility,
            hasChildren,
            hasNameOfCourseInContent,
            id,
            isOptional,
            name,
            nameAlt,
            type,
            warnIfNotFound,
            xor,
            children,
        } = template.toJSON();

        const ormSchema = new TemplateSchema();

        ormSchema.id = id;
        ormSchema.name = name;
        ormSchema.nameAlt = nameAlt;
        ormSchema.type = type;
        ormSchema.description = description;
        ormSchema.descriptionAlt = descriptionAlt;
        ormSchema.disponibility = disponibility;
        ormSchema.hasNameOfCourseInContent = hasNameOfCourseInContent;
        ormSchema.hasChildren = hasChildren;
        ormSchema.isOptional = isOptional;
        beforeAlt && (ormSchema.beforeAlt = beforeAlt);
        ormSchema.beforeId = beforeId;
        ormSchema.warnIfNotFound = warnIfNotFound;
        ormSchema.xor = xor;
        parent && (ormSchema.parent = parent);
        children &&
            (ormSchema.children = children.map((child) =>
                this.toOrmEntity(Template.create(child), ormSchema),
            ));

        return ormSchema;
    }

    public static toDomainEntity(templateSchema: TemplateSchema): Template {
        const test = this.putParentIdRecurrence(templateSchema);
        const template = Template.create(test);

        return template;
    }

    private static putParentIdRecurrence(
        templateSchema: TemplateSchema,
        templateParent?: TemplateSchema,
    ) {
        return {
            ...templateSchema,
            parentId: templateSchema.parent?.id || templateParent?.id,
            children: templateSchema.children?.map((child) =>
                this.putParentIdRecurrence(child, templateSchema),
            ),
        };
    }
}
