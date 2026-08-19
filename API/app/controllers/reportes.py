from flask import Blueprint, jsonify

from app import db

reportes_bp = Blueprint("reportes", __name__)


@reportes_bp.route("/marcas-con-ventas", methods=["GET"])
def marcas_con_ventas():
    pipeline = [
        {"$match": {"estado": "Completada"}},
        {"$group": {"_id": "$prenda.marca", "totalTransacciones": {"$sum": 1}}},
        {"$project": {"_id": 0, "marca": "$_id", "totalTransacciones": 1}},
        {"$sort": {"marca": 1}},
    ]
    resultado = list(db.ventas.aggregate(pipeline))
    return jsonify(resultado), 200


@reportes_bp.route("/prendas-stock", methods=["GET"])
def prendas_stock():
    pipeline = [
        {
            "$lookup": {
                "from": "ventas",
                "let": {"nombrePrenda": "$nombre"},
                "pipeline": [
                    {
                        "$match": {
                            "$expr": {
                                "$and": [
                                    {"$eq": ["$prenda.nombre", "$$nombrePrenda"]},
                                    {"$eq": ["$estado", "Completada"]},
                                ]
                            }
                        }
                    }
                ],
                "as": "ventasRelacionadas",
            }
        },
        {"$addFields": {"totalVendido": {"$sum": "$ventasRelacionadas.cantidad"}}},
        {"$match": {"totalVendido": {"$gt": 0}}},
        {
            "$project": {
                "_id": 0,
                "prenda": "$nombre",
                "marca": "$marca.nombre",
                "categoria": 1,
                "stockActual": "$stock",
                "totalVendido": 1,
            }
        },
        {"$sort": {"totalVendido": -1}},
    ]
    resultado = list(db.prendas.aggregate(pipeline))
    return jsonify(resultado), 200


@reportes_bp.route("/top-marcas", methods=["GET"])
def top_marcas():
    pipeline = [
        {"$match": {"estado": "Completada"}},
        {"$group": {"_id": "$prenda.marca", "totalUnidadesVendidas": {"$sum": "$cantidad"}}},
        {"$sort": {"totalUnidadesVendidas": -1}},
        {"$limit": 5},
        {"$project": {"_id": 0, "marca": "$_id", "totalUnidadesVendidas": 1}},
    ]
    resultado = list(db.ventas.aggregate(pipeline))
    return jsonify(resultado), 200
