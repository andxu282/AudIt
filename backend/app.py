from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session
from models.item import Item
from schemas import ItemSchema
from dotenv import load_dotenv
import os

load_dotenv()
DATABASE_URL = os.getenv('DATABASE_URL')

app = Flask(__name__)
CORS(app)
engine = create_engine(DATABASE_URL)


@app.route('/api/items')
def get_items():
    with Session(engine) as session:
        statement = select(Item)
        items = session.execute(statement).scalars().all()
        items_data = [ItemSchema.model_validate(item).model_dump() for item in items]
        return jsonify(items_data)
