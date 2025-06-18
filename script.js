const PROXY_BASE = 'https://proxy-abwaab123.ss9758026.workers.dev/?url=';

const lectures = [
  {
    title: 'محاضرة تجريبية',
    url: 'https://vz-99e5c202-ca5.b-cdn.net/7f2873a8-c450-4db3-819a-1cfc518c23f8/1080p/video.m3u8'
  }
];

lectures.forEach(lec => {
  const div = document.createElement('div');
  div.className = 'lecture-item';
  div.textContent = lec.title;
  div.onclick = () => playLecture(lec.url);
  document.getElementById('lectures-list').appendChild(div);
});

function playLecture(originalUrl) {
  const videoEl = document.getElementById('video');
  const proxiedUrl = PROXY_BASE + encodeURIComponent(originalUrl);

  if (window.hls) {
    window.hls.destroy();
  }

  if (Hls.isSupported()) {
    window.hls = new Hls({
      xhrSetup: function(xhr, url) {
        const proxied = PROXY_BASE + encodeURIComponent(url);
        xhr.open('GET', proxied, true);
      }
    });

    window.hls.loadSource(proxiedUrl);
    window.hls.attachMedia(videoEl);
    window.hls.on(Hls.Events.MANIFEST_PARSED, () => {
      videoEl.play();
    });

    window.hls.on(Hls.Events.ERROR, function (event, data) {
      console.error('HLS.js error', data);
    });
  } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
    videoEl.src = proxiedUrl;
    videoEl.play();
  } else {
    alert('HLS غير مدعوم في هذا المتصفح');
  }
}
