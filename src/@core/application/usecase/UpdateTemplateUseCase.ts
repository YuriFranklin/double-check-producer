import { Template } from '../../domain/entity/Template';
import NotFoundException from '../../domain/exception/NotFoundException';
import { TemplateGatewayInterface } from '../../domain/gateway/TemplateGatewayInterface';

export class UpdateTemplateUseCase {
    constructor(private repository: TemplateGatewayInterface) {}

    public async execute(templateId: string, input: Input): Promise<Output> {
        const founded = await this.repository.find(templateId);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore // This forces omit ID param
        const { id, ...values } = input;

        if (!founded) throw new NotFoundException('Template has not founded');

        const template = Template.create({
            ...founded.toJSON(),
            ...values,
        });

        console.log(template);

        await this.repository.update(id, template);

        const returnObj = {
            ...template.toJSON(),
            templates: founded.toJSON().templates,
        };

        return returnObj;
    }
}

export type Input = Omit<Partial<TemplateDTO>, 'children' | 'id'>;

export type Output = Required<TemplateDTO>;

export type TemplateDTO = {
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
    children?: TemplateDTO[];
    parentId?: string;
};
