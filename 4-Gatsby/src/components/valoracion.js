import * as React from "react";
import AsignarPuntuacion from "../components/asignar_puntuacion";

const Valoracion = ({ valoraciones }) => (
  <div className="valoracion">
    <h4>Valoración</h4>

      <AsignarPuntuacion valoraciones={valoraciones} />
  </div>
);

export default Valoracion;