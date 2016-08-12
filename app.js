const koa = require('koa');
const router = require('koa-route');

const PORT = process.env.PORT || 3000;
const app = koa();

app.use(router.get('/uifw-bug-report', function *() {
  let responses = [
    `I'll add it to my list`,
    `Are you using the latest version?`,
    `Is there a kanbug for it?`,
    `Is there a trello card for it?`
  ];
  let responsesLen = responses.length;
  this.body = responses[Math.floor(Math.random() * responsesLen)];
}));

app.listen(PORT);
console.log(`Listening on port ${PORT}`);