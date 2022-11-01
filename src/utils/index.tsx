import { ContentBlock, genKey, ContentState } from "draft-js"

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

export const utils = {
    InsertBlock
} 