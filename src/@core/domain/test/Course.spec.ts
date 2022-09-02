import { Course, CourseProps } from '../entity/Course';
import { ErrorProps, Error } from '../entity/Error';

describe('Course Tests', () => {
    it('Should create a new Course', () => {
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

        expect(course.toJSON()).toStrictEqual({
            ...courseProps,
            doubleCheckId: expect.any(String),
            createdAt: expect.any(String),
            editedAt: expect.any(String),
            errors: courseProps.errors.map((error) => error.toJSON()),
        });
    });
});
