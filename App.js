import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const CustomButton = ({ onPress, title, size, color }) => {
  return (
  <TouchableOpacity onPress={onPress} style={{
    flex: 1,
    margin: 1,
    backgroundColor: '#009688',
    justifyContent: 'center',
  }}>
    <Text style={[{
                    color: 'white',
                    padding:7,
                    fontWeight: 'bold',
                    alignSelf:'center',
                    textTransform: 'uppercase'
                  },
                    color && { color }
                ]}>
        {title}
    </Text>
  </TouchableOpacity>
  );
};

const Item = ({ teamA, teamB, show }) => (
  <View style = {{flex: 1, flexDirection: 'row', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={{color: 'white'}}>{(show > 0)?teamA:''}</Text>
    </View>
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={{color: 'white'}}>{(show > 0)?teamB:''}</Text>
    </View>
  </View>
);

const renderItem = ({ item, index }) => (
    <Item teamA={item.teamA} teamB={item.teamB} show={index} />
);

const App: () => React$Node = () => {

  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [allScores, setAllScores] = useState([0, 0, 0, 0]);
  const [scoreList, setScoreList] = useState([{id: 0, teamA: 0, teamB: 0}]);
  const [totalGames, setTotalGames] = useState(1);
  
  const addScoreGT = function(amount, team) {
    if ( allScores[(team * 2) + 1] + amount < 201 && allScores[(team * 2) + 1] + amount > -301) {
      allScores[(team * 2) + 1] += amount;
      setScoreA(allScores[0] + allScores[1]);
      setScoreB(100 - allScores[0] + allScores[3]);
    }
  }

  const addScore = function(amount, team) {
    let temp = 0;
    if (team == 0)
      temp = 1;
    else
      temp = 0;
    if (allScores[team * 2] + amount > -26 && allScores[team * 2] + amount < 126) {
      allScores[team * 2] += amount;
      allScores[temp * 2] = 100 - allScores[team * 2];
    }
    setScoreA(allScores[0] + allScores[1]);
    setScoreB(100 - allScores[0] + allScores[3]);
  }

  if (this.flatList) {
    setTimeout(() => this.flatList.scrollToEnd({animated: true}), 150)
  }

  return (
    <SafeAreaView style = {styles.container}>

      <View style={{flex: 1, flexDirection:'column', justifyContent:'center', alignItems: 'center'}}>
        <View style={{flex: 0.3, flexDirection: 'row'}}>
          <Text style={styles.teams}>
              Team A 
          </Text>
          <Text style={styles.teams}>
              Team B 
          </Text>
        </View>

        <View style={{flex: 0.15, flexDirection: 'row'}}>
          <Text style={styles.teams}> {scoreList[0].teamA} </Text>
          <Text style={styles.teams}> {scoreList[0].teamB} </Text>

        </View>
      </View>

      <View style={{ flex: 3 }}>
        <FlatList
              data={scoreList}
              renderItem={renderItem}
              ref={ref => this.flatList = ref}
              keyExtractor={(item, index) => index.toString()}
              onContentSizeChange={() => this.scrollToEnd()}
        />
      </View>


      <View style={styles.bottomScreen}>
        <View style={{ flex: 1 }}>
          <CustomButton title='grand' color='green' onPress={() => {addScoreGT(200, 0)} } />
          <CustomButton title='grand' color='red' onPress={() => {addScoreGT(-200, 0)} } />
          <CustomButton title='tichu' color='green' onPress={() => {addScoreGT(100, 0)} } />
          <CustomButton title='tichu' color='red' onPress={() => {addScoreGT(-100, 0)} } />
        </View>
        <View style={{ flex: 2, marginRight: 5}}>
          <View style={{flex: 1, justifyContent:'center'}}>
            <Text style={styles.scoreText}>
              {scoreA}
            </Text>
          </View>
          <View style={styles.pureScoreButtons}>
            <CustomButton title='-5' onPress={() => {addScore(-5, 0)} } />
            <CustomButton title='-10' onPress={() => {addScore(-10, 0)} } />
          </View>
          <View style={styles.pureScoreButtons}>
            <CustomButton title='5' onPress={() => {addScore(5, 0)} } />
            <CustomButton title='10' onPress={() => {addScore(10, 0)} } />

          </View>
          <View style={styles.pureScoreButtons}>
            <CustomButton title='20' onPress={() => {addScore(20, 0)} } />
            <CustomButton title='50' onPress={() => {addScore(50, 0)} } />

          </View>

        </View>
        <View style={{ flex: 2, marginLeft: 5}}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.scoreText}>
              {scoreB}
            </Text>
          </View>
          <View style={styles.pureScoreButtons}>
            <CustomButton title='-5' onPress={() => {addScore(-5, 1)} } />
            <CustomButton title='-10' onPress={() => {addScore(-10, 1)} } />
          </View>
          <View style={styles.pureScoreButtons}>
            <CustomButton title='5' onPress={() => {addScore(5, 1)} } />
            <CustomButton title='10' onPress={() => {addScore(10, 1)} } />

          </View>
          <View style={styles.pureScoreButtons}>
            <CustomButton title='20' onPress={() => {addScore(20, 1)} } />
            <CustomButton title='50' onPress={() => {addScore(50, 1)} } />

          </View>

        </View>
        <View style={{flex: 1}}>
          <CustomButton title='grand' color='green' onPress={() => {addScoreGT(200, 1)} } />
          <CustomButton title='grand' color='red' onPress={() => {addScoreGT(-200, 1)} } />
          <CustomButton title='tichu' color='green' onPress={() => {addScoreGT(100, 1)} } />
          <CustomButton title='tichu' color='red' onPress={() => {addScoreGT(-100, 1)} } />
        </View>

      </View>

      <View style = {styles.footer}>
        <View style={styles.footerButtons}>
          <CustomButton title="Add Score" onPress={()=> {
            scoreList[0].teamA += scoreA;
            scoreList[0].teamB += scoreB;
            setScoreList([...scoreList, 
            {
              id: totalGames,
              teamA: scoreA,
              teamB: scoreB,
            }]);
            setTotalGames(totalGames+1);
            setScoreA(0);
            setScoreB(0);
            setAllScores([0,0,0,0]);
          }} />
        </View>
        <View style={styles.footerButtons}>
          <CustomButton title='Remove last round' onPress={() => {
            scoreList[0].teamA -= scoreList[totalGames-1].teamA;
            scoreList[0].teamB -= scoreList[totalGames-1].teamB;
            setScoreList(scoreList.slice(0,-1));
            setTotalGames(totalGames-1);
            setScoreA(0);
            setScoreB(0);
            setAllScores([0,0,0,0]);
          }}/>
          </View>
        </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
  },
  topScreen: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'row',
  },
  teams: {
    color:'white',
    flex: 1,
    textAlign: 'center'
  },
  midScreen: {

  },

  bottomScreen: {
    flex: 2,
    flexDirection: 'row'
  },
  pureScoreButtons: { 
    flex: 1,
    flexDirection: 'row' 
},
scoreText: {
  color:'white',
  justifyContent:'center',
  alignSelf: 'center'
},
footerButtons: {
  marginLeft: 20,
  marginTop: 10,
  marginRight: 20
},
footer: {
  flex: 0.4,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row', 
}

});

export default App;
