document.addEventListener('DOMContentLoaded', () => {
    const btnRegistro = document.getElementById('btn-toggle-registro');
    const btnTablero = document.getElementById('btn-toggle-tablero');
    const formContainer = document.getElementById('contenedor-formulario');
    const tableroContainer = document.getElementById('contenedor-tablero');
    
    const taskForm = document.getElementById('task-form');
    const listaTareas = document.getElementById('lista-tareas');

    // Manejo de visibilidad
    btnRegistro.addEventListener('click', () => {
        formContainer.classList.toggle('hidden');
    });

    btnTablero.addEventListener('click', () => {
        tableroContainer.classList.toggle('hidden');
    });

    // FUNCIONES DE LA API
    const cargarTareas = async () => {
        try {
            const respuesta = await fetch('/tareas');
            const tareas = await respuesta.json();

            listaTareas.innerHTML = '';

            if (tareas.length === 0) {
                listaTareas.innerHTML = '<p class="mensaje-vacio">No hay tareas en el tablero.</p>';
                return;
            }

            tareas.forEach(tarea => {
                const article = document.createElement('article');
                
                // CORRECCIÓN DE COLORES:
                // Normalizamos el estado para que coincida con las clases del CSS (.pendiente, .en-progreso, .completada)
                const claseEstado = tarea.estado.toLowerCase().replace(/\s+/g, '-');

                article.innerHTML = `
                    <span class="user-tag">Asignado por: ${tarea.usuario || 'Anónimo'}</span>
                    <h3>${tarea.título}</h3>
                    <p>${tarea.descripción || 'Sin descripción'}</p>
                    
                    <div class="footer-card">
                        <span class="badge ${claseEstado}">${tarea.estado}</span>
                        <button class="btn-eliminar" onclick="eliminarTarea('${tarea._id}')">Eliminar</button>
                    </div>
                `;
                listaTareas.appendChild(article);
            });
        } catch (error) {
            console.error('Error al cargar tareas:', error);
            listaTareas.innerHTML = '<p class="error">Error al conectar con el servidor.</p>';
        }
    };

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const datosTarea = {
            título: document.getElementById('titulo').value,
            descripción: document.getElementById('descripcion').value,
            estado: document.getElementById('estado').value,
            usuario: document.getElementById('usuario').value 
        };

        try {
            const respuesta = await fetch('/tareas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosTarea)
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                alert('¡Tarea guardada con éxito en el sistema!');
                taskForm.reset();
                cargarTareas();
            } else {
                alert('Error al guardar: ' + (data.error || data.mensaje));
            }
        } catch (error) {
            console.error('Error en la petición POST:', error);
            alert('Error crítico de conexión.');
        }
    });

    window.eliminarTarea = async (id) => {
        if (confirm('¿Deseas eliminar definitivamente esta tarea?')) {
            try {
                const respuesta = await fetch(`/tareas/${id}`, {
                    method: 'DELETE'
                });

                if (respuesta.ok) {
                    cargarTareas();
                }
            } catch (error) {
                console.error('Error al eliminar:', error);
            }
        }
    };

    cargarTareas();
});