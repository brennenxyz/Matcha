import { gui, guistuff } from "../gui/gui"

export const prefix = "§d[§5Matcha§d]§b"
export const prefix_color = "§b"

export const data = {
    lowball_blocker: guistuff.Skyblock.toggles[0],
    book_combine: guistuff.Skyblock.toggles[1],
    zealot_counter: guistuff.Skyblock.toggles[2]
}

export const emannuker = { 
    toggle: guistuff.Skyblock.toggles[3],
    rightclickmode: guistuff.rightclickmode,
    leftclickmode: !guistuff.rightclickmode
}