'use strict';
const koa = require('koa');
const router = require('koa-route');
const _ = require('lodash');

const PORT = process.env.PORT || 3000;
const app = koa();

function getIframeHtml(videoId) {
  return `<!DOCTYPE html>
    <html>
      <body>
        <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
        <div id="player"></div>

        <script>
          // 2. This code loads the IFrame Player API code asynchronously.
          var tag = document.createElement('script');

          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

          // 3. This function creates an <iframe> (and YouTube player)
          //    after the API code downloads.
          var player;
          function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
              height: '390',
              width: '640',
              videoId: '${videoId}',
              events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
              }
            });
          }

          // 4. The API will call this function when the video player is ready.
          function onPlayerReady(event) {
            event.target.playVideo();
          }

          // 5. The API calls this function when the player's state changes.
          //    The function indicates that when playing a video (state=1),
          //    the player should play for six seconds and then stop.
          var done = false;
          function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.PLAYING && !done) {
              setTimeout(stopVideo, 6000);
              done = true;
            }
          }
          function stopVideo() {
            player.stopVideo();
          }
        </script>
      </body>
    </html>`;
}

app.use(router.get('/make-some-noise', function *() {
  let result = getIframeHtml('BvaDnaa4ztc');
  this.body = result;
}));

app.use(router.get('/portfolio', function *() {
  let result = getIframeHtml('m4OvQIGDg4I');
  this.body = result;
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
  };
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
