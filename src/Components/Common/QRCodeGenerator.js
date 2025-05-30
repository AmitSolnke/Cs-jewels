import React, { useRef } from 'react';
import QRCode from 'react-qr-code';

const FixedQRCodeGenerator = () => {
  const FIXED_URL = "https://csjewels.com/sadicha-padar-challenge";

  const qrCodeRef = useRef(null);

  const handleDownload = () => {
    if (qrCodeRef.current) {
      const svgElement = qrCodeRef.current.querySelector('svg');
      if (svgElement) {
        const serializer = new XMLSerializer();
        let source = serializer.serializeToString(svgElement);

        if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
          source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
          source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }

        const encodedData = encodeURIComponent(source);
        const dataUrl = `data:image/svg+xml;charset=utf-8,${encodedData}`;

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'fixed_qrcode.svg'; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("SVG element not found within QR code ref.");
      }
    } else {
      console.error("QR code ref is null.");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
      <div ref={qrCodeRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <QRCode
          value={FIXED_URL}
          size={200}
          viewBox={`0 0 200 200`}
        />
      </div>

      <p style={{ marginBottom: '20px', fontSize: '1.1em', color: '#555' }}>
        This QR code points to: <strong>{FIXED_URL}</strong>
      </p>

 
      <button
        onClick={handleDownload}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Download Fixed QR Code (SVG)
      </button>
    </div>
  );
};

export default FixedQRCodeGenerator;