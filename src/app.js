const { Prisma } = require('@prisma/client')
const prisma = new PrismaClient();
const express = require('express')
const req = require('express/lib/request')
const app = express()
const port = 3000

let recetas = []

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
app.post('/api/v1/recipes', async (req, res) => {
    const recipe = await prisma.recipe.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients, 
            instructions: req.body.instructions
        }
    })
    res.status(201).send(recipe)
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


/* ------USERS----- */ 



/*Muestra todos los usuarios*/
app.get('/api/v1/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

/*Lee un usuario por id*/
app.get('/api/v1/users/:id', async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    //Si el usuario no existe, devuelve un 404 not found
    if (user === null){
        res.sendStatus(404)
        return
    }

    res.json(user)
})

app.post('/api/v1/users', async (req, res) => {
    const user = await prisma.user.create({
        data:{
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        }
    })
    res.status(201).send(user)
})

/*Borra un usuario por ID*/
app.delete('/api/v1/users/:id', async (req, res) => {
    //busca el usuario
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    //si no lo encuentra devuelve 404
    if (user == null){
        res.sendStatus(404)
        return
    }
    //si lo encuentra lo elimina
    await prisma.user.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })

    res.send(user)
})

app.put('/api/v1/users/:id', async (req, res) => {
    let user = await prisma.user.findUnique({
        where:{
            id: parseInt(req.params.id)
        }
    })
    if (user === null) {
        res.sendStatus(404)
        return
    }
    user = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    })
    res.send(user)
})

/*Muestra los favoritos de un usuario dado su id*/
app.get('/api/v1/users/:id/favoritos', (req, res) => {
    const favoritos = users.find((user) => user.id == req.params.id)
    res.json(user.favoritos)
})

app.listen(port, () => {
    console.log(`Yumm! app listening on port ${port}`)
})
