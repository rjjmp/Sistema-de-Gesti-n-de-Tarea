import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  // Título: Campo obligatorio
  título: { 
    type: String, 
    required: [true, 'El título de la tarea es obligatorio'],
    trim: true 
  },
  
  // Descripción: Campo obligatorio
  descripción: { 
    type: String,
    required: [true, 'La descripción es obligatoria']
  },

  // NUEVO CAMPO: Nombre del usuario que crea la tarea
  usuario: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    trim: true
  },
  
  // Estado: Solo acepta los valores definidos
  estado: { 
    type: String, 
    enum: {
      values: ['pendiente', 'en progreso', 'completada'],
      message: '{VALUE} no es un estado válido'
    },
    default: 'pendiente' 
  },
  
  fechaCreación: { 
    type: Date, 
    default: Date.now 
  },
  
  fechaLímite: { 
    type: Date 
  },
  
  // Referencia opcional a un modelo de Usuario (ID)
  asignadoA: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: false 
  }
}, { 
  // Añade automáticamente campos de auditoría (createdAt, updatedAt)
  timestamps: true 
});

export const Task = model('Task', taskSchema);