import { useState } from 'react';

const INITIAL_ENTRIES = [
  {
    id: 1,
    name: 'CyberSurfer95',
    location: 'MIT Dorms, Boston',
    date: 'Nov 12, 1995',
    message: 'Awesome table layout!! How did you get the counter so clean?',
  },
  {
    id: 2,
    name: 'Sarah_K',
    location: 'CompuServe / Ohio',
    date: 'Nov 09, 1995',
    message: 'Found your page from the Web Directory. Greetings from 14.4k!',
  },
  {
    id: 3,
    name: 'WebMaster_Bob',
    location: 'GeoCities SiliconValley',
    date: 'Nov 03, 1995',
    message: 'Cool links! Add my homepage to your directory when you update.',
  },
];

function Guestbook1995({ onBackHome, onStatusChange }) {
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) return;

    const newEntry = {
      id: Date.now(),
      name: trimmedName,
      location: location.trim() || 'Somewhere on the Net',
      date: 'Nov 26, 1995',
      message: trimmedMessage,
    };

    setEntries((prev) => [newEntry, ...prev]);
    setName('');
    setLocation('');
    setMessage('');
    setSubmittedNotice(true);
    if (onStatusChange) {
      onStatusChange(`Guestbook signed by ${trimmedName}`);
    }
  };

  return (
    <div className="w95-section">
      <div className="w95-crumb">
        <button type="button" className="w95-link-btn" onClick={onBackHome}>
          ← Back to Alex&apos;s Home Page
        </button>
      </div>

      <h1 className="w95-h1">Alex&apos;s Official Guestbook</h1>
      <p className="w95-p">
        Thanks for stopping by my corner of cyberspace! Leave your handle and a
        note below so I know who visited.
      </p>

      {submittedNotice && (
        <div className="w95-notice-box">
          <strong>Thank you!</strong> Your signature has been added to the
          guestbook!
        </div>
      )}

      <form className="w95-form" onSubmit={handleSubmit}>
        <table className="w95-form-table" cellPadding="6">
          <tbody>
            <tr>
              <td width="130">
                <label htmlFor="gb-name">
                  <strong>Your Name / Handle:</strong>
                </label>
              </td>
              <td>
                <input
                  id="gb-name"
                  type="text"
                  className="w95-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. NetWizard95"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="gb-loc">
                  <strong>City / ISP:</strong>
                </label>
              </td>
              <td>
                <input
                  id="gb-loc"
                  type="text"
                  className="w95-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. AOL / Seattle"
                />
              </td>
            </tr>
            <tr>
              <td valign="top">
                <label htmlFor="gb-msg">
                  <strong>Message:</strong>
                </label>
              </td>
              <td>
                <textarea
                  id="gb-msg"
                  rows="3"
                  className="w95-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Say hello from 1995..."
                  required
                />
              </td>
            </tr>
            <tr>
              <td />
              <td className="w95-form-actions">
                <button type="submit" className="w95-bevel-btn">
                  Sign Guestbook
                </button>
                <button
                  type="button"
                  className="w95-bevel-btn"
                  onClick={() => {
                    setName('');
                    setLocation('');
                    setMessage('');
                  }}
                >
                  Clear Form
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <hr className="w95-hr" />

      <h2 className="w95-h2">Recent Signatures ({entries.length})</h2>
      <div className="w95-entries">
        {entries.map((entry) => (
          <table key={entry.id} className="w95-entry-table" cellPadding="6">
            <tbody>
              <tr>
                <td className="w95-entry-header">
                  <strong>{entry.name}</strong> ({entry.location}) —{' '}
                  <em>{entry.date}</em>
                </td>
              </tr>
              <tr>
                <td className="w95-entry-body">{entry.message}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
}

export default Guestbook1995;
