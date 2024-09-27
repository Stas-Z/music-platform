export { ArtistsListItem } from './ui/ArtistsListItem/ArtistsListItem'

export type { ArtistSchema } from './model/types/artist'

export {
    getArtistById,
    getArtistNameById,
    getArtistList,
} from './model/services/selectors/getArtistsSelectors'

export { artistReducer } from './model/services/slice/artistSlice'

export { fetchArtistsList } from './model/services/fetchArtistsList/fetchArtistsList'
