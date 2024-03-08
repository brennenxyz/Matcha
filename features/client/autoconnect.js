function joinHypixel() {
    Client.connect(`hypixel.net`)
}

register("GameLoad", joinHypixel)