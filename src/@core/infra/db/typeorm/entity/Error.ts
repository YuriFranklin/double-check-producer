import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';
import { Course } from './Course';

@Entity('error')
export class Error {
    @PrimaryColumn('text')
    public id: string;

    @Column('text')
    public name: string;

    @Column('text')
    public type: 'error' | 'warning';

    @Column('text')
    public severity: 'high' | 'low' | 'medium';

    @Column('text')
    public itemId: string;

    @Column('text')
    public itemName: string;

    @Column('text')
    public itemType: string;

    @Column('text')
    public errorId: string;

    @Column('text')
    public message: string;

    @ManyToOne(() => Course, (course) => course.errors, {
        nullable: true,
        cascade: ['insert', 'recover', 'update', 'soft-remove'],
    })
    @JoinTable()
    public course?: Course;
}
