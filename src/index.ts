import mongoose from 'mongoose'
import config from './app/config';
import app from './app';


const port = config.port;

const main = () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/car-resurvation');

        app.listen(port, () => {
            console.log(`server is running at http://localhost:${port}`)
        })
    }
    catch (err) {
        console.log(err)
    }
};


main();