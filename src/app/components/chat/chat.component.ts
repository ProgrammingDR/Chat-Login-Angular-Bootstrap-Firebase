import { Component, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  mostrarChat = false;
  usuarioLogueado:any;
  nuevoMensaje:string="";
  mensajes:any =[
    {
      emisor:"UPTAjxZ5r8QFz9nDCroAv8V5tyH3",
      texto:"hola que tal"
    },
    {
      emisor:"wx3zpurZ6zNqiu31sjQaWswuiam1",
      texto:"hola todo bien"
    },
    {
      emisor:"UPTAjxZ5r8QFz9nDCroAv8V5tyH3",
      texto:"ahh que bueno"
    },
    {
      emisor:"wx3zpurZ6zNqiu31sjQaWswuiam1",
      texto:"si"
    }
  ];

  constructor(private authServices:AuthService) { }

  ngOnInit(): void {
    this.authServices.getuserlogged().subscribe(usuario=>{
      this.usuarioLogueado=usuario;
    });
  }

  enviarMensaje(){
    if(this.nuevoMensaje=="") return;
    console.log(this.nuevoMensaje);
    let mensaje = {
      emisor: this.usuarioLogueado.uid,
      texto: this.nuevoMensaje
    }

    this.mensajes.push(mensaje);

    this.nuevoMensaje = "";
    setTimeout(() => {
    this.scrollToTheLastElementByClassName();
    }, 10);
  }

  scrollToTheLastElementByClassName(){
    let elements = document.getElementsByClassName('msj');
    let ultimo:any=elements[(elements.length -1)];
    let toppos = ultimo.offsetTop;

    //@ts-ignore
    document.getElementById('contanedor-de-mensajes')?.scrollTop=toppos;
  }

}
