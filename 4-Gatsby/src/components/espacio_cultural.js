import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";

const ImagenPorTipo = ({ tipo }) => {
  switch (tipo) {
    case "museo":
      return <StaticImage src="../images/museo.jpeg" alt="Museo" />;
    case "biblioteca":
      return <StaticImage src="../images/biblioteca.jpeg" alt="Biblioteca" />;
    case "teatro":
      return <StaticImage src="../images/teatro.jpeg" alt="Teatro" />;
    default:
      return <StaticImage src="../images/tenerife.jpg" alt="Espacio cultural" />;
  }
};

const obtenerTipo = (props) => {
  if (props.museo === "sí") return "museo";
  if (props.biblioteca === "sí") return "biblioteca";
  if (props.teatro === "sí") return "teatro";
  return "otro";
};

/*
  const obtenerTipo = (props) => {
    if (props.museo === "sí") return "../images/museo.jpeg";
    if (props.biblioteca === "sí") return "../images/biblioteca.jpeg";
    if (props.teatro === "sí") return "../images/teatro.jpeg";
    return "../images/tenerife.jpg";
  };

  const rutaImagen = obtenerTipo(props);

  <StaticImage src={rutaImagen} alt="Espacio cultural" />

*/

const EspacioCultural = (props) => {
  const tipo = obtenerTipo(props);

  return (
    <div className="espacio-cultural">
      <ImagenPorTipo tipo={tipo} />

      <div className="nombre">{props.espacio_cultura_nombre}</div>
      <div className="municipio">{props.direccion_municipio_nombre}</div>
      <div className="isla">{props.direccion_isla_nombre}</div>
      <div className="direccion">{props.direccion}</div>
    </div>
  );
};

export default EspacioCultural;