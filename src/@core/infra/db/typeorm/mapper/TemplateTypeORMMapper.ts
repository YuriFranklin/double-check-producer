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
            children,
            description,
            descriptionAlt,
            disponibility,
            hasChildren,
            hasNameOfCourseInContent,
            id,
            isOptional,
            name,
            nameAlt,
            parentId,
            type,
            warnIfNotFound,
            xor,
        } = template.props;
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
        ormSchema.beforeAlt = beforeAlt;
        ormSchema.beforeId = beforeId;
        ormSchema.warnIfNotFound = warnIfNotFound;
        ormSchema.xor = xor;
        parent && (ormSchema.parent = parent);
        children &&
            (ormSchema.children = children.map((child) =>
                this.toOrmEntity(child, ormSchema),
            ));

        return ormSchema;
    }

    public static toDomainEntity(
        templateSchema: TemplateSchema,
        parent?: TemplateSchema,
    ): Template {
        const children = templateSchema.children?.map((template) =>
            this.toDomainEntity(template, templateSchema),
        );
        const parentId = parent?.id;
        const template = new Template({
            ...templateSchema,
            parentId,
            children,
        });
        return template;
    }
}
