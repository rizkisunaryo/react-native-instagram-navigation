import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import Constant from '../../Constant';

class AddButton extends Component {
  render() {
    let {page} = this.props;

    let _content = () => {
      if (page.page === Constant.PAGE.ADD) {
        return (
          <TouchableOpacity
            style={Constant.STYLE.BOTTOM_BUTTON_STYLE}
            activeOpacity={1}
            onPress={() => {
              this.props.setPressSameButton(Constant.PAGE.ADD);
            }}>
            <Image source={require('../../assets/img/add_black.png')}
              style={Constant.STYLE.BOTTOM_BUTTON_IMAGE_STYLE}
              resizeMode='contain' />
          </TouchableOpacity>
        )
      }
      else {
        return (
          <TouchableOpacity
            style={Constant.STYLE.BOTTOM_BUTTON_STYLE}
            activeOpacity={1}
            onPress={() => {
              this.props.changePage(Constant.PAGE.FULL_SCREEN);
              this.props.setNextSubpage(Constant.PAGE.FULL_SCREEN,
                Constant.PAGE.HOME);
            }}>
            <Image source={require('../../assets/img/add_gray.png')}
              style={Constant.STYLE.BOTTOM_BUTTON_IMAGE_STYLE}
              resizeMode='contain' />
          </TouchableOpacity>
        )
      }
    }

    return _content();
  }
}

AddButton.defaultProps = {};


import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../redux/Actions';

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.page,
  }
}

export default connect(
  mapStateToProps,
  function(dispatch, ownProps) {
    return bindActionCreators(Actions, dispatch)
  },
)(AddButton)
