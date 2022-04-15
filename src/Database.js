import AsyncStorage from '@react-native-community/async-storage';
    

export const deleteDatabase = async () => {
    let keys = await AsyncStorage.getAllKeys().catch( error => console.log(error) );
    let results = await AsyncStorage.multiGet(keys);
    console.log(results);
    if (keys !== null) await AsyncStorage.multiRemove(keys).catch( error => console.log(error) );
};

export const loadDatabase = async () => {
    try {
        let data;
        await AsyncStorage.getItem('@Games').then((value) => { data = value });
        return JSON.parse(data);
    } catch(e) {
        console.log(e);
    }
};

export const saveDatabase = async (db) => {
    await AsyncStorage.setItem('@Games', JSON.stringify(db));
};

export const getTemplate = () => {
    let date = new Date();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let temp = {
        id: -1,
        date: weekday[date.getDay()] + ' ' + ('0' + date.getDate()).slice(-2) + '-' + ('0' + date.getMonth()).slice(-2) + '-' + ('0' + date.getFullYear()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2),
        data: {
            names: {team1: "Team A", team2: "Team B"},
            scores: {team1: 0, team2: 0},
            rounds: [ ]
        }
    };
    return temp;
};