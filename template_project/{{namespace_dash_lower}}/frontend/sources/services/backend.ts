/**
 * Nom du module         : backend.ts
 * Description           : Gère la connexion avec le serveur de données.
 * 
 * Auteur                : TheRake66
 * Date de création      : 2026-08-28 04:01:51
 * Dernière modification : 2026-08-28 04:01:51
 * Version               : 1.0.0
 * Licence               : GPL-3.0
 * 
 * Notes                 : 
 */

import { create, type AxiosInstance } from 'axios';
import { io, type Socket } from 'socket.io-client';
import config from '@/config.yaml';

// On charge la configuration.
const backend: any = config.backend;
const protocol: string = backend.secure ? 'https' : 'http';
const server: string = `${protocol}://${backend.address}:${backend.port}`;

/**
 * Format des réponses de l'API.
 */
export interface Response<T = unknown> {
  message: string;
  code: number;
  content: T;
}

/**
 * Objet contenant la connexion à l'API REST.
 */
export const rest: AxiosInstance = create({
  baseURL: `${server}/api/${backend.version}`,
  headers: { 'Content-Type': 'application/json' },
  timeout: backend.timeout
});

/**
 * Objet contenant la connexion au serveur de WebSocket.
 */
export const socket: Socket = io(server, {
  autoConnect: true,
  transports: [ 'websocket', 'polling' ],
  timeout: backend.timeout,
  path: backend.wspath,
});