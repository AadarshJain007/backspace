import { useState } from 'react';

const INITIAL_TASKS = [
  { id: 'BSP-101', title: 'Ship dark mode CSS variables', status: 'Done' },
  { id: 'BSP-102', title: 'Add keyboard shortcut ⌘K filter', status: 'In Progress' },
  { id: 'BSP-103', title: 'Optimize variable font subset', status: 'Todo' },
];

const STATUS_CYCLE = {
  Todo: 'In Progress',
  'In Progress': 'Done',
  Done: 'Todo',
};

function Workspace2020() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [query, setQuery] = useState('');
  const [newTask, setNewTask] = useState('');

  const visible = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.id.toLowerCase().includes(query.toLowerCase())
  );

  const cycleStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: STATUS_CYCLE[t.status] } : t
      )
    );
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks((prev) => [
      {
        id: `BSP-${104 + prev.length}`,
        title: newTask.trim(),
        status: 'Todo',
      },
      ...prev,
    ]);
    setNewTask('');
  };

  return (
    <div className="e20-workspace">
      <div className="e20-card e20-cmd-bar">
        <span className="e20-kbd">⌘K</span>
        <input
          type="text"
          className="e20-cmd-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Quick filter issues by title or ID..."
        />
      </div>

      <form className="e20-card e20-row-form" onSubmit={addTask}>
        <input
          type="text"
          className="e20-input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New issue title..."
          required
        />
        <button type="submit" className="e20-accent-btn">
          Create Issue
        </button>
      </form>

      <div className="e20-card e20-issue-list">
        {visible.map((t) => (
          <div key={t.id} className="e20-issue-row">
            <button
              type="button"
              className={`e20-status-pill is-${t.status.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => cycleStatus(t.id)}
              title="Click to cycle status"
            >
              {t.status}
            </button>
            <span className="e20-issue-id">{t.id}</span>
            <span className="e20-issue-title">{t.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workspace2020;
