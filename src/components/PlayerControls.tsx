import styled from 'styled-components'
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle } from 'react-icons/bs'
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg'
import { FiRepeat } from 'react-icons/fi'
import { useProvider } from '../context/StateProvider'
import axios from 'axios'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous, .next, .state {
    font-size: 2rem;
  }

`;

const PlayerControls = () => {
  const { token, player_state, set_player_state, set_currently_playing } = useProvider();

  const change_track = async (type: string) => {
    try {
    await axios.post(`https://api.spotify.com/v1/me/player/${type}`, 
    {},
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    const res = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if(res.data != '') {
      const { item } = res.data;
      const curr_playing = {
        id: item.id,
        name: item.name,
        artists: item.artists.map((artist: { name: string }) => artist.name),
        image: item.album.images[2].url,
      };

      set_currently_playing(curr_playing);
    } else {
      set_currently_playing({
        id: '',
        name: '',
        artists: [''],
        image: '',
      });
    }
  } catch(err) {
    console.log(err);
  }
  };

  const change_state = async () => {
    const state = player_state ? 'paused' : 'play';
    await axios.put(`https://api.spotify.com/v1/me/player/${state}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    set_player_state(!player_state);
  };

  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      
      <div className="previous">
        <CgPlayTrackPrev onClick={ () => change_track('previous') } />
      </div>

      <div className="state">
        { 
          player_state ? <BsFillPauseCircleFill onClick={change_state} /> : <BsFillPlayCircleFill onClick={change_state} />
        }
      </div>

      <div className="next">
        <CgPlayTrackNext onClick={ () => change_track('next') } />
      </div>


      <div className="repeat">
        <FiRepeat />
      </div>
    </Container>
  )
}

export default PlayerControls