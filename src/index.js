import core from 'babel-core/register';
import polyfill from 'babel-polyfill';
import koa from 'koa';
import router from 'koa-route';

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

app.listen(5500);
console.log('Listening on port 5500');
