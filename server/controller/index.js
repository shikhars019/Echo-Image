module.exports = {
    /**
     * 
     * @param {*} OpenAIClient 
     * @param {*} req 
     * @returns 
     */
    async describeImage(OpenAIClient, req) {
        if (!OpenAIClient || !req || !req.image) throw new Error(JSON.stringify({ Code: '1000', Message: 'Client or Config or parameters are missing.' }));
        const response = await OpenAIClient.chat.completions.create({
            model: process.env.TEXT_MODEL,
            messages: [
                {
                    role: "user",
                    n: 1,
                    content: [
                        {
                            type: "text",
                            text: "What’s in this image?"
                        },
                        {
                            type: "image_url",
                            image_url: {
                                "url": req.image,
                                "detail": "low"
                            },
                        },
                    ],
                },
            ],
        }).catch(async (err) => {
            console.log(err)
            throw new Error(JSON.stringify({ Code: '1001', Message: 'Unexpected Technical Exception' }));
        });
        return { description: response.choices[0] };
    },

    /**
     * 
     * @param {*} OpenAIClient 
     * @param {*} req 
     * @returns 
     */
    async generateImage(OpenAIClient, req) {
        if (!OpenAIClient || !req) throw new Error(JSON.stringify({ Code: '1000', Message: 'Client or Config or parameters are missing.' }));
        const response = await OpenAIClient.images.generate({
            model: process.env.IMAGE_MODEL,
            prompt: req.description,
            size: "1024x1024",
            quality: "standard",
            response_format: "b64_json",
            n: 1,
        }).catch(async (err) => {
            console.log(err)
            throw new Error(JSON.stringify({ Code: '1001', Message: 'Unexpected Technical Exception' }));
        });
        return { image: response };
    },
};
