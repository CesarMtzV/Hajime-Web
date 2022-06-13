import json
from flask import Blueprint, request, jsonify
from jwt import decode
from jwt_functions import validate_token
from os import getenv
from dotenv import load_dotenv
import bson.json_util as json_util

load_dotenv()

routes_kanji = Blueprint('routes_kanji', __name__)

@routes_kanji.before_request
def verify_token_middleware():
    global token

    token = request.headers['Authorization'].split(" ")[1]
    validate_token(token, display=False)

# POST: Nuevo Kanji agregado al set (Kanji, strokes, pronunciaciones, significado, ejemplos)
@routes_kanji.route('/set/character', methods=['POST'])
def add_kanji_character():
    from api import db

    # Check if user exists
    user = db.users.find_one({
        'userName': request.json['userName']
    })
    if not user:
        return jsonify({
            "status_code": 404,
            "body": "User not found"
        }), 404
    
    # Add new character to array
    for index, set in enumerate(user["kanji_sets"]):
        if set['title'] == request.json['set_title']:
            new_kanji = db.users.update_one(
                { "userName": request.json["userName"], f'kanji_sets.{index}.title': request.json['set_title'] },
                { "$push": { f'kanji_sets.{index}.kanji': request.json["kanji"] } }
            )
            # print(new_kanji.modified_count)
    

    return jsonify({
        "status_code":200,
        "body": "Kanji added succesfully!"
    }), 200

# POST: Nuevo set de kanji (title)
@routes_kanji.route('/set', methods=['POST'])
def add_kanji_set():
    from api import db

    # Check if user exists
    user = db.users.find_one({
        'userName': request.json['userName']
    })
    if not user:
        return jsonify({
            "status_code": 404,
            "body": "User not found"
        }), 404
    
    # Check if kanji set exists
    duplicate = db.users.find_one({
        "userName": request.json["userName"],
        "kanji_sets.title": request.json["kanji_set"]["title"]
    })

    if not duplicate:
        db.users.update_one(
            { "userName": request.json["userName"] },
            { "$push": { "kanji_sets": request.json["kanji_set"] } }
        )

        return jsonify({
            "status_code": 200,
            "body": "Kanji set created succesfully"
        }), 200
    
    # If the kanji set was a duplicate
    return jsonify({
            "status_code": 404,
            "body": "Kanji set already exists"
    }), 404
