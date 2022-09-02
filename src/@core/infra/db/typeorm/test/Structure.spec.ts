import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Structure } from '../entity/Structure';
import crypto from 'crypto';
import 'dotenv/config';

describe('Structure Tests', () => {
    it('Should create a new Structure TypeOrm Entity', async () => {
        const dataSource = new DataSource({
            type: 'mongodb',
            url: process.env.MONGODB_URL,
            database: process.env.MONGODB_DATABASE,
            ssl: true,
            synchronize: true,
            entities: [Structure],
        });

        await dataSource.initialize();

        const structureRepository = dataSource.getRepository(Structure);

        const props = {
            id: crypto.randomUUID(),
            name: 'Test StructureSchema',
            templates: [
                {
                    name: 'test',
                },
            ],
        };

        const structure = structureRepository.create(props);

        await dataSource.destroy();

        expect(structure).toEqual(
            expect.objectContaining({
                id: props.id,
                name: props.name,
                templates: props.templates,
            }),
        );
    });
});
