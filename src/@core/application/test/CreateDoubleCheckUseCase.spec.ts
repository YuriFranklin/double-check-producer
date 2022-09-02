import { StructureGatewayMemory } from '../../infra/db/memory/gateway/StructureGatewayMemory';
import { CreateStructureUseCase } from '../usecase/CreateStructureUseCase';
import { FindStructuresUseCase } from '../usecase/FindStructureUseCase';

describe('CreateDoubleCheckUseCase Tests', () => {
    it('Should create and store a double check', async () => {
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
