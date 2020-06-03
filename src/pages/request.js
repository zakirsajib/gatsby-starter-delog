import React from "react"
import Helmet from "react-helmet"
import { graphql } from 'gatsby'
import Layout from "../components/layout"

import { FacebookProvider, Comments } from 'react-facebook';

const ContactPage = ({
  data: {
    site
  },
}) => {
  return (
    <Layout>
      <Helmet>
        <title>Contact — {site.siteMetadata.title}</title>
        <meta name="description" content={"Contact page of " + site.siteMetadata.description} />
      </Helmet>
      <div className="-contact animate__animated animate__slideInUp">
        <div>
        	<h2>Please request your movie here.</h2><hr />
			<FacebookProvider appId={site.siteMetadata.FBAppID}>
				<Comments href="https://apz.netlify.app/" />
			</FacebookProvider>
        </div>
      </div>
    </Layout>
  )
}
export default ContactPage
export const pageQuery = graphql`
  query ContactPageQuery{
    site {
      siteMetadata {
        title
        description
        FBAppID
      }
    }
  }
`
