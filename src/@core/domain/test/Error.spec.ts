import { Error, ErrorProps } from '../entity/Error';

describe('Error Tests', () => {
    it('Should create a new Error', () => {
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

        expect(error.toJSON()).toStrictEqual({
            ...props,
        });
    });
});
