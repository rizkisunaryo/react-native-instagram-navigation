import React, {Component} from 'react';
import {
  StatusBar, 
  View,
} from 'react-native';

import Constant from '../Constant';

export default class TopMargin extends Component {
  render() {
    return (
      <View>
        <StatusBar
         backgroundColor={this.props.backgroundColor} />
        <View
          style={{height:Constant.DIMENSION.TOP_MARGIN_HEIGHT,
            backgroundColor:this.props.backgroundColor}}>

        </View>
      </View>
    );
  }
}

TopMargin.defaultProps = {
  backgroundColor: 'rgba(0,0,0,0)'
}
