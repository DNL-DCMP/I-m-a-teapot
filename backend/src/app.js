const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express')
const cors = require('cors');
const req = require('express/lib/request')
const app = express()
const port = process.env.PORT || 3000


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
  res.send('¡Bienvenido a Yumm!');
});

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

        // Actualizar el estado del usuario a "true"
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { isLoggedIn: true },
        });

        // Responder con la estructura completa del usuario y el mensaje
        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            user: updatedUser, // Devolver la estructura completa del usuario
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Logout de user

app.post("/api/v1/logout", async (req, res) => {
    try {
      const { userId } = req.body; // Captura el ID del usuario enviado desde el frontend
  
      // Verificar que el ID del usuario sea válido
      if (!userId) {
        return res.status(400).json({ message: 'Se requiere el ID del usuario' });
      }
  
      // Actualizar el campo isLoggedIn a false en la base de datos
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { isLoggedIn: false },
      });
  
      return res.json({
        message: 'Logout exitoso',
        user: updatedUser,
      });
    } catch (error) {
      console.error('Error en el logout:', error.message);
      return res.status(500).json({
        message: 'Ocurrió un error al desloguear el usuario',
      });
    }
});

app.listen(port, () => {
    console.log(`Yumm! app listening on port ${port}`)
})
