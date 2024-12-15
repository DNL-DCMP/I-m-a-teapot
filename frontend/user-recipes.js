let ordenAscendente = true; 

function ordenarTarjetas() {
    const contenedor = document.querySelector('.container-recipes');

    const tarjetas = Array.from(contenedor.getElementsByClassName('card-recipe'));

    tarjetas.sort((a, b) => {
        const textoA = a.textContent || a.innerText;
        const textoB = b.textContent || b.innerText;
        return ordenAscendente ? textoA.localeCompare(textoB) : textoB.localeCompare(textoA);
    });

    contenedor.innerHTML = '';

    tarjetas.forEach(tarjeta => contenedor.appendChild(tarjeta));

    const botonOrdenar = document.getElementById('boton-ordenar');
    if (ordenAscendente) {
        botonOrdenar.innerHTML = 'Ordenar de Z a A';
    } else {
        botonOrdenar.innerHTML = 'Ordenar de A a Z';
    }

    ordenAscendente = !ordenAscendente;
}