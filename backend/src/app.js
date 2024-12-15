const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express')
const cors = require('cors');
const req = require('express/lib/request')
const app = express()
const port = 3000


const userRoutes = require('./routes/users.js')
const recipeRoutes = require('./routes/recipes.js')
const commentsRoutes = require('./routes/comments.js')


app.use(cors());
app.use(express.json())
app.use(cors({
    origin: '*', // Permite todas las fuentes
    methods: ['GET', 'POST'], // Métodos permitidos
    allowedHeaders: ['Content-Type'], // Encabezados permitidos
}));

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/recipes', recipeRoutes)
app.use('/api/v1/recipes', commentsRoutes)

app.get('/', (req, res) => {
    res.send('Yumm! app')
})

/*Obtiene todas las recetas*/
app.get('/api/v1/recipes', async (req,res) => {
    const recipes = await prisma.recipe.findMany()
    res.json(recipes)
})

/*Obtiene las recetas por id*/
app.get('/api/v1/recipes/:id', async (req, res) => {
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
app.get('/api/v1/recipes/:id/comments', async (req, res) => {
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
app.get('/api/v1/recipes/:id/categories', async (req, res) => {
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
app.post('/api/v1/recipes', async (req, res) => {
    const userId = 1; // ID de usuario estático para pruebas
    const categories = req.body.categories || [];
    const recipe = await prisma.recipe.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients || [],
            instructions: req.body.instructions || [],
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
            },
            user: {
                connect: {
                    id: userId
                }
            }
        }
    })
    res.status(201).send(recipe)
})

/* Borrar la receta */
app.delete('api/v1/recipes/:id', async (req, res) => {
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

app.put('/api/v1/recipes/:id', async (req, res) => {
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

/* ------CATEGORIES----- */ 

app.get('/api/v1/categories', async (req, res) => {
    const categories = await prisma.category.findMany()
    res.json(categories)
})

app.get('/api/v1/categories/:id', async (req, res) => {
    const category = await prisma.category.findUnique ({
        where: {
            id: parseInt(req.params.id)
        }
    })

    if (category === null){
        res.sendStatus(404)
        return
    }

    res.json(category)
})

app.get('/api/v1/categories/:id/recipes', async (req, res) => {
    const category = await prisma.category.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            recipes: true
        }
    })

    if (category === null){
        res.sendStatus(404)
        return
    }

    res.json(category.recipes)
})

app.delete('/api/v1/categories/:id', async (req,res) => {
    const category = await prisma.category.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    if(category == null){
        res.sendStatus(404)
        return
    }

    await prisma.category.delete({
        where:{
            id: parseInt(req.params.id)
        }
    })

    res.json(category)
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
    
        const { name, email, password } = req.body;
        console.log("Datos recibidos desde el front:", { name, email, password });

        // Crear nuevo usuario
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password // Aquí podrías hashear la contraseña antes de guardarla
            }
        });

        res.status(201).json({ message: 'Registro exitoso', user: newUser });
    
});


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

/* ------COMENTS----- */ 

/* Agregar comentario a una receta */
app.post('/api/v1/recipes/:id/comments', async (req, res) => {
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if(recipe === null){
        res.sendStatus(404)
        return
    }

    const comment = await prisma.comment.create({
        data: {
            content: req.body.content,
            recipe: {
                connect: {
                    id: recipe.id
                }
            }
        }
    })

    res.status(201).send(comment)
})

/* Eliminar un comentario de una receta*/
app.delete('/api/v1/recipes/:id/comments/:commentId', async (req, res) => {
    const comment = await prisma.comment.findUnique({
        where: {
            id: parseInt(req.params.commentId)
        }
    })

    if(comment === null){
        res.sendStatus(404)
        return
    }

    await prisma.comment.delete({
        where: {
            id: parseInt(req.params.commentId)
        }
    })

    res.send(comment)
})

// Login de usuario
app.post("/api/v1/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Si no se encuentra el usuario
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar la contraseña directamente
        if (user.password !== password) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Actualizar el estado del usuario a "connected"
        await prisma.user.update({
            where: { id: user.id },
            data: { isLoggedIn: true },
        });

        // Responder con el mensaje y el userId
        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            userId: user.id,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});



app.listen(port, () => {
    console.log(`Yumm! app listening on port ${port}`)
})
