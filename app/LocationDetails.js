import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import MapView from 'react-native-maps';
import { StackNavigator} from 'react-navigation';
import { Container, DeckSwiper, Card, CardItem, Left } from 'native-base';

export default class LocationDetails extends Component<{}> {
 
  static navigationOptions = ({navigation}) => ({title:`${navigation.state.params.data.city}`});

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.props.navigation.state.params.data.latitude,
            longitude: this.props.navigation.state.params.data.longitude,
            latitudeDelta:0.0434,
            longitudeDelta:0.0431,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.props.navigation.state.params.data.latitude,
              longitude: this.props.navigation.state.params.data.longitude,
            }}
          />
        </MapView>
        <Container>
          <View>
            <DeckSwiper dataSource={this.props.navigation.state.params.data.places}
              renderItem={(item,index)=>
                <Card style={{ elevation: 1 }}>
                  <CardItem style={styles.locationplaces}>
                    
                    <Text style={styles.citytext}>{item.placename} {item.no}/3</Text>                  
                    <Text style={styles.desctext}>{item.desc}</Text> 
                    <View style={styles.container1}>
                      <TouchableOpacity>
                        <Image style={styles.places}
                        source={{uri : item.img1}} 
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={styles.places}
                        source={{uri : item.img2}} 
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={styles.places}
                        source={{uri : item.img3}} 
                        />
                      </TouchableOpacity>
                    </View>
                    
                    <View style={styles.container1}>
                      <TouchableOpacity>
                        <Image
                          style={styles.direction} 
                          source={require('./direction.png')} 
                        />
                      </TouchableOpacity>
                      <Text>{item.no}/3</Text>
                      <TouchableOpacity>
                        <Image
                          style={styles.uber} 
                          source={require('./uber.png')} 
                        />
                      </TouchableOpacity>
                    </View>
                  </CardItem>
                </Card>
              }>
            </DeckSwiper>
          </View>
        </Container> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  desctext: { 
  marginRight: 5, 
  color:'#8b8b8b'
  },
  uber: {
    width: 77,
    height: 77,
    marginLeft:166,
    marginRight: 15
  },
  direction: {
    width: 77,
    height: 77,
    marginLeft:25
  },
  map: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 358,
    height:240 
  }, 
  container1: {
    flexDirection:'row',
    marginTop:5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    marginBottom:5
  }, 
  places: {
    width: 110,
    height: 71,
    padding: 5,
    marginLeft:1,
    marginBottom:2
  },
  citytext: {
    color: '#cccccc',
    fontSize: 23, 
    fontWeight: 'bold',
    position: 'relative',
    textShadowColor: '#666666',
    textShadowRadius: 10,
    textShadowOffset: {width: 1, height: 1}
  },
  locationplaces:{
    borderRadius: 7, 
    borderWidth: 1.3,
    borderColor: '#d6d7da', 
    marginLeft: 2, 
    marginRight: 2, 
    marginBottom: 5,
    marginTop:5,
    flexDirection: 'column',
    backgroundColor: '#ffff'
  }, 
  photo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    width:  250,
    padding: 5
  },  
});
