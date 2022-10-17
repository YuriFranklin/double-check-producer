import { DataSource } from 'typeorm';
import { DoubleCheck as DoubleCheckSchema } from '../entity/DoubleCheck';
import { Course as CourseSchema } from '../entity/Course';
import { Error as ErrorSchema } from '../entity/Error';
import { ErrorProps, Error } from '../../../../domain/entity/Error';
import { CourseProps, Course } from '../../../../domain/entity/Course';
import {
    DoubleCheckProps,
    DoubleCheck,
} from '../../../../domain/entity/DoubleCheck';
import { DoubleCheckGatewayTypeORM } from '../gateway/DoubleCheckGatewayTypeORM';
import 'dotenv/config';

describe('DoubleCheckTypeOrmRepository Tests', () => {
    let dataSource: DataSource;
    let gateway: DoubleCheckGatewayTypeORM;
    beforeAll(async () => {
        dataSource = new DataSource({
            type: 'postgres',
            host: process.env.PG_HOSTNAME,
            username: process.env.PG_USER_NAME,
            password: process.env.PG_PASSWORD,
            port: Number(process.env.PG_PORT),
            database: 'double_check',
            synchronize: true,
            logging: false,
            entities: [DoubleCheckSchema, CourseSchema, ErrorSchema],
        });

        await dataSource.initialize();

        gateway = new DoubleCheckGatewayTypeORM(dataSource);
    });
    it('Should insert and find a doublecheck in database', async () => {
        const props: ErrorProps = {
            name: 'TEST_ERROR',
            errorId: '1',
            itemName: 'Test Item',
            itemType: 'test',
            message: 'Error message',
            severity: 'low',
            type: 'warning',
            itemId: '_123123_',
        };

        const error = Error.create(props);

        const courseProps: CourseProps = {
            name: 'Test Course',
            courseId: '123',
            errors: [error],
        };

        const course = Course.create(courseProps);

        const doubleCheckProps: DoubleCheckProps = {
            name: 'Test 5',
            structureId: '1',
            courses: [course],
            checked: false,
        };

        const doubleCheck = DoubleCheck.create(doubleCheckProps);

        await gateway.insert(doubleCheck);

        const doubleCheckFinded = await gateway.find(doubleCheck.toJSON().id);

        expect(doubleCheckFinded.toJSON()).toEqual({
            ...doubleCheckProps,
            createdAt: expect.any(String),
            courses: doubleCheckProps.courses.map((course) => {
                return {
                    ...course.toJSON(),
                    createdAt: expect.any(String),
                    editedAt: expect.any(String),
                };
            }),
            id: expect.any(String),
        });
    });

    it('Should find all doublechecks in repository', async () => {
        const doubleChecks = await gateway.findAll({
            limit: 5,
            start: 1,
        });

        console.log(doubleChecks);
        expect(doubleChecks[0]).toBeInstanceOf(DoubleCheck);
    });

    it('Should find all courses', async () => {
        const test = await dataSource
            .getRepository(CourseSchema)
            .find({ relations: ['doubleCheck'] });
    });

    afterAll(async () => {
        await dataSource.destroy();
    });
});
