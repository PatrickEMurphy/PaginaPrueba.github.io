const DOM = {
    form: document.getElementById("form"),
    username: document.getElementById("username"),
    password: document.getElementById("password"),
};

const ERROR = {
    User: document.getElementById("errorUser"),
    Pass: document.getElementById("errorPass"),
    Name: document.getElementById(""),
    LastName: document.getElementById(""),
    Tel: document.getElementById(""),
    Postal: document.getElementById(""),
    DNI_NIE: document.getElementById(""),
    AccountType: document.getElementById(""),
    BirthYear: document.getElementById(""),
    Hobbies: document.getElementById("errorAficiones"),
    PublicationTitle: document.getElementById("errorPubTitle"),
    PublicationDescription: document.getElementById("errorPubDesc"),
};

// Validaciones
DOM.form.addEventListener("submit", (e)=>{
    checkboxInput();
    ERROR.User.textContent = DOM.username.validationMessage;
    ERROR.Pass.textContent = DOM.password.validationMessage;
    //e.preventDefault(); 
})

// Comprobar chackbox.
function checkboxInput(){
    let checkboxes = document.querySelectorAll('.aficion > input[type="checkbox"]');
    let hiddenInput = document.getElementById('aficiones');

    checkboxes = [...checkboxes];

    const checkedValues = checkboxes
        .filter(checkbox => checkbox.checked) // Filtro de los seleccionados
        .map(checkbox => checkbox.value);    // Valores de los seleccionados

    if (checkedValues.length >= 2) {
        hiddenInput.value = checkedValues.join(",");
    } else {
        hiddenInput.value = null;
    }
}




// Mostrar contraseña
// Obtenemos el checkbox y el input de la contraseña
const showPasswordCheckbox = document.getElementById('showPassword');
const passwordInput = document.getElementById('password');

// Añadimos un evento al checkbox
showPasswordCheckbox.addEventListener('change', function() {
    // Si el checkbox está marcado, cambiamos el tipo de input a 'text', sino a 'password'
    if (showPasswordCheckbox.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});


// DNI / NIE enable
// Obtenemos los elementos select e input
const dniSelect = document.getElementById("dniSelect");
const dniInput = document.getElementById("DniNie");

// Añadimos un listener para detectar el cambio en el select
dniSelect.addEventListener("change", function() {
    if (dniSelect.value) {
        // Habilitamos el input si se selecciona una opción
        dniInput.disabled = false;
    } else {
        // Deshabilitamos el input si no se selecciona una opción
        dniInput.disabled = true;
    }
});


// Select Fecha nacimiento
// Obtenemos el año actual
const currentYear = new Date().getFullYear();
    
// Obtenemos el select donde se añadiran los años
const selectElement = document.getElementById("birthYear");

// Generamos las opciones para los años desde 1900 hasta el año actual
for (let year = currentYear; year >= 1900; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    selectElement.appendChild(option);
}



// Contador de letras
// Obtenemos los elementos del título y descripción
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');

// Elementos para mostrar el contador
const titleCounter = document.getElementById('titleCounter');
const descriptionCounter = document.getElementById('descriptionCounter');

// Función para actualizar el contador del título
titleInput.addEventListener('input', function() {
    const currentLength = titleInput.value.length;
    titleCounter.textContent = `${currentLength}/15`;
});

// Función para actualizar el contador de la descripción
descriptionInput.addEventListener('input', function() {
    const currentLength = descriptionInput.value.length;
    descriptionCounter.textContent = `${currentLength}/120`;
});