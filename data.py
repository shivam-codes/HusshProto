from datasets import load_dataset
from cone import createPineconeIndex, createEmbeddings, populateIndex
import numpy as np
from database import getIndexName, updateData

trec = load_dataset('trec', split='train[:5000]')

def getShape(data):
    return np.array(data).shape

def populateCone(data, index, datatype, userid):
    embeds = createEmbeddings(data)
    shape = getShape(embeds)
    index_name = createPineconeIndex(index, shape[1])
    populateIndex(index_name, data,embeds) 
    updateData(userid, index_name, datatype)


def generateDataset(userid):
    index = f'dataset-{userid}'
    index_name = getIndexName(userid, 'dataset')
    if len(index_name) == 0:
        populateCone(trec['text'], index, 'dataset', userid)   
    return 'success'

def generateMailset(data, userid):
    index = f'gmail-{userid}'
    index_name = getIndexName(userid, 'gmail')
    try:
        if len(index_name) == 0:
            populateCone(data, index, 'gmail', userid)
    except:
        return "failed"
    return 'success'
        