const text = 'hover me';

const createLetterArray = (string) => {
  return string.split('');
}

const letters = createLetterArray(text);

const letterSpans = letters.map(letter => {
  const span = document.createElement('span');
  span.textContent = letter;
  return span;
});

const container = document.querySelector('#bouncytext');
letterSpans.forEach(span => container.appendChild(span));