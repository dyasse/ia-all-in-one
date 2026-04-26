'use client';

import { useMemo, useState } from 'react';
import { Heart, MessageCircle, Plus, Settings, Share2 } from 'lucide-react';

type Episode = {
  id: string;
  title: string;
  show: string;
  creator: string;
  caption: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  gradient: string;
};

const episodes: Episode[] = [
  {
    id: 'ep-01',
    title: 'Episode 01 · New Campus',
    show: 'Seoul Hearts',
    creator: '@kori_studio',
    caption: 'Bidaya dial serie romantique f Seoul 💫',
    tags: ['#kdrama', '#romance', '#seoul'],
    likes: 12400,
    comments: 942,
    shares: 415,
    gradient: 'linear-gradient(160deg, #4338ca 0%, #0f172a 100%)'
  },
  {
    id: 'ep-02',
    title: 'Episode 02 · Secret Message',
    show: 'Seoul Hearts',
    creator: '@kori_studio',
    caption: 'Ach ghadi ykoun dak secret DM? 👀',
    tags: ['#kseries', '#viral', '#fyp'],
    likes: 23100,
    comments: 1722,
    shares: 901,
    gradient: 'linear-gradient(160deg, #be185d 0%, #111827 100%)'
  },
  {
    id: 'ep-03',
    title: 'Episode 03 · Rain Confession',
    show: 'Seoul Hearts',
    creator: '@kori_studio',
    caption: 'Scene ta7t cheta li tal3at trending ☔',
    tags: ['#kdramascene', '#love', '#series'],
    likes: 31980,
    comments: 2234,
    shares: 1488,
    gradient: 'linear-gradient(160deg, #0f766e 0%, #0f172a 100%)'
  }
];

function formatCount(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return String(value);
}

export default function Page() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const savedCount = useMemo(() => savedIds.length, [savedIds]);

  function toggleSave(id: string) {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  return (
    <main className="kori-shell">
      <header className="kori-topbar">
        <div className="kori-brand">
          <p className="kori-badge">KoriSeries</p>
          <h1>App web b7al TikTok l K-Drama</h1>
        </div>
        <div className="kori-controls">
          <p className="kori-stats">Saved episodes: {savedCount}</p>
          <button className="kori-login" onClick={() => setIsLoggedIn((prev) => !prev)}>
            {isLoggedIn ? 'Logged in' : 'Login'}
          </button>
          <button className="kori-settings" aria-label="Settings">
            <Settings size={16} />
          </button>
        </div>
      </header>

      <section className="feed" aria-label="Kori short series feed">
        {episodes.map((episode) => {
          const isSaved = savedIds.includes(episode.id);

          return (
            <article key={episode.id} className="episode" style={{ background: episode.gradient }}>
              <div className="overlay" />

              <div className="episode-body">
                <p className="show">{episode.show}</p>
                <h2>{episode.title}</h2>
                <p className="creator">{episode.creator}</p>
                <p className="caption">{episode.caption}</p>
                <p className="tags">{episode.tags.join(' ')}</p>
              </div>

              <aside className="actions">
                <button onClick={() => toggleSave(episode.id)} className={isSaved ? 'active' : ''}>
                  <Heart size={18} />
                  <span>{isSaved ? 'Saved' : formatCount(episode.likes)}</span>
                </button>
                <button>
                  <MessageCircle size={18} />
                  <span>{formatCount(episode.comments)}</span>
                </button>
                <button>
                  <Share2 size={18} />
                  <span>{formatCount(episode.shares)}</span>
                </button>
                <button>
                  <Plus size={18} />
                  <span>Follow</span>
                </button>
              </aside>
            </article>
          );
        })}
      </section>
    </main>
  );
}
