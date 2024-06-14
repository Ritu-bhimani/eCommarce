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


(async function () {

    // Configuration


    // Upload an image
    const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
        public_id: "shoes"
    }).catch((error) => { console.log(error) });

    console.log(uploadResult);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url("shoes", {
        fetch_format: 'auto',
        quality: 'auto'
    });

    console.log(optimizeUrl);

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url("shoes", {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });

    console.log(autoCropUrl);
})();

module.exports = uploadfile