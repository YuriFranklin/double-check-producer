import { TemplateGatewayInterface } from '../../domain/gateway/TemplateGatewayInterface';

export class FindTemplateUseCase {
    constructor(private repository: TemplateGatewayInterface) {}

    public async execute(input: Input): Promise<Output> {
        const template = await this.repository.find(input);

        return template.toJSON();
    }
}

export type Input = string;

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
