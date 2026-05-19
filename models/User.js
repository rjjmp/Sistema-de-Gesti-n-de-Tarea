import { Schema, model } from 'mongoose';

// El esquema define la estructura que tendrá cada documento de usuario en MongoDB
const userSchema = new Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'] 
  },
  email: { 
    type: String, 
    required: [true, 'El correo es obligatorio'],
    unique: true, // Evita que existan dos usuarios con el mismo correo
    lowercase: true // Convierte siempre a minúsculas para evitar duplicados por mayúsculas
  },
  password: { 
    type: String, 
    required: [true, 'La contraseña es obligatoria'] 
    // Nota: Aquí guardarás el hash, no la contraseña en texto plano
  }
}, { 
  timestamps: true // Esto crea automáticamente campos "createdAt" y "updatedAt"
});

// Creamos y exportamos el modelo basado en el esquema
export const User = model('User', userSchema);