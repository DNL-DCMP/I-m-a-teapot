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
    const { name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya está registrado' });
        }

        // Crear el nuevo usuario
        const user = await prisma.user.create({
            data: { name, email, password }
        });

        res.status(201).json({ message: 'Usuario creado con éxito', user });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

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
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if (!user) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                name: req.body.name || user.name, // Mantiene el dato actual si no se envía uno nuevo
                email: req.body.email || user.email,
                password: req.body.password || user.password,
                biography: req.body.biography || user.biography,
                profilePicture: req.body.profilePicture || user.profilePicture,
                password: req.body.password || user.password
            }
        });

        res.status(200).send(updatedUser);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).send({ error: 'Error al actualizar el perfil del usuario' });
    }
});

/*Muestra los favoritos de un usuario dado su id*/
router.get('/:id/favoritos', (req, res) => {
    const user = users.find((user) => user.id == req.params.id)
    res.json(user.favoritos)
})

module.exports = router;
