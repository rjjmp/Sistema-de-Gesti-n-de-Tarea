import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Importar las rutas que creamos
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

// Configurar variables de entorno (para el archivo .env)
dotenv.config();

const app = express();

// Middlewares
app.use(express.json()); // Permite que el servidor entienda formato JSON
app.use(express.static('public'));

// Conexión a MongoDB Atlas o Local
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/gestion_tareas';

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Conectado exitosamente a MongoDB'))
    .catch((error) => console.error('❌ Error de conexión a MongoDB:', error));

// Definir las rutas de la API
app.use('/usuarios', userRoutes);
app.use('/tareas', taskRoutes);
app.use('/proyectos', projectRoutes);

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.send('API de Gestión de Tareas funcionando correctamente');
});

// Configurar el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});