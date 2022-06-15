from flask import Blueprint, jsonify, request
from jwt_functions import write_token, validate_token, decode
import bcrypt
from os import getenv
from dotenv import load_dotenv

routes_users = Blueprint('routes_users', __name__)


@routes_users.route('/signup', methods=['POST'])
def signup():
    from api import db
    exists = db.users.find_one({'userName': request.json['userName']})
    if exists is None:
        hashpw = bcrypt.hashpw(
            request.json['password'].encode('UTF-8'), bcrypt.gensalt())
        db.users.insert_one({
            'name': request.json['name'],
            'userName': request.json['userName'],
            'email': request.json['email'],
            'password': hashpw,
            'pp': "//ssl.gstatic.com/accounts/ui/avatar_2x.png",
            'kanji_sets': [],
            'achievements': [
                {
                    'title': 'New Katakana Record',
                    'progress': 0,
                    'description': 'You broke your record studying Katakana'
                },
                {
                    'title': 'New Hiragana Record',
                    'progress': 0,
                    'description': 'You broke your record studying Hiragana'
                },
                {
                    'title': 'First Time Katakana',
                    'progress': 0,
                    'description': 'You practiced Katakana for the first time'
                },
                {
                    'title': 'First Time Hiragana',
                    'progress': 0,
                    'description': 'You practiced Hiragana for the first time'
                },
                {
                    'title': 'Random',
                    'progress': 0,
                    'description': 'You generated your first random Kanji'
                },
                {
                    'title': 'Kanji Deck',
                    'progress': 0,
                    'description': 'You created your first Kanji deck'
                },
                {
                    'title': 'Deck Master',
                    'progress': 0,
                    'description': 'You created 10 Kanji sets'
                },
                {
                    'title': 'Dedicated Student',
                    'progress': 0,
                    'description': 'You logged in more than 10 times'
                },
                {
                    'title': 'Quiz Master',
                    'progress': 0,
                    'description': 'Yo got more than 10 in a quiz'
                }
            ],
            'katakanaHighScore': 0,
            'hiraganaHighScore': 0,
            'kanjiHighScore': 0
        })
        return jsonify({'message': 'Account created succesfully!'})
    return jsonify({'message': 'Username already exists!'})


@routes_users.route('/login', methods=['POST'])
def login():
    from api import db
    user = db.users.find_one({'userName': request.json['userName']})
    if user:
        if bcrypt.checkpw(request.json['password'].encode('UTF-8'), user['password']):
            return write_token(data=request.get_json())
        else:
            response = jsonify({'message': 'Password is ncorrect!'})
            response.status_code = 404
            return response

    response = jsonify({'message': 'Username or password are incorrect!'})
    response.status_code = 404
    return response

@routes_users.route('/setpp', methods=['POST'])
def set_pp():
    from api import db

    token = request.headers['Authorization'].split(" ")[1]
    validate_token(token, display=False)

    user = decode(token, key=getenv('SECRET'), algorithms=['HS256'])

    db.users.update_one(
        {'userName': user['userName']},
        {'$set': {'pp': request.json['pp']}}
    )

    return jsonify({'message': 'New profile picture set succesfully!'})

@routes_users.route('/verifytoken', methods=['GET'])
def verify():
    token = request.headers['Authorization'].split(" ")[1]
    return validate_token(token, display=True)
