import { DataSource } from 'typeorm';
import { Template } from '../entity/Template';
import crypto from 'crypto';
import 'dotenv/config';
describe('Template Tests', () => {
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
            entities: [Template],
        });
        await dataSource.initialize();
    });
    it('Should create a new Template', async () => {
        const props: Template = {
            name: 'TestStructure',
            description: 'This is a test template',
            id: crypto.randomUUID(),
            disponibility: true,
            isOptional: false,
            warnIfNotFound: false,
            beforeId: '1233',
            hasNameOfCourseInContent: false,
            type: 'document',
            hasChildren: false,
        };

        const repository = dataSource.getRepository(Template);

        const child = await repository.create(props);

        const template = await repository.create({
            ...props,
            children: [child],
            hasChildren: true,
        });

        expect(template).toEqual(
            expect.objectContaining({
                ...props,
                hasChildren: true,
                children: [child],
            }),
        );
    });
    afterAll(async () => {
        await dataSource.destroy();
    });
});
