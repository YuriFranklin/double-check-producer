import { Course, CreateCourseParams } from '../entity/Course';
import { CreateErrorParams } from '../entity/Error';
import crypto from 'crypto';

describe('Course Tests', () => {
    it('Should create a new Course', () => {
        const courseId = '123';

        const errorProps: CreateErrorParams = {
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

        const id = crypto.randomUUID();

        const courseProps: CreateCourseParams = {
            courseId,
            id,
            name: 'Test Course',
            errors: [{ ...errorProps, courseId }],
        };

        const course = Course.create(courseProps).toJSON();

        expect(course).toStrictEqual({
            ...courseProps,
            id,
            checked: expect.any(Boolean),
            doubleCheckId: expect.any(String),
            createdAt: expect.any(String),
            editedAt: expect.any(String),
            errors: expect.any(Array),
        });

        expect(course.errors).toStrictEqual([
            {
                ...errorProps,
                courseId,
            },
        ]);
    });
});
