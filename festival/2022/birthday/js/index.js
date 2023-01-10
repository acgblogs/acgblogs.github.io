const width = window.innerWidth || document.documentElement.clientWidth;
const height = window.innerHeight || document.documentElement.clientHeight;

let pointerList = [];

function loadFireList() {
  setTimeout(() => {
    const firePointer = document.createElement('div');
    firePointer.classList.add('fire-pointer');
    const ratio = Math.random();
    const left = ratio * width;
    firePointer.style.left = `${left}px`;
    document.body.appendChild(firePointer);
    firePointer.addEventListener('transitionend', () => {
      firePointer.remove();
      fire(left, (height * 15) / 100);
    });
    pointerList.push(firePointer);
    setTimeout(() => {
      pointerList.forEach((item) => {
        const randomTop = Math.random() * 85;
        item.style.bottom = `${Math.max(75, randomTop)}vh`;
        item.style.opacity = '0.1';
      });
      pointerList = [];
      loadFireList();
      const list = document.querySelectorAll('.fire-pointer');
      if (list.length > 6) {
        list?.slice(0, 4).forEach((item) => item.remove());
      }
    }, 600);
  }, 1200);
}

loadFireList();

const words = [
  {
    key: 'wang',
    label: '汪',
    strokeColor: '#d51218',
  },
  {
    key: 'da',
    label: '大',
    strokeColor: '#ffff00',
  },
  {
    key: 'ye',
    label: '爷',
    strokeColor: '#2eff34',
  },
  {
    key: 'sheng',
    label: '生',
    strokeColor: '#ad8bc6',
  },
  {
    key: 'ri',
    label: '日',
    strokeColor: '#e18120',
  },
  {
    key: 'kuai',
    label: '快',
    strokeColor: '#7a52a6',
  },
  {
    key: 'le',
    label: '乐',
    strokeColor: '#337ab7',
  },
  {
    key: 'ya',
    label: '吖',
    strokeColor: '#cb1b60',
  },
];


for (let i = 0; i < words.length; i++) {
  const { key, label, strokeColor } = words[i];

  setTimeout(() => {
    const render = HanziWriter.create(key, label, {
      width: width / 10,
      height: width / 10,
      padding: 5,
      showCharacter: false,
      showOutline: false,
      outlineColor: '#ff00ff',
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 5,
      strokeColor
    });
    render.hideOutline();
    render.animateCharacter({
      onComplete: () => {
        render.showOutline();
        render.loopCharacterAnimation();
      }
    });
  }, i * 3000);
}

var lottie = bodymovin.loadAnimation({
  container: document.getElementById('lottie'), // Required
  path: './asset/happy.json', // Required
  renderer: 'html', // Required
  loop: 1, // Optional
  autoplay: true, // Optional
  name: "Miss Wang is lovely", // Name for future reference. Optional.
});

lottie.onComplete = () => {
  bodymovin.loadAnimation({
    container: document.getElementById('cake'), // Required
    path: './asset/cake.json', // Required
    renderer: 'html', // Required
    loop: true, // Optional
    autoplay: true, // Optional
    name: "Miss Wang is lovely", // Name for future reference. Optional.
  });
}

var music = null;

const playMusic = () => {
  const video = document.querySelector('video');
  if (video) {
    video.muted = false
    video.play();
    video.setAttribute('autoplay', 'autoplay');
    music && clearInterval(music);
  }
};

music = setInterval(() => {
  playMusic();
}, 1000);
const div = document.createElement('div');
div.innerHTML = `<video src="./asset/music.mp4" autoplay loop></video>`;
document.body.appendChild(div);

function clickMe () {
  const clickMe = document.querySelector('.click-me');
  clickMe && clickMe.remove();
  playMusic();
}