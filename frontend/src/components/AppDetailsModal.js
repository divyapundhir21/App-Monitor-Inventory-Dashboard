import React from 'react';

export default function AppDetailsModal({ app, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-dialog modal-lg">
        <div className="modal-content p-4">
          <h4>{app.appName}</h4>
          <p><b>App ID:</b> {app.appId}</p>
          <p><b>Technical Owner:</b> {app.technicalOwner}</p>
          <p><b>Business Owner:</b> {app.businessOwner}</p>
          <p><b>Domain:</b> {app.domain}</p>
          <p><b>Tech Stack:</b> {app.techStack?.join(', ')}</p>
          <p><b>Prod URL:</b> <a href={app.prodUrl}>{app.prodUrl}</a></p>
          <p><b>Test URL:</b> <a href={app.testUrl}>{app.testUrl}</a></p>

          {app.isVendorApp ? (
            <div>
              <h5>Vendor Details</h5>
              <pre>{JSON.stringify(app.vendorDetails, null, 2)}</pre>
            </div>
          ) : <i>Not a vendor app</i>}

          <button className="btn btn-danger mt-3" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
