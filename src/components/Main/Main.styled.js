import styled from 'styled-components';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  height: 100%;
`;

const KeyboardWrapper = styled.div`
  display: flex;
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

export {Main, KeyboardWrapper, Button};