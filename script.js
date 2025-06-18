// استخدم البروكسي الخاص بك من Cloudflare
const PROXY_BASE = 'https://proxy-abwaab123.ss9758026.workers.dev/?url=';

// قائمة محاضرات كمثال - يمكنك استيرادها من ملف خارجي لاحقًا
const lectures = [
  {
    id: 1,
    title: 'محاضرة 1',
    url: 'https://vz-99e5c202-ca5.b-cdn.net/7f2873a8-c450-4db3-819a-1cfc518c23f8/1080p/video.m3u8'
  },
  {
    id: 2,
    title: 'محاضرة 2',
    url: 'https://vz-99e5c202-ca5.b-cdn.net/7f2873a8-c450-4db3-819a-1cfc518c23f8/1080p/video.m3u8'
  }
];

const listEl = document.getElementById('lectures-list');
const videoEl = document.getElementById('video');
let hls;

// عرض قائمة المحاضرات
lectures.forEach(lec => {
  const div = document.createElement('div');
  div.className = 'lecture-item';
  div.textContent = lec.title;
  div.onclick = () => playLecture(lec.url);
  listEl.appendChild(div);
});

function playLecture(originalUrl) {
  const proxiedUrl = PROXY_BASE + encodeURIComponent(originalUrl);

  if (hls) {
    hls.destroy();
  }

  if (Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(proxiedUrl);
    hls.attachMedia(videoEl);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      videoEl.play();
    });
  } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
    videoEl.src = proxiedUrl;
    videoEl.addEventListener('loadedmetadata', () => {
      videoEl.play();
    });
  } else {
    alert('متصفحك لا يدعم تشغيل HLS');
  }
}
