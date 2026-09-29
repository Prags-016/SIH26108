import React from 'react';

export function ContactUs({ t }) {
  return (
    <div className="page-contact">
      <h1>{t.navContact || "Contact Us & Helpdesk"}</h1>

      <div className="panel-white">
        <h2 style={{ marginTop: 0 }}>Portal Secretariat & Technical Support</h2>
        <p>
          For queries regarding portal usage, standard data updates, or technical assistance with tender document uploads, please reach out through the official contact channels below:
        </p>

        <table className="def-table" style={{ marginTop: '16px' }} aria-label="Official Contact Information">
          <tbody>
            <tr>
              <th scope="row">Nodal Ministry</th>
              <td>Ministry of Consumer Affairs, Food & Public Distribution, Government of India</td>
            </tr>
            <tr>
              <th scope="row">Technical Support Unit</th>
              <td>IS Standards Recommendation Engine Project Cell</td>
            </tr>
            <tr>
              <th scope="row">Postal Address</th>
              <td>
                Room No. 302, Krishi Bhawan, Dr. Rajendra Prasad Road,<br />
                New Delhi - 110001, India
              </td>
            </tr>
            <tr>
              <th scope="row">Toll-free Helpdesk</th>
              <td>
                <strong>1800-11-4000</strong> / <strong>1915</strong> (Toll-Free, 09:30 AM to 06:00 PM IST on working days)
              </td>
            </tr>
            <tr>
              <th scope="row">Official Email</th>
              <td>
                <a href="mailto:support-isportal@gov.in">support-isportal@gov.in</a> / <a href="mailto:standards-help@bis.gov.in">standards-help@bis.gov.in</a>
              </td>
            </tr>
            <tr>
              <th scope="row">Bureau of Indian Standards HQ</th>
              <td>
                Manak Bhavan, 9 Bahadur Shah Zafar Marg, New Delhi - 110002<br />
                Website: <a href="https://www.bis.gov.in" target="_blank" rel="noopener noreferrer">www.bis.gov.in</a>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="notice-box" style={{ marginTop: '20px' }}>
          <strong>Note for Tender Authorities: </strong>
          In case of urgent tender publication deadlines, procurement officers may also directly access the BIS Standards e-Sale portal at <a href="https://standardsbis.bsbedge.com" target="_blank" rel="noopener noreferrer">standardsbis.bsbedge.com</a>.
        </div>
      </div>
    </div>
  );
}
