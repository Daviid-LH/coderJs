function reset() {
  document.getElementById("kg").value = "";
  document.getElementById("m").value = "";
  document.getElementById("imc").innerHTML = "";
  document.getElementById("lectura").innerHTML = "";
  document.getElementById("imc-list").innerHTML = "";
}
document.getElementById("resultado").style.display = "none";

let imcList = [];

function init() {
  calc = document.getElementById("calc");
  kg = document.getElementById("kg");
  m = document.getElementById("m");
  imc = document.getElementById("imc");
  lectura = document.getElementById("lectura");
}
calc.onclick = function calcular() {
  if (kg.value != "" && m.value != "") {
    imcx = kg.value / (m.value * m.value);
    imc.innerHTML = imcx;
    if (imcx < 18.5) {
      lectura.innerHTML = "Peso inferior al normal";
    } else if (imcx >= 18.5 && imcx <= 24.9) {
      lectura.innerHTML = "Peso normal";
    } else if (imcx >= 25 && imcx <= 29.9) {
      lectura.innerHTML = "Peso superior al normal";
    } else if (imcx > 30) {
      lectura.innerHTML = "Obesidad";
    }
  } else {
    alert("Debes ingresar peso y altura. Inicia de nuevo");
  }

  const calcList = {
    peso: kg.value,
    altura: m.value,
    imc: imcx,
  };
  imcList.push(calcList);

  reset();
  
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })
  mostrar(imcList);
};

function mostrar(imcList) {
  const div = document.createElement("div");
  const list = document.getElementById("imc-list");
  imcList.forEach((todo) => {
    div.innerHTML += `
    <div class="card text-center mb-4">
    <div class="card-body">
    <strong>Peso</strong>: ${todo.peso} -
    <strong>Altura</strong>: ${todo.altura}
    <strong>imc</strong>: ${todo.imc}
    </div>
    </div>
    `;
    list.appendChild(div);
  });
}

  const url = 'https://api.escuelajs.co/api/v1/users';
  fetch(url)
    .then(response => response.json())
    .then(data => mostrarDatos(data))
    .catch(error => console.log(error))

    const mostrarDatos = (data) => {
      console.log(data)
      let body = '';
      for(let i = 0; i<data.length; i++){
        body += `<tr><td>${data[i].id}</td><td>${data[i].name}</td><td>${data[i].role}</td><td>${data[i].email}</td></tr>`
      }
      document.getElementById('data').innerHTML = body
    }