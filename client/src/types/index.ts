export interface IPlaylist {
  filter: any
  name: string
  imageUrl: string
  songs: Array<ISong>
}

export interface ISong {
  name: string
  duration: number
}
