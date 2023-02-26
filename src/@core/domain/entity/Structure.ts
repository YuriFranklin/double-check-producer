import { Template, TemplateSchema } from './Template';
import crypto from 'crypto';
import * as z from 'zod';

export const StructureSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3),
    createdAt: z.date().optional(),
    templates: z
        .array(TemplateSchema)
        .optional()
        .transform((templates) =>
            templates?.map((template) => Template.create(template)),
        ),
});

export type StructureProps = {
    id?: string;
    name: string;
    templates?: Template[];
    createdAt?: Date;
};

export type CreateStructureParams = z.input<typeof StructureSchema>;

export class Structure {
    private props: Required<StructureProps>;

    private constructor(props: StructureProps) {
        this.props = {
            ...props,
            id: props.id || crypto.randomUUID(),
            templates: props.templates || [],
            createdAt: props.createdAt || new Date(),
        };
    }

    static create(props: StructureProps) {
        const validatedProps = StructureSchema.parse(props);
        return new Structure(validatedProps);
    }

    toJSON() {
        return {
            ...this.props,
            templates: this.props.templates.map((template) =>
                template.toJSON(),
            ),
            createdAt: this.props.createdAt.toISOString(),
        };
    }
}
