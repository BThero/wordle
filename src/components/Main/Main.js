import React, {useEffect, useState} from "react";
import { generateRandomWord, checkWord, compareWords } from "../../misc/dict";
import Field from "./Field";
import * as S from './Main.styled';
import Cell from "./Cell";

const Main = () => {
  const [secret, setSecret] = useState(null);
  const [keyboard, setKeyboard] = useState(null);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (secret) {
      console.log(secret);
    }
  }, [secret]);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  const startNewGame = async () => {
    setSecret(await generateRandomWord());
    setKeyboard('b'.repeat(26));
    setReset(true);
  }

  const goToMenu = () => {
    setSecret(null);
    setKeyboard(null);
  }

  if (!secret) {
    return (
      <S.Main>
        <S.Button onClick={async (e) => {
          e.preventDefault();
          startNewGame();
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
      goToMenu();
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
    goToMenu();
  }

  return (
    <S.Main>
      <Field onSubmit={handleSubmit} onLose={handleLose} reset={reset}/>
      <S.Buttons>
        <S.Button onClick={(e) => {
          e.preventDefault();
          startNewGame();
        }}>
          Restart
        </S.Button>
        <S.Button onClick={(e) => {
          e.preventDefault();
          goToMenu();
        }}>
          Go To Menu
        </S.Button>
      </S.Buttons>
      <S.KeyboardWrapper>
        {
          [...Array(26)].map((_, i) => 
            <Cell letter={String.fromCharCode(65 + i)} size={50} state={keyboard[i]}/>
          )
        }
      </S.KeyboardWrapper>
    </S.Main>
  )
}

export default Main;