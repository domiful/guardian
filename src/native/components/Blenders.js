import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, H1 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { SearchBar } from 'react-native-elements';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';

class BlenderListing extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    blenders: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    reFetch: PropTypes.func,
  }

  static defaultProps = {
    error: null,
    reFetch: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      blendersSearch: this.props.blenders,
      refreshing: false

    };

  }
  changeText = (e) =>{
    //this.setState({blendersSearch: []});
    var nbs = [];

    this.props.blenders.forEach((b)=>{
      if(b.title.toUpperCase().includes(e.toUpperCase())){
        console.log(this.state.blendersSearch);
        if(this.state.blendersSearch[0] === 'poop') nbs.pop('poop');
        nbs.push(b);
      }        
    });

    this.setState({blendersSearch:nbs});

  
    if(!e.length){
      this.setState({blendersSearch: this.props.blenders});
    }
}
_onRefresh() {
  console.log('aasdadasd');
  this.setState({refreshing: true},()=>{
    console.log('r');
    this.props.reFetch().then(() => {
      this.setState({refreshing: false});
    });
  });
  
}
  
render(){
  // Loading
  if (this.props.loading) return <Loading />;
  
  // Error
  if (this.props.error) return <Error content={error} />;
  const keyExtractor = item => item.id;
  const onPress = item => Actions.home({ match: { params: { id: String(item.id) } } });
  

  return (
    <Container>
      <Content 
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
        />
      }
      padder>
      <Spacer size={25} />
      <H1>Blenders</H1>
      <Spacer size={10} />
        <SearchBar
            ref={search => this.search = search}
            lightTheme
            round
            containerStyle={{'padding': 0,'backgroundColor': 'transparent', 'borderTopWidth': 0, 'borderBottomWidth': 0 }}
            onChangeText={this.changeText}
            placeholder='Search'
            onClear={()=>{}}
            />
        <FlatList
          numColumns={2}
          data={this.state.blendersSearch}
          extraData={
            this.state
          }
          renderItem={({ item }) => (
            <Card transparent style={{ paddingHorizontal: 4, maxWidth: "50%" }}>
              <CardItem cardBody>
                <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
                  <Image
                    source={{ uri: "https://openclipart.org/image/150px/svg_to_png/293893/electric-blender.png&disposition=attachment" }}
                    style={{
                      height: 150,
                      width: 150,
                      flex: 1,
                      borderRadius: 5,
                    }}
                  />
                </TouchableOpacity>
              </CardItem>
              <CardItem cardBody>
                <Body>
                  <Spacer size={10} />
                  <Text style={{ fontWeight: '800' }}>{item.title}</Text>
                  <Spacer size={15} />
                  <Spacer size={5} />
                </Body>
              </CardItem>
            </Card>
          )}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this.props.reFetch}
            />
          }
        />

        <Spacer size={20} />
      </Content>
    </Container>
  );
}
}


export default BlenderListing;

/*
  import SearchBar from 'react-native-search-bar'

  <SearchBar
              ref='searchBar'
              placeholder='Search'
              onChangeText={()=>{}}
              onSearchButtonPress={()=>{}}
              onCancelButtonPress={()=>{}}
            />
*/