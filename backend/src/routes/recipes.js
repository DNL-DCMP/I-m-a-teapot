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

    res.status(201).json(recipe)
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

/*Agrega receta*/
router.post('/', async (req, res) => {
    try {
        const { name, description, ingredients, instructions, time, temperatureCook, userId, categoryNames } = req.body;

        // Crear la receta
        const newRecipe = await prisma.recipe.create({
            data: {
                name:req.body.name,
                description:req.body.description,
                ingredients:req.body.ingredients,
                instructions:req.body.instructions,
                time:req.body.time,
                temperatureCook:req.body.temperatureCook,
                user: {
                    connect: {
                        id: req.body.userId
                    }
                }
                
            }
        });

        // Buscar categorías que ya existen en la base de datos
        const existingCategories = await prisma.category.findMany({
            where: {
                name: { in: categoryNames }
            }
        });

        // Obtener los nombres de las categorías existentes
        const existingCategoryNames = existingCategories.map(cat => cat.name);

        // Identificar las categorías nuevas (las que no están en la base de datos)
        const newCategoryNames = categoryNames.filter(name => !existingCategoryNames.includes(name));

        // Crear solo las categorias nuevas
        const newCategories = await prisma.category.createMany({
            data: newCategoryNames.map(name => ({ name })),
            skipDuplicates: true  // Evita errores si se intenta crear una repetida
        });

        // Volver a obtener todas las categorías con sus IDs
        const allCategories = await prisma.category.findMany({
            where: {
                name: { in: categoryNames }
            }
        });

        // Asociar las categorías a la receta en la tabla intermedia
        const relations = allCategories.map(category => ({
            recipeId: newRecipe.id,
            categoryId: category.id
        }));

        await prisma.recipeCategory.createMany({ data: relations });

        res.status(201).json({ message: "Receta creada con éxito", recipe: newRecipe });

    } catch (error) {
        console.error(error);
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
            time: req.body.time,
            temperatureCook: req.body.temperatureCook,
            recipePicture: req.body.recipePicture
        }
    })

    res.send(recipe)
})

// Mostrar todas las categorias
router.get('/categories', async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
});


module.exports = router;