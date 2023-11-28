import { ReactElement, createContext, useContext, useReducer } from 'react'

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
};

type state_type = {
  token: string,
  playlists: playlist_item[],
};

type payload_type = {
  token: string,
  playlists: playlist_item[],
}

type action_type = {
  type: string;
  payload: payload_type;
};

const AppContext = createContext<{ token: string, playlists: playlist_item[], set_token: (token: string) => void, set_playlists: (playlists: playlist_item[]) => void }>({
  token: 'null',
  playlists: [],
  set_token: () => null,
  set_playlists: () => null,
});

const reducer_fn = (state: state_type, action: action_type) => {
  switch(action.type) {
    default: 
      throw new Error(`NO CASE FOR TYPE ${action.type}`);
    case 'SET_TOKEN':
      console.log('token changed to: ' + action.payload);
      return { ...state, token: action.payload.token };
    case 'SET_PLAYLISTS':
      console.log('playlists have been set to: ' + action.payload);
      return { ...state, playlists: action.payload.playlists };
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
      },
    });
  };

  const set_playlists = (playlists: playlist_item[]) => {
    dispatch({
      type: 'SET_PLAYLISTS',
      payload: {
        token: state.token,
        playlists: playlists
      },
    });
  };

  const value = {
    token: state.token,
    playlists: state.playlists,
    set_token,
    set_playlists,
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