from __future__ import print_function

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from data import generateMailset
import requests

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
PATH = './tokens'


def generateCred(path):
    creds = None
    if os.path.exists(path):
        creds = Credentials.from_authorized_user_file(path, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
    return creds
        

def generateToken(userid):
    path = os.path.join(PATH, f"{userid}.json")
    creds = generateCred(path)
    with open(path, 'w') as token:
        token.write(creds.to_json())
    data = generateMail(creds)
    res = generateMailset(data, userid)
    if res == "success":
        return "success"
    else:
        return "failed"
   

def generateMail(creds):
    try:
        service = build('gmail', 'v1', credentials=creds)
        profile = service.users().messages().list(userId='me', maxResults=500).execute()
        idList = profile['messages']
        mailList = []
        for message in idList:
            mes = service.users().messages().get(userId='me', id=message['id'],format='minimal').execute()
            mailList.append(mes['snippet'])
        return mailList
    except HttpError as error:
        print(f'Error occurred: {error}')
