const gift = document.querySelector('.my-gift');

if (gift) {
  gift.addEventListener('click', () => {
    gift.classList.add('stop');
  });

  gift.addEventListener('transitionend', () => {
    const tree = document.querySelector('.tree');
    tree.style.top = '100%';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = './js/domtree.js';
    document.body.appendChild(script);
  });
}