const express = require('express')
const app = express()
const port = 3000

let users = [{
    id: 1,
    name: "ailin",
    age: 20
}]

app.use(express.json())

app.get('/api/v1/users', (req, res) => {
    res.json(users)
})

app.get('/api/v1/users/:id', (req, res) => {
    const user = users.find((user) => user.id == req.params.id)

    if (user === undefined){
        res.sendStatus(404)
        return
    }

    res.json(user)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})