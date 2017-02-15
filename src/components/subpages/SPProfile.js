import React, {Component, PropTypes} from 'react';
import {
  ListView,
  Text,
  View,
} from 'react-native';
import Constant from '../../Constant';

export default class SPProfile extends Component {
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
                onPress={this.props.back}>BACK</Text>
              <Text>Profile: {id}: {rowData}</Text>
              <Text
                onPress={() => {
                  this.props.next(
                    Constant.SUBPAGE.SPProfile
                  )
                }}>NEXT</Text>
              <Text></Text>
            </View>
          )
        }} />
    );
  }
}
