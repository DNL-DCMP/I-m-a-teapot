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

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/recipes', recipeRoutes)
app.use('/api/v1/recipes', commentsRoutes)

app.get('/', (req, res) => {
    res.send('Yumm! app')
})


app.listen(port, () => {
    console.log(`Yumm! app listening on port ${port}`)
})
