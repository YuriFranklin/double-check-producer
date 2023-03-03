import { TemplateGatewayInterface } from '../../domain/gateway/TemplateGatewayInterface';
import { Template } from '../../domain/entity/Template';

export class CreateTemplateUseCase {
    constructor(private repository: TemplateGatewayInterface) {}

    async execute(input: Input): Promise<Output> {
        const template = Template.create(input);

        await this.repository.insert(template);

        return template.toJSON();
    }
}

export type Input = {
    id?: string;
    name: string;
    nameAlt?: string;
    description?: string;
    descriptionAlt?: string;
    isOptional: boolean;
    warnIfNotFound: boolean;
    beforeId?: string;
    beforeAlt?: string[];
    xor?: string[];
    hasNameOfCourseInContent: boolean;
    disponibility: boolean;
    type: string;
    hasChildren: boolean;
    children?: Input[];
    parentId?: string;
};

export type Output = {
    id: string;
    name: string;
    nameAlt: string;
    description: string;
    descriptionAlt: string;
    isOptional: boolean;
    warnIfNotFound: boolean;
    beforeId: string;
    beforeAlt: string[];
    xor: string[];
    hasNameOfCourseInContent: boolean;
    disponibility: boolean;
    type: string;
    hasChildren: boolean;
    children: Output[];
    parentId: string;
};
