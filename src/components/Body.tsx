import styled from 'styled-components'
import { AiFillClockCircle } from 'react-icons/ai'
import { useProvider } from '../context/StateProvier';
import { useEffect, useState } from 'react';
import axios from 'axios'

const Container = styled.div`

`;

type artist = {
  name: string,
};

type image = {
  url: string,
};

type album = {
  name: string,
  images: image[],
  uri: string,
}

type tracks = {
  id: string,
  name: string,
  artists: artist[],
  album: album,
  duration_ms: number,
  track_number: number,
};

type tracks_type = {
  track: tracks,
};

type playlist_info_type = {
  id: string | undefined, 
  name: string | undefined, 
  description: string | undefined, 
  image: string | undefined, 
  tracks: tracks_type | undefined,
};

const Body = () => {
  const { token, selected_playlist_id, playlist_info, set_playlist_info } = useProvider();

  useEffect(() => {
    const get_playlist = async (): Promise<playlist_info_type | undefined> => {
      try {
        const res = await axios.get(`https://api.spotify.com/v1/playlists/${selected_playlist_id}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        return {
          id: res.data.id,
          name: res.data.name,
          description: res.data.description.startsWith('<a') ? '' : res.data.description, 
          image: res.data.images[0].url,
          tracks: res.data.tracks.items.map(({ track }: tracks_type) => {
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


        };
      } catch(err) {
        console.log(`ERROR GETTING PLAYLIST ${selected_playlist_id}: ` + err);
      }
    };

    get_playlist().then((val) => set_playlist_info({ 
      id: val?.id, 
      name: val?.name, 
      description: val?.description, 
      image: val?.image, 
      tracks: val?.tracks  }));
  });

  return (
    <Container>

      

    </Container>
  )
}

export default Body