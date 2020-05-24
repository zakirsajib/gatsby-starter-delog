import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Navigation from "../components/navigation"
import Logo from '../images/netflix.svg';

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <div className="site-wrapper">
      <header className="site-header">
        <div className="site-title">
          <Link to="/"><img src={Logo} alt="" width="50" height="50"/></Link>
        </div>
        <Navigation />
      </header>
      {children}
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Ahmed - Partho - Zakir &bull; Made with <span role="img" aria-label="love">❤️</span> by <a href="https://zakirsajib.netlify.app" target="_blank">Zakir</a></p>
      </footer>
    </div>
  )
}
