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
  ];

  return (
    <>
      <SEO title="Admin Dashboard" />
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
        </div>
      </div>
    </>
  );
}
