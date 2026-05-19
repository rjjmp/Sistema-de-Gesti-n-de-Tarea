import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre del proyecto es obligatorio'],
    trim: true // Elimina espacios en blanco accidentales al inicio o final
  },
  descripcion: { 
    type: String 
  },
  // Relación: Un arreglo de IDs que apuntan a la colección de Tareas
  tareas: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'Task' 
    }
  ]
}, { 
  timestamps: true // Para saber cuándo se creó y actualizó el proyecto
});

export const Project = model('Project', projectSchema);