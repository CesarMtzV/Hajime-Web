from flask import jsonify
from jwt import encode, decode, exceptions
from os import getenv
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()

def expire_date(days):
    now = datetime.now()
    new_date = now + timedelta(days)
    return new_date

def write_token(data):
    token = encode(payload={**data, 'exp': expire_date(2)}, key=getenv('SECRET'), algorithm='HS256')
    return token.encode('UTF-8')

def validate_token(token, display=False):
    try:
        if display:
            return decode(token, key=getenv('SECRET'), algorithms=['HS256'])
        decode(token, key=getenv('SECRET'), algorithms=['HS256'])
    except exceptions.DecodeError:
        response = jsonify({'message': 'Invalid Token'})
        response.status_code = 401
        return response
    except exceptions.ExpireSignatureError:
        response = jsonify({'message': 'Expired Token'})
        response.status_code = 401
        return response
