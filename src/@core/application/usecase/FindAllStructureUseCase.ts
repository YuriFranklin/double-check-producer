import { StructureGatewayInterface } from '../../domain/gateway/StructureGatewayInterface';

export class FindAllStructureUseCase {
    constructor(private structureGateway: StructureGatewayInterface) {}

    async execute(): Promise<FindStructureUseCaseOutput[]> {
        const structures = await this.structureGateway.findAll();

        return structures.map((structure) => structure.toJSON());
    }
}

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
