import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import EspacioCultural from "../components/espacio_cultural";
import Valoracion from "../components/valoracion";
import AsignarPuntuacion from "../components/asignar_puntuacion";

const IndexPage = () => {

  // 1) Obtener todos los datos
  const data = useStaticQuery(graphql`
    query {
      allEspaciosCulturalesJson {
        nodes {
          espacio_cultural_id
          espacio_cultura_nombre
          direccion
          direccion_municipio_nombre
          direccion_isla_nombre
          museo
          biblioteca
          teatro
        }
      }

      allValoracionesJson {
        nodes {
          id
          comentario
        }
      }
    }
  `);

  const espacios = data.allEspaciosCulturalesJson.nodes;
  const valoraciones = data.allValoracionesJson.nodes;

  // 2) Función para seleccionar n elementos al azar
  const elegirAleatorios = (arr, n) =>
    [...arr].sort(() => Math.random() - 0.5).slice(0, n);

  // 3) Elegimos 3 espacios
  const seleccion = elegirAleatorios(espacios, 3);

  return (
    <Layout>
      <h1>Puntuación de espacios culturales con Gatsby</h1>
      <p>En esta práctica, crearemos un entorno web basado en React y haciendo uso de Gatsby, para permitir a los usuarios puntuar diferentes espacios culturales.</p>

      <div className="Lista">
        {seleccion.map((espacio) => {
          const valoracionRandom =
            valoraciones[Math.floor(Math.random() * valoraciones.length)];

          return (
            <div className="tarjeta" key={espacio.espacio_cultural_id}>
              <EspacioCultural
                espacio_cultura_nombre={espacio.espacio_cultura_nombre}
                direccion={espacio.direccion}
                direccion_municipio_nombre={espacio.direccion_municipio_nombre}
                direccion_isla_nombre={espacio.direccion_isla_nombre}
                museo={espacio.museo}
                biblioteca={espacio.biblioteca}
                teatro={espacio.teatro}
              />

              <Valoracion />
              <AsignarPuntuacion valoraciones={valoraciones} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export const Head = () => <title>Inicio</title>;

export default IndexPage;