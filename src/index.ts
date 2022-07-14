import express from 'express';
import routes from './routes/apis';

const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`Server is Started on port ${port}`);
});

app.use(routes);

export default app;
