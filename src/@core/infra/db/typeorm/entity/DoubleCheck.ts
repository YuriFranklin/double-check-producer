import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Course } from './Course';

@Entity('doublecheck')
export class DoubleCheck {
    @PrimaryColumn('uuid')
    public id: string;

    @Column('boolean')
    public checked: boolean;

    @Column('timestamptz', { nullable: true })
    public createdAt: Date;

    @OneToMany(() => Course, (course) => course.doubleCheck, {
        nullable: true,
        eager: true,
        cascade: ['insert', 'recover', 'update', 'soft-remove'],
    })
    public courses: Course[];
}
