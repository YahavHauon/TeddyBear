import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import Swiper from 'react-native-dynamic-deck-swiper';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './util/colors';
import Card from './Components/Card';
import ChampionsContext, { ChampionsContextProvider } from './store/champions-context';
import { useContext, useEffect } from 'react';
import Navigation from './Navigation';

export default function App() {
  return (
    <ChampionsContextProvider>
      <Navigation />
    </ChampionsContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    backgroundColor: colors.backgroundColor,
  },
  toolBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    marginTop: 20,
    alignSelf: 'center',
    height: '80%',
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 16,
  },
  logo: {
    marginLeft: 110,
    resizeMode: 'stretch',
    width: 185,
    height: 45,
  },
  bell: {
    marginTop: 5,
    marginRight: 15,
  },
  endOfDeck: {
    alignSelf: 'center',
    marginTop: 300,
  },
  text: {
    color: 'white',
    fontSize: 16,
  }
});
