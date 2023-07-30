from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Union
from uuid import UUID, uuid4
from cone import queryFromDatabase
import json
from fastapi.middleware.cors import CORSMiddleware
from database import check_user, getIndexName, getUserName
from mail import generateCred, generateToken
from data import generateDataset

app = FastAPI()

origins = [
    "*"
]

class Item(BaseModel):
    username: str 
    password: str

class Query(BaseModel):
    q: str
    query:str
    user:str


app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/link/{type}')
async def access_gmail(type: str):
    data, userid = type.split('_')
    res = {}
    if data == 'gmail':
        res = generateToken(userid)
    elif data == 'dataset':
        res = generateDataset(userid)
    result = {"res":res}
    return json.dumps(result)


@app.post("/query/")
async def query(param: Query):
    q = param.q
    query = param.query
    userid = param.user
    index_name = ''
    if q == 'gmail':
        index_name = getIndexName(userid,q)
    if q == 'dataset':
        index_name = getIndexName(userid,q)
    res = queryFromDatabase(index_name, query)
    res = json.dumps(res)
    return res

@app.post("/user/")
async def check(use:Item):
    id = use.username
    pas = use.password
    user = check_user(id)
    token = ''
    name = ''
    if user == False:
        token = 'no'
    else:
        if pas == user[1]:
            token = user[0]
            name = getUserName(id)
        else:
            token = 'invalid'
    return {'token':token,'name':name}
    


      
            