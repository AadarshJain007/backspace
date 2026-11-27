import { useState } from 'react';

const GALLERY_ITEMS = [
  {
    id: 'workstation',
    title: 'My 486DX2 Battlestation',
    meta: 'workstation.gif · 14 KB · 320×240',
    caption: '14-inch CRT monitor running Windows 3.11 and Netscape 1.1.',
    art: (
      <svg width="96" height="72" viewBox="0 0 32 24" shapeRendering="crispEdges" aria-hidden="true">
        <rect width="32" height="24" fill="#008080" />
        <rect x="6" y="3" width="20" height="14" fill="#C0C0C0" />
        <rect x="8" y="5" width="16" height="10" fill="#000080" />
        <rect x="9" y="6" width="10" height="2" fill="#00FFFF" />
        <rect x="9" y="9" width="14" height="1" fill="#FFFF00" />
        <rect x="9" y="11" width="8" height="1" fill="#FFFFFF" />
        <rect x="12" y="17" width="8" height="2" fill="#808080" />
        <rect x="5" y="19" width="22" height="3" fill="#DFDFDF" />
      </svg>
    ),
  },
  {
    id: 'modem',
    title: '28.8k External Modem',
    meta: 'usrobotics.gif · 9 KB · 320×240',
    caption: 'Watch the TX/RX LEDs blink while downloading a 50 KB image!',
    art: (
      <svg width="96" height="72" viewBox="0 0 32 24" shapeRendering="crispEdges" aria-hidden="true">
        <rect width="32" height="24" fill="#1A1A2E" />
        <rect x="4" y="9" width="24" height="7" fill="#333333" />
        <rect x="5" y="10" width="22" height="5" fill="#555555" />
        <rect x="7" y="12" width="2" height="2" fill="#00FF00" />
        <rect x="11" y="12" width="2" height="2" fill="#00FF00" />
        <rect x="15" y="12" width="2" height="2" fill="#FF0000" />
        <rect x="19" y="12" width="2" height="2" fill="#FFFF00" />
        <rect x="23" y="12" width="2" height="2" fill="#00FF00" />
      </svg>
    ),
  },
  {
    id: 'floppy',
    title: 'Backup Floppy Disk (1.44 MB)',
    meta: 'backup95.gif · 7 KB · 256×256',
    caption: 'Contains the entire source code for my homepage and 3 MIDI songs.',
    art: (
      <svg width="96" height="72" viewBox="0 0 32 24" shapeRendering="crispEdges" aria-hidden="true">
        <rect width="32" height="24" fill="#C0C0C0" />
        <rect x="8" y="2" width="16" height="20" fill="#000080" />
        <rect x="11" y="2" width="10" height="7" fill="#DFDFDF" />
        <rect x="16" y="3" width="3" height="5" fill="#000080" />
        <rect x="10" y="12" width="12" height="9" fill="#FFFFFF" />
        <rect x="11" y="14" width="10" height="1" fill="#000000" />
        <rect x="11" y="16" width="8" height="1" fill="#0000FF" />
      </svg>
    ),
  },
  {
    id: 'planet',
    title: 'Cyberspace Horizon',
    meta: 'cosmos.jpg · 18 KB · 320×240',
    caption: 'Ray-traced planet graphic rendered overnight on a Pentium 90.',
    art: (
      <svg width="96" height="72" viewBox="0 0 32 24" shapeRendering="crispEdges" aria-hidden="true">
        <rect width="32" height="24" fill="#000022" />
        <rect x="4" y="4" width="1" height="1" fill="#FFFFFF" />
        <rect x="26" y="5" width="1" height="1" fill="#FFFF00" />
        <rect x="9" y="18" width="1" height="1" fill="#00FFFF" />
        <rect x="24" y="19" width="1" height="1" fill="#FFFFFF" />
        <circle cx="16" cy="12" r="6" fill="#0080FF" />
        <ellipse cx="16" cy="12" rx="11" ry="2.5" fill="none" stroke="#FFFF00" strokeWidth="1" />
      </svg>
    ),
  },
];

function Gallery1995({ onBackHome, onStatusChange }) {
  const [selectedId, setSelectedId] = useState(GALLERY_ITEMS[0].id);
  const selected = GALLERY_ITEMS.find((item) => item.id === selectedId) || GALLERY_ITEMS[0];

  const handleSelect = (item) => {
    setSelectedId(item.id);
    if (onStatusChange) {
      onStatusChange(`Loaded ${item.meta}`);
    }
  };

  return (
    <div className="w95-section">
      <div className="w95-crumb">
        <button type="button" className="w95-link-btn" onClick={onBackHome}>
          ← Back to Alex&apos;s Home Page
        </button>
      </div>

      <h1 className="w95-h1">Alex&apos;s Pixel Image Gallery</h1>
      <p className="w95-p">
        Low-bandwidth graphics optimized for 28.8k modems. Click any thumbnail
        to inspect it below.
      </p>

      <table className="w95-gallery-table" cellPadding="8" cellSpacing="4">
        <tbody>
          <tr>
            {GALLERY_ITEMS.map((item) => {
              const isSelected = item.id === selected.id;
              return (
                <td
                  key={item.id}
                  align="center"
                  className={`w95-gallery-thumb ${isSelected ? 'is-selected' : ''}`}
                >
                  <button
                    type="button"
                    className="w95-thumb-btn"
                    onClick={() => handleSelect(item)}
                  >
                    {item.art}
                    <span className="w95-thumb-title">{item.title}</span>
                  </button>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>

      <table className="w95-gallery-preview" cellPadding="10">
        <tbody>
          <tr>
            <td align="center" width="140" className="w95-gallery-preview-art">
              {selected.art}
            </td>
            <td valign="top">
              <h2 className="w95-h2">{selected.title}</h2>
              <p className="w95-p">{selected.caption}</p>
              <p className="w95-small-note">{selected.meta}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Gallery1995;
