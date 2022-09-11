import { ErrorProps, Error } from '../../../../domain/entity/Error';
import { Course, CourseProps } from '../../../../domain/entity/Course';
import {
    DoubleCheck,
    DoubleCheckProps,
} from '../../../../domain/entity/DoubleCheck';
import { DoubleCheckGatewayMemory } from '../gateway/DoubleCheckGatewayMemory';

describe('DoubleCheckGatewayMemory Tests', () => {
    it('Should create a new DoubleCheckGatewayMemory and insert a new DoubleCheck', async () => {
        const repository = new DoubleCheckGatewayMemory();

        const props: ErrorProps = {
            id: '123',
            name: 'TEST_ERROR',
            errorId: '1',
            itemName: 'Test Item',
            itemType: 'test',
            message: 'Error message',
            severity: 'low',
            type: 'warning',
            itemId: '_123123_',
        };

        const error = Error.create(props);

        const courseProps: CourseProps = {
            name: 'Test Course',
            courseId: '123',
            errors: [error],
        };

        const course = Course.create(courseProps);

        const doubleCheckProps: DoubleCheckProps = {
            courses: [course],
            checked: false,
            structureId: '123',
        };

        const doubleCheck = DoubleCheck.create(doubleCheckProps);

        repository.insert(doubleCheck);

        expect(await repository.findAll()).toHaveLength(1);
    });
});
