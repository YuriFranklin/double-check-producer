import { DoubleCheck } from '../../domain/entity/DoubleCheck';
import { Course } from '../../domain/entity/Course';
import { Error, ErrorProps } from '../../domain/entity/Error';
import { DoubleCheckGatewayInterface } from '../../domain/gateway/DoubleCheckGatewayInterface';

export class CreateDoubleCheckUseCase {
    constructor(private repository: DoubleCheckGatewayInterface) {}

    async execute(
        input: CreateDoubleCheckUseCaseInput,
    ): Promise<CreateDoubleCheckUseCaseOutput> {
        const courses = input.courses?.map((course) => {
            const errors = course.errors?.map((error) =>
                Error.create(error).toJSON(),
            );
            const createdCourse = Course.create({ ...course, errors }).toJSON();
            return {
                ...createdCourse,
                createdAt: new Date(createdCourse.createdAt),
                editedAt: new Date(createdCourse.editedAt),
            };
        });

        const doubleCheck = DoubleCheck.create({ ...input, courses });

        await this.repository.insert(doubleCheck);

        return doubleCheck.toJSON();
    }
}

export type CreateDoubleCheckUseCaseInput = {
    id?: string;
    courses: CourseInput[];
    checked?: boolean;
    structureId: string;
    name: string;
    emailTo?: string[];
    repeatDays?: (
        | 'monday'
        | 'tuesday'
        | 'wednesday'
        | 'thursday'
        | 'friday'
        | 'saturday'
        | 'sunday'
    )[];
    queueAt: string;
    queueNow: boolean;
};

export type CreateDoubleCheckUseCaseOutput = {
    id: string;
    name: string;
    courses: CourseOutput[];
    checked: boolean;
    createdAt: string;
    structureId: string;
    emailTo: string[];
    repeatDays: (
        | 'monday'
        | 'tuesday'
        | 'wednesday'
        | 'thursday'
        | 'friday'
        | 'saturday'
        | 'sunday'
    )[];
    queueAt: string;
    queueNow: boolean;
};

export type CourseInput = {
    name?: string;
    id?: string;
    courseId: string;
    errors?: ErrorInput[];
    createdAt?: Date;
    editedAt?: Date;
};

export type CourseOutput = {
    createdAt: string;
    editedAt: string;
    id: string;
    name: string;
    errors: ErrorProps[];
    courseId: string;
    doubleCheckId: string;
    checked: boolean;
};

export type ErrorOutput = {
    id: string;
    name: string;
    type: 'error' | 'warning';
    severity: 'high' | 'low' | 'medium';
    itemId: string;
    itemName: string;
    itemType: string;
    errorId: string;
    message: string;
};

export type ErrorInput = {
    id?: string;
    name: string;
    type: 'error' | 'warning';
    severity: 'high' | 'low' | 'medium';
    itemId?: string;
    itemName: string;
    itemType: string;
    errorId: string;
    message: string;
};
