import { Course } from './Course';
import crypto from 'crypto';

export type DoubleCheckProps = {
    id?: string;
    courses: Course[];
    checked?: boolean;
    createdAt?: Date;
};

export class DoubleCheck {
    public props: Required<DoubleCheckProps>;

    private constructor(props: DoubleCheckProps) {
        this.props = {
            ...props,
            id: props.id || crypto.randomUUID(),
            checked: props.checked || false,
            courses: props.courses || [],
            createdAt: props.createdAt || new Date(),
        };
    }

    public static create(props: DoubleCheckProps): DoubleCheck {
        return new DoubleCheck(props);
    }

    public toJSON() {
        return {
            ...this.props,
            courses: this.props.courses.map((course) => course.toJSON()),
            createdAt: this.props.createdAt.toISOString(),
        };
    }
}
