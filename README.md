# REST-API-NOTES-GAMES
Una RestAPI hecha con TypeScript que es para anotar juegos que un usuario quiera comprar en un futuro. Como una "To Do List" pero enfocado a juegos, con su precio, titulo, consola, link al juego, etc 

Para todas las rutas menos la de signUp y singIn es necesario el token del user, el cual se obtiene de los headers como "auth-header".

# NOTES
Para crear una nota de un juego:
![image](https://user-images.githubusercontent.com/76538747/210365261-5b65e597-d524-4cbb-b403-21d62811d0a9.png)

Para actualizar la nota de un juego:
![image](https://user-images.githubusercontent.com/76538747/210365332-6be32bc8-2efa-4853-a266-4a815e414e43.png)
Se puede elegir que actualizar de la nota. El campo que uno quiera.

Para obtener una nota por Id:
![image](https://user-images.githubusercontent.com/76538747/210365479-b7059973-58df-4e62-91cf-3a224c5c4b37.png)

Obtener el array de todas las notas de la DB:
![image](https://user-images.githubusercontent.com/76538747/210365716-0b85978b-5aa0-4f52-958a-527adf4a2198.png)

Borrar una nota por el Id:
![image](https://user-images.githubusercontent.com/76538747/210365791-f86b8a73-dc79-4c4a-a237-4cca3c734afe.png)

# USERS
Crear un usuario:
![image](https://user-images.githubusercontent.com/76538747/210366239-45a7af08-3c9c-4edd-a6d7-e466f649a71a.png)

Para iniciar sesión con un usuario: 
Se ingresa con el username y la contraseña correspondiente
![image](https://user-images.githubusercontent.com/76538747/210366436-c01d51c2-8686-42c2-88f7-19045ba34f43.png)

Obtener todos los usuarios en la DB:
![image](https://user-images.githubusercontent.com/76538747/210366515-bfcfcfdf-25ae-46eb-9195-ee7ead33ac22.png)

Obtener un usuario por Id:
![image](https://user-images.githubusercontent.com/76538747/210366564-c1175a15-e64e-4810-8aae-56035148c91a.png)


Actulizar usuario: Solo se puede actualizar el username y la contraseña
![image](https://user-images.githubusercontent.com/76538747/210366645-c301c62b-6dba-4c83-94f0-133318acfc66.png)

Borrar usuario por Id:
![image](https://user-images.githubusercontent.com/76538747/210366705-61a48329-f366-42f7-8f9f-7b050f68c46a.png)

Diagrama de la DB:
![image](https://user-images.githubusercontent.com/76538747/210915780-3f2146b4-b394-4de8-acdb-83779a6b6373.png)
