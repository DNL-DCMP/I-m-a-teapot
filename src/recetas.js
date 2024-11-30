const express = require('express')
const app = express()
const port = 3000

let recetas = [{
    id: 1,
    nombre_receta: "Cookies",
    descripcion: " ",
    ingredientes: " ",
},{
    id: 3,
    nombre_receta: "Brownie",
    descripcion: "Brownie con nuez",
    ingredientes: " ",
},{
    id: 4,
    nombre_receta: "Tarta de frutillas",
    descripcion: " ",
    ingredientes: "Crema para batir y frutillas",
}]

app.use(express.json())

/*Obtiene todas las recetas*/
app.get('/api/v1/recetas', (req,res) => {
    res.json(recetas)
})

/*Obtiene las recetas por id*/
app.get('/api/v1/recetas/:id', (req, res) => {
    const receta = recetas.find((receta) => receta.id === req.params.id)

    /*Si la receta no existe, devuelve un 404*/
    if (receta === undefined){
        res.sendStatus(404)
        return
    }

    res.json(receta)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})