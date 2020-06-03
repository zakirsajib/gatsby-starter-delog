import React from "react"
import { Link } from "gatsby"
import Img from 'gatsby-image'

const PostLink = ({ post }) => (
  <article className="card ">
    <Link to={post.frontmatter.path}>
      {!!post.frontmatter.thumbnail && (
        <Img
          fluid={post.frontmatter.thumbnail.childImageSharp.fluid}
          alt={post.frontmatter.title + "- Featured Shot"}
        />
      )}
    </Link>
  </article>
)
export default PostLink
