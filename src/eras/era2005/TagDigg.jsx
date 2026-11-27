import { useState } from 'react';
import './TagDigg.css';

const INITIAL_LINKS = [
  {
    id: 1,
    title: 'Introducing AJAX: Making Web Apps Feel Like Desktop Software',
    domain: 'adaptivepath.org',
    tag: 'ajax',
    diggs: 412,
    summary:
      'How XMLHttpRequest lets pages fetch data quietly in the background without full page reloads.',
  },
  {
    id: 2,
    title: 'CSS Zen Garden: The Beauty of CSS Design',
    domain: 'csszengarden.com',
    tag: 'css',
    diggs: 328,
    summary:
      'One clean HTML document transformed into dozens of radically different visual layouts.',
  },
  {
    id: 3,
    title: 'Why Every Startup Is Putting "BETA" in Their Logo',
    domain: 'web2journal.net',
    tag: 'web2.0',
    diggs: 215,
    summary:
      'Perpetual beta releases, rounded corners, and pastel gradients define this year’s launch aesthetic.',
  },
];

function TagDigg() {
  const [links, setLinks] = useState(INITIAL_LINKS);
  const [activeTag, setActiveTag] = useState('all');
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('web2.0');

  const tags = ['all', ...new Set(links.map((item) => item.tag))];
  const visible =
    activeTag === 'all' ? links : links.filter((item) => item.tag === activeTag);

  const handleDigg = (id) => {
    setLinks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, diggs: item.diggs + 1 } : item
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    const item = {
      id: Date.now(),
      title: title.trim(),
      domain: 'community.submit',
      tag: tag.trim().toLowerCase() || 'web2.0',
      diggs: 1,
      summary: 'Submitted locally by a Web 2.0 community member.',
    };
    setLinks((prev) => [item, ...prev]);
    setTitle('');
  };

  return (
    <div className="td-wrap">
      <div className="td-toolbar">
        <div className="td-tags">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              className={`td-tag-pill ${activeTag === t ? 'is-active' : ''}`}
              onClick={() => setActiveTag(t)}
            >
              #{t}
            </button>
          ))}
        </div>

        <form className="td-submit-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w2-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Submit a cool link headline..."
            required
          />
          <input
            type="text"
            className="w2-input td-tag-input"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="tag"
          />
          <button type="submit" className="w2-gloss-btn">
            Submit Link
          </button>
        </form>
      </div>

      <div className="td-list">
        {visible.map((item) => (
          <article key={item.id} className="td-item">
            <button
              type="button"
              className="td-digg-box"
              onClick={() => handleDigg(item.id)}
            >
              <strong>{item.diggs}</strong>
              <span>digg it</span>
            </button>
            <div className="td-body">
              <h3>{item.title}</h3>
              <div className="td-meta">
                <span>{item.domain}</span> · <span className="td-tag-badge">#{item.tag}</span>
              </div>
              <p>{item.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default TagDigg;
