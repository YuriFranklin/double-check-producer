import { Structure } from '../../domain/entity/Structure';
import { Template } from '../../domain/entity/Template';
import { StructureGatewayInterface } from '../../domain/gateway/StructureGatewayInterface';

export class CreateStructureUseCase {
    constructor(private repository: StructureGatewayInterface) {}

    async execute(
        input: CreateStructureUseCaseInput,
    ): Promise<CreateStructureUseCaseOutput> {
        const templates = input.templates?.length
            ? input.templates.map((template) =>
                  this.createTemplateRecurrence(template),
              )
            : [];
        const structure = Structure.create({ ...input, templates });
        await this.repository.insert(structure);
        return structure.toJSON();
    }

    private createTemplateRecurrence(
        input: TemplateDTO,
        parentId?: string,
    ): Template {
        const { children, ...rest } = input;
        const template = Template.create({ ...rest, parentId });

        children &&
            template.setChildren(
                children.map((child) =>
                    this.createTemplateRecurrence(child, template.toJSON().id),
                ),
            );
        return template;
    }
}

export type CreateStructureUseCaseInput = {
    name: string;
    id?: string;
    templates?: TemplateDTO[];
    createdAt?: Date;
};

export type CreateStructureUseCaseOutput = {
    id: string;
    name: string;
    templates: TemplateDTO[];
    createdAt: string;
};

type TemplateDTO = {
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
