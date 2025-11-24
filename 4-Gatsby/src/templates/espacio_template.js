import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import EspacioCultural from "../components/espacio_cultural";
import Valoracion from "../components/valoracion";
import Noticias from "../components/noticias";

const EspacioTemplate = ({ data }) => {
  const espacio = data.espacio;
  const valoraciones = data.valoraciones.nodes;
  const noticias = data.noticias.nodes;

  // Elegir al azar
  const noticiaRandom =
    noticias[Math.floor(Math.random() * noticias.length)];

  return (
    <Layout>
      <h2>{espacio.espacio_cultura_nombre}</h2>

      <EspacioCultural
        espacio_cultura_nombre={espacio.espacio_cultura_nombre}
        direccion={espacio.direccion}
        direccion_municipio_nombre={espacio.direccion_municipio_nombre}
        direccion_isla_nombre={espacio.direccion_isla_nombre}
        museo={espacio.museo}
        biblioteca={espacio.biblioteca}
        teatro={espacio.teatro}
      />

      <Valoracion valoraciones={valoraciones} />

      <Noticias noticias={[noticiaRandom]} />
    </Layout>
  );
};

export const Head = ({ data }) => (
  <title>{data.espacio.nombre}</title>
);

export const query = graphql`
  query($id: Int!) {
    espacio: espaciosCulturalesJson(espacio_cultural_id: { eq: $id }) {
      espacio_cultura_nombre
      direccion
      direccion_municipio_nombre
      direccion_isla_nombre
      museo
      biblioteca
      teatro
    }

    valoraciones: allValoracionesJson {
      nodes {
        id
        comentario
      }
    }

    noticias: allNoticiasJson {
      nodes {
        id
        titulo
      }
    }
  }
`;

export default EspacioTemplate;