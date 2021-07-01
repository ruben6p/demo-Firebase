import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CrudService } from './shared/services/crud.service';
import {Post} from "./models/post.model";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularFirebase';
  items: Observable<any[]>;

  constructor(private fire:AngularFirestore, private crudPosts:CrudService){//queremosutilizar CrudService el cual esta en crudPosts
    this.items = fire.collection('users').valueChanges();
    this.readAllPosts();//queremos que se ejecute cuando inicie la página para obtener y leer los datos de este fichero y este ya cargado
    this.getPost();
  }

  
  createPost(){
    console.log("DALE")
    const publicacion:Post={
      author:"Mimi",
      content:"Lorem ipsum lo que sea",
      title:"La mejor noticia del mundo",
      date: new Date()
  
    }
      //Llamamos a newPost que est en crudPosts y le indicaremos pasandole el parametro publicacion, en newPost decimos que se añadan en crud.service.ts
    this.crudPosts.newPost(publicacion).then(success=>{//con success si esta todo bien muestra to ok
      console.log("To ok")
    }).catch(error=>{//sino, registra el error haciendo cosole log del error
      console.error("Algo ha ido mal")
    })
  }



  //Para mostrar todos los campos de un documento necesitamos un array
  misPosts:Array<Post>=[]//es lo mismo que misPosts=Posts[]=[]

 readAllPosts(){    //de crudPosts usamos la funcion readAllPost que
   this.crudPosts.readAllPost().subscribe(data=>{   //suscribe es suscribirse a la recepción de los datos, es decir cuando se carga la página se pide que 
    
    data.forEach((doc:any)=>{    //data seria el documento, para cada documento tiene una variable doc de tipo any, entoces (=>) declara la variable myPost
      let myPost:Post=doc.data()    //declara la variable myPost en el que sera cada una de los documentos con sus campos
      myPost.id=doc.id //el id lo asocia al del documento de Firebase no del models
      this.misPosts.push(myPost)
    })
  })
 }


 //haremos la función parid:stringa con el identificado rnos deuvelva el documento
 getPost(){
   this.crudPosts.getPost("jsQjZYfkIUapTlarmeCC").subscribe( data=>{
     console.log("La publicación que quieres ver es", data.id, "y..", data.data() )
   })
 }



 updatePost(){
    const publicacion:Post={//creamos una nueva variable la cual se cambiara por la vieja
      author:"Mimi",
      content:"Lorem ipsum lo que sea",
      title:"Nueva",
      date: new Date()
    }
    this.crudPosts.updatePost("FeAqv5giUVEqtMpjHgtR", publicacion).then(success=>{//aquí pasamos el id del post antiguo que queremos cambiar y la nueva
      console.log("todo guay")
    }).catch(error=>{
      console.error("Algo muy loco ha pasado, error")
    })

  }

    //vamosa borrar un post
  
  deletePost(){
    this.crudPosts.deletePost("jsQjZYfkIUapTlarmeCC").then(success=>{
      console.log("Se ha eliminado correctamente titan")
    }).catch(error=>{
      console.error("Problema eliminado")
    })
  }

}
