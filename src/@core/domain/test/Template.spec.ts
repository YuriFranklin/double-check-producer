import { Template, TemplateProps } from '../entity/Template';

describe('Template Tests', () => {
    it('Should create a new template', () => {
        let templateProps: TemplateProps = {
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

        let template = new Template(templateProps);

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

        templateProps = {
            ...templateProps,
            children: [new Template({ ...templateProps })],
        };

        template = new Template({ ...templateProps });

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
        });
    });
});
