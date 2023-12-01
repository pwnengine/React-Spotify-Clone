import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { user_data } from './Spotify'
import { IconContext } from 'react-icons';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 5vh;
  width: 70vw;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: none;
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

interface props {
  user: user_data;
}



const NavBar = ({ user }: props) => {
  return (
    
  <Container>
    
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

export default NavBar