/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: require("./site-meta-data.json"),
  plugins: [
    // {
    // resolve: "gatsby-transformer-remark",
    //   options: {
    //       plugins: [
    //         {
    //           resolve: "gatsby-remark-normalize-paths",
    //           options: {
    //             pathFields: ["image", "thumbnail"],
    //           },
    //         },
    //       ],
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/static/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/_data/blog`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            {
              resolve: `gatsby-remark-relative-images`,
            },
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1013,
              },
            },
            {
              resolve: `gatsby-remark-responsive-iframe`,
              options: {
                wrapperStyle: `margin-bottom: 1.0725rem`,
              },
            },
          ]
      }
    },

//    {
//      resolve: `gatsby-transformer-remark`,
//      options: {
//        plugins: [{
//          resolve: `gatsby-remark-prismjs`,
//          options: {
//            classPrefix: "language-",
//            inlineCodeMarker: null,
//            aliases: {},
//            showLineNumbers: false,
//            noInlineHighlight: false,
//          },
//        },
//        {
//          resolve: 'gatsby-remark-emojis',
//        }],
//      },
//    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     // The property ID; the tracking code won't be generated without it. replace with yours
    //     trackingId: "UA-164743872-1",
    //     head: true,
    //   }
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Netflix | Ahmed Partho Zakir `,
        short_name: `APZNetlix`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#381696`,
        display: `standalone`,
        icon: "src/images/netflix.svg",
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        develop: true,
        ignore: ['styles/prismjs'],
        purgeOnly: ['styles/global.scss, templates/'],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    'gatsby-plugin-dark-mode',
    // siteURL is a must for sitemap generation
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
  ],
}
