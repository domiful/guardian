import React from 'react';
import { Container, Content, Text, H1, H2, H3, Button, Picker, Item, Icon } from 'native-base';
import Spacer from './Spacer';
import { Image, Alert } from 'react-native';


const BlenderView = () => {
  return(
    <Container>
      <Content padder>
        <H1>Blender Model</H1>
        <Image source={{ uri: "https://openclipart.org/image/300px/svg_to_png/293893/electric-blender.png&disposition=attachment" }} style={{ height: 350, width: null, flex: 1 }} />

        <Spacer size={10} />
        <Text style={{paddingLeft:15}}>Status: Powered On</Text>
        <Spacer size={10} />

        <Picker
              iosHeader="Select Function"
              headerStyle={{backgroundColor:'#CF0026'}}
              mode="dropdown"
              selectedValue={"keyx"}
              onValueChange={()=>{}}
            >
              <Item label="Select Blender Function" value="keyx" />
              <Item label="Chop" value="key0" />
              <Item label="Pulse" value="key1" />
              <Item label="Mince" value="key2" />
              <Item label="Spin" value="key3" />
              <Item label="Clean" value="key4" />
        </Picker>
        <Spacer size={10} />
        <Button full iconLeft onPress={()=>Alert.alert(
          'Message Sent',
        )}>
            <Icon name='aperture' />
            <Text>BLEND</Text>
          </Button>

        
      </Content>
    </Container>
  );
};

export default BlenderView;