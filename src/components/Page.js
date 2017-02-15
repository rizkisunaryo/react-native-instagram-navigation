import React, {Component, PropTypes} from 'react';
import {
  ListView,
  Text,
  View,
} from 'react-native';
import uuidV4 from 'uuid/v4';

import Constant from '../Constant';
import SPFullScreen from './subpages/SPFullScreen';
import SPHome from './subpages/SPHome';
import SPLove from './subpages/SPLove';
import SPProfile from './subpages/SPProfile';
import SPSearch from './subpages/SPSearch';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subpageData: [],
    };

    this._exitFullscreen = this._exitFullscreen.bind(this);
  }

  componentDidMount() {
    let {containerOf, page} = this.props;
    let {subpageData} = this.state;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let id = uuidV4();
    if (containerOf !== Constant.PAGE.FULLSCREEN) {
      let subpageType;
      switch (containerOf) {
        case Constant.PAGE.HOME:
          subpageType = Constant.SUBPAGE.SPHome;
          break;
        case Constant.PAGE.LOVE:
          subpageType = Constant.SUBPAGE.SPLove;
          break;
        case Constant.PAGE.PROFILE:
          subpageType = Constant.SUBPAGE.SPProfile;
          break;
        case Constant.PAGE.SEARCH:
          subpageType = Constant.SUBPAGE.SPSearch;
          break;
      }
      subpageData.push({id, subpageType});
    }

    this.setState({
      dataSource: ds.cloneWithRows(subpageData),
      subpageData,
    })

    if (containerOf === page.page) {
      this.props.setCurrentSubpageId(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.nextSubpage.flagNew !== nextProps.nextSubpage.flagNew) {
      if (nextProps.nextSubpage.containerPage
        === nextProps.containerOf) {
        let id = uuidV4();
        let {subpageType, data} = nextProps.nextSubpage;

        this.props.setCurrentSubpageId(id);

        // for scroll, to prevent intermittance,
        // we get subpageData length before pushed new data
        let subpageDataPrevLength = this.state.subpageData.length;

        this.state.subpageData.push({id, subpageType, data});
        this.setState({
          subpageData: this.state.subpageData,
          dataSource: this.state.dataSource.cloneWithRows(
            this.state.subpageData
          ),
        }, () => {
          let scrollToNext = () => {
            if (this.pageScrollWidth <
              (subpageDataPrevLength + 1) * Constant.DIMENSION.WINDOW_WIDTH) {
              setTimeout(scrollToNext, 100);
            }
            else {
              let x = subpageDataPrevLength * Constant.DIMENSION.WINDOW_WIDTH;
              this.subpageScroll.scrollTo({x, animated:false});
            }
          }
          scrollToNext();
        })
      }
    }
    if (this.props.backSubpage.flagNew !== nextProps.backSubpage.flagNew) {
      if (nextProps.backSubpage.containerPage
        === nextProps.containerOf) {
        if (this.state.subpageData.length > 1) {
          this.state.subpageData.pop();

          let lastSubpageIndex = this.state.subpageData.length - 1;
          let lastSubpage = this.state.subpageData[lastSubpageIndex];
          this.props.setCurrentSubpageId(lastSubpage.id);

          this.setState({
            subpageData: this.state.subpageData,
            dataSource: this.state.dataSource.cloneWithRows(
              this.state.subpageData
            ),
          }, () => {
            let x = lastSubpageIndex * Constant.DIMENSION.WINDOW_WIDTH;
            this.subpageScroll.scrollTo({x, animated:false});
          })
        }
        else if (nextProps.containerOf === Constant.PAGE.FULLSCREEN
          && this.state.subpageData.length === 1) {
          this._exitFullscreen();
        }
        else {
          this.props.setBackPage();
        }
      }
    }
    if (this.props.pressSameButton.flagNew
      !== nextProps.pressSameButton.flagNew) {
      if (nextProps.pressSameButton.page === nextProps.containerOf) {
        this.props.setCurrentSubpageId(this.state.subpageData[0].id);
        if (this.state.subpageData.length > 1) {
          this.subpageScroll.scrollTo({x:0, animated:false});
          this.state.subpageData.length = 1;
          this.setState({
            subpageData: this.state.subpageData,
            dataSource: this.state.dataSource.cloneWithRows(
              this.state.subpageData
            ),
          });
        }
        else {
          this.props.setSubpageScrollTop(
            this.props.containerOf, this.state.subpageData[0].id);
        }
      }
    }
    if (this.props.askPageToSetCurrentSubpageId.flagNew
      !== nextProps.askPageToSetCurrentSubpageId.flagNew
      && nextProps.askPageToSetCurrentSubpageId.containerPage
        === nextProps.containerOf) {
      let lastSubpage =
        this.state.subpageData[this.state.subpageData.length - 1];
      this.props.setCurrentSubpageId(lastSubpage.id);
    }
    if (this.props.exitFullscreen.flagNew
      !== nextProps.exitFullscreen.flagNew
      && nextProps.containerOf === Constant.PAGE.FULLSCREEN) {
      this._exitFullscreen();
    }
  }

  _exitFullscreen() {
    this.setState({subpageData:[]});
    this.props.setHideFullscreen();
    this.props.setBackPage();
  }

  render() {
    let {backgroundColor, containerOf} = this.props;

    let {dataSource} = this.state;

    let _content = () => {
      if (dataSource) {
        return (
          <View style={{width:Constant.DIMENSION.WINDOW_WIDTH}}>
            <ListView ref={e => this.subpageScroll = e} horizontal={true}
              scrollEnabled={false}
              enableEmptySections={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              initialListSize={1}
              pageSize={1}
              scrollRenderAheadDistance={Constant.DIMENSION.WINDOW_WIDTH}
              removeClippedSubviews={true}
              style={{width:Constant.DIMENSION.WINDOW_WIDTH, backgroundColor}}
              dataSource={dataSource}
              onContentSizeChange={(contentWidth, contentHeight) => {
                this.pageScrollWidth = contentWidth;
              }}
              renderRow={(rowData) => {
                let SubPage = null;
                switch (rowData.subpageType) {
                  case Constant.SUBPAGE.SPFullScreen:
                    SubPage = SPFullScreen;
                    break;
                  case Constant.SUBPAGE.SPHome:
                    SubPage = SPHome;
                    break;
                  case Constant.SUBPAGE.SPLove:
                    SubPage = SPLove;
                    break;
                  case Constant.SUBPAGE.SPProfile:
                    SubPage = SPProfile;
                    break;
                  case Constant.SUBPAGE.SPSearch:
                    SubPage = SPSearch;
                    break;
                }
                if (SubPage !== null) {
                  return (
                    <SubPage key={rowData.id} id={rowData.id}
                      containerPage={containerOf} />
                  )
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
              }} />
          </View>
        );
      }
      else {
        return null;
      }
    }

    return _content();

  }
}

Page.propTypes = {
  containerOf: PropTypes.string.isRequired,
};

Page.defaultProps = {
  backgroundColor: 'rgba(0,0,0,0)',
};



import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../redux/Actions';

const mapStateToProps = (state, ownProps) => {
  return {
    askPageToSetCurrentSubpageId: state.askPageToSetCurrentSubpageId,
    backSubpage: state.backSubpage,
    exitFullscreen: state.exitFullscreen,
    nextSubpage: state.nextSubpage,
    page: state.page,
    pressSameButton: state.pressSameButton,
  }
}

export default connect(
  mapStateToProps,
  function(dispatch, ownProps) {
    return bindActionCreators(Actions, dispatch)
  },
)(Page)
