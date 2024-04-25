const config = {
    //mode can be online or mock
    MODE: 'online',
    ENDPOINT_DESCRIBEAPI: 'http://localhost:3001/v1/describe',
    ENDPOINT_GENERATEAPI: 'http://localhost:3001/v1/generate',
    APP_DESCRIPTION: 'Upload an image to use GPT4-turbo to describe the image then feed the description to DALL-E to generate a similar image.'
};

export default config;