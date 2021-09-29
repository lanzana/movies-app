import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTvShows,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List'; //importar um arquivo PureComponent sem {}
import Error from '../components/Error';

const dimension = Dimensions.get('screen');
const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState(); //cria a constante que vai tratar o state
  const [popularMovies, setPopularMovies] = useState();
  const [popularTvShows, setPopularTvShow] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTvShows(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(([upcomingMoviesData, popularMoviesData, popularTvShowsData]) => {
        //.then usado para setar o movie usando o state aguardado
        const moviesImagesArray = [];
        upcomingMoviesData.forEach(movie => {
          moviesImagesArray.push(
            'https://image.tmdb.org/t/p/w500' + movie.poster_path,
          );
        });
        setMoviesImages(moviesImagesArray);
        setPopularMovies(popularMoviesData);
        setPopularTvShow(popularTvShowsData);

        setLoaded(true);
      })
      .catch(() => {
        //caso ocorra algum problema na api é usado outro state para apresentar o erro
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
    //useEffect nesse caso é usado para definir de quanto em quanto tempo será chamada a função getPopularMovies
  }, []); //o segundo parâmetro da useEffect é o tempo em ms que será chamada novamente a função getPopularMovies
  //nesse caso passando [] para que só execute uma vez
  return (
    <React.Fragment>
      {loaded && !error && (
        <ScrollView>
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                autoplay={true}
                sliderBoxHeight={dimension.height / 1.5}
                circleLoop={true}
                dotStyle={styles.sliderDotStyle}></SliderBox>
            </View>
          )}

          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}></List>
            </View>
          )}
          {popularTvShows && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular TV Shows"
                content={popularTvShows}></List>
            </View>
          )}
        </ScrollView>
      )}

      {!loaded && <ActivityIndicator></ActivityIndicator>}
      {error && <Error></Error>}
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
