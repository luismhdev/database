from flask import Blueprint, jsonify, request

from app.models.venta import Venta

ventas_bp = Blueprint("ventas", __name__)
venta_model = Venta()


@ventas_bp.route("", methods=["GET"])
def get_ventas():
    id_param = request.args.get("id")
    if id_param:
        venta = venta_model.get_by_id(id_param)
        if not venta:
            return jsonify({"error": "Venta no encontrada"}), 404
        return jsonify(venta), 200
    return jsonify(venta_model.get_all()), 200


@ventas_bp.route("", methods=["POST"])
def create_venta():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Body JSON requerido"}), 400
    new_id = venta_model.create(data)
    return jsonify({"message": "Venta creada", "id": new_id}), 201


@ventas_bp.route("", methods=["PUT"])
def update_venta():
    id_param = request.args.get("id")
    if not id_param:
        return jsonify({"error": "Parámetro 'id' requerido"}), 400
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Body JSON requerido"}), 400
    updated = venta_model.update(id_param, data)
    if not updated:
        return jsonify({"error": "Venta no encontrada"}), 404
    return jsonify({"message": "Venta actualizada"}), 200


@ventas_bp.route("", methods=["DELETE"])
def delete_venta():
    id_param = request.args.get("id")
    if not id_param:
        return jsonify({"error": "Parámetro 'id' requerido"}), 400
    deleted = venta_model.delete(id_param)
    if not deleted:
        return jsonify({"error": "Venta no encontrada"}), 404
    return jsonify({"message": "Venta eliminada"}), 200
