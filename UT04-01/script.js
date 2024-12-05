const form = document.getElementById("form");
const errorLog = document.getElementById("errorLog");

const INPUT = {
    Username: document.getElementById("username"),
    Password: document.getElementById("password"),
    Name: document.getElementById("firstName"),
    LastName: document.getElementById("lastName"),
    Tel: document.getElementById("phone"),
    Postal: document.getElementById("postalCode"),
    Dni_Nie_Select: document.getElementById("dniSelect"),
    DNI_NIE: document.getElementById("DniNie"),
    AccountType: document.getElementById("accountType"),
    BirthYear: document.getElementById("birthYear"),
    Hobbies: document.getElementById("aficiones"),
    PublicationTitle: document.getElementById("title"),
    PublicationDescription: document.getElementById("description"),
};

const ERROR = {
    Username: document.getElementById("errorUser"),
    Password: document.getElementById("errorPass"),
    Name: document.getElementById("errorFirstName"),
    LastName: document.getElementById("errorLastName"),
    Tel: document.getElementById("errorPhone"),
    Postal: document.getElementById("errorPostalCode"),
    Dni_Nie_Select: document.getElementById("errorDniNie"),
    DNI_NIE: document.getElementById("errorDniNie"),
    AccountType: document.getElementById("errorAccount"),
    BirthYear: document.getElementById("errorBirthYear"),
    Hobbies: document.getElementById("errorAficiones"),
    PublicationTitle: document.getElementById("errorPubTitle"),
    PublicationDescription: document.getElementById("errorPubDesc"),
};

// Listener submit
form.addEventListener("submit", (e)=>{
    form.classList.add("submited");
    checkboxInput(); 
    if (checkValidationMessages()) {
        validateDniNie();
        validate();
        show_errorLogs();
        e.preventDefault(); 
    } 
})

// Validaciones
function validate() {
    //Errores por defecto
    for (const key in INPUT) {
        if (INPUT[key] && ERROR[key]) {
            ERROR[key].textContent = INPUT[key].validationMessage;
        }
    }

    // Mensajes custom
    if (INPUT.Hobbies.validationMessage) {
        ERROR.Hobbies.textContent = "Debes elegir como mínimo 2 aficiones";
    }
    if (INPUT.Dni_Nie_Select.validationMessage) {
        ERROR.Dni_Nie_Select.textContent = INPUT.Dni_Nie_Select.validationMessage;
    }
}

// Mostrar errores en los logs
function show_errorLogs() {
    errorLog.replaceChildren();
    //Errores por defecto
    for (const key in INPUT) {
        if (INPUT[key] && INPUT[key].validationMessage != "") {
            let p = document.createElement("p");
            let span = document.createElement("span");
            span.classList.add("errorName");
            span.textContent = key;
            let text = document.createTextNode(" " + INPUT[key].validationMessage);
            p.append(span, text);

            errorLog.append(p);
        }
    }
}

// Función para comprobar los de validación
function checkValidationMessages() {
    let error = false;
    for (const key in INPUT) {
        if (INPUT[key] && INPUT[key].validationMessage) {
            error = true;
            break;
        }
    }
    return error;
}

// Comprobar checkbox.
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

// Comprobar DNI/NIE
function validateDniNie() {
    const select = document.getElementById("dniSelect");
    if (select.value == "dni") {
        if (!/^\d{8}[A-Za-z]$/.test(INPUT.DNI_NIE.value)){
            //INPUT.DNI_NIE.validationMessage = "El formato de DNI no es válido";
            ERROR.DNI_NIE.textContent = "El formato de DNI no es válido";
        } 
        const letrasDNI = "TRWAGMYFPDXBNJZSQVHLCKE";
        let dni = INPUT.DNI_NIE.value;
        let numero = parseInt(dni.slice(0,8));
        let letra = dni.slice(8).toUpperCase();
        console.log(`${dni} ${numero} ${letra} ${letrasDNI[numero%23]}`);
        console.log(letra == letrasDNI[numero%23]);
        return letra === letrasDNI[numero%23];
        
    } else if(select.value == "nie") {
        
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
for (let year = 2010; year >= 1920; year--) {
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