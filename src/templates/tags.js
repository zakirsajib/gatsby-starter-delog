import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

import Img from 'gatsby-image'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    const postLinks = posts.map((post) => (
      <article className="card" key={post.node.fields.slug}>
        <Link to={post.node.frontmatter.path}>
          {!!post.node.frontmatter.thumbnail && (
            <Img
              fluid={post.node.frontmatter.thumbnail.childImageSharp.fluid}
              alt={post.node.frontmatter.title + "- Featured Shot"}
            />
          )}
          { /* <h2 className="is-size-2">{post.node.frontmatter.title}</h2> */ }
        </Link>
      </article>
    ))




    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} movie${
      totalCount === 1 ? '' : 's'
    } found in “${tag}” category`

    return (
      <Layout>
        <Helmet title={`${tag} | ${title}`} />
          {/* <h3 className="title is-size-4 is-bold-light">{tagHeader}</h3> */}
          <div className="grids animate__animated animate__fadeIn">
            {postLinks}
          </div>

          {/* <p><Link to="/tags/">Browse all tags</Link></p> */}
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            path
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1013, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
