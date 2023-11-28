import {  } from 'react'
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
    grid-template-columns: 15vw 85vw;
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

const Spotify = () => {
  return (
    <Container>
      <div className="spotify_body">
        
        
        <SideBar />

        <div className="body">
          <NavBar />      

          <div className="contents"> <Body /> </div>
        </div>
      </div>

      <div className="spotify_footer"> <Footer /> </div>
    </Container>
  )
}

export default Spotify