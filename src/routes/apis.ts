import express from 'express';
import ValidateQuery from './utilities/validateQuery';
import File from '../file';
import HomePage from './utilities/homePage';

const routes = express.Router();

/**
 * Function to handle the Home Page Request
 */
routes.get(
    '/',
    async (
        request: express.Request,
        response: express.Response
    ): Promise<void> => {
        response.send(HomePage.homePageData);
    }
);

/**
 * Function to handle the GET /image API requests
 */
routes.get(
    '/image',
    async (
        request: express.Request,
        response: express.Response
    ): Promise<void> => {
        // check if all the query parameters have the valid values
        const validationMessage = await ValidateQuery.validate(request.query);
        if (validationMessage != null) {
            response.status(400).send(validationMessage);
            return;
        } else if (
            validationMessage == null &&
            request.query.width == undefined &&
            request.query.height == undefined
        ) {
            const path = await File.getActualImagePath(request.query);
            if (path != null) {
                response.sendFile(path);
            } else {
                response
                    .status(500)
                    .send('Error occured while processing the image');
            }
        }

        const filenames: string[] = await File.getFileNames();

        //check if the filename provided is present in the image folder and process
        if (filenames.includes(request.query.filename as string)) {
            //if present check if the resized image is available, and if not available create one
            if (!(await File.isResizedImageAvailable(request.query))) {
                await File.createNewResizedImage(request.query);
            }
            const path: string = await File.getImagePath(request.query);
            if (path != null) {
                response.sendFile(path);
            } else {
                response
                    .status(500)
                    .send('Error occured while processing the image');
            }
        } else {
            //if file is not present in the folder, return the error message
            response
                .status(404)
                .send(
                    `<p>File Not Found. <br>Please use the available filename <b> ${filenames}</b> in query parameter like below <ul>?filename=...&width=...&height=...</ul></p>`
                );
        }
    }
);

export default routes;
