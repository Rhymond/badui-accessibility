const letters = document.querySelectorAll(".wrapper > div");
let sounds = [];
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

letters.forEach(l => {
  l.style.top = random(0, 100) + '%';
  l.style.left = random(0, 100) + '%';

  sounds[l.innerHTML] = new Audio('sounds/' + l.innerHTML + '.mp3');
})

function logslider(position) {
  // position will be between 0 and 100
  var minp = 0;
  var maxp = 100;

  var minv = Math.log(0.01);
  var maxv = Math.log(100);

  // calculate adjustment factor
  var scale = (maxv-minv) / (maxp-minp);

  return Math.exp(minv + scale*(position-minp));
}

document.addEventListener('click', (e) => {
  let distances = [];
  letters.forEach(l => {
    const rect = l.getBoundingClientRect();
    distances.push([
      l.innerHTML,
      Math.sqrt(Math.pow(e.clientX - rect.x, 2) + Math.pow(e.clientY - rect.y, 2))
    ]);
  })

  distances.sort((a, b) => a[1] - b[1])

  const max = 500;
  distances.forEach(d => {
    if (d[1] < max) {
      sounds[d[0]].currentTime = 0;
      sounds[d[0]].volume = logslider(100 - ((d[1] * 100) / max)) / 100;
      sounds[d[0]].play();
    }
  })
  
  // const audio = new Audio('sounds/b.mp3');
  // audio.volume
  // audio.play();
})
