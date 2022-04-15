import React, { useState, useEffect } from "react";
import Cell from './Cell';
import { Div } from "./Field.styled";

const wordLimit = 6;
const wordLength = 5;

const Field = ({onSubmit, onLose}) => {
  const [guesses, setGuesses] = useState(['', '', '', '', '', '']);
  const [responses, setResponses] = useState(['', '', '', '', '', '']);
  const [row, setRow] = useState(0);

  useEffect(() => {
    const eventListener = async (e) => {
      e.preventDefault();

      if (e.key === "Enter") {
        if (guesses[row].length === wordLength) {
          const res = await onSubmit(guesses[row]);

          if (res === 'invalid') {
            alert('The word does not exist');
            let t = guesses.slice();
            t[row] = '';
            setGuesses(t);
          }
          else {
            let t = responses.slice();
            t[row] = res;
            setResponses(t);

            if (res !== 'iiiii') {
              if (row + 1 < wordLimit) {
                setRow(row + 1);
              }
              else {
                onLose();
              }
            }
          }
        }
      }
      else if (e.key === "Backspace") {
        if (guesses[row].length > 0) {
          const t = guesses.slice();
          t[row] = t[row].substring(0, t[row].length - 1);
          setGuesses(t);
        }
      }
      else {
        const code = e.keyCode;

        if (65 <= code && code <= 90 && guesses[row].length < wordLength) {
          const letter = String.fromCharCode(code);
          const t = guesses.slice();
          t[row] += letter;
          setGuesses(t);
        }
      }
    }

    document.addEventListener('keydown', eventListener);

    return () => {
      document.removeEventListener('keydown', eventListener);
    }
  });

  return (
    <Div>
      {[...Array(6)].map((_, i) => {
        const letters = guesses[i].split('');
        const res = responses[i].split('');

        return (
          <>
            {[...Array(5)].map((_, j) => <Cell letter={letters[j]} state={res[j]}/>)}
          </>
        )
      })}
    </Div>
  );
}

export default Field;