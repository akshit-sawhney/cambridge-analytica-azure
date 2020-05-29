"use strict";

const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
require('dotenv').config();

const key = process.env.AWS_KEY;
const endpoint = process.env.AWS_ENDPOINT;

const textAnalyticsClient = new TextAnalyticsClient(endpoint,  new AzureKeyCredential(key));

async function sentimentAnalysis(myText){
    const sentimentInput = [myText];
    const sentimentResult = await textAnalyticsClient.analyzeSentiment(sentimentInput);
    return sentimentResult;
}

exports.sentimentAnalysis = sentimentAnalysis;