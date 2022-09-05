import crypto from 'crypto';

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

    public static create(props: ErrorProps): Error {
        return new Error(props);
    }

    public toJSON() {
        return this.props;
    }
}
