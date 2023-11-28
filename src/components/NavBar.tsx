import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { user_data } from './Spotify'

const Container = styled.div`
  
`;

interface props {
  user: user_data;
  set_user: (user: user_data) => void;
}



const NavBar = ({ user, set_user }: props) => {
  return (
    <Container>
      <div className="search_bar">
        <FaSearch />
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