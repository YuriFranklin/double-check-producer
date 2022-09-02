import { Structure, StructureProps } from '../../../../domain/entity/Structure';
import { Template, TemplateProps } from '../../../../domain/entity/Template';
import { StructureGatewayMemory } from '../gateway/StructureGatewayMemory';

describe('StructureGatewayMemory Tests', () => {
    it('Should create a new StructureGatewayMemory and insert a new Structure', async () => {
        const templateProps: TemplateProps = {
            name: 'TestStructure',
            description: 'This is a test template',
            id: '1234',
            disponibility: true,
            isOptional: false,
            warnIfNotFound: false,
            beforeId: '1233',
            hasNameOfCourseInContent: false,
            type: 'document',
            hasChildren: false,
        };

        const template = new Template({ ...templateProps });

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

        const structureProps: StructureProps = {
            name: 'TestStructure',
            templates: [template],
        };

        const structure = Structure.create(structureProps);

        expect(structure.props).toEqual({
            name: structureProps.name,
            templates: [template],
            id: expect.any(String),
        });

        const repository = new StructureGatewayMemory();

        repository.insert(structure);

        expect(await repository.findAll()).toHaveLength(1);
    });
});
