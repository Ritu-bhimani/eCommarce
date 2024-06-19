// import {v2 as cloudinary} from 'cloudinary';

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: "dcepk1n9g",
    api_key: "979466795164966",
    api_secret: "--ZN0d9Af1KXZ3Q38mldmIRUfMg" // Click 'View Credentials' below to copy your API secret
});

const uploadfile = async (filepath, folderName) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(filepath, {
            folder: folderName
        }).catch((error) => { console.log(error) });

        return uploadResult;
        // console.log(uploadResult);

    } catch (error) {
        console.log(error)
    }
}


module.exports = uploadfile