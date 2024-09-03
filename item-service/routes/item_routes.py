from flask import Blueprint, request, jsonify, abort
from models import db, Item

item_bp = Blueprint('items', __name__)

@item_bp.route('/', methods=['POST'])
def create_item():
    data = request.json
    name = data.get('name')
    description = data.get('description')
    created_by = data.get('created_by')

    if not name:
        abort(400, description="Name is required")

    item = Item(name=name, description=description, created_by=created_by)
    db.session.add(item)
    db.session.commit()

    return jsonify({'id': item.id, 'name': item.name, 'description': item.description, 'created_by': item.created_by, 'created_at': item.created_at}), 201

@item_bp.route('/', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([{
        'id': item.id,
        'name': item.name,
        'description': item.description,
        'created_by': item.created_by,
        'created_at': item.created_at
    } for item in items])

@item_bp.route('/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = Item.query.get_or_404(item_id)
    return jsonify({
        'id': item.id,
        'name': item.name,
        'description': item.description,
        'created_by': item.created_by,
        'created_at': item.created_at
    })

@item_bp.route('/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    item = Item.query.get_or_404(item_id)
    data = request.json
    item.name = data.get('name', item.name)
    item.description = data.get('description', item.description)
    item.created_by = data.get('created_by', item.created_by)

    db.session.commit()
    return jsonify({
        'id': item.id,
        'name': item.name,
        'description': item.description,
        'created_by': item.created_by,
        'created_at': item.created_at
    })

@item_bp.route('/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    item = Item.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return '', 204
