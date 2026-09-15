"""
Nom du module         : broadcast.py
Description           : Module gérant une boucle de diffusion pour tous les WebSockets.

Auteur                : TheRake66
Date de création      : 2026-08-28 04:01:51
Dernière modification : 2026-08-28 04:01:51
Version               : 1.0.0
Licence               : GPL-3.0

Notes                 : 
  Pour utiliser une liste de diffusion dans le front, il suffit d'enregistrer
  l'événement "name#broadcast".
  
  Pour éviter de surcharger uniquement le serveur, on coupe toutes les listes de diffusion
  si aucun utilisateur n'est connecté. Il suffit d'utiliser "start_all" lors de l'événement 
  "connect" et "stop_all" lors de l'événement "disconnect".
  
  On utilise une liste d'utilisateurs indépendante de Socket.IO (emit global) pour éviter les
  doublons à cause de Redis s'il y a plusieurs instances de serveur. Chaque instance a sa
  propre liste à gérer.
"""

from typing import Callable, List, Optional, Awaitable, Coroutine, Tuple
from asyncio import Task, CancelledError, sleep, create_task
from services.websocket import emit_data, get_users
from libraries.response import Response

type BroadTask = Callable[[Tuple[str]], Awaitable[Response]]
"""Fonction retournant les données à diffuser.

Arguments:
  Tuple[str]: Liste des WebSockets connectés au serveur.

Returns:
  Awaitable[Response]: Les données à diffuser aux WebSockets.
"""

class BroadCast():
  """Gère une boucle de diffusion pour tous les WebSockets."""

  __actives: List[BroadCast] = []
  """Liste de toutes les listes de diffusion."""
  
  def __init__(self, name: str, callback: BroadTask, interval: float = 1.0) -> None:
    """Constructeur de la classe.

    Arguments:
      name (str): Nom de la boucle de diffusion.
      callback (BroadTask): Fonction retournant les données à diffuser.
      interval (float): Nombre de secondes entre chaque diffusion. Par défaut à 1.0.
    """
    self.__event: str = f"{name}#broadcast"
    self.__callback: BroadTask = callback
    self.__interval: float = interval
    self.__task: Optional[Task] = None
    BroadCast.__actives.append(self)
  
  def __start_task(self) -> None:
    """Lance la tâche pour la boucle."""
    routine: Coroutine = self.__stream_loop()
    self.__task = create_task(routine)
  
  def __stop_task(self) -> None:
    """Arrête la tâche pour la boucle."""
    self.__task.cancel()

  async def __stream_loop(self) -> None:
    """Tâche d'exécution pour les WebSockets."""
    try:
      while True:
        sids: Tuple[str] = get_users()
        data: Response = await self.__callback(sids)
        for sid in sids:
          await emit_data(self.__event, data, sid)
        await sleep(self.__interval)
    except CancelledError: pass
  
  @classmethod
  def start_all(cls) -> None:
    """Lance toutes les tâches si un utilisateur est connecté."""
    for active in cls.__actives:
      active.__start_task()
  
  @classmethod
  def stop_all(cls) -> None:
    """Arrête toutes les tâches si aucun utilisateur n'est connecté."""
    for active in cls.__actives:
      active.__stop_task()