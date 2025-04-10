const api =
  "https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-AM/players";

let puppies = [];

const allPlayersDiv = document.querySelector(".allPlayersDiv");
const singlePlayerDiv = document.querySelector(".singlePlayerDiv");

/**
 * Fetches all players from the API.
 * This function should not be doing any rendering
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  const response = await fetch(`${api}`);
  const data = await response.json();
  //console.log(data.data.players);
  return data.data.players;
};

/**
 * Fetches a single player from the API.
 * This function should not be doing any rendering
 * @param {number} playerId
 * @returns {Object} the player object
 */

const fetchSinglePlayer = async (playerId) => {
  console.log(playerId);
  const playerData = await fetch(`${api}/${playerId}`);
  const singlePlayerData = await playerData.json();
  console.log(singlePlayerData);
  renderSinglePlayer(singlePlayerData.data.player); //THIS IS TAKEN FROM POKE EXAMPLE to do: CHECK IF IT IS NECESSARY
};

/**
 * Adds a new player to the roster via the API.
 * Once a player is added to the database, the new player
 * should appear in the all players page without having to refresh
 * @param {Object} newPlayer the player to add
 */
/* Note: we need data from our user to be able to add a new player
 * Do we have a way to do that currently...?
 */
/**
 * Note#2: addNewPlayer() expects you to pass in a
 * new player object when you call it. How can we
 * create a new player object and then pass it to addNewPlayer()?
 */
/**
 * FOR TESTING PURPOSES ONLY PLEASE OBSERVE THIS SECTION
 * @returns {Object} the new player object added to database
 */

const addNewPlayer = async (newPlayer) => {
  //TODO
};

/**
 * Removes a player from the roster via the API.
 * Once the player is removed from the database,
 * the player should also be removed from our view without refreshing
 * @param {number} playerId the ID of the player to remove
 */
/**
 * Note: In order to call removePlayer() some information is required.
 * Unless we get that information, we cannot call removePlayer()....
 */
/**
 * Note#2: Don't be afraid to add parameters to this function if you need to!
 */

const removePlayer = async (playerId) => {
  //TODO
};

/**
 * Updates html to display a list of all players or a single player page.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player in the all player list is displayed with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, for each player we should be able to:
 * - See details of a single player. When clicked, should be redirected
 *    to a page with the appropriate hashroute. The page should show
 *    specific details about the player clicked
 * - Remove from roster. when clicked, should remove the player
 *    from the database and our current view without having to refresh
 *
 */
const render = () => {
  if (puppies.length > 0) {
    const html = puppies.map((puppy, idx) => {
      return `
    <a href=#${puppy.id}>
        <h3>${puppy.name}</h3>
        <p>${puppy.id}</p>
        <img src=${puppy.imageUrl} alt=${puppy.name}/>
        </a>
        </br>
        <button class="deleteButton" id=${puppy.id} data-puppyIdx=${idx}>Delete</button>
    
`;
    });
    const id = window.location.hash.slice(1) * 1;
    //console.log(typeof id);

    const singlePlayer = puppies.find((puppy) => {
      return puppy.id === id;
    });
    //console.log(singlePlayer);

    allPlayersDiv.innerHTML = singlePlayer
      ? fetchSinglePlayer(id)
      : `<div id="playerContainer">${html.join("")}</div>`;
  } else {
    const noPlayers = () => {
      return `
      <h2>
        Oops... there are no players in your roster. Please add a new player.
      </h2>
      `;
    };
    allPlayersDiv.innerHTML = noPlayers.join("");
  }
};

/**
 * Updates html to display a single player.
 * A detailed page about the player is displayed with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The page also contains a "Back to all players" that, when clicked,
 * will redirect to the approriate hashroute to show all players.
 * The detailed page of the single player should no longer be shown.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  const playerTeam = player.teamId ? player.teamId : "Unassigned";
  console.log(playerTeam);
  //BELOW I AM FOLLOWING THE POKEMON EXAMPLE, BUT IT DOES SEEM ODD TO UPDATE THE ALL PLAYERS DIV, RATHER THAN THE SINGLE PLAYERS DIV
  allPlayersDiv.innerHTML = `
    <h2>Selected Puppy Player</h2>
    <h2>${player.name}</h2>
    <p>${player.id}</p>
    <p>${player.breed}</p>
    <img src=${player.imageUrl} alt=${player.name}/>
    <h3>${playerTeam}</h3>
  </div>
  <a href=#>Back to all Players</a>`;
};

/**
 * Initializes the app by calling render
 * HOWEVER....
 */

const init = async () => {
  const allPlayers = await fetchAllPlayers();
  puppies = allPlayers;
  //Before we render, what do we always need...?
  render();
};

/**THERE IS NO NEED TO EDIT THE CODE BELOW =) **/

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
  };
} else {
  init();
}
