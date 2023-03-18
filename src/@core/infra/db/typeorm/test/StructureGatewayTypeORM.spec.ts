import { StructureGatewayTypeORM } from '../gateway/StructureGatewayTypeORM';
import { DataSource } from 'typeorm';
import { Structure as StructureSchema } from '../entity/Structure';
import { Template as TemplateSchema } from '../entity/Template';
import {
    CreateTemplateParams,
    Template,
} from '../../../../domain/entity/Template';
import { Structure } from '../../../../domain/entity/Structure';
import crypto from 'crypto';
import 'dotenv/config';

describe('StructureTypeOrmRepository Tests', () => {
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
            entities: [StructureSchema, TemplateSchema],
        });
        await dataSource.initialize();
    });
    it('Should insert and find a structure in database', async () => {
        const templateProps: CreateTemplateParams = {
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

        const structureProps = {
            id: crypto.randomUUID(),
            name: 'TestStructure',
            templates: [templateProps],
        };

        const repository = new StructureGatewayTypeORM(dataSource);

        const structure = Structure.create(structureProps);

        expect(structure.toJSON()).toEqual({
            name: structureProps.name,
            templates: [templateProps],
            id: expect.any(String),
        });

        await repository.insert(structure);

        const findedStructure = await repository.find(structureProps.id);

        console.log(findedStructure);
        /*         const expectedTemplates = structureProps.templates.map((template) =>
            template.toJSON(),
        );

        expect(findedStructure.toJSON()).toStrictEqual({
            id: structureProps.id,
            name: structureProps.name,
            templates: expectedTemplates,
        }); */
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

        const repository = new StructureGatewayTypeORM(dataSource);

        const structure = Structure.create(structureProps);

        await repository.insert(structure);

        const structures = await repository.listAll();

        expect(structures.length).toBeGreaterThan(0);
    });
    afterAll(async () => {
        await dataSource.destroy();
    });
});
