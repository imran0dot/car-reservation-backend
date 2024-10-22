import dotenv from 'dotenv';
import path from 'path'

const configPath = {
    path: path.join((process.cwd(), '.env'))
}
dotenv.config(configPath);

export default {
    port: process.env.PORT,
    database_url: process.env.DB_URL,
    img_api: process.env.IMG_API,
    img_secret: process.env.IMG_SECRET,
    salt_round: process.env.SALT_R,
    jwt_secret: process.env.JWT_SECRET
} 