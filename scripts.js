document.addEventListener('DOMContentLoaded', function() {

    cargarPerfilGuardado();
    cargarImagenPerfilGuardada();


    document.getElementById('edit-profile-btn').addEventListener('click', function() {
        document.getElementById('edit-form').style.display = 'flex';
    });

    
    document.getElementById('save-changes-btn').addEventListener('click', function(event) {
        event.preventDefault(); 

       
        let newFullName = document.getElementById('input-full-name').value;
        let newDNI = document.getElementById('input-dni').value;
        let newGradeSection = document.getElementById('input-grade-section').value;
        let newEmail = document.getElementById('input-email').value;

       
        document.getElementById('full-name').textContent = newFullName;
        document.getElementById('dni').textContent = newDNI;
        document.getElementById('grade-section').textContent = newGradeSection;
        document.getElementById('email').textContent = newEmail;

       
        guardarPerfilLocal(newFullName, newDNI, newGradeSection, newEmail);

        
        document.getElementById('edit-form').style.display = 'none';
    });

    
    document.getElementById('file-input').addEventListener('change', function(event) {
        let file = event.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profile-img').src = e.target.result;
                guardarImagenPerfil(e.target.result); 
            };
            reader.readAsDataURL(file);
        }
    });

   
    function guardarPerfilLocal(fullName, dni, gradeSection, email) {
        localStorage.setItem('full-name', fullName);
        localStorage.setItem('dni', dni);
        localStorage.setItem('grade-section', gradeSection);
        localStorage.setItem('email', email);
    }

   
    function cargarPerfilGuardado() {
        let storedFullName = localStorage.getItem('full-name');
        let storedDNI = localStorage.getItem('dni');
        let storedGradeSection = localStorage.getItem('grade-section');
        let storedEmail = localStorage.getItem('email');

        if (storedFullName) {
            document.getElementById('full-name').textContent = storedFullName;
        }
        if (storedDNI) {
            document.getElementById('dni').textContent = storedDNI;
        }
        if (storedGradeSection) {
            document.getElementById('grade-section').textContent = storedGradeSection;
        }
        if (storedEmail) {
            document.getElementById('email').textContent = storedEmail;
        }
    }

    
    function guardarImagenPerfil(imageBase64) {
        localStorage.setItem('profile-img', imageBase64);
    }

    function cargarImagenPerfilGuardada() {
        let storedImage = localStorage.getItem('profile-img');
        if (storedImage) {
            document.getElementById('profile-img').src = storedImage;
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formSubirCalificaciones');
    const numCalificacionesInput = document.getElementById('numCalificaciones');
    const calificacionesInputDiv = document.getElementById('calificacionesInput');
    const resultadoPromedioDiv = document.getElementById('resultadoPromedio');
    const botonCalcularPromedio = document.createElement('button');
    botonCalcularPromedio.textContent = 'Calcular Promedio';

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const materia = document.getElementById('curso').value.trim();
        const dniEstudiante = document.getElementById('dniEstudiante').value.trim();
        const numCalificaciones = parseInt(numCalificacionesInput.value, 10);

        if (isNaN(numCalificaciones) || numCalificaciones < 1 || numCalificaciones > 20) {
            alert('Número de calificaciones debe estar entre 1 y 20.');
            return;
        }

        let calificaciones = [];
        let sum = 0;
        let valid = true;

        
        for (let i = 1; i <= numCalificaciones; i++) {
            const inputCalificacion = document.getElementById(`calificacion${i}`);
            const calificacion = parseFloat(inputCalificacion.value);

            if (isNaN(calificacion) || calificacion < 0 || calificacion > 20) {
                alert('Las calificaciones deben ser números entre 0 y 20.');
                valid = false;
                break;
            }

            calificaciones.push(calificacion);
            sum += calificacion;
        }

        if (valid) {
            const promedio = sum / numCalificaciones;
            resultadoPromedioDiv.innerHTML = `Promedio: ${promedio.toFixed(2)}`;
            alert('Calificaciones subidas correctamente.');
        }
    });

    numCalificacionesInput.addEventListener('change', function() {
        const numCalificaciones = parseInt(numCalificacionesInput.value, 10);

        if (isNaN(numCalificaciones) || numCalificaciones < 1 || numCalificaciones > 20) {
            alert('Número de calificaciones debe estar entre 1 y 20.');
            return;
        }

        calificacionesInputDiv.innerHTML = '';

        for (let i = 1; i <= numCalificaciones; i++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `calificacion${i}`;
            input.name = `calificacion${i}`;
            input.min = 0;
            input.max = 20;
            input.step = 0.1;
            input.placeholder = `Calificación ${i}`;
            calificacionesInputDiv.appendChild(input);
        }

       
        calificacionesInputDiv.appendChild(botonCalcularPromedio);
    });


    botonCalcularPromedio.addEventListener('click', function() {
        const numCalificaciones = parseInt(numCalificacionesInput.value, 10);
        let sum = 0;
        let valid = true;

        for (let i = 1; i <= numCalificaciones; i++) {
            const inputCalificacion = document.getElementById(`calificacion${i}`);
            const calificacion = parseFloat(inputCalificacion.value);

            if (isNaN(calificacion) || calificacion < 0 || calificacion > 20) {
                alert('Las calificaciones deben ser números entre 0 y 20.');
                valid = false;
                break;
            }

            sum += calificacion;
        }

        if (valid) {
            const promedio = sum / numCalificaciones;
            resultadoPromedioDiv.innerHTML = `Promedio: ${promedio.toFixed(2)}`;
        }
    });
})



