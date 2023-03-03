import crypto from 'crypto';
import * as z from 'zod';

export type TemplateProps = {
    id?: string;
    name: string;
    nameAlt?: string;
    description?: string;
    descriptionAlt?: string;
    isOptional: boolean;
    warnIfNotFound: boolean;
    beforeId?: string;
    beforeAlt?: string[];
    xor?: string[];
    hasNameOfCourseInContent: boolean;
    disponibility: boolean;
    type: string;
    hasChildren: boolean;
    children?: Template[];
    parentId?: string;
};

export type CreateTemplateParams = Omit<TemplateProps, 'children'> & {
    children?: CreateTemplateParams[];
};

export const TemplateSchema = z.lazy(() =>
    z.object({
        id: z.string().optional(),
        name: z.string(),
        nameAlt: z.string().optional(),
        description: z.string().optional(),
        descriptionAlt: z.string().optional(),
        isOptional: z.boolean(),
        warnIfNotFound: z.boolean(),
        beforeId: z.string().optional(),
        beforeAlt: z.array(z.string()).optional(),
        xor: z.array(z.string()).optional(),
        hasNameOfCourseInContent: z.boolean(),
        disponibility: z.boolean(),
        type: z.string(),
        hasChildren: z.boolean(),
        children: z.array(z.lazy(() => TemplateSchema)).optional(),
        parentId: z.string().optional(),
    }),
);

export class Template {
    private props: Required<TemplateProps>;

    private constructor(props: TemplateProps) {
        this.props = {
            ...props,
            id: props.id || crypto.randomUUID(),
            beforeAlt: props.beforeAlt || [],
            xor: props.xor || [],
            children: props.children || [],
            nameAlt: props.nameAlt || '',
            description: props.description || '',
            descriptionAlt: props.descriptionAlt || '',
            beforeId: props.beforeId || '',
            parentId: props.parentId || '',
            hasNameOfCourseInContent: props.hasNameOfCourseInContent || false,
            hasChildren: props.hasChildren || false,
            isOptional: props.isOptional || false,
        };
    }

    static create(props: CreateTemplateParams): Template {
        const validatedProps = TemplateSchema.parse(props);
        return new Template({
            ...validatedProps,
            children: props.children
                ? props.children.map((child) => Template.create(child))
                : [],
        });
    }

    public setChildren(children: Template[]) {
        this.props.children = children;
    }

    public get children() {
        return this.props.children;
    }

    public toJSON() {
        return {
            ...this.props,
            children: this.props.children.map((child) => child.toJSON()) || [],
        };
    }
}
