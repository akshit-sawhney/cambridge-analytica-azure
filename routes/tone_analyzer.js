const Router = require('koa-router');

const router = new Router();
const BASE_URL = `/api/v1/tone_analyzer`;

const { analyze_tone } = require('../utils/tone_analyzer');

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
    try {
        const myResponse = await analyze_tone(text);
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