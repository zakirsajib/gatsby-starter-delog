

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const {fmImagesToRelative} = require('gatsby-remark-relative-images');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blogTemplate.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                path
                tags
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      // paging will not work as is, throws a build error
      /* const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node */


      createPage({
        //path: post.node.frontmatter.path,
         // changed to this as the first item path key  processed would throw a empty string
        path: post.node.frontmatter.path===""?`/posts/${post.node.fields.slug}`:post.node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          slug: post.node.fields.slug,
          /* previous,
          next, */
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node)
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
//
//
//
//
// path = require(`path`)
//
// exports.createPages = async ({ actions, graphql, reporter }) => {
//   const { createPage } = actions
//
//   const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)
//
//   const result = await graphql(`
//     {
//       allMarkdownRemark(
//         sort: { order: DESC, fields: [frontmatter___date] }
//         limit: 1000
//       ) {
//         edges {
//           node {
//             id
//             frontmatter {
//               path
//             }
//           }
//         }
//       }
//     }
//   `)
//
//   // Handle errors
//   if (result.errors) {
//     reporter.panicOnBuild(`Error while running GraphQL query.`)
//     return
//   }
//
//   result.data.allMarkdownRemark.edges.forEach(({ node }) => {
//     createPage({
//       path: node.frontmatter.path,
//       component: blogPostTemplate,
//       context: {}, // additional data can be passed via context
//     })
//   })
// }
