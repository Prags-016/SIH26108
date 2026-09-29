import React from 'react';

export function Policies({ t }) {
  return (
    <div className="page-policies">
      <h1>Website Policies</h1>

      <div className="panel-white">
        <h2>Hyperlinking Policy</h2>
        <p>
          Prior permission is not required before hyperlinking to pages hosted on this portal. However, pages from this portal must not be loaded into frames on external sites; they must open in a new window or tab.
        </p>

        <h2>Copyright Policy</h2>
        <p>
          The contents of this portal may be reproduced free of charge in any format or media without requiring specific permission, provided the material is reproduced accurately, not used in a derogatory or misleading context, and the source is prominently acknowledged. Full texts of Indian Standards are subject to BIS copyright.
        </p>

        <h2>Content Contribution & Review Policy</h2>
        <p>
          Information related to standard numbers, Quality Control Orders, and amendments is updated on a synchronized basis with notifications issued in the Gazette of India and the Bureau of Indian Standards bulletins.
        </p>

        <h2>Security Policy</h2>
        <p>
          This portal employs standard Transport Layer Security (TLS), role-based audit logs, and client-side data handling for search queries to prevent unauthorized disclosure of pre-publication tender details.
        </p>
      </div>
    </div>
  );
}
