import { Component, OnInit } from '@angular/core';
import { Mensajes } from 'src/app/modelo/Mensajes';
import { SocketsService } from 'src/app/services/sockets.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  
  /**
   *
   */
  constructor(private servicio: SocketsService) {
    
  }
  ngOnInit(): void {
    this.servicio.getMensajes().subscribe((loop) =>{
      this.messages.push(loop)
      
    })
  }

  mensajes: Mensajes = new Mensajes()
  messages: any

  newMessage: any


  sendMessage(){
    console.log(this.newMessage)
    this.servicio.sendMensajes(this.newMessage)
    this.newMessage = ""
  }
}
