import { DataSource } from 'typeorm';
import { Error as ErrorSchema } from '../entity/Error';
import { Course as CourseSchema } from '../entity/Course';
import { DoubleCheck as DoubleCheckSchema } from '../entity/DoubleCheck';
import 'dotenv/config';

describe('Error Tests', () => {
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
    it('should create an error', () => {
        const props: ErrorSchema = {
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
        const repository = dataSource.getRepository(ErrorSchema);
        const error = repository.create(props);
        expect(error).toBeInstanceOf(ErrorSchema);
    });

    afterAll(async () => {
        await dataSource.destroy();
    });
});
