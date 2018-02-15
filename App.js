import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator} from 'react-navigation';
import LocationList from './app/LocationList';
import LocationDetails from './app/LocationDetails';

const Application = StackNavigator({
  Home: { screen: LocationList },
  LocationDetails: { screen: LocationDetails},
  }, {
      navigationOption: {
        header: false,
      }    
});

export default class App extends Component<{}> {
  render() {
    return (
      <Application />
    );
  }
}