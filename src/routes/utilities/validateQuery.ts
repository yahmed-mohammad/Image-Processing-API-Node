import ImageQueryParams from '../models/ImageQueryParam';
import File from '../../file';

/**
 * Class to validate the Query Parameters of requests
 */
export default class ValidateQuery {
    /**
     *
     * @param {ImageQueryParams} query
     * @returns {string | null}
     * Validation of all request query parameters
     */
    static validate = async (
        query: ImageQueryParams
    ): Promise<string | null> => {
        if (this.isInValidData(query.filename)) {
            const filenames: string[] = await File.getFileNames();
            return `<p>Filename Query Parameter is not provided. Please use the filename ${filenames} in query parameter like below <ul>?filename=...&width=...&height=...</ul></p>`;
        }
        if (this.isInValidData(query.width) && this.isInValidData(query.width)) {
            return null;
        }
        const width: number = parseInt(query.width as string);
        if (Number.isNaN(width) || width < 1) {
            return "Please provide a positive numerical value for the 'width' query segment. Ex: ?filename=...&width=...&height=...";
        }

        // Check for valid height value
        const height: number = parseInt(query.height as string);
        if (Number.isNaN(height) || height < 1) {
            return "Please provide a positive numerical value for the 'height' query segment. Ex: ?filename=...&width=...&height=...";
        }
        return null;
    };

    /**
     *
     * @param {string} field
     * @returns boolean
     * Function to check if the field is provided in the query parameters
     */
    static isInValidData = (field: string | undefined): boolean => {
        if (field == undefined || field == '') {
            return true;
        }
        return false;
    };
}
