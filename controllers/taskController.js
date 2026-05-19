import { Task } from '../models/task.js';
import { Project } from '../models/Project.js';

//CREAR UNA NUEVA TAREA
export const crearTarea = async (req, res) => {
    try {
        const { título, descripción, estado, proyectoId, asignadoA, usuario } = req.body; 
        const nuevaTarea = new Task({ 
            título, 
            descripción, 
            estado,
            usuario, 
            asignadoA: asignadoA || null
        });
        const tareaGuardada = await nuevaTarea.save();
        if (proyectoId) {
            await Project.findByIdAndUpdate(proyectoId, {
                $push: { tareas: tareaGuardada._id }
            });
        }

        res.status(201).json(tareaGuardada);
    } catch (error) {
        console.error("Error al crear tarea:", error);
        res.status(400).json({ 
            mensaje: "Error al crear la tarea", 
            error: error.message 
        });
    }
};

//OBTENER TODAS LAS TAREAS 
export const obtenerTareas = async (req, res) => {
    try {
        const tareas = await Task.find().populate('asignadoA', 'nombre email');
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ 
            mensaje: "Error al obtener las tareas", 
            error: error.message 
        });
    }
};

//OBTENER DETALLE DE UNA TAREA 
export const obtenerTareaPorId = async (req, res) => {
    try {
        const tarea = await Task.findById(req.params.id).populate('asignadoA');
        if (!tarea) return res.status(404).json({ mensaje: "Tarea no encontrada" });
        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ 
            mensaje: "Error al buscar la tarea", 
            error: error.message 
        });
    }
};

//ACTUALIZAR UNA TAREA 
export const actualizarTarea = async (req, res) => {
    try {
        const tareaActualizada = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } 
        );
        res.status(200).json(tareaActualizada);
    } catch (error) {
        res.status(400).json({ 
            mensaje: "Error al actualizar la tarea", 
            error: error.message 
        });
    }
};

//ELIMINAR UNA TAREA
export const eliminarTarea = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: "Tarea eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ 
            mensaje: "Error al eliminar la tarea", 
            error: error.message 
        });
    }
};