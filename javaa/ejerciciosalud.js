function clasificarPresionArterial(sistolica, diastolica) {
    if (sistolica < 120 && diastolica < 80) {
        return "Normal";
    } else if (sistolica >= 120 && sistolica <= 129 && diastolica < 80) {
        return "Elevada";
    } else if ((sistolica >= 130 && sistolica <= 139) || (diastolica >= 80 && diastolica <= 89)) {
        return "HTA Grado 1";
    } else if (sistolica >= 140 || diastolica >= 90) {
        return "HTA Grado 2";
    } else {
        return "No Clasificado/Valores Atípicos";
    }
}

function ejercicioPresionArterial() {
    const sInput = prompt("Ingrese la presión sistólica (el número más alto, ej: 125):");
    const dInput = prompt("Ingrese la presión diastólica (el número más bajo, ej: 80):");

    if (sInput === null || dInput === null) {
        alert("Operación cancelada.");
        return;
    }

    const sistolica = parseInt(sInput);
    const diastolica = parseInt(dInput);

    if (isNaN(sistolica) || isNaN(diastolica) || sistolica <= 0 || diastolica <= 0) {
        alert("Por favor, ingrese valores numéricos positivos válidos.");
        return;
    }

    const clasificacion = clasificarPresionArterial(sistolica, diastolica);
    alert(`Presión: ${sistolica}/${diastolica} mmHg. \n\nClasificación: **${clasificacion}**`);
}

function ejercicioTemperaturaPromedio() {
    const numInput = prompt("Ingrese el número de pacientes a registrar:");
    if (numInput === null) {
        alert("Operación cancelada.");
        return;
    }

    const numPacientes = parseInt(numInput);
    if (isNaN(numPacientes) || numPacientes <= 0) {
        alert("Número de pacientes no válido.");
        return;
    }

    let sumaTemperaturas = 0;
    let registro = "Temperaturas registradas (°C):\n";

    for (let i = 1; i <= numPacientes; i++) {
        const tempInput = prompt(`Paciente #${i}: Ingrese temperatura en °C (ej: 36.5):`);
        if (tempInput === null) {
            alert("Operación cancelada en el registro de pacientes.");
            return;
        }
        const temperatura = parseFloat(tempInput);

        if (isNaN(temperatura) || temperatura < 30 || temperatura > 45) { 
            alert("Temperatura no válida. Reinicie el ejercicio.");
            return;
        }

        sumaTemperaturas += temperatura;
        registro += `- ${temperatura.toFixed(1)}°C\n`;
    }

    const promedio = sumaTemperaturas / numPacientes;
    
    alert(`${registro}\nEl promedio de las temperaturas es: **${promedio.toFixed(2)}°C**`);
}

function ejercicioContarFiebre() {
    let contadorFiebre = 0;
    let temperatura = -1; 
    let totalPacientes = 0;
    const UMBRAL_FIEBRE = 38.0;

    alert(`Ingresa la temperatura del paciente en °C. Ingresa 0 para terminar. (Fiebre es $\\ge ${UMBRAL_FIEBRE}\\text{\\degree C}$).`);

    while (temperatura !== 0) {
        const tempInput = prompt(`Paciente #${totalPacientes + 1}: Ingrese temperatura (\\text{\\degree C}, 0 para terminar):`);
        if (tempInput === null) {
            alert("Operación cancelada.");
            return;
        }
        temperatura = parseFloat(tempInput);

        if (isNaN(temperatura) || temperatura < 0) {
            alert("Por favor, ingrese un número positivo válido. Reinicie el ejercicio.");
            return;
        }
        
        if (temperatura > 0) {
            totalPacientes++;
            if (temperatura >= UMBRAL_FIEBRE) {
                contadorFiebre++;
                console.log(`Paciente #${totalPacientes} con fiebre: ${temperatura}°C`);
            }
        }
    }

    alert(`Procesamiento finalizado. \n\nTotal de pacientes leídos: ${totalPacientes} \nPacientes con fiebre ($\\ge ${UMBRAL_FIEBRE}\\text{\\degree C}$): **${contadorFiebre}**`);
}

function ejercicioTriage() {
    const input = prompt("Ingrese el código de TRIAGE (1-4):\n1: Máxima prioridad\n2: Urgente\n3: Menos urgente\n4: No urgente");
    if (input === null || input.trim() === "") {
        alert("Operación cancelada.");
        return;
    }
    
    const codigo = parseInt(input);
    let categoria;

    if (isNaN(codigo)) {
        alert("Por favor, ingrese un número entero válido.");
        return;
    }

    switch (codigo) {
        case 1:
            categoria = "ROJO (Emergencia - Reanimación inmediata)";
            break;
        case 2:
            categoria = "AMARILLO (Urgencia - Observación y atención rápida)";
            break;
        case 3:
            categoria = "VERDE (Urgencia menor - Puede esperar)";
            break;
        case 4:
            categoria = "AZUL (No urgente - Consulta general)";
            break;
        default:
            categoria = "Código de TRIAGE no reconocido";
    }

    alert(`El código ${codigo} corresponde a la categoría: \n\n**${categoria}**`);
}


function ejercicioSpo2() {
    let mensaje = "--- Resumen de Mediciones de Saturación (SpO2) ---\n";
    let continuar;
    let contador = 0;
    const UMBRAL_NORMAL = 90;

    do {
        const spo2Input = prompt(`Medición #${contador + 1}: Ingrese saturación de oxígeno SpO2 (%):`);
        if (spo2Input === null) {
            alert("Operación cancelada.");
            return;
        }
        const spo2 = parseFloat(spo2Input);

        if (isNaN(spo2) || spo2 < 50 || spo2 > 100) {
            alert("Por favor, ingrese un valor de SpO2 válido (50-100). Reinicie el proceso.");
            return;
        }
        
        contador++;
        mensaje += `\n- Valor registrado: ${spo2}%.`;
        
        if (spo2 < UMBRAL_NORMAL) {
            mensaje += ` **¡Alerta: Hipoxemia (< ${UMBRAL_NORMAL}%)!**`;
        }
        
        continuar = prompt("¿Desea registrar otro valor? (Escriba 'no' para salir)").toLowerCase();

    } while (continuar !== "no");
    
    alert(mensaje);
}