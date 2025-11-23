import * as React from "react";

const Noticias = ({ noticias }) => (
  <div className="noticias">
    <h4>Noticias</h4>
    {noticias.map((n) => (
      <p key={n.id}>{n.titulo}</p>
    ))}
  </div>
);

export default Noticias;