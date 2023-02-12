import React, {useState, useEffect} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";


const URL = "http://localhost:8002/bots";

function BotsPage() {
  
  const [bot, setBot] = useState([])
  const [army, setArmy] = useState([])

//use effect to fetch data from the API
  useEffect(() => {
    fetch(URL)
    .then(res => res.json())
    .then(data => setBot(data))}, [])

  //add a bot to the army - checks if the bot is already on the army or not
function handleAddArmy(bot){
  if(army.includes(bot)) {
    return null
  } else {
    const newArmy = [...army, bot]
        setArmy(newArmy)
  }     
}

//remove a bot from the army when you click on it
function removeBotFromArmy(e) {
  const deleteArmy = army.filter((item) => {
  if(item.avatar_url !== e.target.src) {
    return item
  } 
})

  setArmy(deleteArmy)
  
}
//delete a bot permanently even from the database
  function deletePerm(id){
    const updatedBots = bot.filter(bot => bot.id !== id)
    setBot(updatedBots)
    const updatedBotsArmy = army.filter(bot => bot.id !== id)
    setArmy(updatedBotsArmy)   
    }


  return (
    <div>
      <YourBotArmy armyArray={army} handleAddArmy={handleAddArmy} 
      handleRemoval={removeBotFromArmy}
      deleteBot = {deletePerm}
      />
      <BotCollection collection={bot} handleAddArmy={handleAddArmy} 
      deleteBot = {deletePerm}
      />
     
    </div>
  )
}

export default BotsPage;
