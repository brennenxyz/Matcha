class ClientRotations {
    setAngles(y, p) {
        const player = Client.getMinecraft().field_71439_g
        player.field_70177_z = y
        player.field_70125_A = p
    }
}

export default new ClientRotations()