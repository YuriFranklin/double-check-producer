import crypto from 'crypto';
import * as z from 'zod';

export const errorSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    type: z.enum(['error', 'warning']),
    severity: z.enum(['high', 'low', 'medium']),
    courseId: z.string().optional(),
    itemId: z.string().optional(),
    itemName: z.string(),
    itemType: z.string(),
    errorId: z.string(),
    message: z.string(),
});

export type ErrorProps = {
    id?: string;
    name: string;
    type: 'error' | 'warning';
    severity: 'high' | 'low' | 'medium';
    courseId?: string;
    itemId?: string;
    itemName: string;
    itemType: string;
    errorId: string;
    message: string;
};

export type CreateErrorParams = z.input<typeof errorSchema>;

export class Error {
    public props: Required<ErrorProps>;

    private constructor(props: ErrorProps) {
        this.props = {
            ...props,
            id: props.id || crypto.randomUUID(),
            itemId: props.itemId || '',
            courseId: props.courseId || '',
        };
    }

    public static create(props: CreateErrorParams): Error {
        const validatedProps = errorSchema.parse(props);
        return new Error(validatedProps);
    }

    public toJSON() {
        return {
            ...this.props,
        };
    }
}
