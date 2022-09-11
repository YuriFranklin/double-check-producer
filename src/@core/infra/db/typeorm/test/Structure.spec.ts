import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Structure } from '../entity/Structure';
import crypto from 'crypto';
import 'dotenv/config';
import { Template } from '../entity/Template';

describe('Structure Tests', () => {
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
            entities: [Structure, Template],
        });
        await dataSource.initialize();
    });
    it('Should create a new Structure TypeOrm Entity', async () => {
        const structureRepository = dataSource.getRepository(Structure);

        const props = {
            id: crypto.randomUUID(),
            name: 'Test StructureSchema',
            templates: [],
        };

        const structure = await structureRepository.create(props);

        expect(structure).toEqual(
            expect.objectContaining({
                id: props.id,
                name: props.name,
                templates: props.templates,
            }),
        );
    });
    afterAll(async () => {
        await dataSource.destroy();
    });
});
