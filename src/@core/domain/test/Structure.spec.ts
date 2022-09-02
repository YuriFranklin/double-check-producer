import { Structure, StructureProps } from '../entity/Structure';
import { Template, TemplateProps } from '../entity/Template';

describe('Structure Tests', () => {
    it('Should create a new structure', () => {
        let structureProps: StructureProps = {
            name: 'TestStructure',
        };

        let structure = Structure.create(structureProps);

        expect(structure.props).toEqual({
            name: structureProps.name,
            templates: expect.any(Array),
            id: expect.any(String),
        });

        const templateProps: TemplateProps = {
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

        const template = new Template(templateProps);

        structureProps = {
            name: 'TestStructure',
            templates: [template],
        };

        structure = Structure.create(structureProps);

        expect(structure.props).toEqual({
            name: structureProps.name,
            templates: [template],
            id: expect.any(String),
        });
    });
});
