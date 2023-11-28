import Spotify from '../components/Spotify'
import Login from "./Login";

interface props {
  token: string;
}

const Home = ({ token='' }: props) => { 
  if(token != '') {
    return (
      <>
        <Spotify />
      </>
    )
  } else {
    return ( 
    <>
      <Login />
    </>
    )
  }
}

export default Home