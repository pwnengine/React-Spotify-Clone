import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { user_data } from './Spotify'
import { IconContext } from 'react-icons';

interface props {
  user: user_data;
  nav_bg: boolean;
}

const NavBar = ({ user, nav_bg }: props) => {
  return (
    
  <Container user={user} nav_bg={nav_bg}>
    
    <div className="search_bar">
      <IconContext.Provider value={{ color: 'black', }}>
        <FaSearch />
      </IconContext.Provider>
      <input type="text" placeholder="Artists, songs, or podcasts" />
    </div>

    <div className="avatar">
      <CgProfile />
      <span>{user.name}</span>
    </div>

  </Container>
    
  )
}

const Container = styled.div<props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 6.2vh;
  position: sticky;
  top: 0;
  width: 76vw;
  transition: 0.3s ease-in-out;
  background-color: ${({ nav_bg }: props) => nav_bg ? 'rgba(0,0,0,0.7)' : 'none'};
  .search_bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      background-color: white;
      color: black;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;    
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5

      }
    }
  }
`;

export default NavBar