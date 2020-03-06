import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/navigations/MainNavigations';
import reducers from './src/reducers'

class App extends Component {
  state = {}
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk))}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;