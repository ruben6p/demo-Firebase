import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Post} from "../../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private fireStore:AngularFirestore) { }


  //creamos una función newPost que nos dara un dato que sera Post
  newPost(data:Post){ //la variable data de tipo Post, en el que Post viene importado del componente creado en models, que esta declarado como un objeto
    return this.fireStore.collection("posts").add(data) //devuelve de la colección post base de datos ->return this.fireStore("post")
  }                 // a la que se le ha añadido el parametro data ->.add(data) 


  readAllPost(){//leer todos los documentos de la coleccuón posts
    return this.fireStore.collection("posts").get() //devuelve (get) de la colección posts de la base de datos
  }



  //Cuando queremos obtener un post(carpeta) por su id
  getPost(id:string){
    return this.fireStore.collection("posts").doc(id).get()   //recoge de la collection post aquel documento (el folio) por su id
  }



  //Actualizaremos el documento, más que actualizar es editar
  updatePost(id:string,data:Post){//le decimos la id que quermos cambiar y el tipo de documentos, data que es tipo post
    return this.fireStore.collection("posts").doc(id).update(data)//decimos que devuelva de la coleccción post el documento de id  y actualizado por el data
  }



  //vamos a borrar algún post
  deletePost(id:string){
    return this.fireStore.collection("posts").doc(id).delete()   //borra de la collection post aquel documento (el folio) por su id 
  }

}
