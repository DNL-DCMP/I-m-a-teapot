const express = require('express')
const app = express()
const port = 3000

let recetas = []

app.use(express.json())

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


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})