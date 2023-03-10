import { Course, courseSchema } from './Course';
import crypto from 'crypto';
import { z } from 'zod';

const doubleCheckSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    courses: z.array(courseSchema).transform((courses) =>
        courses.map((course) =>
            Course.create({
                ...course,
                errors: course.errors?.map((error) => error.toJSON()),
            }),
        ),
    ),
    checked: z.boolean().optional(),
    createdAt: z.date().optional(),
    structureId: z.string(),
    emailTo: z.array(z.string()).optional(),
    repeatDays: z
        .array(
            z.enum([
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday',
            ]),
        )
        .optional(),
    queueAt: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),
    queueNow: z.boolean(),
});

export type DoubleCheckProps = {
    id?: string;
    name: string;
    courses: Course[];
    checked?: boolean;
    createdAt?: Date;
    structureId: string;
    emailTo?: string[];
    repeatDays?: (
        | 'monday'
        | 'tuesday'
        | 'wednesday'
        | 'thursday'
        | 'friday'
        | 'saturday'
        | 'sunday'
    )[];
    queueAt: string;
    queueNow: boolean;
};

export type CreateDoubleCheckParams = z.input<typeof doubleCheckSchema>;

export class DoubleCheck {
    private props: Required<DoubleCheckProps>;

    private constructor(props: DoubleCheckProps) {
        this.props = {
            ...props,
            id: props.id || crypto.randomUUID(),
            checked: props.checked || false,
            courses: props.courses || [],
            createdAt: props.createdAt || new Date(),
            emailTo: props.emailTo || [],
            repeatDays: props.repeatDays || [],
        };
    }

    public static create(props: CreateDoubleCheckParams): DoubleCheck {
        const validatedProps = doubleCheckSchema.parse(props);
        return new DoubleCheck(validatedProps);
    }

    public toJSON() {
        return {
            ...this.props,
            createdAt: this.props.createdAt.toISOString(),
            courses: this.props.courses.map((course) => {
                return { ...course.toJSON(), doubleCheckId: this.props.id };
            }),
        };
    }
}
