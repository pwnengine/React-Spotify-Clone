import { ReactElement, createContext, useContext, useReducer } from 'react'

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

type tracks_info = {
  id: string,
  name: string,
  artists: artist[],
  album: album,
  duration_ms: number,
  track_number: number,
};

type tracks_type = {
  track: tracks_info,
};

type playlist_info_type = {
  id: string | undefined, 
  name: string | undefined, 
  description: string | undefined, 
  image: string | undefined, 
  tracks: tracks_type | undefined,
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
    tracks: {
      track: {
        id: '',
        name: '',
        artists: [],
        album: {
          name: '',
          images: [],
          uri: ''
        },
        duration_ms: 0,
        track_number: 0,
      },
    },
  },
};

type state_type = {
  token: string,
  playlists: playlist_item[],
  selected_playlist_id: string,
  playlist_info: playlist_info_type,
};

type payload_type = {
  token: string,
  playlists: playlist_item[],
  selected_playlist_id: string,
  playlist_info: playlist_info_type,
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
    tracks: {
      track: {
        id: '',
        name: '',
        artists: [],
        album: {
          name: '',
          images: [],
          uri: ''
        },
        duration_ms: 0,
        track_number: 0,
      },
    },
  },
  set_playlist_info: () => null,
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