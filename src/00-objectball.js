//#region STEP 1: BUILDING THE OBJECT

//#region Solution 1: CONSTRUCTORS (not in use)
  //#region README
  //       Goal:  assemble the object concisely without having access to or creating any 
  //              arrays containing the team or player data.
  //
  //      Steps:  - Create Player Constructor and Team Constructor functions which each
  //                create non-nested objects based on the arguments fed them.
  //              - gameObject() creates an empty object. In turn, the home and away
  //                objects are created using the Team Constructors and assigned to the
  //                home and away properties on the new object.
  //              - Each player object must then be added as a new property to each team's
  //                currently empty players property object by calling the
  //                PlayerConstructor with that player's stats.
  //              - the object is returned
  //
  //      PROS:   Relatively clean and readable. Avoids literal syntax
  //      CONS:   TeamConstructor cannot take any player information, and non-populated teams
  //              are created by it as a result. It relies on players being added separately.
  //              Ideally, the TeamConstructor could accept a 3rd argument with player data.
  //#endregion

// Code in this region commented out, as it is not the preferred solution

// function PlayerConstructor(number, shoe, points, rebounds, assists, steals, blocks, slamDunks) {
//   this.number = number;
//   this.shoe = shoe;
//   this.points = points;
//   this.rebounds = rebounds;
//   this.assists = assists;
//   this.steals = steals;
//   this.blocks = blocks;
//   this.slamDunks = slamDunks;
// }

// function TeamConstructor(teamName, colorsArray) {
//   this.teamName = teamName;
//   this.colors = colorsArray;
//   this.players = {};
// }

// function gameObject() {
//   const obj = {};

//   obj.home = new TeamConstructor('Brooklyn Nets', ['Black', 'White']);
//   obj.home.players['Alan Anderson'] = new PlayerConstructor(0,16,22,12,12,3,1,1);
//   obj.home.players['Reggie Evans'] = new PlayerConstructor(30,14,12,12,12,12,12,7);
//   obj.home.players['Brook Lopez'] = new PlayerConstructor(11,17,17,19,10,3,1,15)
//   obj.home.players['Mason Plumlee'] = new PlayerConstructor(1,19,26,12,6,3,8,5);
//   obj.home.players['Jason Terry'] = new PlayerConstructor(31,15,19,2,2,4,11,1);
//   console.table(obj.home.players);

//   obj.away = new TeamConstructor('Charlotte Hornets', ['Turquoise', 'Purple']);
//   obj.away.players['Jeff Adrien'] = new PlayerConstructor(4,18,10,1,1,2,7,2);
//   obj.away.players['Bismak Biyombo'] = new PlayerConstructor(0,16,12,4,7,7,15,10);
//   obj.away.players['DeSagna Diop'] = new PlayerConstructor(2,14,24,12,12,4,5,5);
//   obj.away.players['Ben Gordon'] = new PlayerConstructor(8,15,33,3,2,1,1,0);
//   obj.away.players['Brendan Haywood'] = new PlayerConstructor(33,15,6,12,12,22,5,12);
//   console.table(obj.away.players);

//   return obj;
// }

// console.log(gameObject());

//#endregion

//#region Solution 2: CONSTRUCTORS with DATA ARRAYS (in use)
  //#region README
  //       Goal:  Quickly transcribe the raw player data in such a way that it is
  //              clear, yet can be easily compiled by a constructor to create
  //              the final object. 
  //
  //      Steps:  TRANSCRIBE THE DATA
  //              - Create a playerStatsData array, listing players' stats as strings
  //              - Transcribe non-nested objects of each team's player data, using strings
  //                of the players' names for the keys, and arrays of the player's stats for
  //                the values (listed in the same order as the playerStatsData array), as these 
  //                can be typed quickly and iterated through consistently.
  //
  //              CREATE THE CONSTRUCTOR FUNCTION
  //              - Create a TeamConstructor function which takes as arguments the team name,
  //                an array of colors, and an object of player data
  //              - TeamConstructor assigns teamName and the color array to their properties
  //                and creates an empty 'players' nested object
  //              - TeamConstructor then iterates through the team's player data with a
  //                'for...in' loop', creating a nested object within 'players' for each player,
  //                using their name as the key (as in the playerData object)
  //              - Each player's stats array from playerData is then iterated through using a
  //                'for..of' loop using destructuring and the Array.entries() method to allow
  //                the index to be accessed as a variable. Each iteration, the statName is
  //                pulled from playerStatsData array for the current index, and the player's
  //                statValue is pulled from playerData.
  //              - Stats are assigned to each player object using the statName as the key and
  //                statValue for the value.
  //
  //              CREATE THE FINAL gameObject() FUNCTION
  //              - gameObject() creates an empty object. In turn, the home and away
  //                objects are created using the TeamConstructor and assigned to the
  //                home and away properties on the new object.
  //              - The object is returned
  //#endregion

// a transcription of the stats tracked for each player. Order matches their transcribed data below
const playerStatsData = ['number', 'shoe', 'points', 'rebounds', 'assists', 'steals', 'blocks', 'slamDunks'];

// a transcription of the home team players and stats
const homeTeamPlayerData = {};
homeTeamPlayerData['Alan Anderson'] = [0,16,22,12,12,3,1,1];
homeTeamPlayerData['Reggie Evans'] = [30,14,12,12,12,12,12,7];
homeTeamPlayerData['Brook Lopez'] = [11,17,17,19,10,3,1,15];
homeTeamPlayerData['Mason Plumlee'] = [1,19,26,12,6,3,8,5];
homeTeamPlayerData['Jason Terry'] = [31,15,19,2,2,4,11,1];

// a transcription of the away team players and stats
const awayTeamPlayerData = {};
awayTeamPlayerData['Jeff Adrien'] = [4,18,10,1,1,2,7,2];
awayTeamPlayerData['Bismak Biyombo'] = [0,16,12,4,7,7,15,10];
awayTeamPlayerData['DeSagna Diop'] = [2,14,24,12,12,4,5,5];
awayTeamPlayerData['Ben Gordon'] = [8,15,33,3,2,1,1,0];
awayTeamPlayerData['Brendan Haywood'] = [33,15,6,12,12,22,5,12];

// constructor to create team objects using a team name (string), colors (array), and one of the objects above
function TeamConstructor(teamName, colorsArray, playerData) {
  this.teamName = teamName;
  this.colors = colorsArray;
  this.players = {};
  for (const player in playerData) {
    this.players[player] = {};
    for (const [i, stat] of playerData[player].entries()) {
      const statName = playerStatsData[i];
      this.players[player][statName] = stat;
    }
  }
}

// function to return a single object that contains the home and away team objects
function gameObject() {
  const obj = {};
  obj.home = new TeamConstructor('Brooklyn Nets', ['Black', 'White'], homeTeamPlayerData);
  obj.away = new TeamConstructor('Charlotte Hornets', ['Turquoise', 'Purple'], awayTeamPlayerData);

  return obj;
}

//#endregion

//#region STEP 2: BUILDING FUNCTIONS

function numPointsScored(playerName) {
  const obj = gameObject();
  for (const team in obj) {
    for (const player in obj[team].players) {
      if (player === playerName) {
        return obj[team].players[player].points;
      }
    }
  }
  console.warn('Player not Found');
  return;
}
const points = numPointsScored('Ben Gordon');


function shoeSize(playerName) {
  const obj = gameObject();
  for (const team in obj) {
    for (const player in obj[team].players) {
      if (player === playerName) {
        return obj[team].players[player].shoe;
      }
    }
  }
  console.warn('Player not Found');
  return;
}
const shoe = shoeSize('Mason Plumlee');


function teamColors(teamName) {
  const obj = gameObject();
  for (const team in obj) {
    if (obj[team].teamName === teamName) {
      return obj[team].colors;
    }
  }
  console.warn('Team not Found');
  return;
}
const colors = teamColors('Charlotte Hornets');


function teamNames() {
  const obj = gameObject();
  const arr = [];
  for (const team in obj) {
    arr.push(obj[team].teamName)
  }
  return arr;
}
const teamNameArray = teamNames();


function playerNumbers(teamName) {
  const obj = gameObject();
  const arr = [];
  for (const team in obj) {
    if (obj[team].teamName === teamName) {
      for (const player in obj[team].players) {
        arr.push(obj[team].players[player].number);
      }
      return arr;
    }
  }
  console.warn('Team not found');
  return;
}
const playerNumbersArray = playerNumbers('Charlotte Hornets');


function playerStats(playerName) {
  const obj = gameObject();
  for (const team in obj) {
    for (const player in obj[team].players) {
      if (player === playerName) {
        return obj[team].players[player];
      }
    }
  }
  console.warn('Player not found');
  return;
}
const playerStatsObj = playerStats('Mason Plumlee');


function bigShoeRebounds() {
  const obj = gameObject();
  let currentLargestSize = 0;
  const currentLargestPlayer = [];
  for (const team in obj) {
    let teamPlayers = obj[team].players;
    for (const player in teamPlayers) {
      let thisPlayer = teamPlayers[player];
      if (thisPlayer.shoe > currentLargestSize) {
        currentLargestSize = thisPlayer.shoe
        currentLargestPlayer.length = 0;
        currentLargestPlayer.push(thisPlayer);
      } else if (thisPlayer.shoe === currentLargestSize) {
        currentLargestPlayer.push(thisPlayer);
      }
    }
  }
  if (currentLargestPlayer.length > 1) {
    console.warn('More than one player with largest shoe size');
  }
  return currentLargestPlayer[0].rebounds;
}
const shoeRecordRebounds = bigShoeRebounds();



// BONUS QUESTIONS

function mostPointsScored() {
  const obj = gameObject();
  let currentHighScore = 0;
  const currentScoringPlayer = [];
  for (const team in obj) {
    let teamPlayers = obj[team].players;
    for (const player in teamPlayers) {
      let thisPlayer = teamPlayers[player];
      if (thisPlayer.points > currentHighScore) {
        currentHighScore = thisPlayer.points
        currentScoringPlayer.length = 0;
        currentScoringPlayer.push(player);
      } else if (thisPlayer.points === currentHighScore) {
        currentScoringPlayer.push(player);
      }
    }
  }
  if (currentScoringPlayer.length > 1) {
    console.warn('More than one player with the highest score');
  }
  return currentScoringPlayer[0];
}
const highScoreHolder = mostPointsScored();


function winningTeam() {
  const obj = gameObject();
  let currentHighScore = 0;
  const currentWinningTeam = [];
  for (const team in obj) {
    let scoreTally = 0;
    let teamPlayers = obj[team].players;
    for (const player in teamPlayers) {
      let thisPlayer = teamPlayers[player];
      scoreTally += thisPlayer.points;
    }
    if (scoreTally > currentHighScore) {
      currentHighScore = scoreTally;
      currentWinningTeam.length = 0;
      currentWinningTeam.push(obj[team].teamName);
    } else if (scoreTally === currentHighScore) {
      currentWinningTeam.push(obj[team].teamName);
    }
  }
  if (currentWinningTeam.length > 1) {
    console.warn('Tie for winning team');
  }
  return currentWinningTeam[0];
}
const winningTeamName = winningTeam();


function playerWithLongestName() {
  const obj = gameObject();
  let currentRecordLength = 0;
  const currentRecordHolder = [];
  for (const team in obj) {
    let teamPlayers = obj[team].players;
    for (const player in teamPlayers) {
      if (player.length > currentRecordLength) {
        currentRecordLength = player.length;
        currentRecordHolder.length = 0;
        currentRecordHolder.push(player);
      } else if (player.length === currentRecordLength) {
        currentRecordHolder.push(player);
      }
    }
  }
  if (currentRecordHolder.length > 1) {
    console.warn('More than one player with longest name');
  }
  return currentRecordHolder[0];
}


// SUPER BONUS

function recordHolders(stat) {
  const obj = gameObject();
  let record = 0;
  const recordHolders = [];

  for (const team in obj) {
    let teamPlayers = obj[team].players;
    for (const player in teamPlayers) {
      let thisPlayer = teamPlayers[player];
      if (thisPlayer[stat] > record) {
        record = thisPlayer[stat];
        recordHolders.length = 0;
        recordHolders.push(player);
      } else if (thisPlayer[stat] === record) {
        recordHolders.push(player);
      }
    }
  }
  return recordHolders;
}

function printRecordHolders() {
  for (const stat of playerStatsData) {
    console.log(`${stat}: ${recordHolders(stat)}`);
  }
}

function doesLongNameSteaATon() {
  let stealer = recordHolders('steals')[0];
  let longestName = playerWithLongestName();
  return stealer === longestName;
}
const finalTest = doesLongNameSteaATon();

//#endregion