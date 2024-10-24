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
    key: 'xiao',
    label: '小',
    strokeColor: '#d51218',
  },
  {
    key: 'fang',
    label: '芳',
    strokeColor: '#ffff00',
  },
  {
    key: 'cheng',
    label: '程',
    strokeColor: '#2eff34',
  },
  {
    key: 'xu',
    label: '序',
    strokeColor: '#ad8bc6',
  },
  {
    key: 'jie',
    label: '节',
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
  container: document.getElementById('coding'), // Required
  path: './asset/coding.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
  name: "Miss Fang is lovely", // Name for future reference. Optional.
});
