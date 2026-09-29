import React from 'react';

export function Terms({ t }) {
  return (
    <div className="page-terms">
      <h1>Terms & Conditions</h1>

      <div className="panel-white">
        <h2>Advisory Nature of Recommendations</h2>
        <p>
          The IS Standards Recommendation Engine provides AI-assisted, advisory recommendations based on keyword analysis, semantic matching, and indexed BIS catalogues. The suggestions do not substitute official due diligence by tendering authorities under the General Financial Rules (GFR), 2017.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          While every care has been taken to ensure the accuracy of the standards mapping and Quality Control Order status, the Government of India, the Department of Consumer Affairs, and the Bureau of Indian Standards disclaim liability for any direct, indirect, incidental, or consequential losses arising from tender formulation or bid disputes.
        </p>

        <h2>Governing Law & Jurisdiction</h2>
        <p>
          These terms and conditions shall be governed by and construed in accordance with the Laws of India. Any dispute arising under these terms shall be subject to the exclusive jurisdiction of the competent courts in New Delhi.
        </p>
      </div>
    </div>
  );
}
