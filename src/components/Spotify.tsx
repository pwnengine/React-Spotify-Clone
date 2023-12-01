import { useEffect, useState } from 'react'
import axios from 'axios'
import { useProvider } from '../context/StateProvier'
import styled from 'styled-components'
import NavBar from './NavBar'
import SideBar from './SideBar';
import Body from './Body';
import Footer from './Footer';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .side-bar {
    height: 100%;
  }
  .spotify_body {
    display: grid;
    grid-template-columns: 20vw 85vw;
    gap: 1rem;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    
    .body {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }
  
`;

export type user_data = {
  id: string,
  name: string,
};

const Spotify = () => {
  const { token } = useProvider();

  const [user, set_user] = useState<user_data>({id: '', name: ''});

  useEffect(() => {
    const get_user_info = async (): Promise<user_data> => {
      const res = await axios.get('https://api.spotify.com/v1/me/', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      return {
        id: res.data.id,
        name: res.data.display_name,
      };
    };

    get_user_info().then(({ id, name }: user_data) => {
      set_user({ id, name });
    });
    
  }, [token]);

  return (
    <Container>
      <div className="spotify_body">
        
        
        <SideBar />

        <div className="body">
          <NavBar user={user} />      

          <div className="contents">
            <div>{user.name}</div>    
             <Body /> 
          </div>

        </div>

      </div>

      <div className="spotify_footer"> <Footer /> </div>
    </Container>
  )
}

export default Spotify