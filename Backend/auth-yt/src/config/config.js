import dotenv from 'dotenv';

dotenv.config();

if(!process.env.MONGO_LINK){
    throw new error("Mongo uri not found in database")
}

if(!process.env.JWT_SECRET){
    throw new error("Json Secret not found in database")
}

const config = {
    MONGO_LINK : process.env.MONGO_LINK,
    JWT_SECRET : process.env.JWT_SECRET,
    
}

export default config;