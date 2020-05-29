const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
require('dotenv').config();

const toneAnalyzer = new ToneAnalyzerV3({
    version: process.env.TONE_ANALYZER_VERSION,
    authenticator: new IamAuthenticator({
        apikey: process.env.TONE_ANALYZER_API_KEY,
    }),
    url: process.env.TONE_ANALYZER_URL,
});

async function analyze_tone(myText){
    const toneParams = {
        toneInput: { 'text': myText },
        content_type: 'text/plain',
        sentences: true
    };
    const sentimentResult = await toneAnalyzer.tone(toneParams);
    return sentimentResult;
}

exports.analyze_tone = analyze_tone;
