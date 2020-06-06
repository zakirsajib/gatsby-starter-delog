import React from 'react'
import { kebabCase } from 'lodash'
import {Link, StaticQuery} from 'gatsby'
import { graphql } from 'gatsby'

import ThemeChanger from '../components/themeChanger'


class Navbar extends React.Component {

  constructor(){
   super();

   this.state = {
         displayMenu: false,
       };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

  };

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }



  render(){
    return(
      <StaticQuery
        query={ graphql`
        {
            allMarkdownRemark(limit: 1000) {
              group(field: frontmatter___tags) {
                fieldValue
                totalCount
              }
            }
          }
        `}
        render={data => {
          const apzTags = data.allMarkdownRemark.group;
          return (
          <div>
          <div className="desktopVisible">
            <nav className="navigation animate__animated animate__slideInDown">
              <Link
                to='/'
              > All
              </Link>
              {apzTags.map((tag) => (
                <Link
                  key={tag.fieldValue}
                  to={`/tags/${kebabCase(tag.fieldValue)}/`}
                >
                  {tag.fieldValue}
                </Link>
              ))}
              <ThemeChanger />
            </nav>
          </div>
          <div className="mobileVisible">
            <div className="dropdown">
              <button
                className="button"
                onClick={this.showDropdownMenu}
              >
              <svg
                width="31"
                height="25"
                viewBox="0 0 31 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                class="icon-hamburger masthead-nav-menu-hamburger"
              >
                <rect
                  x="0.581177"
                  y="0.71875"
                  width="30"
                  height="2"
                  fill="#E50914"
                >
                </rect>
                <rect
                  x="0.581177"
                  y="10.7188"
                  width="30"
                  height="2"
                  fill="#E50914"
                >
                </rect>
                <rect
                  x="0.581177"
                  y="20.7188"
                  width="30"
                  height="2"
                  fill="#E50914"
                >
                </rect>
              </svg>
              </button>
              { this.state.displayMenu ? (
              <nav className="navigation animate__animated animate__fadeIn">
                <Link
                  to='/'
                > All
                </Link>
                {apzTags.map((tag) => (
                  <Link
                    key={tag.fieldValue}
                    to={`/tags/${kebabCase(tag.fieldValue)}/`}
                  >
                    {tag.fieldValue}
                  </Link>
                ))}
              </nav>
              ): null}
            </div>
            <ThemeChanger />
          </div>
        </div>
          );
        }}
      />
  );
  }
}

export default Navbar
