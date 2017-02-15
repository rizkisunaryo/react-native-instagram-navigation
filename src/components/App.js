import React, {Component} from 'react';
import {
  BackAndroid,
  ListView,
  Text,
  View,
} from 'react-native';

import AddButton from '../widgets/bottomButton/AddButton';
import Constant from '../Constant';
import HomeButton from '../widgets/bottomButton/HomeButton';
import LoveButton from '../widgets/bottomButton/LoveButton';
import Page from './Page';
import ProfileButton from '../widgets/bottomButton/ProfileButton';
import SearchButton from '../widgets/bottomButton/SearchButton';
import TopMargin from '../widgets/TopMargin';

class App extends Component {
  constructor(props) {
    super(props);

    this.coverDimension = {
      initial: {
        width: Constant.DIMENSION.WINDOW_WIDTH,
        height: Constant.DIMENSION.WINDOW_HEIGHT,
      },
      hidden: {width:0, height:0},
    }

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      coverDimension: this.coverDimension.initial,
      dataSource: ds.cloneWithRows([
        Constant.PAGE.HOME,
        Constant.PAGE.SEARCH,
        Constant.PAGE.LOVE,
        Constant.PAGE.PROFILE,
      ]),
      fullScreenTop: Constant.DIMENSION.WINDOW_HEIGHT,
    };

    this.pageHistory = [Constant.PAGE.HOME];

    this._addToPageHistory = this._addToPageHistory.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.props.setBackAndroid();
      return true;
    });

    /*
      IF THERE IS AN ACTION AT START UP
      EXAMPLE: SHOWING LOGIN PAGE, HANDLE PUSH NOTIF, ETC
    */
    // this.props.changePage(Constant.PAGE.FULLSCREEN);
    // this.props.setNextSubpage(Constant.PAGE.FULLSCREEN,
    //   Constant.SUBPAGE.SPFullScreen);

    setTimeout(() => {
      this.setState({coverDimension: this.coverDimension.hidden});
    }, 500);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page.page !== nextProps.page.page) {
      switch (nextProps.page.page) {
        case Constant.PAGE.HOME:
          this.pageScroll.scrollTo({x:0, animated:false});
          break;
        case Constant.PAGE.SEARCH:
          this.pageScroll.scrollTo({
            x:Constant.DIMENSION.WINDOW_WIDTH, animated:false});
          break;
        case Constant.PAGE.LOVE:
          this.pageScroll.scrollTo({
            x:Constant.DIMENSION.WINDOW_WIDTH * 2, animated:false});
          break;
        case Constant.PAGE.PROFILE:
          this.pageScroll.scrollTo({
            x:Constant.DIMENSION.WINDOW_WIDTH * 3, animated:false});
          break;
        case Constant.PAGE.FULLSCREEN:
          this.setState({fullScreenTop:Constant.DIMENSION.TOP_MARGIN_HEIGHT});
          break;
      }
      if (!nextProps.page.isBack) {
        this._addToPageHistory(this.props.page.page, nextProps.page.page);
      }
      this.props.setAskPageToSetCurrentSubpageId(nextProps.page.page);
    }
    if (this.props.backPage.flagNew !== nextProps.backPage.flagNew) {
      this.props.changePageBack(this.pageHistory[this.pageHistory.length - 1]);
      this.pageHistory.pop();
    }
    if (this.props.hideFullscreen.flagNew
      !== nextProps.hideFullscreen.flagNew) {
      this.setState({fullScreenTop:Constant.DIMENSION.WINDOW_HEIGHT});
    }
    if (nextProps.startUpDone.flagNew !== '') {
      this.setState({coverDimension:this.coverDimension.hidden});
    }
  }

  _addToPageHistory(curPage, nextPage) {
    let nextPageIndex = this.pageHistory.indexOf(nextPage);
    if (nextPageIndex > -1) {
      this.pageHistory.splice(nextPageIndex, 1);
    }
    if (this.pageHistory.indexOf(curPage) < 0) {
      this.pageHistory.push(curPage);
    }
    console.log(this.pageHistory);
  }

  render() {
    let {coverDimension, dataSource, fullScreenTop} = this.state;

    return (
      <View>
        <TopMargin backgroundColor='#B2B2B2' />
        <View style={{height:Constant.DIMENSION.CONTENT_HEIGHT}}>
          <ListView ref={e => this.pageScroll = e} enableEmptySections={true}
            scrollEnabled={false}
            horizontal={true} showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            initialListSize={5}
            pageSize={1}
            scrollRenderAheadDistance={0}
            removeClippedSubviews={true}
            style={{width:Constant.DIMENSION.WINDOW_WIDTH}}
            dataSource={dataSource}
            renderRow={(rowData) => <Page containerOf={rowData} />} />
        </View>
        <View
          style={{width:Constant.DIMENSION.WINDOW_WIDTH,
            height:Constant.DIMENSION.BOTTOM_BAR_HEIGHT,
            backgroundColor:'#FAFAFA', flexDirection:'row',
            justifyContent:'space-between', borderTopWidth:0.5,
            borderTopColor:'#C6C6C6'}}>
          <HomeButton />
          <SearchButton />
          <AddButton />
          <LoveButton />
          <ProfileButton />
        </View>
        <View
          style={{height:Constant.DIMENSION.FULLSCREEN_CONTENT_HEIGHT,
            top:fullScreenTop, position:'absolute'}}>
          <Page containerOf={Constant.PAGE.FULLSCREEN}
            backgroundColor='white' />
        </View>

        {/* cover at start up*/}
        <View
          style={{...coverDimension, top:0, left:0,
            position:'absolute', backgroundColor:'white'}}></View>
      </View>
    );
  }
}

App.defaultProps = {};


import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../redux/Actions';

const mapStateToProps = (state, ownProps) => {
  return {
    backPage: state.backPage,
    hideFullscreen: state.hideFullscreen,
    page: state.page,
    startUpDone: state.startUpDone,
  }
}

export default connect(
  mapStateToProps,
  function(dispatch, ownProps) {
    return bindActionCreators(Actions, dispatch)
  },
)(App)
