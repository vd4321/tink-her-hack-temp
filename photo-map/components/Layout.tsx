/*"use client";
import { useState } from "react";

const FILTERS = {
  type: ["😶‍🌫️Landscape", "Street", "Portrait", "Astro", "Aerial", "Reels"],
  vibe: ["Golden Hour", "Moody", "Minimal", "Urban", "Cinematic"],
  access: ["Easy", "Hike", "4WD", "Permit"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeChips, setActiveChips] = useState<Record<string, string[]>>({
    type: [], vibe: [], access: [],
  });
  const [crowd, setCrowd] = useState(5);
  const [activeHours, setActiveHours] = useState<number[]>([]);

  const HOURS = ["12A","1A","2A","3A","4A","5A","6A","7A","8A","9A","10A","11A",
                 "12P","1P","2P","3P","4P","5P","6P","7P","8P","9P","10P","11P"];
  const GOLDEN = [6, 7, 18, 19];
  const CROWD_LABELS = ["", "Quiet", "Low", "Moderate", "Busy", "Any"];

  const toggleChip = (group: string, val: string) => {
    setActiveChips((prev) => {
      const arr = prev[group];
      return {
        ...prev,
        [group]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val],
      };
    });
  };

  const toggleHour = (h: number) => {
    setActiveHours((prev) =>
      prev.includes(h) ? prev.filter((v) => v !== h) : [...prev, h]
    );
  };

  const reset = () => {
    setActiveChips({ type: [], vibe: [], access: [] });
    setCrowd(5);
    setActiveHours([]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'DM Sans', Arial, sans-serif", background: "#090d12", color: "#f0f4f8" }}>

      {}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: "56px", background: "rgba(9,13,18,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0, zIndex: 100 }}>
        <span style={{ fontWeight: 800, fontSize: "20px", letterSpacing: "-0.5px" }}>
          Spot<span style={{ color: "#e8ff47" }}>Lens</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#18232e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", padding: "6px 14px", width: "280px" }}>
          <span style={{ color: "#6b7f92" }}>🔍</span>
          <input placeholder="Search locations…" style={{ background: "none", border: "none", outline: "none", color: "#f0f4f8", fontSize: "13px", width: "100%" }} />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={outlineBtn}>Upload photo</button>
          <button style={solidBtn}>+Add Spot</button>
        </div>
      </nav>

      {}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {}
        <aside style={{ width: "300px", background: "#111820", borderRight: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "18px 20px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={panelTitle}>Filters</p>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", scrollbarWidth: "thin" }}>

            {}
            {Object.entries(FILTERS).map(([group, vals]) => (
              <div key={group} style={{ marginBottom: "24px" }}>
                <p style={groupLabel}>{group === "type" ? "Shot Type" : group === "vibe" ? "Vibe" : "Access"}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {vals.map((v) => (
                    <button key={v} onClick={() => toggleChip(group, v)}
                      style={activeChips[group].includes(v) ? activeChip : chip}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {}
            <div style={{ marginBottom: "24px" }}>
              <p style={groupLabel}>Crowd Level</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input type="range" min={1} max={5} value={crowd} onChange={(e) => setCrowd(+e.target.value)}
                  style={{ flex: 1, accentColor: "#e8ff47" }} />
                <span style={{ fontSize: "12px", color: "#e8ff47", fontWeight: 600, minWidth: "60px" }}>{CROWD_LABELS[crowd]}</span>
              </div>
            </div>

            {}
            <div style={{ marginBottom: "16px" }}>
              <p style={groupLabel}>Best Hour</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "4px" }}>
                {HOURS.map((h, i) => {
                  const isGolden = GOLDEN.includes(i);
                  const isActive = activeHours.includes(i);
                  return (
                    <button key={i} onClick={() => toggleHour(i)}
                      style={{
                        aspectRatio: "1", borderRadius: "4px", border: "1px solid transparent",
                        background: isActive ? (isGolden ? "#ff6b35" : "#e8ff47") : isGolden ? "rgba(255,107,53,0.2)" : "#18232e",
                        color: isActive ? (isGolden ? "#fff" : "#090d12") : isGolden ? "#ff6b35" : "#6b7f92",
                        fontSize: "9px", cursor: "pointer", fontWeight: isActive ? 700 : 400,
                        transition: "all .15s",
                      }}>
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {}
          <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#6b7f92" }}>
            <span>24 spots</span>
            <button onClick={reset} style={{ background: "none", border: "none", color: "#6b7f92", cursor: "pointer", fontSize: "12px" }}>
              Reset
            </button>
          </div>
        </aside>

        {}
        <main style={{ flex: 1, position: "relative" }}>
          {children}
        </main>

        {}
        <aside style={{ width: "300px", background: "#111820", borderLeft: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "18px 20px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={panelTitle}>Spot Details</p>
          </div>

          {}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#6b7f92", gap: "12px", padding: "20px", textAlign: "center" }}>
            <span style={{ fontSize: "40px" }}>📍</span>
            <p style={{ fontSize: "13px", lineHeight: 1.6 }}>Click any pin on the map to see location details, best hours, and photographer tips.</p>
          </div>
        </aside>

      </div>

      <style jsx global>{`
        * { box-sizing: border-box; }
        input[type=range] { -webkit-appearance: none; height: 4px; border-radius: 2px; background: #18232e; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #e8ff47; cursor: pointer; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #18232e; border-radius: 2px; }
      `}</style>
    </div>
  );
}

// ── Styles ──
const panelTitle: React.CSSProperties = { fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#6b7f92" };
const groupLabel: React.CSSProperties = { ...panelTitle, marginBottom: "10px" };
const chip: React.CSSProperties = { fontSize: "12px", fontWeight: 500, padding: "5px 11px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.07)", background: "#18232e", color: "#f0f4f8", cursor: "pointer", transition: "all .15s" };
const activeChip: React.CSSProperties = { ...chip, background: "#e8ff47", color: "#090d12", borderColor: "#e8ff47", fontWeight: 700 };
const outlineBtn: React.CSSProperties = { fontSize: "12px", fontWeight: 500, padding: "6px 14px", border: "1px solid rgba(255,255,255,0.07)", background: "none", color: "#f0f4f8", borderRadius: "6px", cursor: "pointer" };
const solidBtn: React.CSSProperties = { fontSize: "12px", fontWeight: 600, padding: "6px 16px", background: "#e8ff47", color: "#090d12", border: "none", borderRadius: "6px", cursor: "pointer" };
*/

"use client";
import { useSpots } from "@/lib/spots-context";

const FILTER_OPTIONS = {
  type: ["Landscape", "Street", "Portrait", "Astro", "Aerial", "Reels"],
  vibe: ["Golden Hour", "Moody", "▫Minimal", "Urban", "Cinematic"],
  access: ["Easy", "Hike", "4WD", "Permit"],
};

const HOURS = ["12A","1A","2A","3A","4A","5A","6A","7A","8A","9A","10A","11A",
               "12P","1P","2P","3P","4P","5P","6P","7P","8P","9P","10P","11P"];
const GOLDEN = [6, 7, 18, 19];
const CROWD_LABELS = ["", "Quiet", "Low", "Moderate", "Busy", "Any"];
const TYPE_COLORS: Record<string, string> = {
  Portrait: "#e8ff47", Landscape: "#5bffd8", Street: "#ff6b35",
  Aerial: "#a78bfa", Astro: "#60a5fa", Reels: "#f472b6",
};
const CROWD_TEXT: Record<number, string> = { 1:"Empty", 2:"Low", 3:"Moderate", 4:"Busy", 5:"Packed" };

export default function Layout({ children }: { children: React.ReactNode }) {
  const { filters, setFilters, visibleSpots, selectedSpot, setSelectedSpot, loading } = useSpots();

  const toggleChip = (group: "type" | "vibe" | "access", val: string) => {
    const arr = filters[group];
    setFilters({
      ...filters,
      [group]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val],
    });
  };

  const toggleHour = (h: number) => {
    setFilters({
      ...filters,
      hours: filters.hours.includes(h)
        ? filters.hours.filter((v) => v !== h)
        : [...filters.hours, h],
    });
  };

  const reset = () =>
    setFilters({ type: [], vibe: [], access: [], crowd: 5, hours: [], search: "" });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh",
      fontFamily: "'DM Sans', Arial, sans-serif", background: "#090d12", color: "#f0f4f8" }}>

      {/* ── NAVBAR ── */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: "56px", background: "rgba(9,13,18,0.92)",
        backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)",
        flexShrink: 0, zIndex: 100 }}>
        <span style={{ fontWeight: 800, fontSize: "20px", letterSpacing: "-0.5px" }}>
          Spot<span style={{ color: "#e8ff47" }}>Lens</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#18232e",
          border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", padding: "6px 14px", width: "280px" }}>
          <span style={{ color: "#6b7f92" }}>🔍</span>
          <input
            placeholder="Search locations…"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            style={{ background: "none", border: "none", outline: "none",
              color: "#f0f4f8", fontSize: "13px", width: "100%" }}
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={outlineBtn}>Log in</button>
          <button style={solidBtn}>Share a Spot</button>
        </div>
      </nav>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* ── LEFT FILTER SIDEBAR ── */}
        <aside style={{ width: "300px", background: "#111820",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "18px 20px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={panelTitle}>Filters</p>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
            {(Object.entries(FILTER_OPTIONS) as ["type"|"vibe"|"access", string[]][]).map(([group, vals]) => (
              <div key={group} style={{ marginBottom: "24px" }}>
                <p style={groupLabel}>
                  {group === "type" ? "Shot Type" : group === "vibe" ? "Vibe" : "Access"}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {vals.map((v) => (
                    <button key={v} onClick={() => toggleChip(group, v)}
                      style={filters[group].includes(v) ? activeChip : chip}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Crowd Slider */}
            <div style={{ marginBottom: "24px" }}>
              <p style={groupLabel}>Crowd Level</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input type="range" min={1} max={5} value={filters.crowd}
                  onChange={(e) => setFilters({ ...filters, crowd: +e.target.value })}
                  style={{ flex: 1, accentColor: "#e8ff47" }} />
                <span style={{ fontSize: "12px", color: "#e8ff47", fontWeight: 600, minWidth: "60px" }}>
                  {CROWD_LABELS[filters.crowd]}
                </span>
              </div>
            </div>

            {/* Hour Grid */}
            <div style={{ marginBottom: "16px" }}>
              <p style={groupLabel}>Best Hour</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "4px" }}>
                {HOURS.map((h, i) => {
                  const isGolden = GOLDEN.includes(i);
                  const isActive = filters.hours.includes(i);
                  return (
                    <button key={i} onClick={() => toggleHour(i)} style={{
                      aspectRatio: "1", borderRadius: "4px", border: "1px solid transparent",
                      background: isActive ? (isGolden ? "#ff6b35" : "#e8ff47") : isGolden ? "rgba(255,107,53,0.2)" : "#18232e",
                      color: isActive ? (isGolden ? "#fff" : "#090d12") : isGolden ? "#ff6b35" : "#6b7f92",
                      fontSize: "9px", cursor: "pointer", fontWeight: isActive ? 700 : 400,
                      transition: "all .15s",
                    }}>
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontSize: "12px", color: "#6b7f92" }}>
            <span>{loading ? "Loading…" : `${visibleSpots.length} spots`}</span>
            <button onClick={reset} style={{ background: "none", border: "none",
              color: "#6b7f92", cursor: "pointer", fontSize: "12px" }}>Reset</button>
          </div>
        </aside>

        {/* ── MAP ── */}
        <main style={{ flex: 1, position: "relative" }}>{children}</main>

        {/* ── RIGHT DETAIL SIDEBAR ── */}
        <aside style={{ width: "300px", background: "#111820",
          borderLeft: "1px solid rgba(255,255,255,0.07)",
          display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "18px 20px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={panelTitle}>Spot Details</p>
          </div>

          {selectedSpot ? (
            <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
              {/* Close */}
              <button onClick={() => setSelectedSpot(null)}
                style={{ background: "none", border: "none", color: "#6b7f92",
                  cursor: "pointer", fontSize: "12px", marginBottom: "16px", padding: 0 }}>
                ← Back
              </button>

              {/* Emoji header */}
              <div style={{ fontSize: "48px", background: (TYPE_COLORS[selectedSpot.type] ?? "#e8ff47") + "18",
                borderRadius: "16px", padding: "20px", textAlign: "center", marginBottom: "16px" }}>
                {selectedSpot.emoji}
              </div>

              <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>
                {selectedSpot.name}
              </h2>
              <p style={{ fontSize: "12px", color: "#6b7f92", marginBottom: "14px" }}>
                📍 {selectedSpot.loc}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                {[selectedSpot.type, selectedSpot.vibe, selectedSpot.access].map((tag) => (
                  <span key={tag} style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "20px",
                    background: (TYPE_COLORS[tag] ?? "#18232e") + "22",
                    color: TYPE_COLORS[tag] ?? "#f0f4f8",
                    border: `1px solid ${TYPE_COLORS[tag] ?? "rgba(255,255,255,0.07)"}44` }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "16px" }}>
                {[
                  { label: "Rating", val: `⭐ ${selectedSpot.rating}` },
                  { label: "Crowd", val: CROWD_TEXT[selectedSpot.crowd] },
                  { label: "Best At", val: HOURS[selectedSpot.bestHour] },
                ].map(({ label, val }) => (
                  <div key={label} style={{ background: "#18232e", borderRadius: "8px",
                    padding: "10px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700 }}>{val}</div>
                    <div style={{ fontSize: "10px", color: "#6b7f92", marginTop: "2px" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Tip */}
              <div style={{ background: "#18232e", borderRadius: "10px", padding: "14px",
                borderLeft: "3px solid #e8ff47" }}>
                <p style={{ fontSize: "11px", color: "#6b7f92", marginBottom: "6px", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "1px" }}>📸 Pro Tip</p>
                <p style={{ fontSize: "13px", lineHeight: 1.6 }}>{selectedSpot.tip}</p>
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", color: "#6b7f92", gap: "12px", padding: "20px", textAlign: "center" }}>
              <span style={{ fontSize: "40px" }}>📍</span>
              <p style={{ fontSize: "13px", lineHeight: 1.6 }}>
                Click any pin on the map to see location details, best hours, and photographer tips.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

const panelTitle: React.CSSProperties = { fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#6b7f92" };
const groupLabel: React.CSSProperties = { ...panelTitle, marginBottom: "10px" };
const chip: React.CSSProperties = { fontSize: "12px", fontWeight: 500, padding: "5px 11px", borderRadius: "20px", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.07)", background: "#18232e", color: "#f0f4f8", cursor: "pointer", transition: "all .15s" };
const activeChip: React.CSSProperties = { ...chip, background: "#e8ff47", color: "#090d12", borderColor: "#e8ff47", fontWeight: 700 };
const outlineBtn: React.CSSProperties = { fontSize: "12px", fontWeight: 500, padding: "6px 14px", border: "1px solid rgba(255,255,255,0.07)", background: "none", color: "#f0f4f8", borderRadius: "6px", cursor: "pointer" };
const solidBtn: React.CSSProperties = { fontSize: "12px", fontWeight: 600, padding: "6px 16px", background: "#e8ff47", color: "#090d12", border: "none", borderRadius: "6px", cursor: "pointer" };