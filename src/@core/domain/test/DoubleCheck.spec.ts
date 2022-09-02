import { CourseProps, Course } from '../entity/Course';
import { DoubleCheck, DoubleCheckProps } from '../entity/DoubleCheck';
import { ErrorProps, Error } from '../entity/Error';

describe('DoubleCheck Tests', () => {
    it('Should create a new DoubleCheck', () => {
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
            id: '123',
            errors: [error],
        };

        const course = Course.create(courseProps);

        const doubleCheckProps: DoubleCheckProps = {
            courses: [course],
            checked: false,
        };

        const doubleCheck = DoubleCheck.create(doubleCheckProps);

        expect(doubleCheck.toJSON()).toEqual({
            ...doubleCheckProps,
            courses: doubleCheckProps.courses.map((course) => course.toJSON()),
            id: expect.any(String),
        });
    });
});
