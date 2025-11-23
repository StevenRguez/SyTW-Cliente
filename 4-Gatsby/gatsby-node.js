/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const resultado = await graphql(`
    {
      allEspaciosCulturalesJson {
        nodes {
          espacio_cultural_id
        }
      }
    }
  `);

  if (!resultado.data || !resultado.data.allEspaciosCulturalesJson) {
    throw new Error("No se encontraron espacios culturales en GraphQL.");
  }

  resultado.data.allEspaciosCulturalesJson.nodes.forEach((espacio) => {
    createPage({
      path: `/espacios/${espacio.espacio_cultural_id}`,
      component: path.resolve("./src/templates/espacio_template.js"),
      context: {
        id: espacio.espacio_cultural_id,
      },
    });
  });
};