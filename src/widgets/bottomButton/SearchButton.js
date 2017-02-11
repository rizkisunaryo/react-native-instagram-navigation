import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import Constant from '../../Constant';

class SearchButton extends Component {
  render() {
    let {page} = this.props;

    let _content = () => {
      if (page.page === Constant.PAGE.SEARCH) {
        return (
          <TouchableOpacity
            style={Constant.STYLE.BOTTOM_BUTTON_STYLE}
            activeOpacity={1}
            onPress={() => {
              this.props.setPressSameButton(Constant.PAGE.SEARCH);
            }}>
            <Image source={require('../../assets/img/search_black.png')}
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
              this.props.changePage(Constant.PAGE.SEARCH);
            }}>
            <Image source={require('../../assets/img/search_gray.png')}
              style={Constant.STYLE.BOTTOM_BUTTON_IMAGE_STYLE}
              resizeMode='contain' />
          </TouchableOpacity>
        )
      }
    }

    return _content();
  }
}

SearchButton.defaultProps = {};


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
)(SearchButton)
