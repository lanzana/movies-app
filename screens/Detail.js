import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import {getMovies} from '../services/services';
import StarRating from 'react-native-star-rating';

const placeHolderImage = require('../assets/images/placeholder.png');

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [movieDetail, setMovieDetail] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getMovies(movieId)
      .then(movieData => {
        setMovieDetail(movieData);
        setLoaded(true);
      })
      .catch(() => {
        //caso ocorra algum problema na api é usado outro state para apresentar o erro
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [movieId]);
  return (
    <React.Fragment>
      {loaded && (
        <ScrollView>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={
              movieDetail.poster_path
                ? {
                    uri:
                      'https://image.tmdb.org/t/p/w500' +
                      movieDetail.poster_path,
                  }
                : placeHolderImage
            }></Image>
          <View style={styles.container}>
            <Text style={styles.movieTitle}>{movieDetail.title}</Text>
            {movieDetail.genres && (
              <View style={styles.genresContainer}>
                {movieDetail.genres.map(genre => {
                  return (
                    <Text style={styles.gender} key={genre.id}>
                      {genre.name}
                    </Text>
                  );
                })}
              </View>
            )}
            <StarRating
              disabled={true}
              fullStarColor={'gold'}
              maxStars={5}
              starSize={30}
              rating={movieDetail.vote_average / 2}
            />
            {/* <Text style={styles.voteText}>{movieDetail.vote_average}</Text> */}
          </View>
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size={'large'}></ActivityIndicator>}
      {error && <Error></Error>}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get('screen').height / 2,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  gender: {
    marginRight: 10,
    fontWeight: 'bold',
    marginTop: 20,
  },
  voteText: {
    fontWeight: 'bold',
  },
});

export default Detail;
