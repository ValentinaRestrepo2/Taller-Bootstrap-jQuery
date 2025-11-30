$("#btnGenerar").click(function () {
  let nombre = "Persona " + Math.floor(Math.random() * 9 + 1);
  let dia = Math.floor(Math.random() * 30 + 1);
  let mes = Math.floor(Math.random() * 12 + 1);
  let anio = Math.floor(Math.random() * (2020 - 1980 + 1) + 1980);

  $("#nombre").val(nombre);
  $("#dia").val(dia);
  $("#mes").val(mes);
  $("#anio").val(anio);

  let edad = 2025 - anio;

  if (edad < 18) {
    $("#imagenEstado").attr("src", "images/jovenes.png");
  } else {
    $("#imagenEstado").attr("src", "images/adulto.png");
  }
});

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
        <tr id="tr_${nombre}">
            <td>${nombre}</td>
            <td>${fechaCompleta}</td>
            <td>${edad}</td>
        </tr>
    `);
  calcularPromedio();
});

function calcularPromedio() {
  let filas = $("#tablaPersonas tbody tr");
  let suma = 0;

  filas.each(function () {
    let edad = parseInt($(this).find("td").eq(2).text());
    suma += edad;
  });

  let promedio = (suma / filas.length).toFixed(1);
  $("#promedio").val(promedio);
}

$("#btnResaltar").click(function () {
  let promedio = parseFloat($("#promedio").val());

  $("#tablaPersonas tbody tr").each(function () {
    let edad = parseInt($(this).find("td").eq(2).text());

    if (edad > promedio) {
      $(this).css("background-color", "#d4edda");
    } else if (edad < promedio) {
      $(this).css("background-color", "#f8d7da");
    } else {
      $(this).css("background-color", "");
    }
  });
});
