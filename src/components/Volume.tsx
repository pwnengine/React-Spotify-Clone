import styled from 'styled-components'
import { useProvider } from '../context/StateProvider';
import axios from 'axios';
import React from 'react';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;

  }

`;

const Volume = () => {
  const { token } = useProvider();
  const set_volume = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    try {
      await axios.put('https://api.spotify.com/v1/me/player/volume', {}, {
        params: {
          volume_percent: parseInt(e.currentTarget.value),
        },
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <input type="range" min={0} max={100} onMouseUp={(e) => set_volume(e)} /> 
    </Container>
  )
}

export default Volume