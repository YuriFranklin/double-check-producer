import { Error } from './Error';
import crypto from 'crypto';

export type CourseProps = {
    id?: string;
    name?: string;
    errors?: Error[];
    createdAt?: Date;
    editedAt?: Date;
    courseId: string;
    doubleCheckId?: string;
    checked?: boolean;
};

export class Course {
    public props: Required<CourseProps>;
    private constructor(props: CourseProps) {
        if (!props) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            this.props = {};
            return;
        }
        this.props = {
            ...props,
            id: props.id || crypto.randomUUID(),
            name: props.name || '',
            errors: props.errors || [],
            checked: props.checked || false,
            doubleCheckId: props.doubleCheckId || '',
            createdAt: new Date(),
            editedAt: new Date(),
        };
    }

    static create(props: CourseProps) {
        return new Course(props);
    }

    public toJSON() {
        return {
            ...this.props,
            createdAt: this.props.createdAt.toISOString(),
            editedAt: this.props.createdAt.toISOString(),
            errors: this.props.errors.map((error) => error.toJSON()),
        };
    }
}
