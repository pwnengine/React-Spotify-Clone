import { ReactElement, createContext, useContext, useReducer } from 'react'

export type artist = {
  name: string,
};

type image = {
  url: string,
};

export type album = {
  name: string,
  images: image[],
  uri: string,
}

export type tracks_info = {
  id: string,
  name: string,
  artists: artist[],
  album: album,
  duration_ms: number,
  track_number: number,
};

export type tracks_type = {
  id: string,
  name: string,
  artists: artist[],
  image: string,
  duration: number,
  album: string,
  context_uri: string,
  track_number: number,
};

type playlist_info_type = {
  id: string | undefined, 
  name: string | undefined, 
  description: string | undefined, 
  image: string | undefined, 
  tracks: tracks_type[] | undefined,
};


type external_url = {
  spotify: '',
};

type images_obj = {
  height: number,
  url: string,
  width: number,
};

type images = [images_obj, images_obj, images_obj];

type owner = {
  display_name: string,
  href: string,
  id: string,
  type: string,
  uri: string,
};

type tracks = {
  href: string,
  total: number,

};

export type playlist_item = {
  collaborative: boolean,
  description: string,
  external_urls: external_url,
  href: string,
  id: string,
  images: images,
  name: string,
  owner: owner,
  primary_color: null,
  public: boolean,
  snapshot_id: string,
  tracks: tracks,
  type: string,
  uri: string,
};

type currently_playing_type = {
  id: string,
  name: string,
  artists: string[],
  image: string,
};

interface props {
  children: ReactElement | ReactElement[];
}

const init_state = {
  token: '',
  playlists: [],
  selected_playlist_id: '3cEYpjA9oz9GiPac4AsH4n',
  playlist_info: {
    id: '', 
    name: '', 
    description: '', 
    image: '', 
    tracks: [{
      id: '',
      name: '',
      artists: [],
      image: '',
      duration: 0,
      album: '',
      context_uri: '',
      track_number: 0,
    }],
  },
  currently_playing: {
    id: '',
    name: '',
    artists: [''],
    image: '',
  },
  player_state: false,
};

type state_type = {
  token: string,
  playlists: playlist_item[],
  selected_playlist_id: string,
  playlist_info: playlist_info_type,
  currently_playing: currently_playing_type,
  player_state: boolean,
};

type payload_type = {
  token: string,
  playlists: playlist_item[],
  selected_playlist_id: string,
  playlist_info: playlist_info_type,
  currently_playing: currently_playing_type,
  player_state: boolean,
}

type action_type = {
  type: string;
  payload: payload_type;
};

const AppContext = createContext<{ 
  token: string, 
  set_token: (token: string) => void, 
  playlists: playlist_item[], 
  set_playlists: (playlists: playlist_item[]) => void, 
  selected_playlist_id: string, 
  set_selected_playlist_id: (playlist_id: string) => void,
  playlist_info: playlist_info_type,
  set_playlist_info: (playlist_info: playlist_info_type) => void,
  currently_playing: currently_playing_type,
  set_currently_playing: (currently_playing: currently_playing_type) => void,
  player_state: boolean,
  set_player_state: (player_state: boolean) => void,
}>({
  token: 'null',
  set_token: () => null,
  playlists: [],
  set_playlists: () => null,
  selected_playlist_id: '',
  set_selected_playlist_id: () => null,
  playlist_info: {
    id: '', 
    name: '', 
    description: '', 
    image: '', 
    tracks: [{
      
        id: '',
        name: '',
        artists: [],
        image: '',
        duration: 0,
        album: '',
        context_uri: '',
        track_number: 0,
      
    }],
  },
  set_playlist_info: () => null,
  currently_playing: {
    id: '',
    name: '',
    artists: [''],
    image: '',
  },
  set_currently_playing: () => null,
  player_state: false,
  set_player_state: () => null,
});

const reducer_fn = (state: state_type, action: action_type) => {
  switch(action.type) {
    default: 
      throw new Error(`NO CASE FOR TYPE ${action.type}`);
    case 'SET_TOKEN':
      console.log('token changed to: ' + action.payload.token);
      return { ...state, token: action.payload.token };
    case 'SET_PLAYLISTS':
      console.log('playlists have been set to: ' + action.payload.playlists);
      return { ...state, playlists: action.payload.playlists };
    case 'SET_SELECTED_PLAYLIST_ID':
      console.log('currently selected playlist id set to: ' + action.payload.selected_playlist_id);
      return { ...state, selected_playlist_id: action.payload.selected_playlist_id };
    case 'SET_PLAYLIST_INFO':
      console.log('playlist information has been set to: ' + action.payload.playlist_info);
      return { ...state, playlist_info: action.payload.playlist_info };
    case 'SET_CURRENTLY_PLAYING':
      console.log('currently playing has been set to: ' + action.payload.currently_playing);
      return { ...state, currently_playing: action.payload.currently_playing };
    case 'SET_PLAYER_STATE':
      console.log('player state set to: ' + action.payload.player_state);
      return { ...state, player_state: action.payload.player_state };
  }
};

const StateProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(reducer_fn, init_state);

  const set_token = (token: string) => {
    dispatch({
      type: 'SET_TOKEN',
      payload: {
        token: token,
        playlists: state.playlists,
        selected_playlist_id: state.selected_playlist_id,
        playlist_info: state.playlist_info,
        currently_playing: state.currently_playing,
        player_state: state.player_state,
      },
    });
  };

  const set_playlists = (playlists: playlist_item[]) => {
    dispatch({
      type: 'SET_PLAYLISTS',
      payload: {
        token: state.token,
        playlists: playlists,
        selected_playlist_id: state.selected_playlist_id,
        playlist_info: state.playlist_info,
        currently_playing: state.currently_playing,
        player_state: state.player_state,
      },
    });
  };

  const set_selected_playlist_id = (id: string) => {
    dispatch({
      type: 'SET_SELECTED_PLAYLIST_ID',
      payload: {
        token: state.token,
        playlists: state.playlists,       
        selected_playlist_id: id,
        playlist_info: state.playlist_info,
        currently_playing: state.currently_playing,
        player_state: state.player_state,
      },
    });
  };

  const set_playlist_info = (playlist_info: playlist_info_type) => {
    dispatch({
      type: 'SET_PLAYLIST_INFO',
      payload: {
        token: state.token,
        playlists: state.playlists,
        selected_playlist_id: state.selected_playlist_id,
        playlist_info: playlist_info,
        currently_playing: state.currently_playing,
        player_state: state.player_state,
      },
    });
  };

  const set_currently_playing = (currently_playing: currently_playing_type) => {
    dispatch({
      type: 'SET_CURRENTLY_PLAYING',
      payload: {
        token: state.token,
        playlists: state.playlists,
        selected_playlist_id: state.selected_playlist_id,
        playlist_info: state.playlist_info,
        currently_playing: currently_playing,
        player_state: state.player_state,
      },
    });
  };

  const set_player_state = (player_state: boolean) => {
    dispatch({
      type: 'SET_PLAYER_STATE',
      payload: {
        token: state.token,
        playlists: state.playlists,
        selected_playlist_id: state.selected_playlist_id,
        playlist_info: state.playlist_info,
        currently_playing: state.currently_playing,
        player_state: player_state,
      },
    });
  };

  const value = {
    token: state.token,
    set_token,
    playlists: state.playlists,
    set_playlists,
    selected_playlist_id: state.selected_playlist_id,
    set_selected_playlist_id,
    playlist_info: state.playlist_info,
    set_playlist_info,
    currently_playing: state.currently_playing,
    set_currently_playing,
    player_state: state.player_state,
    set_player_state: set_player_state,
  };

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>

  )
}

export default StateProvider

export const useProvider = () => {
  const ctx = useContext(AppContext);

  if(ctx === undefined) {
    throw new Error('useProvider must be a child of StateProvider');
  }

  return ctx;
};