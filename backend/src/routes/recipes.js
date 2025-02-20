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
          user: true,
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
        
        await prisma.recipeCategory.createMany({ data: relations });

        console.log("Relaciones a crear:", relations); // Depuracion


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

/* Actualizar receta */
router.put('/:id', async (req, res) => {
    try {
        console.log("Datos recibidos en el backend para actualizar:", req.body); // Depuración
        
        const { id } = req.params;
        const { name, description, ingredients, instructions, time, temperatureCook, recipePicture, categoryNames } = req.body;

        // Actualizar la receta
        const updatedRecipe = await prisma.recipe.update({
            where: { id: Number(id) },
            data: {
                name,
                description,
                ingredients,
                instructions,
                time,
                temperatureCook,
                recipePicture
            }
        });

        console.log("Receta actualizada:", updatedRecipe); // Depuración

        // Buscar las categorías existentes en la DB
        const existingCategories = await prisma.category.findMany({
            where: {
                name: { in: categoryNames }
            }
        });

        console.log("Categorías encontradas en la DB:", existingCategories); // Depuración

        // Obtener los nombres de las categorías existentes
        const existingCategoryNames = existingCategories.map(cat => cat.name);

        // Identificar categorías nuevas que no están en la DB
        const newCategoryNames = categoryNames.filter(name => !existingCategoryNames.includes(name));

        // Crear solo las categorías nuevas
        if (newCategoryNames.length > 0) {
            await prisma.category.createMany({
                data: newCategoryNames.map(name => ({ name })),
                skipDuplicates: true // Evita errores si la categoría ya existe
            });
        }

        // Obtener todas las categorías con sus IDs después de agregar las nuevas
        const allCategories = await prisma.category.findMany({
            where: {
                name: { in: categoryNames }
            }
        });

        console.log("Todas las categorías actualizadas:", allCategories); // Depuración

        // Eliminar relaciones antiguas de la receta en recipeCategory
        await prisma.recipeCategory.deleteMany({
            where: { recipeId: Number(id) }
        });

        // Asociar las nuevas categorías con la receta en recipeCategory
        const relations = allCategories.map(category => ({
            recipeId: Number(id),
            categoryId: category.id
        }));

        await prisma.recipeCategory.createMany({ data: relations });

        console.log("Nuevas relaciones creadas:", relations); // Depuración

        // Obtener la receta con sus categorías actualizadas
        const recipeWithCategories = await prisma.recipe.findUnique({
            where: { id: Number(id) },
            include: {
                recipeCategories: {
                    include: { category: true }
                }
            }
        });

        console.log("🚀 Receta actualizada con categorías:", JSON.stringify(recipeWithCategories, null, 2));

        res.status(200).json({ message: "Receta actualizada con éxito", recipe: recipeWithCategories });

    } catch (error) {
        console.error("Error al actualizar la receta:", error);
        res.status(500).json({ error: "Error al actualizar la receta" });
    }
});

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