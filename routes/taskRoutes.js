import express from 'express';
const router = express.Router();
import { 
    crearTarea, 
    obtenerTareas, 
    obtenerTareaPorId, 
    actualizarTarea, 
    eliminarTarea 
} from '../controllers/taskController.js';

router.post('/', crearTarea);
router.get('/', obtenerTareas);
router.get('/:id', obtenerTareaPorId);
router.put('/:id', actualizarTarea);
router.delete('/:id', eliminarTarea);

export default router;