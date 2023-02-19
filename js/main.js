// Partículas (poner false si no queremos partículas)
const doParticles = true;

//Funcion que determina la anchura de la pagina web, compara los 5 objetos document
// y devuelve la anchura más grande (siendo la anchura total de la web)

const getWidth = () => { //
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
};

// "minPixel" es el tamaño mínimo de una partícula en píxeles.
// "maxPixel" es el tamaño máximo de una partícula en píxeles.
// "total" es el número total de partículas que se deben crear.

if (doParticles) {
    if (getWidth() < 400) $.firefly({
    //determinar el ancho de la ventana del navegador y ejecutar una acción en consecuencia
        minPixel: 1,
        maxPixel: 2,
        total: 20
    });
    else $.firefly({
        minPixel: 1,
        maxPixel: 3,
        total: 40
    });

    //efecto de partículas en función del ancho de la ventana del navegador 
    //y de la variable "doParticles".

}

// Click para llevar al portapapeles
let t;
$(document).ready(() => {
    t = $(".ip").html();
});

$(document).on("click", ".ip", () => {
    let copy = document.createElement("textarea");
    copy.style.position = "absolute";
    copy.style.left = "-99999px";
    copy.style.top = "0";
    copy.setAttribute("id", "ta");
    document.body.appendChild(copy);
    copy.textContent = t;
    copy.select();
    document.execCommand("copy");
    $(".ip").html("<span class='extrapad'>¡Copiado!</span>");
    setTimeout(() => {
        $(".ip").html(t);
        var copy = document.getElementById("ta");
        copy.parentNode.removeChild(copy);
    }, 800);
});

// Conteo de jugadores en directo
$(document).ready(() => {
    const ip = $(".sip").attr("data-ip");
    const port = $(".sip").attr("data-port");
    if (port == "" || port == null) port = "25565";
    if (ip == "" || ip == null) return console.error("Error al conseguir el recuento de jugadores. ¿Se ha configurado correctamente la IP en el HTML?");
    updatePlayercount(ip, port);
   
 // Se actualiza cada minuto (no merece la pena cambiarlo debido a la caché de la API)
    setInterval(() => {
        updatePlayercount(ip, port);
    }, 60000);
});

// Utilizo la API del usuario ByBilly. Nos da el número de personas conectadas en el servidor.
const updatePlayercount = (ip, port) => {
    $.get(`https://api.bybilly.uk/api/players/${ip}/${port}`, (result) => {
        if (result.hasOwnProperty('online')) {
            $(".sip").html(result.online);
        } else {
            $(".contador").html("¡El server está offline!");
        }
    });
};

