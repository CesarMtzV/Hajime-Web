from flask import Flask
from flask_pymongo import PyMongo
from os import getenv
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = getenv('MONGO_URI')
mongo = PyMongo(app)
db = mongo.db

from routes.users import routes_users
app.register_blueprint(routes_users, url_prefix='/users')

if __name__ == '__main__':
    app.secret_key = getenv('SECRET_KEY')
    app.run(debug=True)