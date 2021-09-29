import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=db7a0e2568ef2a325d6bcc4ee16a39ee';
//axios eh usado para conectar com api e receber o json do sucesso
//`${apiUrl}/movie/popular?${apiKey}`) seria a mesma coisa que apiUrl + '/movie/popular?' + apiKey

export const getPopularMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return resp.data.results;
};

export const getUpcomingMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return resp.data.results;
};

export const getPopularTvShows = async () => {
  const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return resp.data.results;
};

export const getMovies = async id => {
  const resp = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return resp.data;
};
