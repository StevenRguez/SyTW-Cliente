import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import EspacioCultural from "../components/espacio_cultural";
import Valoracion from "../components/valoracion";
import Noticias from "../components/noticias";
import AsignarPuntuacion from "../components/asignar_puntuacion";

const MuseoPage = ({ data }) => {
  const espacio = data.espacios.nodes[0];
  const valoraciones = data.valoraciones.nodes;
  const noticias = data.noticias.nodes;

  const valoracionRandom =
    valoraciones[Math.floor(Math.random() * valoraciones.length)];

  const noticiaRandom =
    noticias[Math.floor(Math.random() * noticias.length)];

  return (
    <Layout>
      <div className = "contenedor">  

        <div className="tarjeta" key={espacio.espacio_cultural_id} style = {{ flex: 1 }}>

          <EspacioCultural
            espacio_cultura_nombre={espacio.espacio_cultura_nombre}
            direccion={espacio.direccion}
            direccion_municipio_nombre={espacio.direccion_municipio_nombre}
            direccion_isla_nombre={espacio.direccion_isla_nombre}
            museo={espacio.museo}
          />

          <Valoracion comentario={valoracionRandom.comentario} />
          <AsignarPuntuacion valoraciones={valoraciones} />

          <Noticias noticias={[noticiaRandom]} style={{ flex: 2 }} />
        </div>
          
      </div>    
    </Layout>
  );
};

export const query = graphql`
  query {
    espacios: allEspaciosCulturalesJson(
      filter: { museo: { eq: "sí" } }
    ) {
      nodes {
        espacio_cultural_id
        espacio_cultura_nombre
        direccion
        direccion_municipio_nombre
        direccion_isla_nombre
        museo
      }
    }
    valoraciones: allValoracionesJson {
      nodes {
        comentario
      }
    }
    noticias: allNoticiasJson {
      nodes {
        titulo
      }
    }
  }
`;

export const Head = () => <title>Museo</title>;

export default MuseoPage;