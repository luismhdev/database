import hmac
import os

from flask import jsonify, request

API_TOKEN = os.environ["API_TOKEN"]


def require_token():
    """Middleware global (before_request): exige un header
    Authorization: Bearer <token> valido en cada request a la API."""
    if request.method == "OPTIONS":
        # El navegador no envia Authorization en el preflight CORS.
        return None

    auth_header = request.headers.get("Authorization", "")
    scheme, _, token = auth_header.partition(" ")

    if scheme != "Bearer" or not token or not hmac.compare_digest(token, API_TOKEN):
        return jsonify({"errores": "token no valido"}), 401
