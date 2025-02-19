const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* Muestra todos los comentarios de una receta */
router.get('/:id/comments', async (req, res) => {
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

router.post('/:id/comments', async (req, res) => {
    console.log("Solicitud recibida para agregar comentario en la receta con ID:", req.params.id);
    const recipeId = parseInt(req.params.id, 10);
    console.log("recipeId:",recipeId);

    if (isNaN(recipeId)) {
        return res.status(400).json({ message: 'ID de receta inválido' });
    }

    let { content, rating, userId } = req.body;

    rating = parseInt(rating, 10);
    userId = parseInt(userId, 10);


    // Validación de la calificación
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'La calificación debe estar entre 1 y 5' });
    }

    if (!content || content.trim().length === 0) {
        console.log("recipeId:", recipeId);
        return res.status(400).json({ message: 'El contenido del comentario es obligatorio' });
    }

    try {
        console.log("recipeId:", recipeId); 
        const recipe = await prisma.recipe.findUnique({
            where: { id: recipeId }
        });

        if (!recipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
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
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
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