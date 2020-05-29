const Router = require('koa-router');

const router = new Router();
const BASE_URL = `/api/v1/tone_analyzer`;

const { analyze_tone } = require('../utils/tone_analyzer');
const { getAll, create } = require('../models/cosmos_db/items');

router.get(`${BASE_URL}/get_all`, async (ctx) => {
    const myResponse = await getAll();
    ctx.body = {
        status: 'success',
        data: {
            hala: myResponse
        }
    };
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

router.post(`${BASE_URL}/create`, async (ctx) => {
    const modelBody = ctx.request.body;
    try {
        const myResponse = await create(modelBody);
        console.log('here: ', myResponse);
        ctx.body = {
            status: 'success',
            data: {
                ggmu: 'done'
            }
        };
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;