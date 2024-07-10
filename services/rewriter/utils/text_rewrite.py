from utils.best_syn import *

class TextRewrite:
    def __init__(self, sentence):
        self.sentence = sentence

    def work(self):
        rewrite_types = [u'NN', u'NNS', u'JJ', u'JJS']
        pos_tokenizer = nlp(str(self.sentence))
        words = []
        for token in pos_tokenizer:
            if token.tag_ in rewrite_types:
                words.append(token.text)
        rewrited_sentence = self.sentence
        for word in words:
            word_syn = BestSyn(word).pull()[1]
            rewrited_sentence = rewrited_sentence.replace(word, word_syn)
        return rewrited_sentence

    def __del__(self):
        self.sentence = False

