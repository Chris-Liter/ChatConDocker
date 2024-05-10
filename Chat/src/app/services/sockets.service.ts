import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
   socket: any;

  SOCKET_ENDPOINT = "http://localhost:3000"
  constructor() {
    this.socket = io(this.SOCKET_ENDPOINT);
  }

  sendMensajes(message: any): void {
    this.socket.emit('message', message);
    
    // No suscribas aquí, maneja la respuesta en el servidor dentro de la función on
  }

  getMensajes(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('message', (message: string) => {
        observer.next(message);
      });
    });
  }
}