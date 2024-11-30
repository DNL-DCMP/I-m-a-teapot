const express = require('express')
const app = express()
const port = 3000

let users = [{
    id: 1,
    name: "ailin",
    age: 20
}]

app.use(express.json())


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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})