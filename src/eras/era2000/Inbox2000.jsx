import { useState } from 'react';

function Inbox2000({
  messages,
  onMarkRead,
  onSendMessage,
  onDeleteMessage,
  onBackPortal,
}) {
  const [selectedId, setSelectedId] = useState(messages[0]?.id || null);
  const [composing, setComposing] = useState(false);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const selectedMessage = messages.find((m) => m.id === selectedId) || null;

  const handleSelect = (msg) => {
    setSelectedId(msg.id);
    setComposing(false);
    if (!msg.read) {
      onMarkRead(msg.id);
    }
  };

  const handleSend = (event) => {
    event.preventDefault();
    if (!to.trim() || !subject.trim() || !body.trim()) return;
    onSendMessage({
      to: to.trim(),
      subject: subject.trim(),
      body: body.trim(),
    });
    setTo('');
    setSubject('');
    setBody('');
    setComposing(false);
  };

  return (
    <div className="p2k-box">
      <div className="p2k-box-header">
        <span>WEBMAIL 2000 — INBOX (alex@webmail2000.com)</span>
        <div className="p2k-inline-actions">
          <button
            type="button"
            className="p2k-tab-btn"
            onClick={() => setComposing(true)}
          >
            Compose Mail
          </button>
          <button
            type="button"
            className="p2k-tab-btn"
            onClick={onBackPortal}
          >
            Portal Home
          </button>
        </div>
      </div>

      <div className="p2k-box-body">
        {composing ? (
          <form className="p2k-compose-form" onSubmit={handleSend}>
            <div className="p2k-form-row">
              <label htmlFor="mail-to">To:</label>
              <input
                id="mail-to"
                type="text"
                className="p2k-input"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="friend@geocities.com"
                required
              />
            </div>
            <div className="p2k-form-row">
              <label htmlFor="mail-subj">Subject:</label>
              <input
                id="mail-subj"
                type="text"
                className="p2k-input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Check out this new portal!"
                required
              />
            </div>
            <div className="p2k-form-row">
              <label htmlFor="mail-body">Message:</label>
              <textarea
                id="mail-body"
                rows="4"
                className="p2k-textarea"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>
            <div className="p2k-inline-actions">
              <button type="submit" className="p2k-btn">
                Send Message
              </button>
              <button
                type="button"
                className="p2k-btn-secondary"
                onClick={() => setComposing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="p2k-mail-split">
            <table className="p2k-mail-table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p2k-muted">
                      Your inbox is empty.
                    </td>
                  </tr>
                ) : (
                  messages.map((msg) => (
                    <tr
                      key={msg.id}
                      className={`${!msg.read ? 'is-unread' : ''} ${
                        selectedId === msg.id ? 'is-selected' : ''
                      }`}
                    >
                      <td>{msg.from}</td>
                      <td>
                        <button
                          type="button"
                          className="p2k-link"
                          onClick={() => handleSelect(msg)}
                        >
                          {msg.subject}
                        </button>
                      </td>
                      <td>{msg.date}</td>
                      <td>
                        <button
                          type="button"
                          className="p2k-sub-link"
                          onClick={() => {
                            onDeleteMessage(msg.id);
                            if (selectedId === msg.id) {
                              setSelectedId(null);
                            }
                          }}
                        >
                          [Del]
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {selectedMessage && (
              <div className="p2k-mail-reader">
                <div className="p2k-mail-meta">
                  <div>
                    <strong>From:</strong> {selectedMessage.from}
                  </div>
                  <div>
                    <strong>Subject:</strong> {selectedMessage.subject}
                  </div>
                  <div>
                    <strong>Date:</strong> {selectedMessage.date}
                  </div>
                </div>
                <p className="p2k-mail-content">{selectedMessage.body}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Inbox2000;
