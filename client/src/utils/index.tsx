import { ContentBlock, genKey, ContentState } from "draft-js"
import hexRgb from "hex-rgb"
import { darken, lighten, rgba } from "polished"

const InsertBlock = (contentState: ContentState) => {
    const blockMap = contentState.getBlockMap()
    const newBlock = new ContentBlock({
        key: genKey(),
        text: "",
        type: "unstyled",
    })
    const newBlockMap = blockMap.toSeq().concat([[newBlock.getKey(), newBlock]]).toOrderedMap()
    return contentState.merge({
        blockMap: newBlockMap
    })
}

const RED: number = 0.2126
const GREEN: number = 0.7152
const BLUE: number = 0.0722

const GAMMA: number = 2.4
  
const luminance = (hex: string): number => {
    try{
        const { red, green, blue } = hexRgb(hex)

        const a: number[] = [red, green, blue].map((v) => {
            v /= 255
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA)
        })
    
        return a[0] * RED + a[1] * GREEN + a[2] * BLUE
    } catch {
        return 0
    }
    
}
  
const contrast = (hex1: string, hex2: string): number => {
    const lum1: number = luminance(hex1) + 0.05
    const lum2: number = luminance(hex2) + 0.05
    const brightest: number = Math.max(lum1, lum2)
    const darkest: number = Math.min(lum1, lum2)

    return brightest / darkest
}

const getTextColor = (bgColor: string): string => {
    return contrast(bgColor, "#fff") > 4.5 ? "#fff" : "#000"
}

const getMutedTextColor = (bgColor: string): string => {
    try{
        return getTextColor(bgColor) === "#fff" ? darken("0.2", utils.getTextColor(bgColor)) : lighten("0.6", utils.getTextColor(bgColor))
    } catch {
        return "#000"
    }
}

const getDarkerColor = (n: string, color: string): string => {
    try{
        return darken(n, color)
    } catch {
        return "#000"
    }
}

const getLighterColor = (n: string, color: string): string => {
    try{
        return lighten(n, color)
    } catch {
        return "#000"
    }
}

const getTransparent = (n: number, color: string): string => {
    try{
        return rgba(color, n)
    } catch {
        return "#000"
    }
}

export const utils = {
    InsertBlock,
    contrast,
    getTextColor,
    getMutedTextColor,
    getDarkerColor,
    getLighterColor,
    getTransparent
} 