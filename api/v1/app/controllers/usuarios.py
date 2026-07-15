from flask import Blueprint, jsonify, request

from app.models.usuario import Usuario

usuarios_bp = Blueprint("usuarios", __name__)
usuario_model = Usuario()


@usuarios_bp.route("", methods=["GET"])
def get_usuarios():
    id_param = request.args.get("id")
    if id_param:
        usuario = usuario_model.get_by_id(id_param)
        if not usuario:
            return jsonify({"error": "Usuario no encontrado"}), 404
        return jsonify(usuario), 200
    return jsonify(usuario_model.get_all()), 200


@usuarios_bp.route("", methods=["POST"])
def create_usuario():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Body JSON requerido"}), 400
    new_id = usuario_model.create(data)
    return jsonify({"message": "Usuario creado", "id": new_id}), 201


@usuarios_bp.route("", methods=["PUT"])
def update_usuario():
    id_param = request.args.get("id")
    if not id_param:
        return jsonify({"error": "Parámetro 'id' requerido"}), 400
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Body JSON requerido"}), 400
    updated = usuario_model.update(id_param, data)
    if not updated:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify({"message": "Usuario actualizado"}), 200


@usuarios_bp.route("", methods=["DELETE"])
def delete_usuario():
    id_param = request.args.get("id")
    if not id_param:
        return jsonify({"error": "Parámetro 'id' requerido"}), 400
    deleted = usuario_model.delete(id_param)
    if not deleted:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify({"message": "Usuario eliminado"}), 200
