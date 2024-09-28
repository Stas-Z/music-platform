export { fetchArtistById } from './model/services/fetchArtistById/fetchArtistById'

export { ArtistDetails } from './ui/ArtistDetails/ArtistDetails'

export { ArtistsList } from './ui/ArtistsList/ArtistsList'

export { ArtistsListItem } from './ui/ArtistsListItem/ArtistsListItem'

export type { ArtistSchema, IArtist } from './model/types/artist'

export {
    getArtistById,
    getArtistNameById,
    getArtistList,
} from './model/services/selectors/getArtistsSelectors'

export { artistReducer } from './model/services/slice/artistSlice'

export { fetchArtistsList } from './model/services/fetchArtistsList/fetchArtistsList'
