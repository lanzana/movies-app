import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {getPopularMovies} from '../services/services';

const Home = () => {
  const [movie, setMovie] = useState(''); //cria a constante que vai tratar o state
  const [error, setError] = useState(false);
  useEffect(() => {
    //useEffect nesse caso é usado para definir de quanto em quanto tempo será chamada a função getPopularMovies
    getPopularMovies()
      .then(movies => {
        //.then usado para setar o movie usando o state aguardado
        setMovie(movies[0]);
      })
      .catch(erro => {
        //caso ocorra algum problema na api é usado outro state para apresentar o erro
        setError(erro);
      });
  }, []); //o segundo parâmetro da useEffect é o tempo em ms que será chamada novamente a função getPopularMovies
  //nesse caso passando [] para que só execute uma vez
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Movie Name: {movie.original_title}</Text>
      <Text>Language: {movie.original_language}</Text>
      <Text>Release Date: {movie.release_date}</Text>
      {error && <Text style={{color: 'red'}}>Error in the server!</Text>}
    </View>
    /**usado o <text> entre {} para validar se o state error não é falso, assim aparecendo  */
  );
};

export default Home;
