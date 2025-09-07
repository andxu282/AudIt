import uuid
from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session
from models.item import Item
from schemas import ItemSchema, ItemCreate, ItemType, ItemCategory
from dotenv import load_dotenv
import os
from datetime import datetime, timezone
from pydantic import ValidationError

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

@app.route('/api/items', methods=['POST'])
def create_item():
    if not request.is_json:
        return {'error': 'Expected application/json'}, 415
    try:
        data = ItemCreate.model_validate(request.get_json())
    except ValidationError as e:
        return {'error': e.errors()}, 422

    try:
        print(data)
        with Session(engine) as session:
            new_item = Item(
                id = str(uuid.uuid4()),
                name = data.name,
                amount = data.amount,
                type = ItemType(data.type),
                category = ItemCategory(data.category),
                frequency = data.frequency,
                created_at = datetime.now(timezone.utc),
                updated_at = datetime.now(timezone.utc)
            )
            session.add(new_item)
            session.commit()
            session.refresh(new_item)

            return jsonify(ItemSchema.model_validate(new_item).model_dump())
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500