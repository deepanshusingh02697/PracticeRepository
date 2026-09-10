import './download.css'
import qrImage from '../../assets/QrImg.png'

export default function DownloadOlx() {
  return (
    <div className="download-app">
      <img
        src={qrImage}
        alt="Download OLX App QR Code"
        className="qr-image"
      />

      <div className="download-text">
        <span className='download'>Download</span>
        <span className='olxapp'>The OLX App</span>
      </div>
    </div>
  );
}

