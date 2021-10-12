export interface IPlaylist {
  name: string
  imageUrl: string
  songs: Array<ISong>
}

export interface ISong {
  name: string
  duration: number
}

export interface ISpotifyPlaylists {
  items: Array<ISpotifyPlaylist>
  next: string | null
  previous: string | null
  total: number
}

export interface ISpotifyPlaylist {
  images: Array<{ url: string }>
  name: string
  id: string
  trackDatas: Array<ISong>
}

export interface ISpotifySong {
  name: string
  duration_ms: number
}
export interface ISpotifySongs {
  items: Array<{ track: ISpotifySong }>
}

export interface ISpotifyUser {
  display_name: string
  images: Array<{ url: string }>
}
