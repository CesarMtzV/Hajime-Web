from flask import Blueprint, request, jsonify
from jwt import decode
from jwt_functions import validate_token
from os import getenv
from dotenv import load_dotenv

load_dotenv()

routes_homepage = Blueprint('routes_homepage', __name__)

@routes_homepage.before_request
def verify_token_middleware():
    global token

    token = request.headers['Authorization'].split(" ")[1]
    validate_token(token, display=False)

@routes_homepage.route('/', methods=['GET'])
def home():
    user = decode(token, key=getenv('SECRET'), algorithms=['HS256'])
    return jsonify(user['userName'])