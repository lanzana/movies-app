import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  View,
  Modal,
} from 'react-native';
import {getMovies} from '../services/services';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';

const placeHolderImage = require('../assets/images/placeholder.png');

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [movieDetail, setMovieDetail] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const videoShown = () => {
    setModalVisible(true);
  };

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
        <View>
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
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>
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

              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>
                {'Release Date: ' +
                  dateFormat(movieDetail.release_date, 'mm/dd/yyyy')}
              </Text>
              {/* <Text style={styles.voteText}>{movieDetail.vote_average}</Text> */}
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}>
            <View style={styles.videoModal}></View>
          </Modal>
        </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  overview: {
    padding: 15,
  },
  release: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;
