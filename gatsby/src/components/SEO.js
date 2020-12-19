import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default function SEO({ children, location, description, title, image }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      <link rel="icon" type="image/ico" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charset="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />
      {/* Open Graph */}
      {location && <meta property="og.url" content={location.href} />}
      <meta property="og:image" content={image || '/logo-pizza.png'} />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:site_name"
        content={site.siteMetadata.title}
        key="og:site_name"
      />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      {children}
    </Helmet>
  );
}
