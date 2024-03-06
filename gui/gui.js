// COLOR: 68,98,74
// COLOR IN JAVA FORM: 0.26, 0.384, 0.29

import * as Elementa from "../../Elementa";
import { ConstantColorConstraint, RainbowColorConstraint } from "../../Elementa/index.js";
import PogObject from "PogData";

const prefix = "§d[§5Matcha§d]§b"
const File = Java.type("java.io.File")
const Logo = new File("./config/ChatTriggers/modules/Matcha/gui/matcha.png")
const image = new Image(Logo)

//saves data
export const guistuff = new PogObject("Matcha", {
    'Skyblock': {
        'x': 100,
        'y': 5,
        'dropDown': [true],
        'toggles': [false, false, false, false],
        'titles': ['Lowball Blocker', 'Book Combine', 'Zealot Counter', 'Zealot Nuker'],
        'descriptions': [false, false, false, false],
        'settingdowns': [false, false, false, false],
        'settingtoggle': [false, false, false, false],
        'settinglen': [1, 0, 0, 1],
        'settingname': ["test", false, false, "Right Click Mode"]
    },

    'Player': {
        'x': 6.5,
        'y': 5,
        'dropDown': [true],
        'toggles': [false, false],
        'titles': ['Attack Sounds', 'Stats Display'],
        'descriptions': [false, false],
        'settingdowns': [false, false],
        'settingtoggle': [false, false],
        'settinglen': [0, 0],
        'settingname': [false, false]
    },

    'descrip': {
        'x': 380,
        'y': 190,
    },

    'rightclickmode': false,
}, "gui.json")

//descriptions
const desc = [
    [
    ],

    [
    ],

    [
    ],

    [
    ],
]

//open gui command
register('command', () => {
    guistuff.save()
    ChatLib.chat(`${prefix} Saved Data!`)
}).setName('gdata')

let gui = new Gui()
const tabs = [guistuff.Player, guistuff.Skyblock]
const tabnames = ['Player', 'Skyblock']
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
            drawRectHover(0.2, 0.2, 0.2, 1, tab.x, tab.y + (multi * tabHeight), tabHeight, tabWidth, 0).draw()
        } else {
            drawRectHover(0.1, 0.1, 0.1, 1, tab.x, tab.y + (multi * tabHeight), tabHeight, tabWidth, 0).draw()
        }
        drawString(tab.titles[i - 1], tab.x + 4, tab.y + (multi * tabHeight) + 5, 0.8).draw()
        drawRect(0.1, 0.1, 0.1, 1, tab.x, tab.y + (multi * tabHeight), tabHeight, 3, 0).draw()
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
    if (mx < (guistuff.descrip.x - 10) || mx > (guistuff.descrip.x + 290) + 10) return
    if (my < (guistuff.descrip.y - 5) || my > (guistuff.descrip.y + 5) + 5) return
    guistuff.descrip.x += dx
    guistuff.descrip.y += dy
}

const checkClick = (mx, my, b, tab) => {
    if (mx < (tab.x - 10) || mx > (tab.x + tabWidth) + 10) return
    let donw = 0
    if (currentSetting != null) donw = 1
    toChange = Math.floor((my - (tab.y + tabHeight)) / tabHeight)
    if (b == 0 && toChange >= 0 && toChange <= tab.toggles.length - 1 + donw) {
        if (toChange == 4 && guistuff.Skyblock.settingdowns[3]) {
            // Client.setCurrentChatMessage("/melodymessage ")
            guistuff.rightclickmode = !guistuff.rightclickmode
            guistuff.save()
            if(guistuff.rightclickmode) {
                new Message(`${prefix} ${tab.titles[3]}: Right Click Mode ${guistuff.rightclickmode ? "&aON" : "&cOFF"}`).setChatLineId(toChange).chat()
            } else {
                new Message(`${prefix} ${tab.titles[3]}: Right Click Mode OFF`).setChatLineId(toChange).chat()
            }
        }
        if (toChange == currentSetting && currentSetting != null) {
            tab.settingtoggle[toChange - 1] = !tab.settingtoggle[toChange - 1]
        } else if (toChange > currentSetting && currentSetting != null) {
                toChange = toChange - 1
                tab.toggles[toChange] = !tab.toggles[toChange]
        } else {
            tab.toggles[toChange] = !tab.toggles[toChange]
            new Message(`${prefix} ${tab.titles[toChange]}: ${tab.toggles[toChange] ? "&aON" : "&cOFF"}`).setChatLineId(toChange).chat()
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
    guistuff.save()
})

register('clicked', (x, y, b, isDown) => {
    if (!isDown || !gui.isOpen()) return
    tabs.forEach(tab => checkClick(x, y, b, tab))
    guistuff.save()
})

register('renderOverlay', () => {
    if (!gui.isOpen()) return
    image?.draw(Renderer.screen.getWidth()-(image.getTextureWidth()/5), Renderer.screen.getHeight()-(image.getTextureHeight()/0.93), 100, 100)
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
                    drawRect(0.1, 0.1, 0.1, 1, guistuff.descrip.x, guistuff.descrip.y, 110, 290, 4).draw()
                    drawRect(0, 0.5, 1, 1, guistuff.descrip.x, guistuff.descrip.y, 5, 290, 4).draw()
                    drawRect(0, 0.5, 1, 1, guistuff.descrip.x, guistuff.descrip.y + 3, 5, 290, 0).draw()
                    drawString('Description', guistuff.descrip.x + 1, guistuff.descrip.y + 1, 0.8).draw()
                    drawString(desc[index1][index], guistuff.descrip.x + 1, guistuff.descrip.y + 15, 0.8).draw()
                    drawString("To use Set a keybind in Settings", guistuff.descrip.x + 1, guistuff.descrip.y + 21, 0.8).draw()
                } else {
                    drawRect(0.1, 0.1, 0.1, 1, guistuff.descrip.x, guistuff.descrip.y, 30, 290, 4).draw()
                    drawRect(0, 0.5, 1, 1, guistuff.descrip.x, guistuff.descrip.y, 5, 290, 4).draw()
                    drawRect(0, 0.5, 1, 1, guistuff.descrip.x, guistuff.descrip.y + 3, 5, 290, 0).draw()
                    drawString('Description', guistuff.descrip.x + 1, guistuff.descrip.y + 1, 0.8).draw()
                    drawString(desc[index1][index], guistuff.descrip.x + 1, guistuff.descrip.y + 15, 0.8).draw()
                }
            }
        })
    })
})

register('command', () => {
    gui.open()
}).setName('matcha')

register("renderOverlay", () => {
    if(Client.isInChat()) return;
    if(Client.isInGui()) return;
    if(gui.isOpen()) {
        let screenWidth = Renderer.screen.getWidth();
        let screenHeight = Renderer.screen.getHeight();
    
    
        let x = 0; 
        let y = 0; 
        let width = screenWidth; 
        let height = screenHeight;
        let color = Renderer.color(66, 66, 66, 210)
    
        Renderer.drawRect(color, x, y, width, height);
        gui.open()
    }
})

export { gui }