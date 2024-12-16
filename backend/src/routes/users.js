const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/*Muestra todos los usuarios*/
router.get('/', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

/*Lee un usuario por id*/
router.get('/:id', async (req, res) => {
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

/*Obtiene las recetas de un usuario dado su id*/
router.get('/:id/recipes', async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
           recipes: true
        }
    })

    if(user === null){
        res.sendStatus(404)
        return
    }

    res.json(user.recipes)
})

router.post('/', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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
router.get('/:id/favoritos', (req, res) => {
    const user = users.find((user) => user.id == req.params.id)
    res.json(user.favoritos)
})

module.exports = router;
