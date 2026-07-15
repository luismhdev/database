from flask import Blueprint, jsonify, request

from app.models.prenda import Prenda

prendas_bp = Blueprint("prendas", __name__)
prenda_model = Prenda()


@prendas_bp.route("", methods=["GET"])
def get_prendas():
    id_param = request.args.get("id")
    if id_param:
        prenda = prenda_model.get_by_id(id_param)
        if not prenda:
            return jsonify({"error": "Prenda no encontrada"}), 404
        return jsonify(prenda), 200
    return jsonify(prenda_model.get_all()), 200


@prendas_bp.route("", methods=["POST"])
def create_prenda():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Body JSON requerido"}), 400
    new_id = prenda_model.create(data)
    return jsonify({"message": "Prenda creada", "id": new_id}), 201


@prendas_bp.route("", methods=["PUT"])
def update_prenda():
    id_param = request.args.get("id")
    if not id_param:
        return jsonify({"error": "Parámetro 'id' requerido"}), 400
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Body JSON requerido"}), 400
    updated = prenda_model.update(id_param, data)
    if not updated:
        return jsonify({"error": "Prenda no encontrada"}), 404
    return jsonify({"message": "Prenda actualizada"}), 200


@prendas_bp.route("", methods=["DELETE"])
def delete_prenda():
    id_param = request.args.get("id")
    if not id_param:
        return jsonify({"error": "Parámetro 'id' requerido"}), 400
    deleted = prenda_model.delete(id_param)
    if not deleted:
        return jsonify({"error": "Prenda no encontrada"}), 404
    return jsonify({"message": "Prenda eliminada"}), 200
