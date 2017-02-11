import React, {Component} from 'react';
import { Provider } from 'react-redux';

import App from './components/App';
import {store} from './redux/Store';

console.disableYellowBox = true;

class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Main;
