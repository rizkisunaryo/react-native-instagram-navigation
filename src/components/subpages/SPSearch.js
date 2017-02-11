import React, {Component, PropTypes} from 'react';
import {
  ListView,
  Text,
  View,
} from 'react-native';
import Constant from '../../Constant';

class SPSearch extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push(i);
    }
    this.state = {
      dataSource: ds.cloneWithRows(arr)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.subpageScrollTop.flagNew
      !== nextProps.subpageScrollTop.flagNew
      && nextProps.subpageScrollTop.containerPage
        === nextProps.containerPage
      && nextProps.subpageScrollTop.subpageId === nextProps.id) {
      this.subpageScroll.scrollTo({y:0, animated:true});
    }
  }

  render() {
    let {containerPage, id} = this.props;

    return (
      <ListView ref={e => this.subpageScroll = e} enableEmptySections={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        initialListSize={100}
        pageSize={100}
        scrollRenderAheadDistance={Constant.DIMENSION.WINDOW_HEIGHT}
        removeClippedSubviews={true}
        style={{backgroundColor:'white',
          width:Constant.DIMENSION.WINDOW_WIDTH}}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => {
          return (
            <View>
              <Text
                onPress={() => {
                  if (this.props.page.page === this.props.containerPage
                    && this.props.currentSubpageId.id === this.props.id) {
                    this.props.setBackSubpage(containerPage);
                  }
                }}>BACK</Text>
              <Text>Search: {id}: {rowData}</Text>
              <Text
                onPress={() => {
                  this.props.setNextSubpage(
                    containerPage,
                    Constant.SUBPAGE.SPSearch
                  )
                }}>NEXT</Text>
              <Text></Text>
            </View>
          )
        }} />
    );
  }
}

SPSearch.propTypes = {
  id: PropTypes.string.isRequired,
  containerPage: PropTypes.string.isRequired,
};


import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../redux/Actions';

const mapStateToProps = (state, ownProps) => {
  return {
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
)(SPSearch)
