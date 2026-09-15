"""
Nom du module         : {{lower_name}}.py
Description           : 

Auteur                : {{user_name}}
Date de création      : {{datetime_full}}
Dernière modification : {{datetime_full}}
Version               : 1.0.0
Licence               : {{licence_name}}

Notes                 : 
"""

from services.websocket import websocket, emit_data
from libraries.structure import Structure
from libraries.response import Response
from typing import Any, Optional
from fastapi import APIRouter

# Point d'entrée de {{title_name}}.
NAMESPACE: str = "{{namespace_dash_lower}}"
URLPATH: str = "{{namespace_slash_lower}}"

# Routeur pour l'API REST de {{title_name}}.
router: APIRouter = APIRouter(prefix=f"/{URLPATH}")

class {{title_name}}(Structure):
  """Schéma de données de {{title_name}}."""
  pass

@router.get("/hello")
async def hello_apirest() -> Response:
  """Fonction qui dit bonjour pour l'API REST."""
  return Response(message="Bonjour depuis l'API REST {{title_name}}.")

@websocket.on(f"{NAMESPACE}:hello")
async def hello_websocket() -> None:
  """Fonction qui dit bonjour pour le WebSocket."""
  await emit_data(f"{NAMESPACE}:hello", \
    Response(message="Bonjour depuis le WebSocket {{title_name}}."))