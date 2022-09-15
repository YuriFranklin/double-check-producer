import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Template } from './Template';

@Entity('structure')
export class Structure {
    @PrimaryColumn('uuid')
    public id: string;

    @Column('text')
    public name: string;

    @OneToMany(() => Template, (template) => template.structure, {
        nullable: true,
        eager: true,
        cascade: ['insert', 'recover', 'update', 'soft-remove', 'remove'],
    })
    public templates: Template[];
}
