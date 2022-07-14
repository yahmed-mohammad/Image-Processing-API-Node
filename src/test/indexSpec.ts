import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test the Image Processing APIs', () => {
    it('Getting status 200 of the application home page', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
    it('Getting the 400 error in GET /image if query paramter is not passed', async () => {
        const response = await request.get('/image');
        expect(response.status).toBe(400);
    });
    it('Getting the 200 success in GET /image if query filename is only passed', async () => {
        const response = await request.get('/image?filename=tree');
        expect(response.status).toBe(200);
    });
    it('Getting the 400 error in GET /image if query filename and width is only passed', async () => {
        const response = await request.get('/image?filename=tree&width=200');
        expect(response.status).toBe(400);
    });
    it('Getting the 200 success in GET /image if query parameter is passed correctly', async () => {
        const response = await request.get(
            '/image?filename=tree&width=200&height=200'
        );
        expect(response.status).toBe(200);
    });
    it('Getting the 404 error in GET /image if file is not present', async () => {
        const response = await request.get(
            '/image?filename=tree-no&width=200&height=200'
        );
        expect(response.status).toBe(404);
    });
});
