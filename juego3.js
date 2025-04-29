const personajes = [
    { nombre: "Hidalgo", img: "imagenes/miguel hidalgo.jpg" },
    { nombre: "Morelos", img: "imagenes/jose mara morelos.jpg" },
    { nombre: "Aldama", img: "imagenes/juan aldama.jpg" },
  ];
  
  let colocados = 0;
  
  window.onload = () => {
    // Barajar personajes
    personajes.sort(() => 0.5 - Math.random());
  
    const zona = document.getElementById("zona-personajes");
  
    personajes.forEach(p => {
      const img = document.createElement("img");
      img.src = p.img;
      img.alt = p.nombre;
      img.classList.add("personaje");
      img.draggable = true;
      img.id = p.nombre;
  
      img.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text", e.target.id);
      });
  
      zona.appendChild(img);
    });
  
    document.querySelectorAll(".destino").forEach(destino => {
      destino.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
  
      destino.addEventListener("drop", (e) => {
        const nombre = e.dataTransfer.getData("text");
        const destinoCorrecto = destino.dataset.correcto;
  
        if (nombre === destinoCorrecto) {
          const personaje = personajes.find(p => p.nombre === nombre);
          destino.innerHTML = `<b>${destino.textContent}</b><br><img src="${personaje.img}" width="80">`;
  
          const imagenArrastrada = document.getElementById(nombre);
          if (imagenArrastrada) imagenArrastrada.remove();
  
          colocados++;
  
          if (colocados === personajes.length) {
            document.getElementById("mensaje-final").style.display = "flex";
          }
        } else {
          alert("Ups, ese personaje no va ahí.");
        }
      });
    });
  };
  