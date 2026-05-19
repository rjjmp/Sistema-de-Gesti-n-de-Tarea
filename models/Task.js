import { Schema, model } from 'mongoose';

const taskSchema = new Schema({

  titulo: { 
    type: String, 
    required: [true, 'El título de la tarea es obligatorio'],
    trim: true 
  },
  

  descripcion: { 
    type: String,
    required: [true, 'La descripción es obligatoria']
  },

  // Nombre del usuario 
  usuario: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    trim: true
  },
  
  estado: { 
    type: String, 
    enum: {
      values: ['pendiente', 'en progreso', 'completada'],
      message: '{VALUE} no es un estado válido'
    },
    default: 'pendiente' 
  },
  
  // relación con el Proyecto para que no quede huérfana
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: false
  },
  
  fechaCreacion: { 
    type: Date, 
    default: Date.now 
  },
  
  fechaLimite: { 
    type: Date 
  },
  
  // Referencia opcional a un modelo de Usuario (ID)
  asignadoA: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: false 
  }
}, { 
  // campos de auditoría (createdAt, updatedAt)
  timestamps: true 
});

// Cambiado a export default 
const Task = model('Task', taskSchema);
export default Task;