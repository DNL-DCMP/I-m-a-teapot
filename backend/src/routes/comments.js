const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* Muestra todos los comentarios de una receta */
router.get('/recipes/:id/comments', async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);

    // Verificar si el ID de la receta es un número válido
    if (isNaN(recipeId)) {
        return res.status(400).send('ID de receta inválido');
    }

    try {
        const recipe = await prisma.recipe.findUnique({
            where: { id: recipeId },
            include: {
                comments: {
                    include: {  
                        user: true
                    }
                }
            }
        });

        if (!recipe) {
            return res.status(404).send('Receta no encontrada');
        }

        res.send(recipe.comments);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

router.post('/recipes/:id/comments', async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);

    if (isNaN(recipeId)) {
        return res.status(400).send('ID de receta inválido');
    }

    const { content, rating, userId } = req.body;

    // Validación de la calificación
    if (rating < 1 || rating > 5) {
        return res.status(400).send('La calificación debe estar entre 1 y 5');
    }

    if (!content || content.trim().length === 0) {
   console.log("recipeId:", recipeId);      return res.status(400).send('El contenido del comentario es obligatorio');
    }

    try {console.log("recipeId:", recipeId); 
        const recipe = await prisma.recipe.findUnique({
            where: { id: recipeId }
        });

        if (!recipe) {
            return res.status(404).send('Receta no encontrada');
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                rating,
                recipe: { connect: { id: recipe.id } },
                user: { connect: { id: userId } }
            },
            include: { user: true }
        });

        res.status(201).send({
            id: comment.id,
            content: comment.content,
            rating: comment.rating,
            user: {
                id: comment.user.id,
                name: comment.user.name,
                email: comment.user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

/* Modificar un comentario de una receta */
router.put('/recipes/:id/comments/:commentId', async (req, res) => {
    const commentId = parseInt(req.params.commentId, 10);

    // Verificar si el ID del comentario es un número válido
    if (isNaN(commentId)) {
        return res.status(400).send('ID de comentario inválido');
    }

    // Validar datos recibidos en el cuerpo
    if (!req.body.content || req.body.content.trim().length === 0) {
        return res.status(400).send('El contenido del comentario es obligatorio');
    }

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: commentId }
        });

        if (!comment) {
            return res.status(404).send('Comentario no encontrado');
        }

        const updatedComment = await prisma.comment.update({
            where: { id: commentId },
            data: { content: req.body.content }
        });

        res.send(updatedComment);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

/* Eliminar un comentario de una receta */
router.delete('/recipes/:id/comments/:commentId', async (req, res) => {
    const commentId = parseInt(req.params.commentId, 10);

    // Verificar si el ID del comentario es un número válido
    if (isNaN(commentId)) {
        return res.status(400).send('ID de comentario inválido');
    }

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: commentId }
        });

        if (!comment) {
            return res.status(404).send('Comentario no encontrado');
        }

        await prisma.comment.delete({
            where: { id: commentId }
        });

        res.send(comment);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;