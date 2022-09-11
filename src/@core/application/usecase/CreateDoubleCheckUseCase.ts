import { DoubleCheck } from '../../domain/entity/DoubleCheck';
import { Course } from '../../domain/entity/Course';
import { Error } from '../../domain/entity/Error';
import { DoubleCheckGatewayInterface } from '../../domain/gateway/DoubleCheckGatewayInterface';

export class CreateDoubleCheckUseCase {
    constructor(private repository: DoubleCheckGatewayInterface) {}

    async execute(
        input: CreateDoubleCheckUseCaseInput,
    ): Promise<CreateDoubleCheckUseCaseOutput> {
        const courses = input.courses?.map((course) => {
            const errors = course.errors?.map((error) => Error.create(error));
            return Course.create({ ...course, errors });
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
};

export type CreateDoubleCheckUseCaseOutput = {
    id: string;
    courses: CourseOutput[];
    checked: boolean;
    structureId: string;
};

export type CourseInput = {
    name?: string;
    id?: string;
    courseId: string;
    errors: ErrorInput[];
    createdAt?: Date;
    editedAt?: Date;
};

export type CourseOutput = {
    name?: string;
    id: string;
    errors: ErrorInput[];
    createdAt: string;
    editedAt: string;
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
