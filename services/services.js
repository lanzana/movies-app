import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=db7a0e2568ef2a325d6bcc4ee16a39ee';

export const getPopularMovies = async () => {
  //`${apiUrl}/movie/popular?${apiKey}`) seria a mesma coisa que apiUrl + '/movie/popular?' + apiKey
  const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  //axios eh usado para conectar com api e receber o json do sucesso
  return resp.data.results;
};

export const getUpcomingMovies = async () => {
  //`${apiUrl}/movie/upcoming?${apiKey}`) seria a mesma coisa que apiUrl + '/movie/upcoming?' + apiKey
  const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  //axios eh usado para conectar com api e receber o json do sucesso
  return resp.data.results;
};

export const getPopularTvShows = async () => {
  //`${apiUrl}/movie/popular?${apiKey}`) seria a mesma coisa que apiUrl + '/movie/popular?' + apiKey
  const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  //axios eh usado para conectar com api e receber o json do sucesso
  return resp.data.results;
};
