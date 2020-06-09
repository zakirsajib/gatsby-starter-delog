import React from "react"
import Helmet from 'react-helmet';
import { kebabCase } from 'lodash'
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Img from 'gatsby-image'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import 'video-react/styles/scss/video-react.scss'

import {
  Player,
  BigPlayButton,
  LoadingSpinner,
  ControlBar,
  ReplayControl,
  ForwardControl,
  VolumeMenuButton,
  PlaybackRateMenuButton,
  ClosedCaptionButton
} from 'video-react'

import Sticky from 'react-sticky-el'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { site, markdownRemark } = data // data.markdownRemark holds your post data
  const { siteMetadata } = site
  const { frontmatter, html, trailer} = markdownRemark

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

                  

                  {frontmatter.tags && frontmatter.tags.length ? (
                    <div className="taglist">
                      {frontmatter.tags.map((tag) => (
                        <Link
                          key={tag + `tag`}
                          to={`/tags/${kebabCase(tag)}/`}
                        >{tag}
                        </Link>

                      ))}
                    </div>
                  ) : null}

                  {frontmatter.categories=='Movie' ? (
                    <div>
                        <h1>Movie</h1>
                            <Tabs>
                              <TabList>
                                <Tab>Trailer</Tab>
                                <Tab>More like this</Tab>
                              </TabList>

                              <TabPanel>

                                {frontmatter.trailer}
                              </TabPanel>
                              <TabPanel>
                                <h2>Coming soon...</h2>
                              </TabPanel>
                            </Tabs>
                  </div>
                  ):
                    <div>
                        <h1>Webseries</h1>
                          <Tabs>
                            <TabList>
                              <Tab>Episodes</Tab>
                              <Tab>Trailer</Tab>
                              <Tab>More like this</Tab>
                            </TabList>

                            <TabPanel>
                              {frontmatter.episodes}
                            </TabPanel>
                            <TabPanel>
                              {frontmatter.trailer}
                            </TabPanel>
                            <TabPanel>
                              <h2>Coming soon...</h2>
                            </TabPanel>
                          </Tabs>
                    </div>
                  }
                {/*
                  <Player fluid="true">
                    <BigPlayButton position="center" />
                    <LoadingSpinner />
                    <ControlBar autoHide={true}>
                      <ReplayControl seconds={10} order={2.1} />
                      <ForwardControl seconds={10} order={3.2} />
                      <VolumeMenuButton vertical />
                      <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
                    </ControlBar>
                    <source
                      src="https://res.cloudinary.com/zakirsajib/video/upload/v1591606233/246798-146420-Coffin-Dance-on-PIANO_cwbpn6.mp4"
                      type="video/mp4"
                    />
                  </Player>
                  */}


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
        tags
        categories
        episodes
        trailer
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1013) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        metaDescription
      }
    }
  }
`
