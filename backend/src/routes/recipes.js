const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req,res) => {
    const recipes = await prisma.recipe.findMany({
        include: {
          recipeCategories: {
            select: {
              category: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      });
      
    const recipesWithCategories = recipes.map(({ recipeCategories, ...recipe }) => ({
    ...recipe,
    categories: recipeCategories.map(rc => rc.category.name) // Extrae solo los nombres
    }));
    
    res.json(recipesWithCategories);
})

/*Obtiene las recetas por id*/
router.get('/:id', async (req, res) => {
    const { id } = req.params;  
    try {
      const recipe = await prisma.recipe.findUnique({
        where: {
          id: parseInt(id), 
        },
        include: {
          recipeCategories: {
            include: {
              category: true, 
            },
          },
        },
    });
  
    if (!recipe) {
    return res.status(404).json({ error: 'Receta no encontrada' });
    }

    // Transforma la respuesta para incluir solo los nombres de las categorías
    const recipeWithCategories = {
    ...recipe,
    categories: recipe.recipeCategories.map((rc) => rc.category.name),
    };

    res.json(recipeWithCategories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la receta' });
    }
});

  
/*Agrega receta*/
router.post('/', async (req, res) => {
    try {
        console.log("Datos recibidos en el backend:", req.body); //Depuracion 
        const { name, description, ingredients, instructions, time, temperatureCook, recipePicture, userId, categoryNames} = req.body;
        // Crear la receta
        const newRecipe = await prisma.recipe.create({
            data: {
                name,
                description,
                ingredients,
                instructions,
                time,
                temperatureCook,
                recipePicture,
                user: {
                    connect: { id: userId }
                }
                
            }
        });

        // Buscar categorías que ya existen en la base de datos
        const existingCategories = await prisma.category.findMany({
            where: {
                name: { in: categoryNames }
            }
        });

        console.log("Categorías encontradas en la DB:", existingCategories); // Depuracion

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

        console.log("Todas las categorías después de crearlas:", allCategories); // Depuracion

        // Asociar las categorías a la receta en la tabla intermedia
        const relations = allCategories.map(category => ({
            recipeId: newRecipe.id,
            categoryId: category.id
        }));

        console.log("Relaciones a crear:", relations); // Depuracion

        await prisma.recipeCategory.createMany({ data: relations });

        //Depuracion
        const recipeWithCategories = await prisma.recipe.findUnique({
            where: { id: newRecipe.id },
            include: { 
                recipeCategories: {
                    include: { category: true }
                }
            }
        });
        
        console.log("🚀 Receta con categorías:", JSON.stringify(recipeWithCategories, null, 2));
        //Hasta aca

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