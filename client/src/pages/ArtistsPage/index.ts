export { fetchArtistsList } from './model/services/fetchArtistsList/fetchArtistsList'

export type { ArtistsPageSchema } from './model/types/artistsPageSchema'

export { artistPageReducer } from './model/slice/artistsPageSlice'

export { ArtistsPageAsync as ArtistsPage } from './ui/ArtistsPage/ArtistsPage.async'

export { CreateNewArtistPageAsync as CreateNewArtistPage } from './ui/CreateNewArtistPage/CreateNewArtistPage.async'
