import json
from flask import Blueprint, request, jsonify
from jwt import decode
from jwt_functions import validate_token
from os import getenv
from dotenv import load_dotenv
import bson.json_util as json_util

load_dotenv()

routes_homepage = Blueprint('routes_homepage', __name__)

@routes_homepage.before_request
def verify_token_middleware():
    global token

    token = request.headers['Authorization'].split(" ")[1]
    validate_token(token, display=False)

@routes_homepage.route('/', methods=['GET'])
def home():
    from api import db

    user = decode(token, key=getenv('SECRET'), algorithms=['HS256'])
    user_data = db.users.find_one({
        'userName': user["userName"]
    })

    return json_util.dumps(user_data)