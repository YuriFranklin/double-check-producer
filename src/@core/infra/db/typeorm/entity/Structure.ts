import { ObjectIdColumn, Column, Entity } from 'typeorm';

@Entity('structure')
export class Structure {
    @ObjectIdColumn()
    public id: string;

    @ObjectIdColumn({ name: 'id' })
    public _id!: string;

    @Column('string')
    public name: string;

    @Column('simple-array')
    public templates: Template[];
}

export type Template = {
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
