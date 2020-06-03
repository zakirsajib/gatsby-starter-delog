import React from "react"
import Helmet from 'react-helmet';
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from 'gatsby-image'

import Sticky from 'react-sticky-el'

import 'animate.css/animate.min.css'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { site, markdownRemark } = data // data.markdownRemark holds your post data
  const { siteMetadata } = site
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <Helmet>
        <title>{frontmatter.title} | {siteMetadata.title}</title>
        <meta name="description" content={frontmatter.metaDescription} />
      </Helmet>
      <div className="blog-post-container">
        <article className="post">
          <div className="two-grids">
	          {!frontmatter.thumbnail && (
	            <div className="post-thumbnail">
	              <h1 className="post-title">{frontmatter.title}</h1>
	              <div className="post-meta">{frontmatter.date}</div>
	            </div>
	          )}
	          {!!frontmatter.thumbnail && (
              <Sticky topOffset={0} stickyStyle={{ transform: 'translateY(0px)' }}>
                <div
                  className="animate__animated animate__slideInLeft post-thumbnail"
                >
                  <Img
                    fluid={frontmatter.thumbnail.childImageSharp.fluid}
                    alt={frontmatter.title + "- Featured Shot"}
                  />
	              </div>
              </Sticky>
	          )}
              <div>
                <h1
                  className="animate__animated animate__slideInDown post-title"
                >{frontmatter.title}
                </h1>
                <hr />
                <div
    	            className="blog-post-content"
    	            dangerouslySetInnerHTML={{ __html: html }}
    	          />
              </div>
            </div>
        </article>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1013) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        metaDescription
      }
    }
  }
`
