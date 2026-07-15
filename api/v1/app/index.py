from app.controllers.marcas import marcas_bp
from app.controllers.prendas import prendas_bp
from app.controllers.reportes import reportes_bp
from app.controllers.usuarios import usuarios_bp
from app.controllers.ventas import ventas_bp

PREFIX = "/tienda/api/v1"


def register_blueprints(app):
    app.register_blueprint(usuarios_bp, url_prefix=f"{PREFIX}/usuarios")
    app.register_blueprint(marcas_bp, url_prefix=f"{PREFIX}/marcas")
    app.register_blueprint(prendas_bp, url_prefix=f"{PREFIX}/prendas")
    app.register_blueprint(ventas_bp, url_prefix=f"{PREFIX}/ventas")
    app.register_blueprint(reportes_bp, url_prefix=f"{PREFIX}/reportes")
