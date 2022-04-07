import React, {useRef} from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';

const Item = ({ teamA, teamB, show }) => (
    <View style = {{flex: 1, flexDirection: 'row', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={{color: 'white', fontSize: 15}}>{(show > 0)?teamA:''}</Text>
      </View>
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={{color: 'white', fontSize: 15}}>{(show > 0)?teamB:''}</Text>
      </View>
    </View>
  );
  
  const RenderItem = ({ item, index }) => (
      <Item teamA={item === '' ? '' : (item.score.team1 + 200*item.gtd.team1[0] + 100*item.gtd.team1[1] + 200*item.gtd.team1[2])} teamB={item === '' ? '' : item.score.team2 + 200*item.gtd.team2[0] + 100*item.gtd.team2[1] + 200*item.gtd.team2[2]} show={index} />
  );

const CustomFlatList = (props) => {
    let flatList = useRef(null);
    return (
        <View>
            <FlatList
              ref={flatList}
              data={props.scores}
              renderItem={RenderItem}
              keyExtractor={(item, index) => index.toString()}
              onContentSizeChange={() => (flatList.current.scrollToEnd())}
            />
        </View>
    );
}

export default CustomFlatList;