import * as React from "react";

const AsignarPuntuacion = ({ valoraciones }) => {
  const [puntuacion, setPuntuacion] = React.useState(null);
  const [comentario, setComentario] = React.useState(null);
  const [disabled, setDisabled] = React.useState(false);

  const asignar = () => {
    // Puntuación aleatoria de 1 a 5
    const p = Math.floor(Math.random() * 5) + 1;

    // Estrellas igual que en tu WebComponent
    const estrellas = "★".repeat(p) + "☆".repeat(5 - p);

    // Comentario aleatorio del array que viene de GraphQL
    const comentarioAleatorio =
      valoraciones[Math.floor(Math.random() * valoraciones.length)].comentario;

    setPuntuacion(estrellas);
    setComentario(comentarioAleatorio);
    setDisabled(true);
  };

  return (
    <div className="asignar-puntuacion">
      <button
        id="asignar-puntuacion-btn"
        onClick={asignar}
        disabled={disabled}
      >
        {puntuacion ?? "Asignar puntuación"}
      </button>

      {comentario && <p>"{comentario}"</p>}
    </div>
  );
};

export default AsignarPuntuacion;