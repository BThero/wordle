import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  font-size: 2rem;
  justify-content: center;
  align-items: center;

  background-color: ${({state}) => {
    if (state === 'i') {
      return 'magenta';
    }

    if (state === 'r') {
      return '#538d4e';
    }

    if (state === 'm') {
      return '#b59f3b';
    }

    if (state === 'w') {
      return '#3a3a3c';
    }

    return 'black';
  }};

  border: 2px solid white;
  color: white;
`

export {Div};