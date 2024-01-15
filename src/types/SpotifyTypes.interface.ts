export interface searchResultObject {
    albums: albumSearchResultObject,
    artists: artistSearchResultObject
}
export interface artistSearchResultObject {
    href: string,
    items: Array<artist>,
    limit: number,
    next: string,
    prev: string,
    offset: number,
    total: number,
}
export interface tracksSearchResultObject {
    href: string,
    items: Array<track>,
    limit: number,
    next: string,
    prev: string,
    offset: number,
    total: number,
}

export interface albumSearchResultObject {
    href: string,
    items: Array<album>,
    limit: number,
    next: string,
    prev: string,
    offset: number,
    total: number,
}

export interface playlistSearchResultObject {
    href: string,
    items: Array<playlist>,
    limit: number,
    next: string,
    prev: string,
    offset: number,
    total: number,
}

export interface track {
    album: album,
    images: Array<{
        height: number,
        width: number,
        url: string,
    }>,
    artists: Array<artist>,
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    is_local: boolean,
    name: string,
    popularity: number,
    preview_url: string,
    track_number: number,
    type: string,
    uri: string
}

export interface playlist {
    collaborative: boolean,
    description: string,
    href: string,
    id: string,
    images: Array<{
        height: number,
        width: number,
        url: string,
    }>,
    name: string,
    owner: {
        display_name: string,
        href: string,
        id: string,
        type: string,
        uri: string
    },
    snapshot_id: string,
    tracks: {
        href: string,
        total: number
    }
    external_urls: {
        spotify: string
    },
    type: string,
    uri: string
}

export interface searchFieldProps {
    name: string,
    isSelected: boolean
}

export interface artist {
    external_urls: {
        spotify: string
    },
    followers: {
        href: string | null,
        total: number
    },
    genres: Array<string>,
    href: string,
    id: string,
    images: Array<{
        height: number,
        width: number,
        url: string,
    }>,
    name: string,
    popularity: number,
    type: string,
    uri: string
}

export interface album {
    album_type: string,
    artists: Array<artist>,
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    images: Array<{
        height: number,
        width: number,
        url: string,
    }>,
    name: string,
    release_date: string,
    total_tracks: string,
    type: string,
    uri: string
}

export interface user {
    display_name: string,
    external_urls: {
        spotify: string
    },
    followers: {
        href: string | null,
        total: number
    },
    href: string,
    id: string,
    images: Array<{
        height: number,
        width: number,
        url: string,
    }>,
    type: string,
    uri: string
}