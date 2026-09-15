"""
Nom du module         : multicast.py
Description           : Module gérant une boucle de diffusion pour un groupe de WebSocket.

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
  
  On utilise une liste d'utilisateurs indépendante de Socket.IO (emit room) pour éviter les
  doublons à cause de Redis s'il y a plusieurs instances de serveur. Chaque instance a sa
  propre liste à gérer.
"""

from typing import Callable, Optional, List, Awaitable, Coroutine, Tuple
from asyncio import Task, CancelledError, sleep, create_task
from services.websocket import websocket, emit_data
from libraries.response import Response

type MultiTask = Callable[[Tuple[str]], Awaitable[Response]]
"""Fonction retournant les données à diffuser.

Arguments:
  Tuple[str]: Liste des WebSockets présents dans la liste de diffusion.

Returns:
  Awaitable[Response]: Les données à diffuser aux WebSockets.
"""

class MultiCast():
  """Gère une boucle de diffusion pour un groupe de WebSocket."""

  __actives: List[MultiCast] = []
  """Liste de toutes les listes de diffusion."""
  
  def __init__(self, name: str, callback: MultiTask, interval: float = 1.0) -> None:
    """Constructeur de la classe.

    Arguments:
      name (str): Nom de la boucle de diffusion.
      callback (MultiTask): Fonction retournant les données à diffuser.
      interval (float): Nombre de secondes entre chaque diffusion. Par défaut à 1.0.
    """
    self.__follow: str = f"{name}#follow"
    self.__unfollow: str = f"{name}#unfollow"
    self.__receive: str = f"{name}#receive"
    self.__callback: MultiTask = callback
    self.__interval: float = interval
    self.__task: Optional[Task] = None
    self.__sids: List[str] = []
    self.__count: int = 0
    self.__register_events()
    MultiCast.__actives.append(self)
  
  def __append_group(self, sid: str) -> None:
    """Ajoute un WebSocket à la boucle de diffusion.

    Arguments:
      sid (str): L'identifiant du WebSocket à ajouter.
    """
    if not sid in self.__sids:
      self.__sids.append(sid)
      self.__count += 1
      if self.__count == 1:
        routine: Coroutine = self.__stream_loop()
        self.__task = create_task(routine)
      
  def __remove_group(self, sid: str) -> None:
    """Supprime un WebSocket de la boucle de diffusion.

    Arguments:
      sid (str): L'identifiant du WebSocket à supprimer.
    """
    if sid in self.__sids:
      self.__sids.remove(sid)
      self.__count -= 1
      if self.__count == 0:
        self.__task.cancel()

  async def __stream_loop(self) -> None:
    """Tâche d'exécution pour les WebSockets."""
    try: 
      while True:
        sids: Tuple[str] = tuple(self.__sids)
        data: Response = await self.__callback(sids)
        for sid in sids:
          await emit_data(self.__receive, data, sid)
        await sleep(self.__interval)
    except CancelledError: pass
  
  def __register_events(self):
    """Enregistre les différents événements."""
    @websocket.on(self.__follow)
    def follow(sid: str) -> None:
      self.__append_group(sid)
      
    @websocket.on(self.__unfollow)
    def unfollow(sid: str) -> None:
      self.__remove_group(sid)

  @classmethod
  def cleanup_sid(cls, sid: str) -> None:
    """Retire un WebSocket de toutes les listes de diffusion lors d'un crash.

    Arguments:
      sid (str): L'identifiant du WebSocket à supprimer.
    """
    for active in cls.__actives:
      active.__remove_group(sid)