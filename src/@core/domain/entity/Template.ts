import crypto from 'crypto';

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

export class Template {
    public props: Required<TemplateProps>;

    constructor(props: TemplateProps) {
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

    public get children() {
        return this.props.children;
    }

    toJSON(): TemplateToJSON {
        return {
            ...this.props,
            children: this.props.children.map((child) => child.toJSON()),
        };
    }
}

export type TemplateToJSON = {
    id: string;
    name: string;
    nameAlt: string;
    description: string;
    descriptionAlt: string;
    isOptional: boolean;
    warnIfNotFound: boolean;
    beforeId: string;
    beforeAlt: string[];
    xor: string[];
    hasNameOfCourseInContent: boolean;
    disponibility: boolean;
    type: string;
    hasChildren: boolean;
    children: TemplateToJSON[];
    parentId: string;
};
