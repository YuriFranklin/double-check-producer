import { Error as ErrorSchema } from '../entity/Error';
import { Course as CourseSchema } from '../entity/Course';
import { Error } from '../../../../domain/entity/Error';

export class ErrorTypeORMMapper {
    public static toOrmEntity(
        error: Error,
        course?: CourseSchema,
    ): ErrorSchema {
        const {
            errorId,
            id,
            name,
            itemId,
            itemName,
            itemType,
            message,
            severity,
            type,
        } = error.toJSON();

        const ormErrorSchema = new ErrorSchema();

        ormErrorSchema.id = id;
        ormErrorSchema.errorId = errorId;
        ormErrorSchema.itemId = itemId;
        ormErrorSchema.itemName = itemName;
        ormErrorSchema.itemType = itemType;
        ormErrorSchema.message = message;
        ormErrorSchema.name = name;
        ormErrorSchema.severity = severity;
        ormErrorSchema.type = type;
        course && (ormErrorSchema.course = course);

        return ormErrorSchema;
    }

    public static toDomainEntity(errorSchema: ErrorSchema): Error {
        return Error.create({
            ...errorSchema,
            courseId: errorSchema.course?.id,
        });
    }

    public static toJSON(errorSchema: ErrorSchema) {
        return { ...errorSchema };
    }
}
