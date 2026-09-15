"""
Nom du module         : unicast.py
Description           : 
  Module gérant une boucle de diffusion pour un groupe de WebSocket avec des 
  données personnalisées pour chaque WebSocket.

Auteur                : TheRake66
Date de création      : 2026-08-28 04:01:51
Dernière modification : 2026-08-28 04:01:51
Version               : 1.0.0
Licence               : GPL-3.0

Notes                 : 
  Pour utiliser une liste de diffusion dans le front, il suffit d'enregistrer
  les événements :
    - name#follow : Enregistre le WebSocket dans la boucle de diffusion.
    - name#unfollow : Retire le WebSocket dans la boucle de diffusion.
    - name#receive : Envoie les données de la boucle de diffusion vers le WebSocket.
  
  En cas de crash, l'événement "unfollow" ne survient pas, il faut donc retirer
  manuellement le WebSocket lors de l'événement "disconnect" en appelant "cleanup_sid".
"""

from asyncio import Task, CancelledError, sleep, create_task
from typing import Callable, List, Dict, Awaitable, Coroutine
from services.websocket import websocket, emit_data
from libraries.response import Response

type UniTask = Callable[[str], Awaitable[Response]]
"""Fonction retournant les données à diffuser.

Arguments:
  str: L'identifiant WebSockets en cours de traitement.

Returns:
  Awaitable[Response]: Les données à diffuser au WebSocket.
"""

class UniCast():
  """Gère une boucle de diffusion pour un groupe de WebSocket avec des données personnalisées 
  pour chaque WebSocket."""

  __actives: List[UniCast] = []
  """Liste de toutes les listes de diffusion."""
  
  def __init__(self, name: str, callback: UniTask, interval: float = 1.0) -> None:
    """Constructeur de la classe.

    Arguments:
      name (str): Nom de la boucle de diffusion.
      callback (UniTask): Fonction retournant les données à diffuser.
      interval (float): Nombre de secondes entre chaque diffusion. Par défaut à 1.0.
    """
    self.__follow: str = f"{name}#follow"
    self.__unfollow: str = f"{name}#unfollow"
    self.__receive: str = f"{name}#receive"
    self.__callback: UniTask = callback
    self.__interval: float = interval
    self.__tasks: Dict[str, Task] = {}
    self.__register_events()
    UniCast.__actives.append(self)
  
  def __delete_sid(self, sid: str) -> None:
    """Supprime un WebSocket de la boucle de diffusion.

    Arguments:
      sid (str): ID du WebSocket à supprimer.
    """
    if sid in self.__tasks:
      self.__tasks[sid].cancel()
      del self.__tasks[sid]
  
  def __create_sid(self, sid: str) -> None:
    """Ajoute un WebSocket à la boucle de diffusion.

    Arguments:
      sid (str): ID du WebSocket à ajouter.
    """
    if sid not in self.__tasks:
      routine: Coroutine = self.__stream_loop(sid)
      self.__tasks[sid] = create_task(routine)

  async def __stream_loop(self, sid: str) -> None:
    """Tâche d'exécution pour un WebSocket unique.

    Arguments:
      sid (str): ID du WebSocket pour la tâche.
    """
    try:
      while True:
        data: Response = await self.__callback(sid)
        await emit_data(self.__receive, data, sid)
        await sleep(self.__interval)
    except CancelledError: pass

  def __register_events(self):
    """Enregistre les différents événements."""
    @websocket.on(self.__follow)
    async def follow(sid: str) -> None: 
      self.__create_sid(sid)
      
    @websocket.on(self.__unfollow)
    async def unfollow(sid: str) -> None: 
      self.__delete_sid(sid)
  
  @classmethod
  def cleanup_sid(cls, sid: str) -> None:
    """Retire un WebSocket de toutes les listes de diffusion lors d'un crash.

    Arguments:
      sid (str): L'identifiant du WebSocket à supprimer.
    """
    for active in cls.__actives:
      active.__delete_sid(sid)