import React, {useRef} from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';



const Item = ({ teamA, gtA, teamB, gtB, show }) => (
    <View style = {{flex: 1, flexDirection: 'row', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={{color: 'white', fontSize: 15}}>{(show > 0)?teamA:''}</Text>
        <Text style={[{position:'absolute', left:0, padding:'1%', color:"#000"}, ( (gtA[0] === 1 && show >0 ) ? {backgroundColor: 'green'} : ((gtA[0] === -1) && show >0 ? {backgroundColor: 'red'} : {opacity: 0}) )]}>{(show > 0)?'G':''}</Text>
        <Text style={[{position:'absolute', left:'10%', padding:'1%', color:"#000"}, ( (gtA[1] === 1 && show >0) ? {backgroundColor: 'green'} : ((gtA[1] === -1) && show >0 ? {backgroundColor: 'red'} : {opacity: 0}) )]}>{(show > 0)?'T':''}</Text>
        <Text style={[{position:'absolute', left:'20%', padding:'1%', color:"#000"}, ( (gtA[2] === 1 && show >0) ? {backgroundColor: 'green'} : ((gtA[2] === -1) && show >0 ? {backgroundColor: 'red'} : {opacity: 0}) )]}>{(show > 0)?'D':''}</Text>
      </View>
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={{color: 'white', fontSize: 15}}>{(show > 0)?teamB:''}</Text>
        <Text style={[{position:'absolute', right:'20%', padding:'1%', color:"#000"}, ( (gtB[0] === 1) ? {backgroundColor: 'green'} : ((gtB[0] === -1) ? {backgroundColor: 'red'} : {opacity: 0}) )]}>{(show > 0)?'G':''}</Text>
        <Text style={[{position:'absolute', right:'10%', padding:'1%', color:"#000"}, ( (gtB[1] === 1) ? {backgroundColor: 'green'} : ((gtB[1] === -1) ? {backgroundColor: 'red'} : {opacity: 0}) )]}>{(show > 0)?'T':''}</Text>
        <Text style={[{position:'absolute', right:0, padding:'1%', color:"#000"}, ( (gtB[2] === 1) ? {backgroundColor: 'green'} : ((gtB[2] === -1) ? {backgroundColor: 'red'} : {opacity: 0}) )]}>{(show > 0)?'D':''}</Text>
      </View>
    </View>
  );
  
  const RenderItem = ({ item, index }) => (
      <Item teamA={item === '' ? '' : (item.score.team1 + 200*item.gtd.team1[0] + 100*item.gtd.team1[1] + 200*item.gtd.team1[2])}
            teamB={item === '' ? '' : (item.score.team2 + 200*item.gtd.team2[0] + 100*item.gtd.team2[1] + 200*item.gtd.team2[2])}
            gtA={item === '' ? '' : (item.gtd.team1)}
            gtB = {item === '' ? '' : (item.gtd.team2)}
            show={index}
            

      />
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