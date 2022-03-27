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
      <Item teamA={item.teamA} teamB={item.teamB} show={index} />
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