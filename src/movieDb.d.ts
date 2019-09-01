declare module "getMovie" {
  interface getMovie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: Belongstocollection;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Productioncompany[];
    production_countries: Productioncountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Spokenlanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    videos?: Videos;
  }

  interface Videos {
    results: Result[] | [null];
  }

  interface Result {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
  }

  interface Spokenlanguage {
    iso_639_1: string;
    name: string;
  }

  interface Productioncountry {
    iso_3166_1: string;
    name: string;
  }

  interface Productioncompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }

  interface Genre {
    id: number;
    name: string;
  }

  interface Belongstocollection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  }
}

declare module "searchMovie" {
  export interface searchMovie {
    page: number;
    total_results: number;
    total_pages: number;
    results?: Result[];
  }

  export interface Result {
    popularity: number;
    id: number;
    video: boolean;
    vote_count: number;
    vote_average: number;
    title: string;
    release_date: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    backdrop_path: string;
    adult: boolean;
    overview: string;
    poster_path: string;
  }
}
