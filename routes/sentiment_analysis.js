const Router = require('koa-router');

const router = new Router();
const BASE_URL = `/api/v1/sentiment_analysis`;

const { sentimentAnalysis } = require('../utils/sentiment_analysis');

router.get(BASE_URL, async (ctx) => {
    try {
        ctx.body = {
            status: 'success',
            data: {
                hala: 'madrid'
            }
        };
    } catch (err) {
        console.log(err)
    }
});

router.post(BASE_URL, async (ctx) => {
    const text = ctx.request.body.text;
    console.log('here: ', ctx.request.body);
    try {
        const myResponse = await sentimentAnalysis(text);
        console.log('here: ', myResponse);
        ctx.body = {
            status: 'success',
            data: {
                ggmu: myResponse
            }
        };
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;