import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import * as Animatable from 'react-native-animatable';


class App extends Component {
  state = {}
  render() {
    return (
      <View>
        <Header
          placement="left"
          leftComponent={{ icon: 'logo-snapchat-outline', type: 'ionicon', color: '#fff' }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <Animatable.View
          animation="rubberBand"
          duration={2000}
          delay={1000}
          iterationCount={'infinite'}
        >
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: 'https://kanzler.co.id/wp-content/themes/kanzler/img/logo-kanzler.png' }} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{ uri: 'https://kanzler.co.id/wp-content/themes/kanzler/img/logo-kanzler.png' }} style={{ height: 200, width: null, flex: 1 }} />
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Animatable.View>
      </View>
    );
  }
}

export default App;