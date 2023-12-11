import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useProvider } from '../context/StateProvider'
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
    gap: 0rem;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    .body {
      width: 100%;
      height: 100%;
      overflow: auto;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255, 0.6);
      &::-webkit-scrollbar {

        width: 0.7rem;
        &-thumb {
          background-color: rgba(255,255,255,0.6);
        }
      }
      .contents {
        //margin-top: -100px;
      }
    }
  }
  
`;

export type user_data = {
  id: string,
  name: string,
};

const Spotify = () => {
  const { token } = useProvider();

  const body_ref = useRef<HTMLDivElement>(null);
  const [nav_bg, set_nav_bg] = useState<boolean>(false);
  const [header_bg, set_header_bg] = useState<boolean>(false);

  const body_scrolled = () => {
    if(body_ref != null && body_ref != undefined) {
      if(body_ref.current!.scrollTop >= 30) {
        set_nav_bg(true);
      } else {
        set_nav_bg(false);
      } 
      if(body_ref.current!.scrollTop >= 268) {
        set_header_bg(true);
      } else {
        set_header_bg(false);
      } 
    }
  };

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

        <div className="body" ref={body_ref} onScroll={body_scrolled}>
          <NavBar user={user} nav_bg={nav_bg} />      

          <div className="contents">
             <Body header_bg={header_bg} /> 
          </div>

        </div>

      </div>

      <div className="spotify_footer"> <Footer /> </div>
    </Container>
  )
}

export default Spotify