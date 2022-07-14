import { promises as fs } from 'fs';
import path from 'path';
import ImageQueryParams from './routes/models/ImageQueryParam';
import processImageUsingSharp from './resizeImage';

export default class File {
    static actualImagePath = path.resolve(__dirname, '../images/actual');
    static modifiedImagePath = path.resolve(__dirname, '../images/modified');

    static getFileNames = async (): Promise<string[]> => {
        let filenames: string[];
        try {
            filenames = (await fs.readdir(File.actualImagePath)).map(
                (filename: string): string => filename.split('.')[0]
            );
        } catch {
            filenames = [];
        }
        return filenames;
    };

    static getImagePath = async (query: ImageQueryParams) => {
        const filename: string = query.filename as string;
        let filePath = '';
        filePath = path.resolve(
            File.modifiedImagePath,
            `${query.filename}-${query.width}x${query.height}.jpg`
        );
        try {
            await fs.access(filePath);
            return filePath;
        } catch {
            filePath = path.resolve(File.actualImagePath, `${filename}.jpg`);
            return filePath;
        }
    };

    static isResizedImageAvailable = async (query: ImageQueryParams) => {
        const filePath = path.resolve(
            File.modifiedImagePath,
            `${query.filename}-${query.width}x${query.height}.jpg`
        );
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    };

    static createNewResizedImage = async (query: ImageQueryParams) => {
        const filePathActual: string = path.resolve(
            File.actualImagePath,
            `${query.filename}.jpg`
        );
        const filePathModified = path.resolve(
            File.modifiedImagePath,
            `${query.filename}-${query.width}x${query.height}.jpg`
        );
        const requiredValues = {
            source: filePathActual,
            target: filePathModified,
            width: parseInt(query.width as string),
            height: parseInt(query.height as string)
        };
        return await processImageUsingSharp(requiredValues);
    };

    static getActualImagePath = async (query: ImageQueryParams) => {
        const filename: string = query.filename as string;
        const filePath = path.resolve(File.actualImagePath, `${filename}.jpg`);
        try {
            await fs.access(filePath);
            return filePath;
        } catch {
            return null;
        }
    };
}
