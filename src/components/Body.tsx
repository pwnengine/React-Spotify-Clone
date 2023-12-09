import styled from 'styled-components'
import { AiFillClockCircle } from 'react-icons/ai'
import { useProvider, artist, tracks_info, tracks_type } from '../context/StateProvider';
import { useEffect } from 'react';
import axios from 'axios'

const Container = styled.div<props>`
  .topbottom {
    display: flex;
    flex-direction: column;
    
  .playlist {
    margin: 0 3rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0,0,0,0.95) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }

  .list {
    .header_row {
      
      margin-top: 0px;
      background-color: ${ ({ header_bg }: props) => header_bg ? '#000000dc' : 'none' };
      display: grid;
      grid-template-columns: 0.3fr 2.5fr 2fr 0.1fr;
      color: rgb(221, 220, 220);
      margin: 0rem 0rem 0rem 0rem;
      position: sticky;
      top: 14vh;
      padding: 1rem 7.1rem 1rem 2rem;
      transition: 0.3s ease-in-out;

    }
    .tracks {
      
      //margin: 0.6rem 0.1rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-right: 5rem;
        padding-left: 2rem;
        display: grid;
        grid-template-columns: 0.1fr 0.9fr 0.7fr 0.1fr;
        &:hover {
          background-color: rgba(0,0,0,0.7);

        }
        
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }

      .col {
        
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
          }
        }
    }
  }
}
`;

interface props {
  header_bg: boolean;
}

const Body = ({ header_bg }: props) => {
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

  const ms_to_mins = (ms: number) => {
    const min = Math.floor(ms / 60000);
    const secs = ((ms % 60000) / 1000).toFixed(0);
    return String(min) + ':' + (Number(secs) < 10 ? '0' : secs);
  };

  return (
    <Container header_bg={header_bg}>
      {
        selected_playlist_id && (
          <div className="topbottom">
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
                  playlist_info.tracks?.map(({ id, name, artists, image, duration, album, context_uri, track_number }: tracks_type, index) => {
                    return (
                      <div className="row" key={id}>
                        <div className="col">
                          <span>{index+1}</span>
                        </div>

                        <div className="col detail">
                          <div className="image">
                            <img src={image} alt="track" />
                          </div>

                          <div className="info">
                            <span className="name">{name}</span>
                            <span>{artists.map((val) => (<p>{val.name}</p>))}</span>
                          </div>
                        </div>

                        

                        <div className="col">
                          <span>{album}</span>
                        </div>
                        

                        <div className="col">
                          <span>{ms_to_mins(duration)}</span>
                        </div>
                      </div>
                      )

                  })
                }
              </div>

            </div>

          </div>
        )
      }
      

    </Container>
  )
}

export default Body