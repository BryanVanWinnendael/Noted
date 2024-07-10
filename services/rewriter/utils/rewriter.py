from utils.text_rewrite import TextRewrite

def rewrite_text(text):
    new_sentence = TextRewrite(text).work() 
    return {"text": new_sentence}

