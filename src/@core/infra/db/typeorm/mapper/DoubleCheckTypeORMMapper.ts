import { DoubleCheck } from '../../../../domain/entity/DoubleCheck';
import { DoubleCheck as DoubleCheckSchema } from '../entity/DoubleCheck';
import { CourseTypeORMMapper } from './CourseTypeORMMapper';

export class DoubleCheckTypeORMMapper {
    public static toOrmEntity(doubleCheck: DoubleCheck): DoubleCheckSchema {
        const { id, checked, courses, createdAt } = doubleCheck.props;

        const ormDoubleCheckSchema = new DoubleCheckSchema();

        ormDoubleCheckSchema.id = id;
        ormDoubleCheckSchema.checked = checked;
        ormDoubleCheckSchema.createdAt = createdAt;
        ormDoubleCheckSchema.courses = courses.map((c) =>
            CourseTypeORMMapper.toORMEntity(c, ormDoubleCheckSchema),
        );

        return ormDoubleCheckSchema;
    }

    public static toDomainEntity(
        doubleCheckSchema: DoubleCheckSchema,
    ): DoubleCheck {
        const courses = doubleCheckSchema.courses?.map((course) =>
            CourseTypeORMMapper.toDomainEntity(course),
        );

        return DoubleCheck.create({ ...doubleCheckSchema, courses });
    }
}
