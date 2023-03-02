import { Structure } from '../../domain/entity/Structure';
import { StructureGatewayInterface } from '../../domain/gateway/StructureGatewayInterface';

export class CreateStructureUseCase {
    constructor(private repository: StructureGatewayInterface) {}

    async execute(
        input: CreateStructureUseCaseInput,
    ): Promise<CreateStructureUseCaseOutput> {
        const structure = Structure.create(input);
        await this.repository.insert(structure);
        return structure.toJSON();
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
