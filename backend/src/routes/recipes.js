const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req,res) => {
    const recipes = await prisma.recipe.findMany()
    res.json(recipes)
})

/*Obtiene las recetas por id*/
router.get('/:id', async (req, res) => {
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    //Si el usuario no existe, devuelve un 404 not found
    if (recipe === null){
        res.sendStatus(404)
        return
    }

    res.json(recipe)
})

/*Filtra los comentarios de una receta mediante el id*/
router.get('/:id/comments', async (req, res) => {
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            comments: true
        }
    })

    if(recipe === null){
        res.sendStatus(404)
        return
    }

    res.json(recipe.comments)
})

/*Muestra las categorias de una receta*/
router.get('/:id/categories', async (req, res) => {
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            categories: true
        }
    })

    if(recipe === null){
        res.sendStatus(404)
        return
    }

    res.json(recipe.categories)
})

/*Agrega receta*/
router.post('/', async (req, res) => {
    try {

        const recipe = await prisma.recipe.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
                categories: {
                    connectOrCreate: req.body.categories.map((category) => ({
                        where: {
                            name: category
                        },
                        create: {
                            name: category
                        }
                    }))
                },
                user: {
                    connect:  {
                        id: req.body.userId
                    }
                }
            }
        });
        res.status(201).send(recipe);

    } catch (error) {
        console.error("Error al crear receta:", error);
        res.status(500).json({ error: "Error al crear la receta" });
    }
});

/* Borrar la receta */
router.delete('/:id', async (req, res) => {
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    /*Si no la encuentra devuelve 404*/
    if (recipe === null){
        res.sendStatus(404)
        return
    }

    /*Si la encuentra la elimina*/
    await prisma.recipe.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })

    res.send(recipe)
})

router.put('/:id', async (req, res) => {
    let recipe = await prisma.recipe.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    if(recipe === null){
        res.sendStatus(404)
        return
    }

    recipe = await prisma.recipe.update({
        where:{
            id: recipe.id
        },
        data:{
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients, 
            instructions: req.body.instructions,
            categories: {
                connectOrCreate: 
                    categories.map((CategoryName) => ({
                            where:{
                                name: CategoryName
                            },
                            create:{
                                name: CategoryName
                            }
                        })
                    )
            }
        }
    })

    res.send(recipe)
})

module.exports = router;