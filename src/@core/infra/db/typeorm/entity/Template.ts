import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { Structure } from './Structure';

@Entity('template')
export class Template {
    @PrimaryColumn('uuid')
    public id: string;

    @Column('text')
    public name: string;

    @Column('text', { nullable: true })
    public nameAlt?: string;

    @Column('text', { nullable: true })
    public description?: string;

    @Column('text', { nullable: true })
    public descriptionAlt?: string;

    @Column('boolean')
    public isOptional: boolean;

    @Column('boolean')
    public warnIfNotFound: boolean;

    @Column('text', { nullable: true })
    public beforeId?: string;

    @Column('simple-array', { nullable: true })
    public beforeAlt?: string[];

    @Column('simple-array', { nullable: true })
    public xor?: string[];

    @Column('boolean')
    public hasNameOfCourseInContent: boolean;

    @Column('boolean')
    public disponibility: boolean;

    @Column('text')
    public type: string;

    @Column('boolean')
    public hasChildren: boolean;

    @ManyToMany((type) => Template, (template) => template.children, {
        nullable: true,
    })
    @JoinTable()
    public parent?: Template;

    @ManyToMany(() => Template, (template) => template.parent, {
        nullable: true,
    })
    public children?: Template[];

    @ManyToOne(() => Structure, (structure) => structure.templates, {
        nullable: true,
        cascade: ['insert', 'recover', 'update', 'soft-remove'],
    })
    @JoinTable()
    public structure?: Structure;
}
