import styled from 'styled-components';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  flex: 1;
`;

const KeyboardWrapper = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(13, 1fr);
`;

const Button = styled.button`
  font-size: 1.5rem;
  background-color: black;
  border: 1px solid white;
  color: white;
  padding: 1rem;

  &:hover {
    color: gray;
  }
`

const Buttons = styled.div`
  margin-top: 3rem;
  display: flex;
`

export {Main, KeyboardWrapper, Button, Buttons};