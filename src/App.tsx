import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { UserProfile } from './components/UserProfile';
import { StatsGrid } from './components/StatsGrid';
import { ComparisonGrid } from './components/ComparisonGrid';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { RadarStats } from './components/RadarStats';
import { AcePokemonCard } from './components/AcePokemonCard';
import type { ShowdownUserData, ReplayData, PlayerAnalytics } from './types';
import { Sparkles } from 'lucide-react';

function App() {
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [userData1, setUserData1] = useState<ShowdownUserData | null>(null);
  const [userData2, setUserData2] = useState<ShowdownUserData | null>(null);
  const [replays, setReplays] = useState<ReplayData[]>([]);
  const [analytics, setAnalytics] = useState<PlayerAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (username: string): Promise<ShowdownUserData> => {
    const sanitizedUsername = username.toLowerCase().replace(/[^a-z0-9]/g, '');
    const response = await fetch(`https://pokemonshowdown.com/users/${sanitizedUsername}.json`);
    if (!response.ok) throw new Error(`API error for ${username}.`);
    const text = await response.text();
    const cleanedText = text.startsWith(']') ? text.slice(1) : text;
    const data = JSON.parse(cleanedText);
    if (!data.username) throw new Error(`User ${username} not found.`);
    return data;
  };

  const handleSearch = async (user1: string, user2?: string) => {
    setIsLoading(true);
    setError(null);
    setUserData1(null);
    setUserData2(null);
    setReplays([]);
    setAnalytics(null);

    try {
      if (isCompareMode && user2) {
        const [data1, data2] = await Promise.all([fetchUser(user1), fetchUser(user2)]);
        setUserData1(data1);
        setUserData2(data2);
        const replayRes = await fetch(`https://replay.pokemonshowdown.com/search.json?user=${data1.userid}&user2=${data2.userid}`);
        if (replayRes.ok) setReplays(await replayRes.json());
      } else {
        const data1 = await fetchUser(user1);
        setUserData1(data1);
        const replayRes = await fetch(`https://replay.pokemonshowdown.com/search.json?user=${data1.userid}`);
        if (replayRes.ok) {
          const replayData = await replayRes.json();
          setReplays(replayData);
          // Auto-trigger a small scan for the single user
          performDeepScan(data1.userid, replayData.slice(0, 10));
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const performDeepScan = async (userid: string, scanReplays: ReplayData[]) => {
    if (scanReplays.length === 0) return;
    setIsScanning(true);
    
    try {
      const pokemonCounts: Record<string, number> = {};
      let totalTurns = 0;
      let winStreak = 0;
      let streakBroken = false;

      const results = await Promise.all(scanReplays.map(async (r) => {
        try {
          const res = await fetch(`https://replay.pokemonshowdown.com/${r.id}.json`);
          return res.ok ? await res.json() : null;
        } catch { return null; }
      }));

      results.forEach((data, idx) => {
        if (!data) return;
        const log = data.log || '';
        
        // Count Win Streak (from latest to oldest)
        const winMatch = log.match(/\|win\|([^|\n\r]+)/);
        const winner = winMatch ? winMatch[1].trim().toLowerCase().replace(/ /g, '') : '';
        if (!streakBroken) {
          if (winner === userid.toLowerCase()) winStreak++;
          else if (winner) streakBroken = true;
        }

        // Count Pokemon usage (p1/p2 switch logs)
        const p1 = data.p1?.toLowerCase().replace(/ /g, '') === userid.toLowerCase() ? 'p1' : 'p2';
        const switchRegex = new RegExp(`\\|switch\\|${p1}a: ([^|]+)\\|`, 'g');
        let match;
        while ((match = switchRegex.exec(log)) !== null) {
          const mon = match[1].split(',')[0];
          pokemonCounts[mon] = (pokemonCounts[mon] || 0) + 1;
        }

        // Count Turns
        const turnMatches = log.match(/\|turn\|(\d+)/g);
        if (turnMatches) {
          const lastTurn = parseInt(turnMatches[turnMatches.length - 1].split('|')[2]);
          totalTurns += lastTurn;
        }
      });

      const sortedPokemon = Object.entries(pokemonCounts).sort((a, b) => b[1] - a[1]);
      const avgTurns = Math.round(totalTurns / results.filter(r => r).length);
      
      let playstyle: PlayerAnalytics['playstyle'] = 'Balanced';
      if (avgTurns < 15) playstyle = 'Hyper Offense';
      else if (avgTurns < 25) playstyle = 'Offensive';
      else if (avgTurns > 45) playstyle = 'Stall';
      else if (avgTurns > 35) playstyle = 'Defensive';

      setAnalytics({
        acePokemon: sortedPokemon[0] ? { name: sortedPokemon[0][0], count: sortedPokemon[0][1] } : { name: 'Unknown', count: 0 },
        averageTurns: avgTurns || 0,
        playstyle,
        winStreak
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="app-container">
      <ThemeSwitcher />
      <header className={`header ${(userData1 || userData2) ? 'has-data' : ''}`}>
        <h1 className="title">Showdown Analytics <Sparkles size={32} className="sparkle-icon" /></h1>
        <p className="subtitle">Premium Competitive Insights</p>
      </header>

      <div className="search-container">
        <SearchBar 
          onSearch={handleSearch} 
          isLoading={isLoading} 
          isCompareMode={isCompareMode}
          onToggleCompare={() => {
            setIsCompareMode(!isCompareMode);
            setUserData1(null);
            setUserData2(null);
            setAnalytics(null);
          }}
        />
      </div>

      <main className="content-area">
        {isLoading && <div className="loading-spinner" />}
        {error && <div className="error-message animate-fade-in">{error}</div>}

        {!isCompareMode && userData1 && !isLoading && (
          <div className="single-user-dashboard animate-fade-in">
            <UserProfile user={userData1} />
            
            <div className="analytics-section">
              {analytics ? (
                <AcePokemonCard analytics={analytics} />
              ) : (
                <div className="glass-panel loading-placeholder">
                  {isScanning ? "Analyzing battle logs..." : "Search a user to see analytics"}
                </div>
              )}
              <RadarStats ratings={userData1.ratings} />
            </div>

            <StatsGrid ratings={userData1.ratings} />
          </div>
        )}

        {isCompareMode && userData1 && userData2 && !isLoading && (
          <ComparisonGrid user1={userData1} user2={userData2} replays={replays} />
        )}
      <footer className="footer animate-fade-in">
        <div className="footer-content">
          <p className="credit">Created by <span className="highlight">Shreyaas</span></p>
          <div className="footer-links">
            <a href="https://github.com/shreyaas5/pkmn-shdwn-stats" target="_blank" rel="noopener noreferrer" className="github-link">
              GitHub Repo
            </a>
          </div>
          <p className="disclaimer">
            This project is an unofficial fan tool. All Pokémon data and replay content are properties of Pokémon Showdown and Nintendo.
          </p>
        </div>
      </footer>
    </div>
  );
}


export default App;
