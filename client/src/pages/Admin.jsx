import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import './Admin.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('token');
}

async function apiFetch(path) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

function DashboardTab() {
  const [data, setData] = useState(null);
  useEffect(() => { apiFetch('/admin/dashboard').then(setData).catch(() => {}); }, []);
  if (!data) return <p className="admin__loading">Loading...</p>;

  return (
    <div>
      <div className="admin__stats">
        <div className="admin__stat">
          <div className="admin__stat-number">{data.clientCount}</div>
          <div className="admin__stat-label">Clients</div>
        </div>
        <div className="admin__stat">
          <div className="admin__stat-number">{data.playlistCount}</div>
          <div className="admin__stat-label">Playlists</div>
        </div>
        <div className="admin__stat">
          <div className="admin__stat-number">{data.contactCount}</div>
          <div className="admin__stat-label">Enquiries</div>
        </div>
      </div>

      <div className="admin__grid">
        <div>
          <h3>Recent Clients</h3>
          {data.recentClients.map((c) => (
            <div key={c._id} className="admin__item">
              <strong>{c.name}</strong>
              <span>{c.email}</span>
              {c.weddingDate && <span>Wedding: {c.weddingDate}</span>}
            </div>
          ))}
        </div>
        <div>
          <h3>Recent Enquiries</h3>
          {data.recentContacts.map((c) => (
            <div key={c._id} className="admin__item">
              <strong>{c.name}</strong>
              <span>{c.email}</span>
              <span className="admin__item-date">{new Date(c.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClientsTab() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const q = search ? `?search=${encodeURIComponent(search)}` : '';
    apiFetch(`/admin/clients${q}`).then(setClients).catch(() => {});
  }, [search]);

  const viewClient = async (id) => {
    if (expanded === id) { setExpanded(null); return; }
    const data = await apiFetch(`/admin/clients/${id}`);
    setClientData(data);
    setExpanded(id);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search clients..."
        className="admin__search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {clients.map((c) => (
        <div key={c._id} className="admin__card">
          <div className="admin__card-header" onClick={() => viewClient(c._id)}>
            <div>
              <strong>{c.name}</strong>
              <span className="admin__card-meta">{c.email} {c.phone && `| ${c.phone}`}</span>
            </div>
            <div className="admin__card-right">
              {c.spotifyId && <span className="admin__badge admin__badge--spotify">Spotify</span>}
              {c.weddingDate && <span className="admin__card-meta">Wedding: {c.weddingDate}</span>}
              <span className="admin__expand">{expanded === c._id ? '−' : '+'}</span>
            </div>
          </div>
          {expanded === c._id && clientData && (
            <div className="admin__card-body">
              {clientData.client.venue && <p><strong>Venue:</strong> {clientData.client.venue}</p>}
              <h4>Submitted Playlists ({clientData.playlists.length})</h4>
              {clientData.playlists.length === 0 ? (
                <p className="admin__muted">No playlists submitted yet.</p>
              ) : (
                clientData.playlists.map((pl) => (
                  <PlaylistCard key={pl._id} playlist={pl} />
                ))
              )}
            </div>
          )}
        </div>
      ))}
      {clients.length === 0 && <p className="admin__muted">No clients found.</p>}
    </div>
  );
}

function formatDuration(ms) {
  if (!ms) return '';
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function PlaylistCard({ playlist }) {
  const [open, setOpen] = useState(false);
  const tracks = playlist.tracks || [];

  const handleExport = (e) => {
    e.stopPropagation();
    fetch(`${API_URL}/admin/export/playlist/${playlist._id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${playlist.playlistName.replace(/[^a-zA-Z0-9 -]/g, '').trim()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="admin__playlist">
      <div className="admin__playlist-header" onClick={() => setOpen(!open)}>
        <span>{playlist.playlistName}</span>
        <span className="admin__card-meta">
          {tracks.length} tracks | {new Date(playlist.createdAt).toLocaleDateString()}
          {playlist.spotifyUrl && (
            <> | <a href={playlist.spotifyUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>Open in Spotify</a></>
          )}
          {tracks.length > 0 && (
            <> | <a href="#" onClick={handleExport}>Export CSV</a></>
          )}
        </span>
        <span className="admin__expand">{open ? '−' : '+'}</span>
      </div>
      {open && (
        <>
          {tracks.length > 0 && (
            <table className="admin__tracks">
              <thead>
                <tr><th>#</th><th>Track</th><th>Artist</th><th>Duration</th></tr>
              </thead>
              <tbody>
                {tracks.map((t, i) => (
                  <tr key={i}><td>{i + 1}</td><td>{t.name}</td><td>{t.artist}</td><td>{formatDuration(t.duration)}</td></tr>
                ))}
              </tbody>
            </table>
          )}
          {playlist.embedUrl && (
            <div style={{ padding: '1rem 0' }}>
              <iframe
                src={playlist.embedUrl}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={playlist.playlistName}
                style={{ borderRadius: '12px' }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function PlaylistsTab() {
  const [playlists, setPlaylists] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const q = search ? `?search=${encodeURIComponent(search)}` : '';
    apiFetch(`/admin/playlists${q}`).then(setPlaylists).catch(() => {});
  }, [search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by client or playlist name..."
        className="admin__search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {playlists.map((pl) => (
        <div key={pl._id} className="admin__card">
          <div className="admin__card-header">
            <div>
              <strong>{pl.playlistName}</strong>
              <span className="admin__card-meta">
                by {pl.userName || pl.userId?.name || 'Unknown'} ({pl.userEmail || pl.userId?.email || ''})
              </span>
            </div>
            <span className="admin__card-meta">{pl.tracks?.length || 0} tracks | {new Date(pl.createdAt).toLocaleDateString()}</span>
          </div>
          <PlaylistCard playlist={pl} />
        </div>
      ))}
      {playlists.length === 0 && <p className="admin__muted">No playlists submitted yet.</p>}
    </div>
  );
}

function SettingsTab() {
  const [s, setS] = useState(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);
  const [testTo, setTestTo] = useState('');
  const [testStatus, setTestStatus] = useState(null);

  useEffect(() => {
    apiFetch('/admin/settings').then((data) => {
      setS({
        ...data,
        smtpPass: '',
        adminNotifyEmailsText: (data.adminNotifyEmails || []).join(', '),
      });
    }).catch(() => {});
  }, []);

  const set = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setS((prev) => ({ ...prev, [field]: val }));
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const payload = {
        smtpHost: s.smtpHost || '',
        smtpPort: Number(s.smtpPort) || 587,
        smtpSecure: !!s.smtpSecure,
        smtpUser: s.smtpUser || '',
        mailFromAddress: s.mailFromAddress || '',
        mailFromName: s.mailFromName || '',
        adminNotifyEmails: (s.adminNotifyEmailsText || '')
          .split(/[,\s]+/).map((x) => x.trim()).filter(Boolean),
        customerEmailEnabled: !!s.customerEmailEnabled,
        siteName: s.siteName || '',
        siteUrl: s.siteUrl || '',
      };
      if (s.smtpPass) payload.smtpPass = s.smtpPass;

      const res = await fetch(`${API_URL}/admin/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Save failed');
      const data = await res.json();
      setS({
        ...data,
        smtpPass: '',
        adminNotifyEmailsText: (data.adminNotifyEmails || []).join(', '),
      });
      setStatus({ type: 'success', text: 'Settings saved.' });
    } catch (err) {
      setStatus({ type: 'error', text: err.message || 'Save failed.' });
    } finally {
      setSaving(false);
    }
  };

  const sendTest = async () => {
    setTestStatus({ type: 'info', text: 'Sending…' });
    try {
      const res = await fetch(`${API_URL}/admin/settings/test-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ to: testTo || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Send failed');
      setTestStatus({ type: 'success', text: 'Test email sent. Check the inbox (and spam).' });
    } catch (err) {
      setTestStatus({ type: 'error', text: err.message });
    }
  };

  if (!s) return <p className="admin__loading">Loading...</p>;

  const row = { display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1rem', alignItems: 'center', marginBottom: '1rem' };
  const input = { padding: '0.5rem 0.75rem', border: '1px solid #ddd', borderRadius: 4, width: '100%' };

  return (
    <form onSubmit={save} style={{ maxWidth: 720 }}>
      <h3 style={{ marginTop: 0 }}>SMTP transport</h3>
      <div style={row}><label>SMTP host</label><input style={input} value={s.smtpHost || ''} onChange={set('smtpHost')} placeholder="e.g. mail.stackmail.com" /></div>
      <div style={row}><label>Port</label><input style={input} type="number" value={s.smtpPort || ''} onChange={set('smtpPort')} placeholder="587" /></div>
      <div style={row}>
        <label>Secure (TLS)</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" checked={!!s.smtpSecure} onChange={set('smtpSecure')} />
          <span style={{ color: '#666', fontSize: '0.85rem' }}>Tick for port 465. Leave unticked for 587/STARTTLS.</span>
        </label>
      </div>
      <div style={row}><label>SMTP username</label><input style={input} value={s.smtpUser || ''} onChange={set('smtpUser')} /></div>
      <div style={row}>
        <label>SMTP password</label>
        <input style={input} type="password" value={s.smtpPass || ''} onChange={set('smtpPass')}
               placeholder={s.smtpPassSet ? '••••••• (leave blank to keep current)' : ''} />
      </div>

      <h3>From identity</h3>
      <div style={row}><label>From address</label><input style={input} value={s.mailFromAddress || ''} onChange={set('mailFromAddress')} placeholder="jan@qualityweddingdj.co.uk" /></div>
      <div style={row}><label>From name</label><input style={input} value={s.mailFromName || ''} onChange={set('mailFromName')} /></div>

      <h3>Notifications</h3>
      <div style={row}>
        <label>Admin notify emails</label>
        <input style={input} value={s.adminNotifyEmailsText || ''} onChange={set('adminNotifyEmailsText')}
               placeholder="jan@qualityweddingdj.co.uk, …" />
      </div>
      <div style={row}>
        <label>Send customer confirmations</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" checked={!!s.customerEmailEnabled} onChange={set('customerEmailEnabled')} />
          <span style={{ color: '#666', fontSize: '0.85rem' }}>Auto-reply to the person who submitted the form.</span>
        </label>
      </div>

      <h3>Site identity</h3>
      <div style={row}><label>Site name</label><input style={input} value={s.siteName || ''} onChange={set('siteName')} /></div>
      <div style={row}><label>Site URL</label><input style={input} value={s.siteUrl || ''} onChange={set('siteUrl')} /></div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1.5rem' }}>
        <button type="submit" className="btn btn--primary" disabled={saving}>
          {saving ? 'Saving…' : 'Save settings'}
        </button>
        {status && <span style={{ color: status.type === 'error' ? '#c00' : '#360' }}>{status.text}</span>}
      </div>

      <h3 style={{ marginTop: '2.5rem' }}>Send test email</h3>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <input style={{ ...input, maxWidth: 320 }} type="email" value={testTo} onChange={(e) => setTestTo(e.target.value)}
               placeholder="leave blank to send to yourself" />
        <button type="button" className="btn btn--outline" onClick={sendTest}>Send test</button>
      </div>
      {testStatus && <p style={{ color: testStatus.type === 'error' ? '#c00' : testStatus.type === 'success' ? '#360' : '#666', marginTop: '0.5rem' }}>{testStatus.text}</p>}
    </form>
  );
}

function ContactsTab() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => { apiFetch('/admin/contacts').then(setContacts).catch(() => {}); }, []);

  return (
    <div>
      {contacts.map((c) => (
        <div key={c._id} className="admin__card">
          <div className="admin__card-header">
            <div>
              <strong>{c.name}</strong>
              <span className="admin__card-meta">{c.email} {c.phone && `| ${c.phone}`}</span>
            </div>
            <span className="admin__card-meta">{new Date(c.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="admin__card-body">
            {c.venue && <p><strong>Venue:</strong> {c.venue}</p>}
            {c.date && <p><strong>Wedding Date:</strong> {c.date}</p>}
            <p>{c.message}</p>
          </div>
        </div>
      ))}
      {contacts.length === 0 && <p className="admin__muted">No enquiries yet.</p>}
    </div>
  );
}

export default function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('dashboard');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user || user.role !== 'admin') return null;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'clients', label: 'Clients' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'contacts', label: 'Enquiries' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <>
      <SEO title="Admin Dashboard" noindex />
      <div className="admin">
        <div className="admin__header">
          <h1>Admin Dashboard</h1>
          <p>Manage clients, playlists, and enquiries</p>
        </div>

        <div className="admin__tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`admin__tab ${tab === t.id ? 'admin__tab--active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="admin__content">
          {tab === 'dashboard' && <DashboardTab />}
          {tab === 'clients' && <ClientsTab />}
          {tab === 'playlists' && <PlaylistsTab />}
          {tab === 'contacts' && <ContactsTab />}
          {tab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </>
  );
}
