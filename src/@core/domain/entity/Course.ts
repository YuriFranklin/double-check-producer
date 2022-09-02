import { Error } from './Error';

export type CourseProps = {
    name?: string;
    id: string;
    errors?: Error[];
    createdAt?: Date;
    editedAt?: Date;
    doubleCheckId?: string;
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
            name: props.name || '',
            errors: props.errors || [],
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
