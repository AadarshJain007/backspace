import { useState } from 'react';

function Home1995({ visitorCount, onNavigate, onOpenSite, onRandomSite }) {
  const [showSource, setShowSource] = useState(false);
  const formattedCount = String(visitorCount).padStart(6, '0');

  return (
    <div className="w95-home">
      <table className="w95-banner-table" cellPadding="8" cellSpacing="2">
        <tbody>
          <tr>
            <td className="w95-banner-icon" align="center" width="76">
              <svg
                width="48"
                height="48"
                viewBox="0 0 16 16"
                shapeRendering="crispEdges"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="12" height="9" fill="#000080" />
                <rect x="3" y="3" width="10" height="7" fill="#00FFFF" />
                <rect x="4" y="4" width="6" height="1" fill="#000080" />
                <rect x="4" y="6" width="8" height="1" fill="#000080" />
                <rect x="6" y="11" width="4" height="2" fill="#808080" />
                <rect x="4" y="13" width="8" height="2" fill="#C0C0C0" />
              </svg>
            </td>
            <td className="w95-banner-text">
              <div className="w95-blink-row">
                <span className="w95-new-badge">NEW!</span>
                <button
                  type="button"
                  className="w95-updated w95-secret-date"
                  onClick={() => setShowSource((prev) => !prev)}
                >
                  Last updated: Nov 14, 1995
                </button>
              </div>
              {showSource && (
                <pre className="w95-ascii-pre">
                  {`<HTML>\n<HEAD><TITLE>Alex's Cyberspace Corner</TITLE></HEAD>\n<BODY BGCOLOR="#FFFFCC" TEXT="#000000">\n  <!-- Hand-coded in Notepad 3.11 -->\n</BODY>\n</HTML>`}
                </pre>
              )}
              <h1 className="w95-h1">
                Welcome to Alex&apos;s Cyberspace Corner!!
              </h1>
              <p className="w95-subtitle">
                Your #1 stop for HTML 2.0 tips, cool links &amp; digital surfing
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <hr className="w95-hr" />

      <table className="w95-layout-table" cellPadding="8" cellSpacing="4">
        <tbody>
          <tr>
            <td className="w95-sidebar-cell" valign="top" width="180">
              <div className="w95-box-title">SITE MENU</div>
              <ul className="w95-nav-list">
                <li>
                  <button
                    type="button"
                    className="w95-link-btn"
                    onClick={() => onNavigate('home')}
                  >
                    Home Page
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w95-link-btn"
                    onClick={() => onNavigate('guestbook')}
                  >
                    Sign Guestbook
                  </button>{' '}
                  <span className="w95-hot-tag">HOT!</span>
                </li>
                <li>
                  <button
                    type="button"
                    className="w95-link-btn"
                    onClick={() => onNavigate('directory')}
                  >
                    Web Directory
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w95-link-btn"
                    onClick={() => onNavigate('gallery')}
                  >
                    Image Gallery
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w95-link-btn"
                    onClick={() => onNavigate('construction')}
                  >
                    MIDI Jukebox
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w95-link-btn"
                    onClick={onRandomSite}
                  >
                    Surf Random Site!
                  </button>
                </li>
              </ul>

              <hr className="w95-hr" />

              <div className="w95-counter-box">
                <div className="w95-counter-label">YOU ARE VISITOR #</div>
                <div className="w95-counter-digits" aria-label={`Visitor count ${visitorCount}`}>
                  {formattedCount}
                </div>
                <div className="w95-counter-sub">since Oct 1995</div>
              </div>

              <div className="w95-netscape-badge">
                BEST VIEWED IN
                <br />
                <strong>Netscape Navigator 1.1</strong>
                <br />
                640×480 · 256 Colors
              </div>
            </td>

            <td className="w95-main-cell" valign="top">
              <h2 className="w95-h2">About Me &amp; This Page</h2>
              <p className="w95-p">
                Greetings fellow net-surfer! My name is <strong>Alex</strong>,
                I&apos;m a computer science freshman typing this on a 486DX2
                connected over a <strong>28.8k USRobotics modem</strong>. I
                built this homepage using Windows Notepad to share my favorite
                corners of the World Wide Web.
              </p>

              <h2 className="w95-h2">Cool Links on the Web</h2>
              <p className="w95-p">
                Click any link below to surf directly to my favorite local
                mirrors:
              </p>
              <ul className="w95-links-list">
                <li>
                  <button
                    type="button"
                    className="w95-link-btn"
                    onClick={() => onOpenSite('cern')}
                  >
                    CERN WorldWideWeb Project
                  </button>{' '}
                  — Where hypertext began!
                </li>
                <li>
                  <button
                    type="button"
                    className="w95-link-btn"
                    onClick={() => onOpenSite('mosaic')}
                  >
                    NCSA Mosaic &quot;What&apos;s New&quot;
                  </button>{' '}
                  — Daily cool sites list
                </li>
                <li>
                  <button
                    type="button"
                    className="w95-link-btn"
                    onClick={() => onOpenSite('html')}
                  >
                    The HTML 2.0 Quick Reference
                  </button>{' '}
                  — Learn &lt;TABLE&gt; and &lt;BLINK&gt;!
                </li>
                <li>
                  <button
                    type="button"
                    className="w95-link-btn"
                    onClick={() => onOpenSite('ascii')}
                  >
                    ASCII Art &amp; Smiley Archive
                  </button>{' '}
                  — :-) ;-) :-D
                </li>
              </ul>

              <hr className="w95-hr" />

              <table className="w95-construction-box" cellPadding="6">
                <tbody>
                  <tr>
                    <td width="44" align="center">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 16 16"
                        shapeRendering="crispEdges"
                        aria-hidden="true"
                      >
                        <polygon points="8,1 15,14 1,14" fill="#FFFF00" stroke="#000000" strokeWidth="1" />
                        <rect x="7" y="5" width="2" height="5" fill="#000000" />
                        <rect x="7" y="11" width="2" height="2" fill="#000000" />
                      </svg>
                    </td>
                    <td>
                      <strong>UNDER CONSTRUCTION!</strong>
                      <br />
                      Check back soon for my <em>Java Applets</em> and{' '}
                      <em>MIDI Soundboard</em>! Please{' '}
                      <button
                        type="button"
                        className="w95-link-btn"
                        onClick={() => onNavigate('guestbook')}
                      >
                        sign my guestbook
                      </button>{' '}
                      before you log off.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Home1995;
