const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const tpsPlugin = require('mineflayer-tps').mineflayer
const GoalFollow = goals.GoalFollow
const GoalBlock = goals.GoalBlock
Target = null
Stop = null
const bot = mineflayer.createBot({
    host: 'THRecode.aternos.me',
    port: 12466,22
    username: 'ESBot'
})

bot.loadPlugin(pathfinder)

bot.on('chat', function (username, message) {
    if (username === bot.username) return
    if (message == 'come'){
        Target = username
        bot.chat('I comming!')
    }
    if (message == 'hp'){
        bot.chat('bot hp: ' + Math.round(bot.health))
    }
    if (message == 'pos'){
        const { x: playerX, y: playerY, z: playerZ } = bot.entity.position
        bot.chat(playerX + ' ' + playerY + ' ' + playerZ)
    }
})


function followPlayer() {
    const playerCI = bot.players[Target]

    if (!playerCI || !playerCI.entity) {
        return
    }

    const mcData = require('minecraft-data')(bot.version)
    const movements = new Movements(bot, mcData)
    movements.scafoldingBlocks = []

    bot.pathfinder.setMovements(movements)

    const goal = new GoalFollow(playerCI.entity, 1)
    bot.pathfinder.setGoal(goal, true)
}
bot.on("time", () =>{
    followPlayer()
})