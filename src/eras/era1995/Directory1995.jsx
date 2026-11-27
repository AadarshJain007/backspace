export const DIRECTORY_SITES = {
  cern: {
    id: 'cern',
    category: 'Science & Hypertext',
    title: 'The World Wide Web Project (CERN)',
    url: 'http://info.cern.ch/hypertext/WWW/TheProject.html',
    heading: 'World Wide Web',
    body: 'The WorldWideWeb (W3) is a wide-area hypermedia information retrieval initiative aiming to give universal access to a large universe of documents.',
    bullets: [
      'What is out there? — Pointers to the world’s online information, subjects, and W3 servers.',
      'Help — On the browser you are using.',
      'Software Products — A list of W3 project components and their current state.',
      'Technical — Details of protocols, formats, program internals, and HTTP/1.0.',
    ],
  },
  mosaic: {
    id: 'mosaic',
    category: 'Computers & Internet',
    title: "NCSA Mosaic What's New",
    url: 'http://www.ncsa.uiuc.edu/SDG/Software/Mosaic/Docs/whats-new.html',
    heading: "What's New With NCSA Mosaic (November 1995)",
    body: 'A curated bulletin of newly launched university servers, online museums, and experimental hypertext homepages across the internet.',
    bullets: [
      'The Silicon Valley Tech Bulletin — Live semiconductor news.',
      'Virtual Frog Dissection Kit — Interactive educational images.',
      'Internet Underground Music Archive (IUMA) — Downloadable .AU audio clips.',
    ],
  },
  html: {
    id: 'html',
    category: 'Computers & Internet',
    title: 'HTML 2.0 Quick Reference',
    url: 'http://www.cyberspace.org/~alex/html-ref.html',
    heading: 'HTML 2.0 Tag Cheat Sheet',
    body: 'Essential markup tags every 1995 webmaster keeps taped to their CRT monitor:',
    bullets: [
      '<H1> to <H6> — Structural document headings.',
      '<TABLE BORDER="1"> — The secret to multi-column page layouts.',
      '<HR> — Crisp 3D horizontal divider line.',
      '<BLINK> — Use sparingly for NEW! notices.',
    ],
  },
  ascii: {
    id: 'ascii',
    category: 'Fun & Culture',
    title: 'ASCII Art & Emoticon Archive',
    url: 'http://www.cyberspace.org/~alex/ascii.html',
    heading: 'Classic Text Art & Smileys',
    body: 'No GIFs? No problem. Express yourself using pure 7-bit ASCII characters:',
    pre: `  :-)   Classic Smiley       ;-)   Wink
  :-D   Big Grin             8-)   Cool Sunglasses
  :-P   Sticking out tongue  <><   Tiny Fish

     |\\__/,|   (\`\\
   _.|o o  |_   ) )
 -(((---(((--------`,
  },
};

const CATEGORIES = [
  {
    name: 'Computers & Internet',
    items: ['mosaic', 'html'],
  },
  {
    name: 'Science & Hypertext',
    items: ['cern'],
  },
  {
    name: 'Fun & Culture',
    items: ['ascii'],
  },
];

function Directory1995({ activeSiteId, onOpenSite, onBackHome }) {
  if (activeSiteId && DIRECTORY_SITES[activeSiteId]) {
    const site = DIRECTORY_SITES[activeSiteId];
    return (
      <div className="w95-section">
        <div className="w95-crumb">
          <button
            type="button"
            className="w95-link-btn"
            onClick={() => onOpenSite(null)}
          >
            ← Back to Web Directory
          </button>{' '}
          |{' '}
          <button type="button" className="w95-link-btn" onClick={onBackHome}>
            Alex&apos;s Home
          </button>
        </div>

        <h1 className="w95-h1">{site.heading}</h1>
        <p className="w95-p">{site.body}</p>

        {site.bullets && (
          <ul className="w95-links-list">
            {site.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        {site.pre && <pre className="w95-ascii-pre">{site.pre}</pre>}

        <hr className="w95-hr" />
        <p className="w95-small-note">
          Simulated local archive mirror · {site.url}
        </p>
      </div>
    );
  }

  return (
    <div className="w95-section">
      <div className="w95-crumb">
        <button type="button" className="w95-link-btn" onClick={onBackHome}>
          ← Back to Alex&apos;s Home Page
        </button>
      </div>

      <h1 className="w95-h1">Cyberspace Web Directory (1995)</h1>
      <p className="w95-p">
        Before search engines indexed everything, people browsed hand-curated
        subject trees. Click any listing below to open its local simulated
        page:
      </p>

      <table className="w95-dir-table" cellPadding="8" cellSpacing="4">
        <tbody>
          {CATEGORIES.map((category) => (
            <tr key={category.name}>
              <td className="w95-dir-cat" width="210" valign="top">
                <strong>{category.name}</strong>
              </td>
              <td className="w95-dir-links" valign="top">
                <ul className="w95-links-list">
                  {category.items.map((siteKey) => {
                    const site = DIRECTORY_SITES[siteKey];
                    return (
                      <li key={site.id}>
                        <button
                          type="button"
                          className="w95-link-btn"
                          onClick={() => onOpenSite(site.id)}
                        >
                          {site.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Directory1995;
