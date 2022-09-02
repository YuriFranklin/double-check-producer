import { StructureGatewayTypeORM } from '../gateway/StructureGatewayTypeORM';
import { DataSource } from 'typeorm';
import { Structure as StructureSchema } from '../entity/Structure';
import { Template } from '../../../../domain/entity/Template';
import { Structure } from '../../../../domain/entity/Structure';
import crypto from 'crypto';
import 'dotenv/config';

describe('StructureTypeOrmRepository Tests', () => {
    let dataSource: DataSource;
    beforeAll(async () => {
        dataSource = new DataSource({
            type: 'mongodb',
            url: process.env.MONGODB_URL,
            database: process.env.MONGODB_DATABASE,
            ssl: true,
            synchronize: true,
            entities: [StructureSchema],
        });

        await dataSource.initialize();
    });
    it('Should insert and find a structure in database', async () => {
        const templateProps = {
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

        const template = new Template({ ...templateProps });

        const structureProps = {
            id: crypto.randomUUID(),
            name: 'TestStructure',
            templates: [template],
        };

        const structureRepository = dataSource.getRepository(StructureSchema);

        const repository = new StructureGatewayTypeORM(structureRepository);

        const structure = Structure.create(structureProps);

        expect(template.toJSON()).toStrictEqual({
            ...templateProps,
            beforeAlt: [],
            xor: [],
            children: [],
            nameAlt: expect.any(String),
            description: expect.any(String),
            descriptionAlt: expect.any(String),
            beforeId: expect.any(String),
            parentId: expect.any(String),
        });

        expect(structure.props).toEqual({
            name: structureProps.name,
            templates: [template],
            id: expect.any(String),
        });

        await repository.insert(structure);

        const findedStructure = await repository.find(structureProps.id);

        const expectedTemplates = structureProps.templates.map((template) =>
            template.toJSON(),
        );

        expect(findedStructure.toJSON()).toStrictEqual({
            id: structureProps.id,
            name: structureProps.name,
            templates: expectedTemplates,
        });
    });

    it('Should find all structure in repository', async () => {
        const templateProps = {
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

        const template = new Template({ ...templateProps });

        const structureProps = {
            name: 'TestStructure',
            templates: [template],
        };

        const structureRepository = dataSource.getRepository(StructureSchema);

        const repository = new StructureGatewayTypeORM(structureRepository);

        const structure = Structure.create(structureProps);

        await repository.insert(structure);

        const structures = await repository.listAll();

        expect(structures.length).toBeGreaterThan(0);
    });
    afterAll(async () => {
        await dataSource.destroy();
    });
});
