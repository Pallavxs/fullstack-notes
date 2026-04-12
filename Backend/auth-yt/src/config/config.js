import dotenv from 'dotenv';

dotenv.config();

if(!process.env.MONGO_LINK){
    throw new Error("Mongo uri not found in database")
}

if(!process.env.JWT_SECRET){
    throw new Error("Json Secret not found in database")
}

if(!process.env.GOOGLE_API_KEY){
    throw new Error("google gemnai key not found")
}

const config = {
    MONGO_LINK : process.env.MONGO_LINK,
    JWT_SECRET : process.env.JWT_SECRET,
    GOOGLE_API_KEY : process.env.GOOGLE_GEMNAI_KEY
    
}

export default config;