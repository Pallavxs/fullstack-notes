import dotenv from 'dotenv'

dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI not found")
}

if(!process.env.NODE_ENV){
    throw new Error("Node Environment not found")
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT token not found")
}

const config = {
    MONGO_URI : process.env.MONGO_URI,
    NODE_ENV : process.env.NODE_ENV,
    JWT_SECRET : process.env.JWT_SECRET
}

export default config
