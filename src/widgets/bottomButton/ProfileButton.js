import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import Constant from '../../Constant';

class ProfileButton extends Component {
  render() {
    let {page} = this.props;

    let _content = () => {
      if (page.page === Constant.PAGE.PROFILE) {
        return (
          <TouchableOpacity
            style={Constant.STYLE.BOTTOM_BUTTON_STYLE}
            activeOpacity={1}
            onPress={() => {
              this.props.setPressSameButton(Constant.PAGE.PROFILE);
            }}>
            <Image source={require('../../assets/img/profile_black.png')}
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
              this.props.changePage(Constant.PAGE.PROFILE);
            }}>
            <Image source={require('../../assets/img/profile_gray.png')}
              style={Constant.STYLE.BOTTOM_BUTTON_IMAGE_STYLE}
              resizeMode='contain' />
          </TouchableOpacity>
        )
      }
    }

    return _content();
  }
}

ProfileButton.defaultProps = {};


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
)(ProfileButton)
