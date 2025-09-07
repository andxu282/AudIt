from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, Session, select
from dotenv import load_dotenv
# from models.user import User
from models.item import Item
from schemas import ItemType, ItemCategory
import os
import uuid
from datetime import datetime, timezone


load_dotenv()

app = Flask(__name__)
CORS(app)

DATABASE_URL = os.getenv('DATABASE_URL')
if not DATABASE_URL:
    raise ValueError('DATABASE_URL environment variable is not set')

engine = create_engine(DATABASE_URL)

@app.route('/api/items', methods=['GET'])
def get_items():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'no user_id was provided'}), 400

    with Session(engine) as session:
        statement = select(Item).where(Item.user_id == user_id)
        items = session.exec(statement).all()

        items_data = []
        for item in items:
            items_data.append({
                'id': str(item.id),
                'name': item.name,
                'amount': item.amount,
                'type': item.type.value,
                'category': item.category.value,
                'frequency': item.frequency,
                'created_at': item.created_at.isoformat(),
                'user_id': str(item.user_id)
            })
        
        return jsonify(items_data)

@app.route('/api/items', methods=['POST'])
def create_item():
    data = request.get_json()

    required_fields = ['name', 'amount', 'type', 'category', 'frequency', 'user_id']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} is required but was not provided'}), 400
        
    try:
        with Session(engine) as session:
            new_item = Item(
                id=str(uuid.uuid4()),
                name=data['name'],
                amount=float(data['price']),
                type=ItemType(data['type']),
                category=ItemCategory(data['category']),
                frequency=int(data['frequency']),
                user_id=data['user_id'],
                created_at=datetime.now(timezone.utc)
            )

            session.add(new_item)
            session.commit()
            session.refresh(new_item)

            return jsonify({
                'id': str(new_item.id),
                'name': new_item.name,
                'amount': new_item.amount,
                'type': new_item.type.value,
                'category': new_item.category.value,
                'frequency': new_item.frequency,
                'user_id': str(new_item.user_id),
                'created_at': new_item.created_at.isoformat()
            }), 201
    except ValueError as e:
        return jsonify({"error": f"Invalid enum value: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/items/<item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.get_json()

    try:
        with Session(engine) as session:
            statement = select(Item).where(Item.id == item_id)
            item = session.exec(statement).first()

            if not item:
                return jsonify({'error': 'Item not found'}), 404
            
            if 'name' in data:
                item.name = data['name']
            if 'amount' in data:
                item.amount = float(data['amount'])
            if 'type' in data:
                item.type = ItemType(data['type'])
            if 'category' in data:
                item.category = ItemCategory(data['category'])
            if 'frequency' in data:
                item.frequency = int(data['frequency'])
            
            session.add(Item)
            session.commit()
            session.refresh(item)

            return jsonify({
                'id': str(item.id),
                'name': item.name,
                'price': item.price,
                'type': item.type.value,
                'category': item.category.value,
                'frequency': item.frequency,
                'created_at': item.created_at.isoformat(),
                'user_id': str(item.user_id)
            })
    except ValueError as e:
        return jsonify({"error": f"Invalid enum value: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/items/<item_id>', methods=['PUT'])
def delete_item(item_id):
    data = request.get_json()

    try:
        with Session(engine) as session:
            statement = select(Item).where(Item.id == item_id)
            item = session.exec(statement).first()

            if not item:
                return jsonify({'error': 'Item not found'}), 404
            
            session.delete(item)
            session.commit()

            return jsonify({'message': 'Item deleted successfully'})
    except Exception as e:
        return jsonify({'error': e}), 500