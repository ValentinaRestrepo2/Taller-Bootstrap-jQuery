// Función auxiliar para generar aleatorios 
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Botón [Generar]
$("#btnGenerar").click(function () {
  let nombre = "Persona " + randomInt(1, 9);
  let dia = randomInt(1, 30);
  let mes = randomInt(1, 12);
  let anio = randomInt(1980, 2020);

  $("#nombre").val(nombre);
  $("#dia").val(dia);
  $("#mes").val(mes);
  $("#anio").val(anio);

  let anioActual = new Date().getFullYear();
  let edad = anioActual - anio;
  
  $("#imagenEstado").show();
  if (edad < 18) {
    $("#imagenEstado").attr("src", "images/jovenes.png");
  } else {
    $("#imagenEstado").attr("src", "images/adulto.png");
  }
});

// Botón [Insertar]
$("#btnInsertar").click(function () {
  let nombre = $("#nombre").val();
  let dia = $("#dia").val();
  let mes = $("#mes").val();
  let anio = $("#anio").val();

  if (nombre === "" || dia === "" || mes === "" || anio === "") {
    alert("Por favor complete todos los campos.");
    return;
  }

  let anioActual = new Date().getFullYear();
  let edad = anioActual - parseInt(anio);

  let fechaCompleta = `${dia}-${mes}-${anio}`;

  $("#tablaPersonas tbody").append(`
        <tr>
            <td>${nombre}</td>
            <td>${fechaCompleta}</td>
            <td>${edad}</td>
        </tr>
    `);

  calcularPromedio();
});

// Función para calcular promedio
function calcularPromedio() {
  let filas = $("#tablaPersonas tbody tr");
  let suma = 0;

  if (filas.length === 0) {
      $("#promedio").val(0);
      return;
  }

  filas.each(function () {
    // La edad está en la columna índice 2 (0: nombre, 1: fecha, 2: edad)
    let edad = parseInt($(this).find("td").eq(2).text());
    suma += edad;
  });

  let promedio = (suma / filas.length).toFixed(1); 
  $("#promedio").val(promedio);
}

// Botón [Recorrer y Resaltar]
$("#btnResaltar").click(function () {
  let promedio = parseFloat($("#promedio").val());

  if (isNaN(promedio)) {
    alert("Primero inserte registros para calcular el promedio.");
    return;
  }

  $("#tablaPersonas tbody tr").each(function () {
    let edad = parseInt($(this).find("td").eq(2).text());
    $(this).removeClass("table-success table-danger");
    if (edad > promedio) {
      $(this).addClass("table-success"); 
    } else if (edad < promedio) {
      $(this).addClass("table-danger"); 
    } 
  });
});
