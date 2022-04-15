import React, {useEffect, useState} from "react";
import { generateRandomWord, checkWord, compareWords } from "../../misc/dict";
import Field from "./Field";
import * as S from './Main.styled';
import Cell from "./Field/Cell";

const Main = () => {
  const [secret, setSecret] = useState(null);
  const [keyboard, setKeyboard] = useState('b'.repeat(26));

  useEffect(() => {
    if (secret) {
      console.log(secret);
    }
  }, [secret]);

  if (!secret) {
    return (
      <S.Main>
        <S.Button onClick={async (e) => {
          e.preventDefault();
          setSecret(await generateRandomWord());
        }}
          >Start
        </S.Button>
      </S.Main>
    )
  }

  const handleSubmit = async (word) => {
    word = word.toLowerCase();

    if (!await checkWord(word)) {
      return 'invalid';
    }

    const res = compareWords(secret, word).join('');

    if (res === 'rrrrr') {
      alert('Congrats! You won the game');
      setSecret(null);
    }

    let newKeyboard = keyboard.split('');

    for (let i = 0; i < secret.length; i++) {
      const index = word.charCodeAt(i) - 97;

      if (res[i] === 'r' || newKeyboard[index] === 'r') {
        newKeyboard[index] = 'r';
      }
      else if (res[i] === 'm' || newKeyboard[index] === 'm') {
        newKeyboard[index] = 'm';
      }
      else if (res[i] === 'w' || newKeyboard[index] === 'w') {
        newKeyboard[index] = 'w';
      }
    }

    setKeyboard(newKeyboard.join(''));
    return res;
  }

  const handleLose = () => {
    alert(`Oops! You lost :( The secret word was ${secret}`);
    setSecret(null);
  }

  return (
    <S.Main>
      <Field onSubmit={handleSubmit} onLose={handleLose}/>
      <S.KeyboardWrapper>
        {
          [...Array(26)].map((_, i) => 
            <Cell letter={String.fromCharCode(65 + i)} state={keyboard[i]}/>
          )
        }
      </S.KeyboardWrapper>
    </S.Main>
  )
}

export default Main;