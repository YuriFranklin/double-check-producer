import { Course, CreateCourseParams } from '../entity/Course';
import { CreateDoubleCheckParams, DoubleCheck } from '../entity/DoubleCheck';
import { Error, CreateErrorParams } from '../entity/Error';
import crypto from 'crypto';

describe('DoubleCheck Tests', () => {
    it('Should create a new DoubleCheck', () => {
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
            courseId,
        };

        const error = Error.create(errorProps);

        const id = crypto.randomUUID();

        const courseProps: CreateCourseParams = {
            name: 'Test Course',
            errors: [error.toJSON()],
            courseId,
            id,
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

        const doubleCheckProps: CreateDoubleCheckParams = {
            name: 'Test doublecheck',
            courses: [
                {
                    ...course,
                    courseId,
                    createdAt: new Date(course.createdAt),
                    editedAt: new Date(course.editedAt),
                },
            ],
            checked: false,
            structureId: '123',
            queueNow: true,
            queueAt: '08:00:00',
        };

        const doubleCheck = DoubleCheck.create(doubleCheckProps);

        expect(doubleCheck.toJSON()).toEqual({
            ...doubleCheckProps,
            courses: [
                {
                    ...courseProps,
                    id,
                    checked: expect.any(Boolean),
                    doubleCheckId: expect.any(String),
                    createdAt: expect.any(String),
                    editedAt: expect.any(String),
                    errors: expect.any(Array),
                },
            ],
            id: expect.any(String),
            repeatDays: expect.any(Array),
            emailTo: expect.any(Array),
            createdAt: expect.any(String),
        });
    });
});
