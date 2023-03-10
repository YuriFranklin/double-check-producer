import { Course } from '../../../../domain/entity/Course';
import { DoubleCheck } from '../../../../domain/entity/DoubleCheck';
import { DoubleCheck as DoubleCheckSchema } from '../entity/DoubleCheck';
import { CourseTypeORMMapper } from './CourseTypeORMMapper';

export class DoubleCheckTypeORMMapper {
    public static toOrmEntity(doubleCheck: DoubleCheck): DoubleCheckSchema {
        const {
            id,
            checked,
            courses,
            createdAt,
            structureId,
            name,
            emailTo,
            queueAt,
            queueNow,
            repeatDays,
        } = doubleCheck.toJSON();

        const ormDoubleCheckSchema = new DoubleCheckSchema();

        ormDoubleCheckSchema.id = id;
        ormDoubleCheckSchema.checked = checked;
        ormDoubleCheckSchema.createdAt = new Date(createdAt);
        ormDoubleCheckSchema.structureId = structureId;
        ormDoubleCheckSchema.name = name;
        ormDoubleCheckSchema.emailTo = emailTo;
        ormDoubleCheckSchema.queueAt = queueAt;
        ormDoubleCheckSchema.queueNow = queueNow;
        ormDoubleCheckSchema.repeatDays = repeatDays;
        ormDoubleCheckSchema.courses = courses.map((c) =>
            CourseTypeORMMapper.toORMEntity(
                Course.create({
                    ...c,
                    createdAt: new Date(c.createdAt),
                    editedAt: new Date(c.editedAt),
                }),
                ormDoubleCheckSchema,
            ),
        );
        return ormDoubleCheckSchema;
    }

    public static toDomainEntity(
        doubleCheckSchema: DoubleCheckSchema,
    ): DoubleCheck {
        const courses =
            doubleCheckSchema.courses?.map((course) =>
                CourseTypeORMMapper.toJSON(course, doubleCheckSchema.id),
            ) || [];

        return DoubleCheck.create({ ...doubleCheckSchema, courses });
    }
}
