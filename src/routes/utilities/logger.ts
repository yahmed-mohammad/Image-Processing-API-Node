import express from 'express';

const logger = (
    req: express.Request, 
    res: express.Response, 
    next: () => void
): void => {
    const url=req.url;
    console.log(`${url} was visited at ${new Date()}`);
    next();
};

export default logger;