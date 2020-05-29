const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const indexRoutes = require('./routes/index');
const sentimentRoutes = require('./routes/sentiment_analysis');
const toneAnalyzerRoutes = require('./routes/tone_analyzer');

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(bodyParser());

app.use(indexRoutes.routes());
app.use(sentimentRoutes.routes());
app.use(toneAnalyzerRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;