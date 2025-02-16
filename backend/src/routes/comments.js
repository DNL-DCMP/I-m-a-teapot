const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* Muestra todos los comentarios de una receta */
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

    res.send(recipe.comments)
})

/* Agregar comentario a una receta */
router.post('/:id/comments', async (req, res) => {
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if(recipe === null){
        res.sendStatus(404)
        return
    }

    const userId = req.body.userId;
    const comment = await prisma.comment.create({
        data: {
            content: req.body.content,
            rating: req.body.rating,
            recipe: {
                connect: {
                    id: recipe.id
                }
            },
            user: {
                connect: {
                    id: userId
                }
            }
        }
    })

    res.status(201).send({
        id: comment.id,
        content: comment.content,
        rating: comment.rating,
        user: {
            name: comment.user.name // Muestra el nombre del usuario
        }
    });
})

/* Modificar un comentario de una receta */
router.put('/:id/comments/:commentId', async (req, res) => {
    const comment = await prisma.comment.findUnique({
        where: {
            id: parseInt(req.params.commentId)
        }
    })

    if(comment === null){
        res.sendStatus(404)
        return
    }

    const updatedComment = await prisma.comment.update({
        where: {
            id: parseInt(req.params.commentId)
        },
        data: {
            content: req.body.content
        }
    })

    res.send(updatedComment)
})

/* Eliminar un comentario de una receta*/
router.delete('/:id/comments/:commentId', async (req, res) => {
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

module.exports = router;