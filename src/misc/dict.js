export const generateRandomWord = async () => {
  while (true) {
    const word = await fetch('https://random-word-api.herokuapp.com/word?length=5').then((res) => res.json()).then((res) => res[0].toLowerCase());

    if (await checkWord(word)) {
      return word;
    }
  }
}

export const checkWord = async (word) => {
  if (word.length !== 5) {
    return false;
  }

  return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((res) => res.ok);  
}

export const compareWords = (s, g) => {
  const n = s.length;
  const res = Array(5).fill('w');
  const used = Array(5).fill(false);

  for (let i = 0; i < n; i++) {
    if (s[i] === g[i]) {
      res[i] = 'r';
      used[i] = true;
    }
  }

  for (let i = 0; i < n; i++) {
    if (s[i] !== g[i]) {
      for (let j = 0; j < n; j++) {
        if (g[i] === s[j] && !used[j]) {
          used[j] = true;
          res[i] = 'm';
          break;
        }
      }
    }
  }

  return res;
}