import { useEffect } from 'react'
import styled from 'styled-components'
import { useProvider } from '../context/StateProvider'
import axios from 'axios';

const Container = styled.div`
  
`;

const CurrentTrack = () => {
  const { token } = useProvider();

  useEffect(() => {
    const get_curr_track = async () => {
      try {
        const res = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            Authorization: 'Bearer ' + token
          },
        });

        console.log('helloooooooo ' + res);
      } catch(err) {
        console.log(err);
      }
    };

    get_curr_track();
  }, []);

  return (
    <Container>
      

    </Container>
  )
}

export default CurrentTrack