const express = require('express');
const controller = require('../controller');
const router = express.Router();
const OpenAI = require('openai');

const OpenAIAPI = new OpenAI({
    api_key: process.env.OPENAI_API_KEY
});

router.post('/describe', async (req, res) => {
    try {
        console.log('Describing image using',  process.env.TEXT_MODEL);
        res.status(200).send(await controller.describeImage(
            OpenAIAPI, req.body,
        ));
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

router.post('/generate', async (req, res) => {
    try {
        console.log('Generating image using',  process.env.IMAGE_MODEL);
        res.status(200).send(await controller.generateImage(
            OpenAIAPI, req.body,
        ));
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

module.exports = router;

