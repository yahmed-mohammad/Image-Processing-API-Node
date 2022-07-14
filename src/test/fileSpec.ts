import File from '../file';

describe('Test Files related logic:', () => {
    describe('New files created test', () => {
        it('The image is resized as all the query param is valid', async () => {
            const query = {
                filename: 'tree',
                width: '200',
                height: '200'
            };
            const response = await File.createNewResizedImage(query);
            expect(response).toEqual(
                'Image is Resized to desired width and height.'
            );
        });
        it('There should be an error message as filename is invalid', async () => {
            const query = {
                filename: 'tree-not',
                width: '200',
                height: '200'
            };
            const response = await File.createNewResizedImage(query);
            expect(response).toEqual(
                'There was some error while resizing the image.'
            );
        });
        it('There should be an error message as width is invalid', async () => {
            const query = {
                filename: 'tree',
                width: '-200',
                height: '200'
            };
            const response = await File.createNewResizedImage(query);
            expect(response).toEqual(
                'There was some error while resizing the image.'
            );
        });
    });
    describe('Check for files', () => {
        it('Filename should be returned', async () => {
            const response = await File.getFileNames();
            expect(response.length).toBeTruthy();
        });
    });
});
