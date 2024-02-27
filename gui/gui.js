// COLOR: 68,98,74
// COLOR IN JAVA FORM: 0.26, 0.384, 0.29

import * as Elementa from "../../Elementa";
import { ConstantColorConstraint, RainbowColorConstraint } from "../../Elementa/index.js";
import PogObject from "PogData";

let prefix = "MATCHA | "
const File = Java.type("java.io.File")
const Logo = new File("./config/ChatTriggers/modules/Matcha/gui/matcha.png")
const image = new Image(Logo)

//saves data
export const guidata = new PogObject("Matcha", {
    'dungeons': {
        'x': 6.5,
        'y': 5,
        'dropDown': false,
        'toggles': [false, false, false, false, false, false, false, false, false, false],
        'titles': ['Easy Bonzo Staff', 'Floppa Route Start', 'Infiniboom Aura', 'Auto Sinseeker', 'Auto Wither Blade', 'InstaCrystal', 'Auto Door', 'Bonzo Mask in P3', 'Melody Message', 'Auto Walk to P3'],
        'descriptions': [false, false, false, false, false, false, false, false, false, false],
        'settingdowns': [false, false, false, false, false, false, false, false, false, false],
        'settingtoggle': [false, false, false, false, false, false, false, false, false, false],
        'settinglen': [0, 0, 1, 0, 1, 1, 0, 0, 1, 0],
        'settingname': ['None', 'None', 'Infiniboom Looking At', 'None', 'Only in Boss', 'Crystal Side', 'None', 'None', 'Change Melody Message', 'None']
    },

    'render': {
        'x': 140,
        'y': 20,
        'dropDown': true,
        'toggles': [false, false, false, false],
        'titles': ['Readable Messages', 'Secret Esp', 'Key Esp', 'Gyro Radius'],
        'descriptions': [false, false, false, false],
        'settingdowns': [false, false, false, false],
        'settingtoggle': [false, false, false, false],
        'settinglen': [0, 0, 0, 0],
        'settingname': ['None', 'None', 'None', 'None']

    },

    'player': {
        'x': 260,
        'y': 20,
        'dropDown': true,
        'toggles': [false, false, false],
        'titles': ['Etherwarp on Crouch', 'Armor Swapper', 'Hclip'],
        'descriptions': [false, false, false],
        'settingdowns': [false, false, false],
        'settingtoggle': [false, false, false],
        'settinglen': [0, 0],
        'settingname': ['None', 'None', 'Change Distance']

    },

    'misc': {
        'x': 380,
        'y': 20,
        'dropDown': true,
        'toggles': [false, false, false, false],
        'titles': ['Auto Sell', 'Carpet Remover', 'Auto Orb', 'Auto Soulcry'],
        'descriptions': [false, false, false, false],
        'settingdowns': [false, false, false, false],
        'settingtoggle': [false, false, false, false],
        'settinglen': [1, 0, 1, 0],
        'settingname': ['Sell on Inv Full', 'None', 'From Inv', 'None']

    },

    'descrip': {
        'x': 380,
        'y': 190,
    },

    'melodymessage': "Melody on Me!",

    'hcdistance': 9
}, "guidata.json")

//descriptions
const desc = [
    [
        "Automatically Use Bonzo Staff Keybind can be Set in Settings",
        "Start a Floppa Route by pressing a keybind Keybind can be Set in Settings",
        "Left Click with any ShortBow or Witherblade to place infiboom or set a keybind in Settings",
        "Uses Sinseeker then Etherwarps, Keybind can be Set in Settings",
        "Automatically looks down and uses any Witherblade in hotbar",
        "Instantly etherwarp to the crystal in F7 Boss",
        "Automatically Clicks the witherdoor when in range and a key has been picked up",
        "Equips Bonzo Mask on Start of P3 in F7 and unequips After Proced or End of P3",
        "Sends a message when you open the Melody Terminal",
        "Walks Down to P3 of F7, Requires InstaCrystal to be off"
    ],

    [
        "Changes Message Colors from Grey to White",
        "Renders a Esp for Chests and Essence in Dungeons",
        "Displays a Esp for Wither and Blood Keys",
        "Displays the Radius of the Gyrokinetic Wand"
    ],

    [
        "Automatically Use Etherwarp when Crouching and Holding AOTV",
        "Swaps Armor from the top left of your inventory",
        "Set a keybind in settings or use /pahclip <dist>, working bypass"
    ],

    [
        "Automatically Sells Items when in /trades menu",
        "Removes all Carpets nearby, helps reduce lagbacks",
        "Places any Orb on Slayer Boss Spawn, Optionally from Inv",
        "Uses Soulcry ability while holding any katana or terminator"
    ],
]

//open gui command
register('command', () => {
    guidata.save()
    ChatLib.chat(`${prefix} Saved Data!`)
}).setName('gdata')

let gui = new Gui()
const tabs = [guidata.dungeons, guidata.render, guidata.player, guidata.misc]
const tabnames = ['Dungeons', 'Render', 'Player', 'Misc']
let tabWidth = 90
let tabHeight = 18
let toChange
let currentSetting = null
let hoverdraw


const makePressSound = () => World.playSound('gui.button.press', 1, 1)

function drawString(text, x, y, size) {
  let newtext = new Elementa.UIText(text).setX((x).pixels()).setY((y).pixels()).setTextScale((size).pixels())
  let textdraw = new Elementa.Window().addChild(newtext)
  return textdraw
}

function drawRect(r, g, b, a, x, y, h, w, corner) {
    let square = new Elementa.UIRoundedRectangle(corner).setX((x).pixels()).setY((y).pixels()).setHeight((h).pixels()).setWidth((w).pixels()).setColor(new ConstantColorConstraint(new java.awt.Color(r, g, b, a)))
    let squaredraw = new Elementa.Window().addChild(square)
    return squaredraw
}

function drawRectHover(r, g, b, a, x, y, h, w, corner) {
    let square = new Elementa.UIRoundedRectangle(corner).setX((x).pixels()).setY((y).pixels()).setHeight((h).pixels()).setWidth((w).pixels()).setColor(new ConstantColorConstraint(new java.awt.Color(r, g, b, a)))
                                                        .onMouseEnter((comp) => {
                                                            let hoverelement = new Elementa.UIRoundedRectangle(corner)
                                                                                .setX((x).pixels())
                                                                                .setY((y).pixels())
                                                                                .setHeight((h).pixels())
                                                                                .setWidth((w).pixels())
                                                                                .setColor(new ConstantColorConstraint(new java.awt.Color(0, 0.3, 0.8, 0.3)))
                                                                                .setChildOf(square)
                                                            hoverdraw = new Elementa.Window().addChild(hoverelement)
                                                        })
                                                        .onMouseLeave((comp) => {
                                                            hoverdraw = null
                                                            console.log('wada')
                                                        })
    let squaredraw = new Elementa.Window().addChild(square)
    return squaredraw
}

function drawTab(tab) {
    if (!tab.dropDown) return
    let multi = 1
    for (let i = 1; i <= tab.toggles.length; i++) {
        if (tab.toggles[i - 1]) {
            drawRectHover(0.196, 0.384, 0.353, 1, tab.x, tab.y + (multi * tabHeight), tabHeight, tabWidth, 0).draw()
        } else {
            drawRectHover(0.1, 0.1, 0.1, 1, tab.x, tab.y + (multi * tabHeight), tabHeight, tabWidth, 0).draw()
        }
        drawString(tab.titles[i - 1], tab.x + 4, tab.y + (multi * tabHeight) + 5, 0.8).draw()
        drawRect(0.26, 0.384, 0.29, 1, tab.x, tab.y + (multi * tabHeight), tabHeight, 3, 0).draw()
        if (multi <= tab.toggles.length) {
            multi++
        } else {
            multi = 1
        }
        if (tab.settingdowns[i - 1] && tab.settinglen[i - 1] != 0) {
            if (i - 1 == 5) {
                drawRect(0.1, 0.1, 0.1, 0.76, tab.x, tab.y + (multi * tabHeight), tabHeight, tabWidth, 0).draw()
                drawString(`${tab.settingname[i - 1]}:`, tab.x + 2, tab.y + (multi * tabHeight) + 2, 0.8).draw()
                drawString(tab.settingtoggle[i-1] ? "Right" : "Left", tab.x + 45, tab.y + (multi * tabHeight) + 2, 0.8).draw()
            } else {
            if (tab.settingtoggle[i - 1]) {
                drawRect(0, 0.5, 1, 0.76, tab.x, tab.y + (multi * tabHeight), tabHeight, tabWidth, 0).draw()
                drawString(tab.settingname[i - 1], tab.x + 2, tab.y + (multi * tabHeight) + 2, 0.8).draw()
            } else {
                drawRect(0.1, 0.1, 0.1, 0.76, tab.x, tab.y + (multi * tabHeight), tabHeight, tabWidth, 0).draw()
                drawString(tab.settingname[i - 1], tab.x + 2, tab.y + (multi * tabHeight) + 2, 0.8).draw()
            }
        }
            currentSetting = multi - 1
            multi++     
        }
    }
}

const checkDragged = (dx, dy, mx, my, tab) => {
    if (mx < (tab.x - 10) || mx > (tab.x + tabWidth) + 10) return
    if (my < (tab.y - 5) || my > (tab.y + tabHeight) + 5) return
    tab.x += dx
    tab.y += dy
}

const checkDescDrag = (dx, dy, mx, my) => {
    if (mx < (guidata.descrip.x - 10) || mx > (guidata.descrip.x + 290) + 10) return
    if (my < (guidata.descrip.y - 5) || my > (guidata.descrip.y + 5) + 5) return
    guidata.descrip.x += dx
    guidata.descrip.y += dy
}

const checkClick = (mx, my, b, tab) => {
    if (mx < (tab.x - 10) || mx > (tab.x + tabWidth) + 10) return
    let donw = 0
    if (currentSetting != null) donw = 1
    toChange = Math.floor((my - (tab.y + tabHeight)) / tabHeight)
    if (b == 0 && toChange >= 0 && toChange <= tab.toggles.length - 1 + donw) {
        if (toChange == 9 && guidata.dungeons.settingdowns[8]) {
            Client.setCurrentChatMessage("/melodymessage ")
        } else if (toChange == 3 && guidata.player.settingdowns[2]) {
            Client.setCurrentChatMessage("/hcdistance ")
        } else if (toChange == currentSetting && currentSetting != null) {
            tab.settingtoggle[toChange - 1] = !tab.settingtoggle[toChange - 1]
        } else if (toChange > currentSetting && currentSetting != null) {
                toChange = toChange - 1
                tab.toggles[toChange] = !tab.toggles[toChange]
        } else {
            tab.toggles[toChange] = !tab.toggles[toChange]
            //new Message(`${prefix} ${tab.titles[toChange]}: ${tab.toggles[toChange] ? "&aON" : "&cOFF"}`).setChatLineId(toChange).chat()
        }
        makePressSound()
    } else if (b == 1 && toChange == -1) {
        tab.dropDown = !tab.dropDown
        makePressSound()
    } else if (b == 2 && toChange >= 0 && toChange <= tab.toggles.length - 1) {
        tabs.forEach((ta, index1) => {
            tab.descriptions.forEach((des, index) => {
                ta.descriptions[index] = false
            })
        })
        makePressSound()
        tab.descriptions[toChange] = true
    } else if (b == 1 && toChange >= 0 && toChange <= tab.toggles.length - 1) {
        tabs.forEach((tab, index1) => {
            tab.settingdowns.forEach((down, index) => {
                tab.settingdowns[index] = false
            })
        })
        if (toChange + 1 != currentSetting) {
            tab.settingdowns[toChange] = true
        } else {
            currentSetting = null
        }
    }
}

//checks for drag
register('dragged', (dx, dy, x, y, b) => {
    if (!gui.isOpen() || b != 0) return
    tabs.forEach(tab => checkDragged(dx, dy, mx, my, tab))
    checkDescDrag(dx, dy, mx, my)
    guidata.save()
})

register('clicked', (x, y, b, isDown) => {
    if (!isDown || !gui.isOpen()) return
    tabs.forEach(tab => checkClick(x, y, b, tab))
    guidata.save()
})

register('renderOverlay', () => {
    if (!gui.isOpen()) return
    image?.draw(Renderer.screen.getWidth()-(image.getTextureWidth()/2), Renderer.screen.getHeight()-(image.getTextureHeight()/0.93), 200, 200)
    tabs.forEach((tab, index) => {
        drawRect(0.26, 0.384, 0.29, 1, tab.x, tab.y, tabHeight, tabWidth, 0).draw()
        drawTab(tab)
        drawString(tabnames[index], tab.x + 2, tab.y + 2, 1).draw()
    })

    mx = Client.getMouseX()
    my = Client.getMouseY()

    tabs.forEach((tab, index) => {
        if (!tab.settingdowns) return

    })

    tabs.forEach((tab, index1) => {
        tab.descriptions.forEach((descip, index) => {
            if (descip) {
                if (index1 == 2 && index == 1) {
                    drawRect(0.1, 0.1, 0.1, 1, guidata.descrip.x, guidata.descrip.y, 110, 290, 4).draw()
                    drawRect(0, 0.5, 1, 1, guidata.descrip.x, guidata.descrip.y, 5, 290, 4).draw()
                    drawRect(0, 0.5, 1, 1, guidata.descrip.x, guidata.descrip.y + 3, 5, 290, 0).draw()
                    drawString('Description', guidata.descrip.x + 1, guidata.descrip.y + 1, 0.8).draw()
                    drawString(desc[index1][index], guidata.descrip.x + 1, guidata.descrip.y + 15, 0.8).draw()
                    drawString("To use Set a keybind in Settings", guidata.descrip.x + 1, guidata.descrip.y + 21, 0.8).draw()
                } else {
                    drawRect(0.1, 0.1, 0.1, 1, guidata.descrip.x, guidata.descrip.y, 30, 290, 4).draw()
                    drawRect(0, 0.5, 1, 1, guidata.descrip.x, guidata.descrip.y, 5, 290, 4).draw()
                    drawRect(0, 0.5, 1, 1, guidata.descrip.x, guidata.descrip.y + 3, 5, 290, 0).draw()
                    drawString('Description', guidata.descrip.x + 1, guidata.descrip.y + 1, 0.8).draw()
                    drawString(desc[index1][index], guidata.descrip.x + 1, guidata.descrip.y + 15, 0.8).draw()
                }
            }
        })
    })
})

register('guiClosed', () => {
    tabs.forEach((ta, index1) => {
        ta.descriptions.forEach((des, index) => {
            ta.descriptions[index] = false
        })
    })
})

register('command', () => {
gui.open()
}).setName('putaddons').setAliases('put').setAliases('pa').setAliases('puttest')