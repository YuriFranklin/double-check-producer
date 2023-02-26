import { Structure, CreateStructureParams } from '../entity/Structure';
import { CreateTemplateParams } from '../entity/Template';

describe('Structure Tests', () => {
    it('Should create a new structure', () => {
        let structureProps: CreateStructureParams = {
            name: 'TestStructure',
        };

        let structure = Structure.create(structureProps);

        expect(structure.toJSON()).toMatchObject({
            name: structureProps.name,
            templates: expect.any(Array),
            id: expect.any(String),
            createdAt: expect.any(String),
        });

        const templateProps: CreateTemplateParams = {
            name: 'TestStructure',
            description: 'This is a test template',
            id: '1234',
            disponibility: true,
            isOptional: true,
            warnIfNotFound: false,
            beforeId: '1233',
            hasNameOfCourseInContent: false,
            type: 'document',
            hasChildren: false,
        };

        structureProps = {
            name: 'TestStructure',
            templates: [templateProps],
        };

        structure = Structure.create(structureProps);

        expect(structure.toJSON()).toMatchObject({
            name: structureProps.name,
            templates: [templateProps],
            id: expect.any(String),
            createdAt: expect.any(String),
        });
    });
});
