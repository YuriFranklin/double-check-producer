import { StructureGatewayMemory } from '../../infra/db/memory/gateway/StructureGatewayMemory';
import { CreateStructureUseCase } from '../usecase/CreateStructureUseCase';
import { FindStructuresUseCase } from '../usecase/FindStructureUseCase';

describe('FindStructuresUseCase Tests', () => {
    it('Should return a list of structures', async () => {
        const structureProps = {
            name: 'TestStructure',
        };

        const repository = new StructureGatewayMemory();

        const createStructureUseCase = new CreateStructureUseCase(repository);

        const structure = await createStructureUseCase.execute(structureProps);

        const findStructuresUseCase = new FindStructuresUseCase(repository);

        const findedStructure = await findStructuresUseCase.execute(
            structure.id,
        );

        expect(findedStructure).toEqual({
            ...structureProps,
            id: structure.id,
            templates: expect.any(Array),
        });
    });
});
