import { CreateTemplateParams, Template } from '../entity/Template';

describe('Template Tests', () => {
    it('Should create a new template', () => {
        let templateProps: CreateTemplateParams = {
            name: 'TestTemplate',
            description: 'This is a test template',
            disponibility: true,
            isOptional: true,
            warnIfNotFound: false,
            beforeId: '1233',
            hasNameOfCourseInContent: false,
            type: 'document',
            hasChildren: false,
        };

        let template = Template.create(templateProps);

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
            id: expect.any(String),
        });

        templateProps = {
            ...templateProps,
            children: [templateProps],
        };

        template = Template.create({ ...templateProps });

        expect(template.toJSON()).toStrictEqual({
            ...templateProps,
            beforeAlt: [],
            xor: [],
            nameAlt: expect.any(String),
            description: expect.any(String),
            descriptionAlt: expect.any(String),
            beforeId: expect.any(String),
            parentId: expect.any(String),
            children: expect.any(Array),
            id: expect.any(String),
        });
    });
});
