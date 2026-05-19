import { User } from '../models/User.js';

// 1. Crear un nuevo usuario (POST)
export const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Verificamos si el usuario ya existe
        const existeUsuario = await User.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ mensaje: "El correo ya está registrado" });
        }

        const nuevoUsuario = new User({
            nombre,
            email,
            password // Nota: En un proyecto real, aquí aplicarías bcrypt.hash()
        });

        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).json({
            _id: usuarioGuardado._id,
            nombre: usuarioGuardado.nombre,
            email: usuarioGuardado.email
        });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear usuario", error: error.message });
    }
};

// 2. Listar todos los usuarios (GET)
export const obtenerUsuarios = async (req, res) => {
    try {
        // Excluimos el password de la respuesta por seguridad usando '-password'
        const usuarios = await User.find().select('-password');
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuarios", error: error.message });
    }
};

// 3. Obtener un usuario específico (GET /:id)
export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id).select('-password');
        if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar usuario", error: error.message });
    }
};

// 4. Actualizar información de un usuario (PUT /:id)
export const actualizarUsuario = async (req, res) => {
    try {
        const usuarioActualizado = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('-password');
        
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar usuario", error: error.message });
    }
};

// 5. Eliminar un usuario (DELETE /:id)
export const eliminarUsuario = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar usuario", error: error.message });
    }
};