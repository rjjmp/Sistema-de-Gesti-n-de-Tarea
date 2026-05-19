import express from 'express';
const router = express.Router();
// Importamos las funciones del controlador
import { 
    crearProyecto, 
    obtenerProyectos, 
    obtenerProyectoPorId, 
    actualizarProyecto, 
    eliminarProyecto 
} from '../controllers/projectController.js';

// Definimos las rutas
router.post('/', crearProyecto);          // POST /proyectos
router.get('/', obtenerProyectos);        // GET /proyectos
router.get('/:id', obtenerProyectoPorId); // GET /proyectos/:id
router.put('/:id', actualizarProyecto);   // PUT /proyectos/:id
router.delete('/:id', eliminarProyecto); // DELETE /proyectos/:id

export default router;