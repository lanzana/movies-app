import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, FlatList} from 'react-native';
import {getPopularMovies, getUpcomingMovies} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List'; //importar um arquivo PureComponent sem {}

const dimension = Dimensions.get('screen');
const Home = () => {
  const [moviesImages, setMoviesImages] = useState([]); //cria a constante que vai tratar o state
  const [popularMovies, setPopularMovies] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    //useEffect nesse caso é usado para definir de quanto em quanto tempo será chamada a função getPopularMovies
    getUpcomingMovies()
      .then(movies => {
        const moviesImagesArray = [];
        movies.forEach(movie => {
          moviesImagesArray.push(
            'https://image.tmdb.org/t/p/w500' + movie.poster_path,
          );
        });
        setMoviesImages(moviesImagesArray);
      })
      .catch(erro => {
        setError(erro);
      });
    getPopularMovies()
      .then(movies => {
        //.then usado para setar o movie usando o state aguardado
        setPopularMovies(movies);
      })
      .catch(erro => {
        //caso ocorra algum problema na api é usado outro state para apresentar o erro
        setError(erro);
      });
  }, []); //o segundo parâmetro da useEffect é o tempo em ms que será chamada novamente a função getPopularMovies
  //nesse caso passando [] para que só execute uma vez
  return (
    <React.Fragment>
      <View style={styles.sliderContainer}>
        <SliderBox
          images={moviesImages}
          autoplay={true}
          sliderBoxHeight={dimension.height / 1.5}
          circleLoop={true}
          dotStyle={styles.sliderDotStyle}></SliderBox>
      </View>

      <View style={styles.carousel}>
        <List title={'Teste'} content={popularMovies}></List>
      </View>
    </React.Fragment>

    /**usado o <text> entre {} para validar se o state error não é falso, assim aparecendo  */
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderDotStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
