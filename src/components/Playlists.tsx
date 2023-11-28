import { useEffect } from "react"
import { useProvider, playlist_item } from "../context/StateProvier";
import axios from "axios";
import styled from 'styled-components'

const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255, 0.6);
  height: 100%;
  &::-webkit-scrollbar {

    width: 0.7rem;
    &-thumb {
      background-color: rgba(255,255,255,0.6);
    }
  }
  li {
    display: flex;
    gap: 1rem;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
      color: white;
    }
  }
`;

const Playlists = () => {
  const { token, playlists, set_token, set_playlists } = useProvider();
  useEffect(() => {
    const get_playlist_data = async () => {
      try {
        const res = await axios.get('https://api.spotify.com/v1/me/playlists/', {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        }); 
        set_playlists(res.data.items.map((val: playlist_item) => {
          return val
        }));
      } catch(err) {
        console.log(err);
      }
    };

    get_playlist_data();

  }, []);

  console.log('playlists set to '+playlists);

  return (
    <Ul>
      {  
        playlists.map(({ name, id }: playlist_item) => {
          return ( 
            <li key={id}>{name}</li>

          );
        })
      }
      {  
        playlists.map(({ name, id }: playlist_item) => {
          return ( 
            <li key={id}>{name}</li>

          );
        })
      }
      {  
        playlists.map(({ name, id }: playlist_item) => {
          return ( 
            <li key={id}>{name}</li>

          );
        })
      }
    </Ul>
  )
}

export default Playlists