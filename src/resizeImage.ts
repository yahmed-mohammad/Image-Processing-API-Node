import sharp from 'sharp';
import ResizeImageParam from './routes/models/ResizeImageParam';

/**
 *
 * @param {ResizeImageParam}}
 * @returns string
 * Using sharp library to resize the image to provided dimenstions
 */
const processImageUsingSharp = async (params: ResizeImageParam) => {
    try {
        await sharp(params.source)
            .resize(params.width, params.height)
            .toFormat('jpeg')
            .toFile(params.target);
        return 'Image is Resized to desired width and height.';
    } catch {
        return 'There was some error while resizing the image.';
    }
};

export default processImageUsingSharp;
