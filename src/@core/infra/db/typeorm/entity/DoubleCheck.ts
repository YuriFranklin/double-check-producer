import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Course } from './Course';

@Entity('doublecheck')
export class DoubleCheck {
    @PrimaryColumn('uuid')
    public id: string;

    @Column('boolean')
    public checked: boolean;

    @Column('text')
    public structureId: string;

    @Column('timestamptz', { nullable: true })
    public createdAt: Date;

    @Column('text')
    public name: string;

    @OneToMany(() => Course, (course) => course.doubleCheck, {
        nullable: true,
        eager: true,
        cascade: ['insert', 'recover', 'update', 'soft-remove'],
    })
    public courses?: Course[];

    @Column('time')
    public queueAt: string;

    @Column('boolean')
    public queueNow: boolean;

    @Column('varchar', { array: true, nullable: true })
    public repeatDays?: (
        | 'monday'
        | 'tuesday'
        | 'wednesday'
        | 'thursday'
        | 'friday'
        | 'saturday'
        | 'sunday'
    )[];

    @Column('varchar', { array: true, nullable: true })
    public emailTo?: string[];
}
