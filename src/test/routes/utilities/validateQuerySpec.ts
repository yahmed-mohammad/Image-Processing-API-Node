import ValidateQuery from '../../../routes/utilities/validateQuery';

describe('Test the field Validations', () => {
    it('Should return true if the value is undefined', async () => {
        let field;
        const response = await ValidateQuery.isInValidData(field);
        expect(response).toBeTrue();
    });
    it('Should return true if the value is empty', async () => {
        const field = '';
        const response = await ValidateQuery.isInValidData(field);
        expect(response).toBeTrue();
    });
    it('Should return flase if the value is not empty', async () => {
        const field = 'filename';
        const response = await ValidateQuery.isInValidData(field);
        expect(response).toBeFalse();
    });
});

describe('Test the GET /images Query Parameter Validations', () => {
    it('Should return Null if the query param is valid', async () => {
        const query = {
            filename: 'tree',
            width: '200',
            height: '200'
        };
        const response = await ValidateQuery.validate(query);
        expect(response).toBeNull();
    });
    it('Should return a message if width is invalid', async () => {
        const query = {
            filename: 'tree',
            width: 'woo',
            height: '200'
        };
        const response = await ValidateQuery.validate(query);
        expect(response).toBeTruthy();
    });
    it('Should return a message if height is invalid', async () => {
        const query = {
            filename: 'tree',
            width: '200',
            height: 'woo'
        };
        const response = await ValidateQuery.validate(query);
        expect(response).toBeTruthy();
    });
    it('Should return a message if filename is invalid', async () => {
        const query = {
            filename: '',
            width: '200',
            height: '200'
        };
        const response = await ValidateQuery.validate(query);
        expect(response).toBeTruthy();
    });
});
