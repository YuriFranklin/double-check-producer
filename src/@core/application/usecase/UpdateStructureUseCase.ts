import { Structure } from '../../domain/entity/Structure';
import { StructureGatewayInterface } from '../../domain/gateway/StructureGatewayInterface';

export class UpdateStructureUseCase {
    constructor(private repository: StructureGatewayInterface) {}

    async execute(id: string, input: Partial<Input>): Promise<Output> {
        const founded = await (await this.repository.find(id)).toJSON();

        if (!founded) throw 'Structure not founded';

        const structure = Structure.create({
            ...founded,
            ...input,
            createdAt: new Date(founded.createdAt),
            templates: [],
        });

        await this.repository.update(id, structure);

        const returnObj = {
            ...structure.toJSON(),
            templates: founded.templates,
        };

        return returnObj;
    }
}

export type Input = {
    name: string;
};

export type Output = {
    id: string;
    name: string;
    templates: TemplateDTO[];
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
