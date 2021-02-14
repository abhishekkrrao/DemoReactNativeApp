import React,{ Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {
  Home,Detail,Loading
} from '../Screens'
console.disableYellowBox = true;
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from "../redux/RootReducer";
import rootSaga from "../redux/RootSagas";
import logger from 'redux-logger';
const middleware = [logger]
const enhancers = []
const sagaMiddleware = createSagaMiddleware()
middleware.push(sagaMiddleware)
enhancers.push(applyMiddleware(...middleware))
const createAppropriateStore = createStore
const store = createAppropriateStore(reducer, composeWithDevTools(...enhancers))
sagaMiddleware.run(rootSaga);

const Stack = createStackNavigator();
export default class Routes extends React.Component {
  render() {
    return (
      <Provider
        store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Loading">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: '',
                headerStyle: { backgroundColor: "#f57c00" }
              }} />
            <Stack.Screen
              name="Detail"
              component={Detail}
              options={{
                title: '',
                headerStyle: { backgroundColor: "#f57c00" }
              }} />

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}