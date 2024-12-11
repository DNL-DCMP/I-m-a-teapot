const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express')
const cors = require('cors');
const req = require('express/lib/request')
const app = express()
const port = 3000

const usersRoutes = require('./routes/users.js');
const recipesRoutes = require('./routes/recipes.js');
const commentsRoutes = require('./routes/comments.js');


let recetas = [{
    id: 1,
    nombre_receta: " ",
    tiempo: " ",
    descripcion: " ",
    ingredientes: " "
}]

app.use(cors());
app.use(express.json())

// Usa las rutas importadas
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/recipes', recipesRoutes);
app.use('/api/v1/recipes', commentsRoutes);

app.get('/', (req, res) => {
    res.send('Yumm! app')
})


app.listen(port, () => {
    console.log(`Yumm! app listening on port ${port}`)
})
