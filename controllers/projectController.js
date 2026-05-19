import  Project  from '../models/Project.js';

//Crear el proyecto (POST)
export const crearProyecto = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        
        const nuevoProyecto = new Project({
            nombre,
            descripcion
        });

        const proyectoGuardado = await nuevoProyecto.save();
        res.status(201).json(proyectoGuardado);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear el proyecto", error: error.message });
    }
};

//Obtener todos los proyectos (GET)
export const obtenerProyectos = async (req, res) => {
    try {
        // .populate('tareas') sirve para que en vez de ver solo los IDs, 
        // traiga toda la información de las tareas asociadas.
        const proyectos = await Project.find().populate('tareas');
        res.status(200).json(proyectos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener proyectos", error: error.message });
    }
};

//Obtener un proyecto por ID (GET /:id)
export const obtenerProyectoPorId = async (req, res) => {
    try {
        const proyecto = await Project.findById(req.params.id).populate('tareas');
        if (!proyecto) return res.status(404).json({ mensaje: "Proyecto no encontrado" });
        res.status(200).json(proyecto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar el proyecto", error: error.message });
    }
};

//Actualizar un proyecto (PUT)
export const actualizarProyecto = async (req, res) => {
    try {
        const proyectoActualizado = await Project.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Esto devuelve el proyecto ya modificado
        );
        res.status(200).json(proyectoActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar", error: error.message });
    }
};

//Eliminar un proyecto (DELETE)
export const eliminarProyecto = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: "Proyecto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar", error: error.message });
    }
};