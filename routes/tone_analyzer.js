const Router = require('koa-router');
const _ = require('lodash');

const router = new Router();
const BASE_URL = `/api/v1/tone_analyzer`;

const toneAnalyzerConfigs = require('../constants/tone_analyzer')
const { analyze_tone } = require('../utils/tone_analyzer');
const { getAll, create, getByTeacherId, update } = require('../models/cosmos_db/items');
const { getByTeacherIdAndCategory } = require('../controllers/text_analyzer');

router.post(BASE_URL, async (ctx) => {
    const text = ctx.request.body.text;
    try {
        const myResponse = await analyze_tone(text);
        if (myResponse.result && myResponse.result.document_tone && myResponse.result.document_tone.tones && myResponse.result.document_tone.tones.length) {
            const allTones = myResponse.result.document_tone.tones;
            getByTeacherId("2", toneAnalyzerConfigs.emotionCategory)
                .then(res => {
                    if (res && res.resources && res.resources.length) {
                        const createdItem = res.resources[0]
                        const { id, category } = createdItem;
                        _.forEach(allTones, tone => {
                            const findValue = _.findIndex(toneAnalyzerConfigs.emotionalTones, function(o) { return o == tone.tone_id });
                            if (findValue !== -1 && tone.score > 0.5) {
                                createdItem[tone.tone_id] = createdItem[tone.tone_id] + 1;
                            }
                        });
                        console.log('now here: ', createdItem);
                        update(id, category, createdItem)
                        .then(res => {
                            console.log('created: ');
                        })
                        .catch(err => {
                            console.log('error: ', err);
                        })
                    }
                })
                .catch(err => {
                    console.log('fucked up: ', err);
                });
        }
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

router.get(`${BASE_URL}/get_all`, async (ctx) => {
    const myResponse = await getAll();
    let returnResponse = [];
    if (myResponse && myResponse.resources) {
        returnResponse = myResponse.resources;
    }
    ctx.body = {
        status: 'success',
        data: returnResponse
    };
});

router.get(`${BASE_URL}/get`, async (ctx) => {
    const teacherId = ctx.request.query.teacher_id;
    const response = await getByTeacherIdAndCategory(teacherId, toneAnalyzerConfigs.emotionCategory);
    ctx.body = {
        status: 'success',
        data: response
    };
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