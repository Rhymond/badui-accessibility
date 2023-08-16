const letters = document.querySelectorAll(".wrapper > div");
const input = document.querySelector(".form > input");
const sounds = [];

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const logslider = (position) => {
  // position will be between 0 and 100
  var minp = 0;
  var maxp = 100;

  var minv = Math.log(0.01);
  var maxv = Math.log(100);

  // calculate adjustment factor
  var scale = (maxv-minv) / (maxp-minp);

  return Math.exp(minv + scale*(position-minp));
};

const shuffleLetters = () => {
  letters.forEach(l => {
    l.style.top = random(10, 90) + '%';
    l.style.left = random(10, 90) + '%';
  });
}
shuffleLetters();

letters.forEach(l => {
  sounds[l.innerHTML] = new Audio('sounds/' + l.innerHTML + '.mp3');
})

const play = (letter, volume) => {
  sounds[letter].currentTime = 0;
  sounds[letter].volume = volume;
  sounds[letter].play();
} 

const wrapper = document.querySelector(".wrapper");
wrapper.addEventListener('click', (e) => {
  let distances = [];
  letters.forEach(l => {
    const rect = l.getBoundingClientRect();
    distances.push([
      l.innerHTML,
      Math.sqrt(Math.pow(e.clientX - rect.x, 2) + Math.pow(e.clientY - rect.y, 2))
    ]);
  });

  if (distances.length < 1) {
    return;
  }

  distances.sort((a, b) => a[1] - b[1])

  if (distances[0][1] < 40) {
    play(distances[0][0], 1);
    return;
  }

  const max = 500;
  for (let i = 0; i < distances.length; i++) {
    const d = distances[i];
    if (d[1] < max) {
      play(d[0], logslider(100 - ((d[1] * 100) / max)) / 100)
    }
  }
})

letters.forEach(l => {
  l.addEventListener("click", (e) => {
    setTimeout(() => {
      input.value = input.value + e.target.innerHTML;
      shuffleLetters();
    }, 300);
  });
});
