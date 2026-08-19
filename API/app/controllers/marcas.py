from flask import Blueprint, jsonify, request

from app.models.marca import Marca

marcas_bp = Blueprint("marcas", __name__)
marca_model = Marca()


@marcas_bp.route("", methods=["GET"])
def get_marcas():
    id_param = request.args.get("id")
    if id_param:
        marca = marca_model.get_by_id(id_param)
        if not marca:
            return jsonify({"error": "Marca no encontrada"}), 404
        return jsonify(marca), 200
    return jsonify(marca_model.get_all()), 200


@marcas_bp.route("", methods=["POST"])
def create_marca():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Body JSON requerido"}), 400
    new_id = marca_model.create(data)
    return jsonify({"message": "Marca creada", "id": new_id}), 201


@marcas_bp.route("", methods=["PUT"])
def update_marca():
    id_param = request.args.get("id")
    if not id_param:
        return jsonify({"error": "Parámetro 'id' requerido"}), 400
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Body JSON requerido"}), 400
    updated = marca_model.update(id_param, data)
    if not updated:
        return jsonify({"error": "Marca no encontrada"}), 404
    return jsonify({"message": "Marca actualizada"}), 200


@marcas_bp.route("", methods=["DELETE"])
def delete_marca():
    id_param = request.args.get("id")
    if not id_param:
        return jsonify({"error": "Parámetro 'id' requerido"}), 400
    deleted = marca_model.delete(id_param)
    if not deleted:
        return jsonify({"error": "Marca no encontrada"}), 404
    return jsonify({"message": "Marca eliminada"}), 200
