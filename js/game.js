class Game
{
    constructor()
        {

        }
    getState()
    {
        var gs = database.ref("gameState")
        gs.on("value", function(data)
        {
            gameState = data.val()
        }
    )

    }
    update(state)
    {
        database.ref("/").update(
            {
                gameState:state
            }
            )
    }
    async start()
    {
        if(gameState === 0)
        {
            player = new Player()
            form = new Form()
            var playerCountRefer = await database.ref("playerCount").once("value")
            if(playerCountRefer.exists())
            {
                playerCount = playerCountRefer.val()
                player.getCount()
            }
            form.display()

        }
    }
    play()
    {
        form.hide()
        textSize(25)
        text("The game is abount to start", 50,150)
        Player.getPlayerInfo()
        if(allPlayers !== undefined)
        {
            var displayPosition = 170
            for(var plr in allPlayers)
            {
                displayPosition = displayPosition + 20
                text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120, displayPosition)
            }
        }
        if(keyIsDown(UP_ARROW))
        {
            player.distance += 50
            player.update()
        }
    }
}