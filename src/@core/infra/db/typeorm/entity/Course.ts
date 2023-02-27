import {
    Column,
    Entity,
    JoinTable,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { DoubleCheck } from './DoubleCheck';
import { Error } from './Error';

@Entity('course')
export class Course {
    @PrimaryColumn('text')
    public id: string;

    @Column('text')
    public courseId: string;

    @Column('boolean')
    public checked: boolean;

    @Column('timestamptz')
    public createdAt: Date;

    @Column('timestamptz', { nullable: true })
    public editedAt?: Date;

    @Column('text', { nullable: true })
    public name: string;

    @ManyToOne(() => DoubleCheck, (doubleCheck) => doubleCheck.courses, {
        nullable: true,
        cascade: ['insert', 'recover', 'update', 'soft-remove'],
        onDelete: 'CASCADE',
    })
    @JoinTable()
    public doubleCheck?: DoubleCheck;

    @OneToMany(() => Error, (error) => error.course, {
        nullable: true,
        eager: true,
        cascade: ['insert', 'recover', 'update', 'soft-remove'],
    })
    public errors: Error[];
}
