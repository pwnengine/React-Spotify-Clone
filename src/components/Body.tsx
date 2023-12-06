import styled from 'styled-components'
import { AiFillClockCircle } from 'react-icons/ai'
import { useProvider, artist, tracks_info, tracks_type } from '../context/StateProvier';
import { useEffect } from 'react';
import axios from 'axios'

const Container = styled.div`

`;

const Body = () => {
  const { token, selected_playlist_id, playlist_info, set_playlist_info } = useProvider();

  useEffect(() => {
    const get_playlist = async () => {
      try {
        console.log('test the playlist id | ' + selected_playlist_id);
        const res = await axios.get(`https://api.spotify.com/v1/playlists/${selected_playlist_id}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        type track_type = {
          track: tracks_info,
        };

        set_playlist_info({ 
          id: res.data.id,
          name: res.data.name,
          description: res.data.description.startsWith('<a') ? '' : res.data.description, 
          image: res.data.images[0].url,
          tracks: res.data.tracks.items.map(({ track }: track_type) => {
            return { 
              id: track.id, 
              name: track.name, 
              artists: track.artists.map((artist: artist) => artist.name),
              image: track.album.images[2].url,
              duration: track.duration_ms,
              album: track.album.name,
              context_uri: track.album.uri,
              track_number: track.track_number,
            }
          }),
        });
      } catch(err) {
        console.log(`ERROR GETTING PLAYLIST ${selected_playlist_id}: ` + err);
      }
    };

    get_playlist();
  }, [selected_playlist_id]);

  return (
    <Container>
      {
        selected_playlist_id && (
          <>
            <div className="playlist">
              <div className="image">
                <img src={playlist_info.image} alt="selected playlist image" />
              </div>

              <div className="details">
                <span className="type">PLAYLIST</span>
                <h1 className="title">{playlist_info.name}</h1>
                <p className="description">{playlist_info.description}</p>
              </div>
            </div>

            <div className="list"> 
              <div className="header_row">
                  <div className="col">
                    <span>#</span>  
                  </div>

                  <div className="col">
                    <span>TITLE</span>
                  </div>

                  <div className="col">
                    <span>ALBUM</span>
                  </div>

                  <div className="col">
                    <span>
                      <AiFillClockCircle />
                    </span>  
                  </div>

              </div>

              <div className="tracks">
                {
                  playlist_info.tracks?.map(({ id }: tracks_type) => {
                    return (
                      <div key={id}>{id}</div>
                      
                      )

                  })
                }
              </div>

            </div>

          </>
        )
      }
      

    </Container>
  )
}

export default Body