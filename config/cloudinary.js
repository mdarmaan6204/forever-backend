import {v2 as coudinary } from 'cloudinary';

const connectCloudinary = async () => {

    try{
        await coudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
    }
    catch(error){
        console.log(error);
    }
}

export default connectCloudinary;