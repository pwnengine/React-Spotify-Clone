import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
      padding: 1rem 5rem;
      border-radius: 30px;
      border: none;
      background-color: black;
      font-size: 1.4rem;
      cursor: pointer;
      color: #49f585;
    }
`;

const Login = () => {
  const handle_click = () => {
    const client_id = 'ca85863a54324b33b8cbb7775d3e4945';
    const redirect_url = 'http://localhost:5173/';
    const api_url = 'accounts.spotify.com/authorize/';
    const scope = ['user-read-email', 'user-read-private', 'user-modify-playback-state', 'user-read-playback-state', 'user-read-currently-playing', ['playlist-read-private']];
    window.location.href = `https://${api_url}?client_id=${client_id}&redirect_uri=${redirect_url}&api_url=${api_url}&scope=${scope.join(' ')}&response_type=token&show_dialog=true`
  };

  return (
    <Container>
      
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="Spotify Logo"/>
    
      <button onClick={handle_click}>Contect Spotify</button>
      
    </Container>
  )
}

export default Login