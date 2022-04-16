import React from "react";
import { Div } from "./Cell.styled";

const Cell = ({letter, state}) => {
  return (
    <Div state={state}>
      {letter}
    </Div>
  )
}

export default Cell;