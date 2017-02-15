import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';
import Constant from '../Constant';
import * as NavigationHelper from '../helper/NavigationHelper';
import SPHome from './subpages/SPHome';

class SubPageContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.subpageScrollTop.flagNew
      !== nextProps.subpageScrollTop.flagNew
      && nextProps.subpageScrollTop.containerPage
        === nextProps.containerPage
      && nextProps.subpageScrollTop.subpageId === nextProps.id) {
      if (this.subPage && this.subPage.subpageScroll) {
        this.subPage.subpageScroll.scrollTo({y:0, animated:true});
      }
    }
    if (this.props.backAndroid.flagNew !== nextProps.backAndroid.flagNew) {
      if (nextProps.page.page === nextProps.containerPage
        && nextProps.currentSubpageId.id === nextProps.id) {
        this.props.setBackSubpage(nextProps.containerPage);
      }
    }
  }

  render() {
    let {containerPage, id, subpageType} = this.props;

    let _content = () => {
      let SubPage = NavigationHelper.getSubPage(subpageType);
      if (SubPage !== null) {
        return (
          <SubPage containerPage={containerPage} id={id}
            setExitFullscreen={this.props.setExitFullscreen}
            ref={e => this.subPage = e}
            back={() => {
              if (this.props.page.page === this.props.containerPage
                && this.props.currentSubpageId.id === this.props.id) {
                this.props.setBackSubpage(containerPage);
              }
            }}
            next={(pType, pData = null) => {
              this.props.setNextSubpage(
                containerPage,
                pType,
                pData
              )
            }}/>
        );
      }
      else {
        return (
          <View
            style={{width:Constant.DIMENSION.WINDOW_WIDTH,
              height:Constant.DIMENSION.WINDOW_HEIGHT,
              backgroundColor:'white'}}>
          </View>
        )
      }
    }

    return _content();
  }
}

SubPageContainer.propTypes = {
  containerPage: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  subpageType: PropTypes.string.isRequired,
};


import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../redux/Actions';

const mapStateToProps = (state, ownProps) => {
  return {
    backAndroid: state.backAndroid,
    currentSubpageId: state.currentSubpageId,
    page: state.page,
    subpageScrollTop: state.subpageScrollTop,
  }
}

export default connect(
  mapStateToProps,
  function(dispatch, ownProps) {
    return bindActionCreators(Actions, dispatch)
  },
)(SubPageContainer)
