//CREAR UNA NUEVA TAREA
export const crearTarea = async (req, res) => {
    try {
        // Quitamos las tildes a titulo y descripcion para que hagan match con tu modelo
        const { titulo, descripcion, estado, proyectoId, asignadoA, usuario } = req.body; 
        
        const nuevaTarea = new Task({ 
            titulo, 
            descripcion, 
            estado,
            usuario, 
            proyecto: proyectoId, // <-- Guardamos la relacion en la tarea para que no quede huerfana
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