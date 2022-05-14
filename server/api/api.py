from flask import Flask
from flask_pymongo import PyMongo
from os import getenv
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = getenv('MONGO_URI')
mongo = PyMongo(app)
db = mongo.db

from routes.users import routes_users
from routes.homepage import routes_homepage
from routes.achievements import routes_achievements
app.register_blueprint(routes_users, url_prefix='/users')
app.register_blueprint(routes_homepage, url_prefix='/home')
app.register_blueprint(routes_achievements, url_prefix='/achievements')

if __name__ == '__main__':
    app.secret_key = getenv('SECRET_KEY')
    app.run(debug=True)