import { CreateTemplateParams, Template } from '../entity/Template';

describe('Template Tests', () => {
    it('Should create a new template', () => {
        const templateProps: CreateTemplateParams = {
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

        const template1 = Template.create(templateProps);

        expect(template1.toJSON()).toStrictEqual({
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

        const templateWithChildrenProps: CreateTemplateParams = {
            ...templateProps,
            children: [
                {
                    name: 'TestTemplate 2',
                    isOptional: false,
                    warnIfNotFound: true,
                    hasNameOfCourseInContent: false,
                    disponibility: true,
                    type: 'test',
                    hasChildren: true,
                    children: [
                        {
                            name: 'TestTemplate 3',
                            isOptional: false,
                            warnIfNotFound: true,
                            hasNameOfCourseInContent: false,
                            disponibility: true,
                            type: 'test',
                            hasChildren: false,
                            children: [],
                        },
                    ],
                },
            ],
        };

        const template2 = Template.create(templateWithChildrenProps);

        expect(template2.toJSON()).toStrictEqual({
            ...templateWithChildrenProps,
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
