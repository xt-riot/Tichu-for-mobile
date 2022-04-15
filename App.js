import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  Pressable,
  ScrollView,
  AppState
} from 'react-native';

import CustomButton from './src/CustomButton';
import CustomFlatList from './src/FlatList';
import { loadDatabase, deleteDatabase, saveDatabase } from './src/Database';
import { newGame, newRound, addScores, removeRound } from './src/NewGame';

const App: () => React$Node = () => {

  const [buttonState, setButtonState] = useState(false);
  const [col, setColor] = useState(['white', 'white']);
  const [modalVisible, setModalVisible] = useState(false);

  const [db, setDB] = useState([]);
  const [game, setGame] = useState();
  const [round, setRound] = useState();

  useEffect(() => {
    const firstLoad = async () => {
      let t = await loadDatabase();
      t instanceof Array ? setDB(t) : setDB([t]);
      if (t === null) setDB([]);
      setGame(newRound(newGame()));
    }
    firstLoad();
   }, []);

   useEffect(() => {
     setColor(['white', 'white']);
     setButtonState(false);
   } ,[game]);

  useEffect(() => {
    const savedb = async () => {
      await saveDatabase(db);
    }
    savedb();
  }, [db]);

  const addScore = (amount, team) => {
    setGame(addScores(game, amount, team));
    let temp = [];
    let round = game.data.rounds[0];
    round.gtd.team1[2] === 1 ? temp.push('green') : temp.push('white');
    round.gtd.team2[2] === 1 ? temp.push('green') : temp.push('white');
    (round.gtd.team1[2] + round.gtd.team2[2] === 1) ? setButtonState(true) : setButtonState(false);
    setColor(temp);
  };

  const loadGame = (id) => {
    resetButton(false);
    db.forEach((item,idx) => {
      if (idx === id) setGame(item);
    });
  };

  const addScoreButton = () => {
    setGame(newRound(game));
    setButtonState(false);
    setColor(['white', 'white']);
  };

  const removeRoundButton = () => {
    setGame(removeRound(game));
    setButtonState(false);
    setColor(['white', 'white']);
  };

  const resetButton = (startGame = false) => {
    let idx = db.findIndex((item) => item.id === game.id);
    if (idx !== -1) {
      let temp = db;
      temp[idx] = game;
      setDB(temp);
    } else if (db.length > 0) {
      game.id = db.length+1;
      if (game.data.scores.team1 !== 0 && game.data.scores.team2 !== 0) setDB([...db, game]);
    }
    else {
      game.id = 1;
      setDB([game]);
    }
    if(startGame === true) setGame(newRound(newGame()));
  };

  return (
    <SafeAreaView style = {styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible)}}>
          <TouchableOpacity 
            style={styles.modal} 
            activeOpacity={1} 
            disabled={!modalVisible}
            onPress={() => {setModalVisible(!modalVisible);}}>
              <ScrollView 
                directionalLockEnabled={true} 
                style={styles.insideModal}>
                  {
                    db.map((items, index) => (
                      <Pressable key={index} onPress={() => {loadGame(index); setModalVisible(!modalVisible); }}>
                        <View style={styles.modalView}>                          
                          <Text style={styles.modalNames}>{items!== null ? items.data.names.team1 : ''} vs {items!== null ? items.data.names.team2 : ''}</Text>
                          <Text style={styles.modalDate}>{items!== null ? items.date : ''}</Text>
                          <Text style={styles.modalScores}>{items!== null ? items.data.scores.team1 : ''} - {items!== null ? items.data.scores.team2 : ''}</Text>
                        </View>
                      </Pressable>
                    ))
                  }

              </ScrollView>
          </TouchableOpacity>   
      </Modal> 
    
        
      <View style={{flex: 1, flexDirection:'column', justifyContent:'center', alignItems: 'flex-end'}}>
        <View style={{flex:0.3}}>
          <CustomButton title='History' onPress={() => { setModalVisible(true); }} />
        </View>
        <View style={{flex: 0.4, flexDirection: 'row'}}>
          <Pressable style={{flex: 1, flexDirection: 'row'}} onLongPress={() => {/*let temp = game; temp.data.names.team1 = 'riot'; setGame(temp); setColor(col); console.log(temp);*/}}>
            <Text style={styles.teams}>
                {game === undefined ? 'Team A' : game.data.names.team1} 
            </Text>
          </Pressable>
          <Pressable style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.teams}>
              {game === undefined ? 'Team B' : game.data.names.team2} 
          </Text>
          </Pressable>
        </View>

        <View style={{flex: 0.3, flexDirection: 'row'}}>
          <Text style={styles.teams}> {game === undefined ? 0 : game.data.scores.team1} </Text>
          <Text style={styles.teams}> {game === undefined ? 0 : game.data.scores.team2} </Text>

        </View>
      </View>

      <View style={{ flex: 3 }}>
        <CustomFlatList scores={game === undefined ? '' : game.data.rounds} />
      </View>

      <View style={{ flex: 0.5, flexDirection: 'row' }}>
          <View style={{ flex:1, marginRight:10 }}>
            <CustomButton title='Double Victory' color={col[0]} onPress={() => { addScore('D', 0)} } />
          </View>
          <CustomButton title='Double Victory' color={col[1]} onPress={() => { addScore('D', 1) } } />
      </View>
      <View style={styles.bottomScreen}>
        <View style={{ flex: 1 }}>
          <CustomButton title='grand' color='green' onPress={() => {addScore(200, 0)} } />
          <CustomButton title='grand' color='red' onPress={() => {addScore(-200, 0)} } />
          <CustomButton title='tichu' color='green' onPress={() => {addScore(100, 0)} } />
          <CustomButton title='tichu' color='red' onPress={() => {addScore(-100, 0)} } />
        </View>

        
        <View style={{ flex: 2, marginRight: 5}}>
        
          <View style={{flex: 1, justifyContent:'center'}}>
            <Text style={styles.scoreText}>
              { game === undefined ? 0 :
                (game.data.rounds[0].score.team1 + 200*game.data.rounds[0].gtd.team1[0] + 100*game.data.rounds[0].gtd.team1[1] + 200*game.data.rounds[0].gtd.team1[2])
              }
            </Text>
            <Text style={[{position:'absolute', left:'5%', padding:'2%', color:"#000"}, ( game !== undefined ? (game.data.rounds[0].gtd.team1[0] === 1) ? {backgroundColor: 'green'} : ((game.data.rounds[0].gtd.team1[0] === -1) ? {backgroundColor: 'red'} : {opacity: 0}) : {opacity: 0} )]}>G</Text>
            <Text style={[{position:'absolute', left:'15%', padding:'2%', color:"#000"}, (  game !== undefined ? (game.data.rounds[0].gtd.team1[1] === 1) ? {backgroundColor: 'green'} : ((game.data.rounds[0].gtd.team1[1] === -1) ? {backgroundColor: 'red'} : {opacity: 0}) : {opacity: 0} )]}>{'T'}</Text>
            <Text style={[{position:'absolute', left:'25%', padding:'2%', color:"#000"}, ( game !== undefined ? (game.data.rounds[0].gtd.team1[2] === 1) ? {backgroundColor: 'green'} : ((game.data.rounds[0].gtd.team1[2] === -1) ? {backgroundColor: 'red'} : {opacity: 0}) : {opacity: 0} )]}>{'D'}</Text>
          </View>
          <View style={styles.pureScoreButtons}>
            <CustomButton title='-5' disabled={buttonState} onPress={() => {addScore(-5, 0)} } />
            <CustomButton title='-10' disabled={buttonState} onPress={() => {addScore(-10, 0)} } />
          </View>
          <View style={styles.pureScoreButtons}>
            <CustomButton title='5' disabled={buttonState} onPress={() => {addScore(5, 0)} } />
            <CustomButton title='10' disabled={buttonState} onPress={() => {addScore(10, 0)} } />
          </View>
          <View style={styles.pureScoreButtons}>
            <CustomButton title='20' disabled={buttonState} onPress={() => {addScore(20, 0)} } />
            <CustomButton title='50' disabled={buttonState} onPress={() => {addScore(50, 0)} } />
          </View>
        </View>

        <View style={{ flex: 2, marginLeft: 5}}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.scoreText}>
            { game === undefined ? 0 :
                (game.data.rounds[0].score.team2 + 200*game.data.rounds[0].gtd.team2[0] + 100*game.data.rounds[0].gtd.team2[1] + 200*game.data.rounds[0].gtd.team2[2])
              }
            </Text>
            <Text style={[{position:'absolute', right:'25%', padding:'2%', color:"#000"}, ( game !== undefined ? (game.data.rounds[0].gtd.team2[0] === 1) ? {backgroundColor: 'green'} : ((game.data.rounds[0].gtd.team2[0] === -1) ? {backgroundColor: 'red'} : {opacity: 0}) : {opacity: 0} )]}>G</Text>
            <Text style={[{position:'absolute', right:'15%', padding:'2%', color:"#000"}, (  game !== undefined ? (game.data.rounds[0].gtd.team2[1] === 1) ? {backgroundColor: 'green'} : ((game.data.rounds[0].gtd.team2[1] === -1) ? {backgroundColor: 'red'} : {opacity: 0}) : {opacity: 0} )]}>T</Text>
            <Text style={[{position:'absolute', right:'5%', padding:'2%', color:"#000" }, ( game !== undefined ? (game.data.rounds[0].gtd.team2[2] === 1) ? { backgroundColor: 'green'} : ((game.data.rounds[0].gtd.team2[2] === -1) ? {backgroundColor: 'red'} : {opacity: 0}) : {opacity: 0} )]}>D</Text>
          
          </View>
          <View style={styles.pureScoreButtons}>
            <CustomButton title='-5' disabled={buttonState} onPress={() => {addScore(-5, 1)} } />
            <CustomButton title='-10' disabled={buttonState} onPress={() => {addScore(-10, 1)} } />
          </View>
          <View style={styles.pureScoreButtons}>
            <CustomButton title='5' disabled={buttonState} onPress={() => {addScore(5, 1)} } />
            <CustomButton title='10' disabled={buttonState} onPress={() => {addScore(10, 1)} } />
          </View>
          <View style={styles.pureScoreButtons}>
            <CustomButton title='20' disabled={buttonState} onPress={() => {addScore(20, 1)} } />
            <CustomButton title='50' disabled={buttonState} onPress={() => {addScore(50, 1)} } />
          </View>
        </View>

        <View style={{flex: 1}}>
          <CustomButton title='grand' color='green' onPress={() => {addScore(200, 1)} } />
          <CustomButton title='grand' color='red' onPress={() => {addScore(-200, 1)} } />
          <CustomButton title='tichu' color='green' onPress={() => {addScore(100, 1)} } />
          <CustomButton title='tichu' color='red' onPress={() => {addScore(-100, 1)} } />
        </View>
      </View>

      <View style = {styles.footer}>
        <View style={styles.footerButtons}>
          <CustomButton title="Add Score" onPress={()=> { addScoreButton() }} />
        </View>
        <View style={styles.footerButtons}>
          <CustomButton title='Remove last round' onPress={() => { removeRoundButton() }}/>
        </View>
        <View style={styles.footerButtons}>
          <CustomButton title='reset' onPress={() => { resetButton(true); }} />
        </View>
        
      </View>
    </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0
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
    textAlign: 'center',
    fontSize: 25
  },

  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    alignContent:'center',
    justifyContent:'center'
  },

  insideModal: {
    position:'absolute',
    top:'10%',
    bottom:'10%',
    left:'20%',
    height:'80%',
    width:'60%',
    backgroundColor: '#333',
    flex:1
  },
  modalView: {
    justifyContent:'space-between',
    alignContent:'center',
    borderWidth:3,
    borderRadius:4,
    margin:5,
    borderStyle:'solid',
    borderColor:'#e4f',
    backgroundColor:'#4e0'
  },
  modalDate: {
    alignSelf:'center',
    fontSize:15
  },
  modalNames: {
    alignSelf:'center',
    fontSize:25
  },
  modalScores: {
    alignSelf:'center',
    fontSize:20
  },

  bottomScreen: {
    flex: 2,
    flexDirection: 'row'
  },
  footerButtons: {
    marginLeft: 20,
    marginTop: 10,
    marginRight: 20
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
  footer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', 
  }

});

export default App;