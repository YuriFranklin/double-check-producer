import { Template } from '../../domain/entity/Template';
import NotFoundException from '../../domain/exception/NotFoundException';
import { TemplateGatewayInterface } from '../../domain/gateway/TemplateGatewayInterface';

export class FindTemplateUseCase {
    constructor(private repository: TemplateGatewayInterface) {}

    public async execute(id: string, input: Partial<Input>): Promise<Output> {
        const founded = await (await this.repository.find(id)).toJSON();

        if (!founded) throw new NotFoundException('Template has not founded');

        const template = Template.create({ ...founded, input, children: [] });

        await this.repository.update(id, template);

        const returnObj = {
            ...template.toJSON(),
            templates: founded.templates,
        };

        return returnObj;
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
