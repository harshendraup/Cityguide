import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Alert,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator
} from 'react-native';

import { SearchBar } from 'react-native-elements';
import { StackNavigator} from 'react-navigation';
import Locations from './locations.json';
import { createStore } from 'redux';
import { Dimensions } from 'react-native';
import RNShineButton from 'react-native-shine-button';
var {height, width} = Dimensions.get('window');


export default class App extends Component {


  static navigationOptions = {
    header:  false,
  }

  constructor(props) {
    super(props);
    this.onPress = this.locationupdate.bind(this);

    this.state = {
      isLoading: true,
      whetherR: 'fetching', 
      text: '', 
    }
    this.arrayholder = [];
  }
  componentDidMount() {
    fetch("http://api.openweathermap.org/data/2.5/group?id=1269515,1273294,1253405,1262117,1712808,1257479,1277214&units=metric&appid=97085275226abc9142d0de1e545d758e")
    .then(r => r.json())
    .then(weather => {
      for(var i=0; i<Locations.length; i++)
      {
        for(var j=0; j<weather.list.length;j++)
        {
          if(weather.list[j].id==Locations[i].id)
          {
            Locations[i].temp = weather.list[j].main.temp;
            Locations[i].main = weather.list[j].weather[0].main;
          }
        }
      };
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
      this.setState({ 
        isLoading:false,
        dataSource: ds.cloneWithRows(Locations),
        }, function(){

            this.arrayholder = Locations;
          }
      );
    })
    .catch((error) => {
      console.error(error);
    });
  } 

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text style={styles.maintitle}> CITY GUIDE </Text>
          <Text style={styles.subtitle}> APP FOR TRAVELERS</Text>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}> 
        <SearchBar 
          round
          containerStyle={styles.searchbox}
          inputStyle={styles.input}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          value= {this.state.text}
          clearIcon={{ color: '#86939e', name: 'clear'}}
          placeholder="Search Cities"
          noIcon={true}   
        />    
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections={true}
        >
        </ListView>        
      </View>      
    );
  }

  renderRow(rowData){
    return (
      <View style = {styles.locationview}> 
        <ImageBackground
          style={styles.locationimage}
          source={{uri: rowData.image}}> 
          <Text style = {styles.citytext}>{rowData.city}</Text>
            <RNShineButton
              marginLeft={5} 
              shape={"heart"} 
              color={"#ffffff"} 
              fillColor={"#ff0000"} 
              size={80}
              alignItems='flex-end'
              onChange={() => this.locationupdate(`${rowData.city}`)}
            />
          <Text style = {styles.temptext}> {rowData.temp}`C {rowData.main}</Text>
        </ImageBackground>           
        <Text style = {styles.desctext}>{rowData.desc}</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this.props.navigation.navigate('LocationDetails',{data:rowData});}}>
          <Text style={styles.buttonText}> MORE ABOUT {rowData.city} </Text>
        </TouchableOpacity>
      </View>  
    );
  }
  SearchFilterFunction(text){
    const newData =  this.arrayholder.filter(function(item){
    const itemData = item.city.toUpperCase()
    const textData = text.toUpperCase()
    return itemData.indexOf(textData) > -1
  })

   this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      text: text,
   });
  }
  //Code for favorite location using redux
  locationupdate(city){

    const reducer = function (state, action){
      if(action.type === "JAIPUR"){
        return action.favlocation;
      }
      if(action.type === "NEW DELHI"){
        return action.favlocation;
      }
      return state;
    }
  
    const store = createStore(reducer, city);

    store.subscribe(() => {
      console.log("Now favorite location is "+ store.getState());
    })

    store.dispatch({type: city, favlocation: city});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'

  },
  searchbox:{
   backgroundColor: '#ededed',
   alignItems: 'center',
   justifyContent:'center'
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.21)',
    marginBottom: 5,
    color: '#8b8b8b',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    marginLeft: 5, 
    marginRight: 5,
    width: 350,
    backgroundColor: '#cccccc',
    justifyContent: 'center',
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
  maintitle:{
    color: '#aeadad',
    fontSize: 50, 
    fontWeight: 'bold',
  },
  subtitle:{
    color: '#cccccc',
    fontSize: 20, 
    fontWeight: 'bold',
  },
  locationview: {
    borderRadius: 0, 
    borderWidth: 0.3, 
    borderColor: '#e5e5e5', 
    padding: 0,
    marginBottom: 10,
    marginTop: 0,
    backgroundColor: '#ededed',
  },
  locationimage: {
  width: width-0, 
  height: 175,    
  borderRadius: 0, 
  flexDirection: 'row',
  padding: 5,
  marginRight:2
  },
  desctext: {
  marginLeft: 8,
  marginRight: 8,
  marginTop: 2,
  marginBottom: 2,
  color:'#8b8b8b'
  },
  heart: {
    width: 30,
    height: 30,
    paddingRight:10
  },
  temptext: {
    color: '#FFC300',
    fontSize: 18, 
    fontWeight: 'bold',
    alignItems: 'baseline',
    marginLeft: 15
  },
  buttonContainer: {
    backgroundColor:'#2980b9',
    padding: 15,
    borderRadius: 0,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10
  },
  buttonText: {
    textAlign:'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }
});