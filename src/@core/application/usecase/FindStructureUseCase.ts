import { StructureGatewayInterface } from '../../domain/gateway/StructureGatewayInterface';

export class FindStructuresUseCase {
    constructor(private structureGateway: StructureGatewayInterface) {}

    async execute(
        FindStructureUseCaseInput,
    ): Promise<FindStructureUseCaseOutput> {
        const structure = await this.structureGateway.find(
            FindStructureUseCaseInput,
        );
        return structure.toJSON();
    }
}

export type FindStructureUseCaseInput = {
    id: string;
};

export type FindStructureUseCaseOutput = {
    id: string;
    name: string;
    templates: Template[];
};

type Template = {
    id: string;
    name: string;
    nameAlt: string;
    description: string;
    descriptionAlt?: string;
    isOptional: boolean;
    warnIfNotFound: boolean;
    beforeId: string;
    beforeAlt: string[];
    xor: string[];
    hasNameOfCourseInContent: boolean;
    disponibility: boolean;
    type: string;
    hasChildren: boolean;
    children: Template[];
    parentId: string;
};
