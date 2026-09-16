from subprocess import check_call
from datetime import datetime
from os.path import exists, join, dirname
from zipfile import ZipFile, ZIP_DEFLATED
from pathlib import Path
from typing import List
from sys import argv, executable, exit
from os import name, chdir

# ====================================================================
VENV_DIR: str = "venv"
PACK_FILE: str = "requirements.txt"
RUN_CMD: str = "uvicorn main:application --reload --host localhost --port 8000"
BUILD_FMT: str = "%Y-%m-%d_%Hh%Mm%Ss"
BUILD_DIR: Path = Path("builds")
SKIP_DIR: List[str] = [ "__pycache__", "venv", "builds" ]
SKIP_EXT: List[str] = [ ".log", ".zip" ]
# ====================================================================

# On vérifie s'il y a un argument.
if len(argv) != 2:
  print("Incorrect number of arguments!")
  exit()

# On change le dossier courant.
chdir(dirname(__file__))

# On récupère les exécutables.
win: bool = name == "nt"
bin: str = ("bin", "Scripts")[win]
pip: str = join(VENV_DIR, bin, "pip")
exe: str = join(VENV_DIR, bin, "python")

# On compresse tous les fichiers.
def build() -> None:
  print("Building release...")
  work: Path = Path.cwd()
  date: str = datetime.now().strftime(BUILD_FMT)
  file: Path = BUILD_DIR / Path(f"{date}.zip")
  files: List[Path] = work.rglob("*")
  with ZipFile(file, "w", ZIP_DEFLATED) as zip:
    for file in files:
      if file.is_file() \
      and file.suffix not in SKIP_EXT \
      and set(file.parts).isdisjoint(SKIP_DIR):
        arcname: Path = file.relative_to(work)
        zip.write(file, arcname)
  print("Build complete.")

# On installe l'environnement et les dépendances.
def install() -> None:
  if not exists(VENV_DIR):
    print("Creating the environment...")
    check_call([executable, "-m", "venv", VENV_DIR])
  if exists(PACK_FILE):
    print("Installing dependencies...")
    check_call([pip, "install", "-r", PACK_FILE])
  print("Installation complete.")

# On démarre le serveur dans l'environnement.
def start() -> None:
  if not exists(VENV_DIR):
    print("Environment not exist! Please install it first.")
  else: 
    print("Running server...")
    check_call([exe, "-m"] + RUN_CMD.split())

# On lance la bonne commande.
try:
  match argv[1].lower():
    case "build": build()
    case "install": install()
    case "start": start()
    case _: print("Unkown command!")
except KeyboardInterrupt: pass
except Exception as e: input(e)

# On quitte le programme.
exit()