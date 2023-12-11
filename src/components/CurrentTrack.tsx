import { useEffect } from 'react'
import styled from 'styled-components'
import { useProvider } from '../context/StateProvider'
import axios from 'axios';

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &_info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      h4 {
        color: white;

      }
      h6 {
        color: #b3b3b3;
      }
    }
  }
`;

const CurrentTrack = () => {
  const { token, currently_playing, set_currently_playing } = useProvider();

  useEffect(() => {
    const get_curr_track = async () => {
      try {
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
        }
      } catch(err) {
        console.log(err);
      }
    };

    get_curr_track();
  }, []);

  return (
    <Container>
      {
        currently_playing && (
          <div className="track">
            <div className="track_image">
              <img src={currently_playing.image} alt="currently playing track album art" />
            </div>

            <div className="track_info">
              <h4>{currently_playing.name}</h4>
              <h6>{currently_playing.artists.join(', ')}</h6>
            </div>
          </div>
        )
      }

    </Container>
  )
}

export default CurrentTrack