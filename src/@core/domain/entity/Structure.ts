import { Template } from './Template';
import crypto from 'crypto';

export type StructureProps = {
    id?: string;
    name: string;
    templates?: Template[];
};

export class Structure {
    public props: Required<StructureProps>;

    private constructor(props: StructureProps) {
        if (!props) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            this.props = {};
            return;
        }
        this.props = {
            id: props.id || crypto.randomUUID(),
            ...props,
            templates: props.templates || [],
        };
    }

    static create(props: StructureProps) {
        return new Structure(props);
    }

    toJSON() {
        return {
            ...this.props,
            templates: this.props.templates.map((template) =>
                template.toJSON(),
            ),
        };
    }
}
