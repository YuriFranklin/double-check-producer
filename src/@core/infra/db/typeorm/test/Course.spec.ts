import { DataSource } from 'typeorm';
import { Error as ErrorSchema } from '../entity/Error';
import { Course as CourseSchema } from '../entity/Course';
import { DoubleCheck as DoubleCheckSchema } from '../entity/DoubleCheck';
import crypto from 'crypto';
import 'dotenv/config';

describe('Course Tests', () => {
    let dataSource: DataSource;
    beforeAll(async () => {
        dataSource = new DataSource({
            type: 'postgres',
            host: process.env.PG_HOSTNAME,
            username: process.env.PG_USER_NAME,
            password: process.env.PG_PASSWORD,
            port: Number(process.env.PG_PORT),
            database: 'double_check',
            synchronize: true,
            logging: true,
            entities: [ErrorSchema, CourseSchema, DoubleCheckSchema],
        });
        await dataSource.initialize();
    });
    it('Should create an course', () => {
        const errorProps: ErrorSchema = {
            id: '123',
            name: 'TEST_ERROR',
            errorId: '1',
            itemName: 'Test Item',
            itemType: 'test',
            message: 'Error message',
            severity: 'low',
            type: 'warning',
            itemId: '_123123_',
        };

        const error = dataSource.getRepository(ErrorSchema).create(errorProps);

        const courseProps: CourseSchema = {
            id: crypto.randomUUID(),
            courseId: '123',
            checked: false,
            createdAt: new Date(),
            name: 'Test Course',
            errors: [error],
        };

        const course = dataSource
            .getRepository(CourseSchema)
            .create(courseProps);

        expect(course).toBeInstanceOf(CourseSchema);
    });

    afterAll(async () => {
        await dataSource.destroy();
    });
});
