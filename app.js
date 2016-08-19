const koa = require('koa');
const router = require('koa-route');
const req = require('co-request');
const _ = require('lodash');

const PORT = process.env.PORT || 3000;
const app = koa();

app.use(router.get('/make-some-noise', function *() {
  let result = yield req('https://www.youtube.com/watch?v=BvaDnaa4ztc');
  this.body = result.body;
}));

app.use(router.get('/portfolio', function *() {
  let result = yield req('https://www.youtube.com/watch?v=m4OvQIGDg4I');
  this.body = result.body;
}));

app.use(router.get('/uifw-bug-report', function *() {
  let responses = [
    `I'll add it to my list`,
    `Are you using the latest version?`,
    `Is there a kanbug for it?`,
    `Is there a trello card for it?`
  ];
  this.body = {
    response: _.sample(responses)
  }
}));

app.use(router.get('/', function *() {
  this.body = {
    links: [
      { rel: "self", href: "/" },
      { rel: "Portfolio", href: "/portfolio" },
      { rel: "UIFW Bug Report", href: "/uifw-bug-report" },
      { rel: "Make Some Noise", href: "/make-some-noise" },
    ],
    avatar: 'https://ekmpowershop.slack.com/files/nickelse/F1QVBRX0C/john2.jpg'
  };
}));

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
