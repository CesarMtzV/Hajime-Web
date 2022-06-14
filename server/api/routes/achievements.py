from flask import Blueprint, request, jsonify
from jwt import decode
from jwt_functions import validate_token
from os import getenv
from dotenv import load_dotenv

load_dotenv()

routes_achievements = Blueprint('routes_achievements', __name__)

@routes_achievements.before_request
def verify_token_middleware():
    global token

    token = request.headers['Authorization'].split(" ")[1]
    validate_token(token, display=False)

@routes_achievements.route('/getAchievements', methods=['GET'])
def get_achievements():
    from api import db
    user = decode(token, key=getenv('SECRET'), algorithms=['HS256'])

    foundUser = db.users.find_one({
        'userName': user['userName']
    })

    if not foundUser:
        return jsonify({
            "status_code": 404,
            "body": "User not found"
        }), 404
    
    return jsonify({'achievements': foundUser['achievements']})

@routes_achievements.route('/hiraganaHighScore', methods=['GET', 'POST'])
def save_hiragana_score():
    from api import db
    user = decode(token, key=getenv('SECRET'), algorithms=['HS256'])

    if request.method == 'POST':
        db.users.update_one(
            {'userName': user['userName']},
            {'$set': {'hiraganaHighScore': request.json['hiraganaHighScore']}}
        )
        return jsonify({'message': 'New Hiragana high score set succesfully!'})
    else:
        foundUser = db.users.find_one({'userName': user['userName']})
        return jsonify({'hiraganaHighScore': foundUser['hiraganaHighScore']})

@routes_achievements.route('/katakanaHighScore', methods=['GET','POST'])
def save_katakana_score():
    from api import db
    user = decode(token, key=getenv('SECRET'), algorithms=['HS256'])
    
    if request.method == 'POST':
        print(request.json)
        db.users.update_one(
            {'userName': user['userName']},
            {'$set': {'katakanaHighScore': request.json['katakanaHighScore']}}
        )
        return jsonify({'message': 'New Katakana high score set succesfully!'})
    else:
        foundUser = db.users.find_one({'userName': user['userName']})
        return jsonify({'katakanaHighScore': foundUser['katakanaHighScore']})