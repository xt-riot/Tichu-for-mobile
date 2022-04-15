import {getTemplate} from './Database';

  /* db

  'games' = [{
    id: UNIQUE
    date: Date()
    data: {
      names: {teamA: name of team A, teamB: name of team B},
      scores: {teamA: total score of A, teamB: total score of B},
      rounds: [
        { scores:{teamA: score A, teamB: score B}, gtd:{teamA: gtd A, teamB: gtd B} },        // get('Games')[0].data.rounds[WHICH ROUND].gtd.teamA === gtd A
        { scores:{teamA: score A, teamB: score B}, gtd:{teamA: gtd A, teamB: gtd B} }         // get('Games')[0].data.rounds[WHICH ROUND].scores.teamA === score A
      ]
    }
  }]

  */

export const newGame = () => {
  let game = getTemplate();
  return game;
};

export const addScores = (game, amount, team) => {
  let len = game.data.rounds.length;
  switch(amount) {
    case 200: {
      game.data.rounds[0].gtd['team'+(1+team)][0] === -1 ? game.data.rounds[0].gtd['team'+(1+team)][0] = 0 : game.data.rounds[0].gtd['team'+(1+team)][0] = 1;
      if(game.data.rounds[0].gtd['team'+(1+team)][1] === 1) game.data.rounds[0].gtd['team'+(1+team)][1] = 0;
      break;
    }
    case -200: {
      game.data.rounds[0].gtd['team'+(1+team)][0] === 1 ? game.data.rounds[0].gtd['team'+(1+team)][0] = 0 : game.data.rounds[0].gtd['team'+(1+team)][0] = -1;
      break;
    }
    case 100: {
      game.data.rounds[0].gtd['team'+(1+team)][1] === -1 ? game.data.rounds[0].gtd['team'+(1+team)][1] = 0 : game.data.rounds[0].gtd['team'+(1+team)][1] = 1;
      if(game.data.rounds[0].gtd['team'+(1+team)][0] === 1) game.data.rounds[0].gtd['team'+(1+team)][0] = 0;
      break;
    }
    case -100: {
      game.data.rounds[0].gtd['team'+(1+team)][1] === 1 ? game.data.rounds[0].gtd['team'+(1+team)][1] = 0 : game.data.rounds[0].gtd['team'+(1+team)][1] = -1;
      break;
    }
    case 'D': {
      Object.keys(game.data.rounds[0].score).forEach((name, idx) => {
        if (name === 'team'+(team+1)) {
          game.data.rounds[0].gtd['team'+(1+idx)][2] === 0 ? game.data.rounds[0].gtd['team'+(1+idx)][2] = 1 : game.data.rounds[0].gtd['team'+(1+idx)][2] = 0;
          game.data.rounds[0].score['team'+(1+idx)] = 0;
        } else {
          game.data.rounds[0].gtd['team'+(1+idx)][2] = 0;
          if ( game.data.rounds[0].gtd['team'+(1+idx)][1] === 1) game.data.rounds[0].gtd['team'+(1+idx)][1] = 0;
          if ( game.data.rounds[0].gtd['team'+(1+idx)][0] === 1) game.data.rounds[0].gtd['team'+(1+idx)][0] = 0;
          game.data.rounds[0].score['team'+(1+idx)] = 0;
        }
      });
      break;
    }
    default: {
      Object.keys(game.data.rounds[0].score).forEach((name, idx) => {
        if (name === 'team'+(team+1)) {
          game.data.rounds[0].score['team'+(1+team)] += amount;
        } else {
          game.data.rounds[0].score['team'+(1+idx)] === 0 ? game.data.rounds[0].score['team'+(1+idx)] = 100 - amount : game.data.rounds[0].score['team'+(1+idx)] -= amount;
        }
      });
      break;
    }
  }
  return game;
};

export const newRound = (game) => {
  if (game.data.rounds.length > 0) {
    game.data.scores.team1 += game.data.rounds[0].score.team1 + 200*game.data.rounds[0].gtd.team1[0] + 100*game.data.rounds[0].gtd.team1[1] + 200*game.data.rounds[0].gtd.team1[2];
    game.data.scores.team2 += game.data.rounds[0].score.team2 + 200*game.data.rounds[0].gtd.team2[0] + 100*game.data.rounds[0].gtd.team2[1] + 200*game.data.rounds[0].gtd.team2[2];
    game.data.rounds.push(game.data.rounds[0]);
    game.data.rounds[0] = { score: {team1: 0, team2: 0}, gtd: {team1: [0, 0, 0], team2:[0, 0, 0]} };
  }
  else game.data.rounds.push({ score: {team1: 0, team2: 0}, gtd: {team1: [0, 0, 0], team2:[0, 0, 0]} });
  
  return game;
};
export const removeRound = (game) => {
  game.data.scores.team1 -= game.data.rounds[game.data.rounds.length - 1].score.team1 + 200*game.data.rounds[game.data.rounds.length - 1].gtd.team1[0] + 100*game.data.rounds[game.data.rounds.length - 1].gtd.team1[1] + 200*game.data.rounds[game.data.rounds.length - 1].gtd.team1[2];
  game.data.scores.team2 -= game.data.rounds[game.data.rounds.length - 1].score.team2 + 200*game.data.rounds[game.data.rounds.length - 1].gtd.team2[0] + 100*game.data.rounds[game.data.rounds.length - 1].gtd.team2[1] + 200*game.data.rounds[game.data.rounds.length - 1].gtd.team2[2];
  game.data.rounds.pop();
  if(game.data.rounds.length === 0) game = newRound(game);
  else game.data.rounds[0] = { score: {team1: 0, team2: 0}, gtd: {team1: [0, 0, 0], team2:[0, 0, 0]} };
  return game;
};