const express = require('express')
const req = require('express/lib/request')
const app = express()
const port = 3000

let recetas = [{
    id: 1,
    nombre_receta: " ",
    tiempo: " ",
    descripcion: " ",
    ingredientes: " "
}]

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Yumm! app')
})

/*Obtiene todas las recetas*/
app.get('/api/v1/recetas', (req,res) => {
    res.json(recetas)
})

/*Obtiene las recetas por id*/
app.get('/api/v1/recetas/:id', (req, res) => {
    const receta = recetas.find((receta) => receta.id == req.params.id)

    /*Si la receta no existe, devuelve un 404*/
    if (receta === undefined){
        res.sendStatus(404)
        return
    }

    res.json(receta)
})

/*Filtra los comentarios de una receta mediante el id*/
app.get('/api/v1/recetas/:id/comentarios', (req, res) => {
    const receta = recetas.find((receta) => receta.id == req.params.id)
    res.json(receta.comentarios)
})

/*Agrega receta*/
app.post('/api/v1/recetas', (req, res) => {
    const receta = {
        id: recetas.length + 1,
        nombre_receta: req.body.nombre_receta,
        tiempo: req.body.tiempo,
        descripcion: req.body.descripcion,
        ingredientes: req.body.ingredientes
    }

    recetas.push(receta)
    res.status(201).send(receta)
})

/* Borrar la receta */
app.delete('api/v1/recetas/:id', (req, res) => {
    const receta = recetas.find((element) => element.id == req.params.id)
    if (receta === undefined) {
        res.sendStatus(404)
        return
    }
    recetas = recetas.filter((element) => element.id != req.params.id)
    res.send(receta)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

/* ------USERS----- */ 

let users = [{
    id: 1,
    name: "ailin",
    age: 20
}]

app.get('/api/v1/users', (req, res) => {
    res.json(users)
})

// Lee un usuario por ID
app.get('/api/v1/users/:id', (req, res) => {
    const user = users.find((user) => user.id == req.params.id)

    //Si el usuario no existe, devuelve un 404 not found
    if (user === undefined){
        res.sendStatus(404)
        return
    }

    res.json(user)
})

//Borra un usuario por ID
app.delete('/api/v1/users/:id', (req, res) => {
    const user_delete = users.find((user) => user.id == req.params.id)

    /*Si el usuario no existe, devuelve un  404 not found*/
    if(user_delete === undefined){
        res.sendStatus(404)
        return
    }

    /*Filtra los usuarios por id, solo se queda con aquellos que no coincidan con el id del usuario a eliminar*/
    users = users.filter((user) =>  user.id != req.params.id)
    res.sendStatus(201)
})
