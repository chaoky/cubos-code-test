declare module "mainStore" {
  interface state {
    movieDbKey: string;
    genres: genre[];
  }
  interface genre {
    id: number;
    name: string;
  }
  interface action {
    type: string;
    payload: string[];
  }
}
