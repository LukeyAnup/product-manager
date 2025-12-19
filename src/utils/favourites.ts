const FAVORITES_KEY = "favourites";

export const getFavourites = (): number[] => {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

export const setFavouritesToStorage = (ids: number[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
};
