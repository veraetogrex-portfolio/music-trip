// VECTOR Music · trip prep — zero dependencies.
// <section class="vm"></section> becomes the whole app: home, album, downloads, player.
// The album downloads track by track: each waveform fills with amber, the row gets a check,
// the counter on the right goes 0 → 12. Offline mode dims what is not on this Mac.
;(() => {
  'use strict';

  const svg = (d, o = {}) => `<svg width="${o.s || 18}" height="${o.s || 18}" viewBox="0 0 24 24" fill="${o.fill || 'none'}" stroke="${o.fill ? 'none' : 'currentColor'}" stroke-width="${o.w || 1.8}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const P = {
    home: '<path d="M3 10.5 12 3l9 7.5V21h-6v-7H9v7H3z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    lib: '<path d="M4 4v16M9 4v16M14 4l6 16"/>',
    dl: '<path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14"/>',
    dlc: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v8m0 0-3-3m3 3 3-3"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    back: '<path d="m15 5-7 7 7 7"/>', fwd: '<path d="m9 5 7 7-7 7"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0"/>',
    plane: '<path d="M10.5 3.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V9l7.5 4.5v2l-7.5-2.3V18l2.5 2v1.5L12 20.5l-4 1V20l2.5-2v-4.8L3 15.5v-2L10.5 9z"/>',
    play: '<path d="M8 5.5v13l11-6.5z"/>', pause: '<path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/>',
    prev: '<path d="M18 6v12L9 12zM6 6h2v12H6z"/>', next: '<path d="M6 6v12l9-6zM16 6h2v12h-2z"/>',
    shuffle: '<path d="M3 7h3.5c2 0 3.2 1 4.3 2.6l2.4 3.8C14.3 15 15.5 16 17.5 16H21M3 16h3.5c1.4 0 2.4-.5 3.2-1.3M14.3 8.3c.8-.8 1.8-1.3 3.2-1.3H21M18.5 4.5 21 7l-2.5 2.5M18.5 13.5 21 16l-2.5 2.5"/>',
    repeat: '<path d="M4 11V9a3 3 0 0 1 3-3h12m-3-3 3 3-3 3M20 13v2a3 3 0 0 1-3 3H5m3 3-3-3 3-3"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    more: '<circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
    mac: '<path d="M5 6h14v9H5zM3 18h18"/>', queue: '<path d="M4 6h12M4 11h12M4 16h7M17 14v6l4-3z"/>',
    vol: '<path d="M4 10v4h3.5L12 18V6L7.5 10zM15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    down: '<path d="m6 9 6 6 6-6"/>', logo: '<path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2"/>',
  };

  const ALBUM = {
    title: 'Low Tide Hours', artist: 'Mara Kessel', year: 2026, mb: 112,
    tracks: [
      ['Harbor Lights', '3:42', '2,184,903'], ['Salt on the Window', '4:05', '1,730,442'],
      ['Low Tide Hours', '3:58', '3,402,117'], ['Paper Lanterns', '3:21', '986,205'],
      ['Night Ferry', '4:47', '1,215,830'], ['Glass Shore', '3:36', '804,519'],
      ['Tram 28', '4:12', '1,092,377'], ['Blue Hour Pier', '3:49', '741,066'],
      ['Quiet Engines', '4:20', '612,948'], ['Ferry Lights Again', '3:33', '558,301'],
      ['Far Coast', '4:31', '497,720'], ['Homeward', '4:08', '903,164'],
    ],
  };
  const LISTS = [
    ['c-dune', 'Lisbon, Friday', 31, true], ['c-sun', 'Slow Mornings', 48, false], ['c-ember', 'Run 5K', 22, false],
    ['c-ink', 'Late Train Home', 40, false], ['c-moss', 'Deep Focus', 65, false],
  ];
  const TRIP = [['c-low', 'Low Tide Hours', 'Mara Kessel · Album', '48 min', true],
    ['c-dune', 'Lisbon, Friday', 'Your playlist · on this Mac', '1 h 54 min', false],
    ['c-tide', 'Glass Weather', 'Tomas Vale · Album', '41 min', false]];
  const SHELF = [['c-neon', 'Night Signals', 'June Arlo'], ['c-tide', 'Glass Weather', 'Tomas Vale'], ['c-rose', 'Paper Moons', 'Nadia Orr'],
    ['c-mono', 'Mono Days', 'Ines Barro', true], ['c-sun', 'Slow Mornings', 'Playlist'], ['c-ember', 'Run 5K', 'Playlist']];
  const PODS = [['c-plum', 'The Long Layover', 'Ep. 31 · Packing light · 38 min'], ['c-dune', 'Small Cities', 'Ep. 12 · Lisbon by tram · 44 min'],
    ['c-moss', 'Quiet Hours', 'Ep. 7 · Sleeping on planes · 26 min']];
  const FRIENDS = [['a2', 'DK', 'Daria K.', 'Glass Shore · Mara Kessel', 'now'], ['a3', 'OV', 'Oskar V.', 'Night Signals · June Arlo', '12 min'],
    ['a4', 'LM', 'Lea M.', 'Paper Moons · Nadia Orr', '1 h'], ['a1', 'RB', 'Ruben B.', 'Tram 28 · Mara Kessel', '3 h']];
  const WEEK = [['M', 28], ['T', 40], ['W', 22], ['T', 46], ['F', 34], ['S', 52], ['S', 38]];
  const FANS = [['a2', 'JA', 'June Arlo'], ['a3', 'TV', 'Tomas Vale'], ['a4', 'NO', 'Nadia Orr']];
  const ON_MAC = [['c-dune', 'Lisbon, Friday', 'Playlist · 31 songs · 288 MB'], ['c-mono', 'Mono Days', 'Album · 10 songs · 100 MB'],
    ['c-plum', 'The Long Layover', 'Podcast · Ep. 31 · 36 MB']];
  const MORE = [['c-tide', 'Glass Weather', 'Tomas Vale · Album · 41 min'], ['c-neon', 'Night Signals', 'June Arlo · Album · 52 min'],
    ['c-dune', 'Small Cities', 'Podcast · Ep. 12 · Lisbon by tram · 44 min'], ['c-rose', 'Paper Moons', 'Nadia Orr · Album · 37 min']];
  const BEFORE_MB = 424;   // what is already on this Mac before the album

  // every track has its own waveform: deterministic noise by track number, louder in the middle
  function wave(i) {
    let out = '';
    for (let j = 0; j < 44; j++) {
      const v = Math.abs(Math.sin((j + 1) * (0.55 + i * 0.07)) * 0.6 + Math.sin((j + 3) * 0.21 + i) * 0.4);
      const env = Math.sin(Math.PI * (j + 0.5) / 44) * 0.55 + 0.45;
      out += `<i style="height:${Math.round(4 + 19 * v * env)}px"></i>`;
    }
    return out;
  }
  const cover = (c, w, extra = '') => `<span class="cv ${c}" style="width:${w}px;height:${w}px"${extra}></span>`;
  const av = (a, i, s) => `<span class="av ${a}" style="width:${s}px;height:${s}px;font-size:${Math.round(s / 3)}px">${i}</span>`;

  function template() {
    const T = ALBUM.tracks;
    return `
<nav class="vm-side" aria-label="Library">
  <p class="vm-brand"><span class="vm-logo">${svg(P.logo, { s: 16, w: 2.4 })}</span>VECTOR <span>Music</span></p>
  <div class="vm-nav">
    <button class="vm-nav-i" data-go="home" type="button">${svg(P.home)}Home</button>
    <button class="vm-nav-i" type="button">${svg(P.search)}Search</button>
    <button class="vm-nav-i" data-go="album" type="button">${svg(P.lib)}Library</button>
    <button class="vm-nav-i" data-go="downloads" type="button">${svg(P.dl)}Downloads<span class="vm-badge num" data-badge>3</span></button>
  </div>
  <div class="vm-lists">
    <p class="vm-sec-h">Playlists<span>Recent</span></p>
    ${LISTS.map(([c, t, n, off]) => `<a class="vm-pl${off ? '' : ' is-online-only'}" href="#">${cover(c, 38)}<b>${t}<small>Playlist · ${n} songs</small></b>${off ? svg(P.dl, { s: 14, w: 2.2 }) : ''}</a>`).join('')}
  </div>
  <div class="vm-store"><p><span>This Mac</span><span>18.4 GB free</span></p><span class="vm-meter"><i style="width:1%;background:var(--amber)"></i><i style="width:92%;background:#4A4D5C"></i></span><small>Music downloads · <span class="num" data-side-mb>${BEFORE_MB} MB</span></small></div>
</nav>

<main class="vm-main">
  <header class="vm-top">
    <button class="vm-ib dark" type="button" aria-label="Back">${svg(P.back, { w: 2 })}</button>
    <button class="vm-ib dark" type="button" aria-label="Forward">${svg(P.fwd, { w: 2 })}</button>
    <label class="vm-search">${svg(P.search, { s: 16, w: 2 })}<input aria-label="Search" placeholder="Search artists, songs, podcasts"></label>
    <button class="vm-off" type="button" data-offline aria-pressed="false">Offline mode<span class="vm-tg"></span></button>
    <button class="vm-ib" type="button" aria-label="Notifications">${svg(P.bell)}</button>
    <span role="img" aria-label="Ilya Sorin">${av('a5', 'IS', 32)}</span>
  </header>
  <p class="vm-banner" role="status">${svg(P.plane, { s: 16, fill: 'currentColor' })}You're offline. Everything with an arrow plays from this Mac.<span>AMS → LIS · lands 14:40</span></p>

  <section class="vm-view vm-home" data-view="home" aria-label="Home">
    <div class="vm-col">
      <div class="vm-greet"><h1>Good evening, Ilya</h1><button class="vm-chip is-on" type="button">All</button><button class="vm-chip" type="button">Music</button><button class="vm-chip" type="button">Podcasts</button><button class="vm-chip" type="button">Downloaded</button></div>
      <div class="vm-hero">
        <div class="vm-hero-l">
          <p class="vm-trip-k">${svg(P.plane, { s: 15, fill: 'currentColor' })}Friday, 27 Nov · AMS 12:45 → LIS 14:40</p>
          <h2>Music for your flight</h2>
          <p>2 h 55 min in the air and no Wi-Fi on board. Download what you want to hear before you leave.</p>
          <div class="vm-hero-a"><button class="vm-btn amber" type="button" data-go="album">${svg(P.dl, { s: 16, w: 2.2 })}Prepare for the flight</button><button class="vm-btn ghost" type="button">Pick myself</button></div>
        </div>
        <div class="vm-trip"><p class="vm-cap">Suggested for the trip</p>
          ${TRIP.map(([c, t, s, m, hot]) => `<button class="vm-trip-i${hot ? ' is-hot' : ''}" type="button"${hot ? ' data-go="album" data-trip' : ''}>${cover(c, 36, ' style="border-radius:5px"')}<b>${t}<small>${s}</small></b><em>${m}</em></button>`).join('')}
        </div>
      </div>
      <div><p class="vm-h3">Jump back in<a href="#">Show all</a></p>
        <div class="vm-shelf">${SHELF.map(([c, t, s, off]) => `<a class="vm-alb${off ? '' : ' is-online-only'}" href="#"><span class="cv ${c}"></span><b>${t}</b><small>${s}</small></a>`).join('')}</div></div>
      <div><p class="vm-h3">Podcasts for the flight</p>
        <div class="vm-pods">${PODS.map(([c, t, s]) => `<a class="vm-pod is-online-only" href="#">${cover(c, 64)}<b>${t}<small>${s}</small></b><span class="vm-dlc">${svg(P.dlc, { s: 20, w: 1.6 })}</span></a>`).join('')}</div></div>
    </div>
    <aside class="vm-rail">
      <div class="vm-card" style="padding:16px 18px"><p class="vm-card-h" style="margin-bottom:8px">Friends are listening<a href="#">See all</a></p>
        ${FRIENDS.map(([a, i, n, s, t]) => `<a class="vm-friend" href="#"><span class="av ${a}${t === 'now' ? ' live' : ''}" style="width:36px;height:36px;font-size:12px">${i}</span><b>${n}<small>${s}</small></b><em class="${t === 'now' ? 'now' : ''}">${t}</em></a>`).join('')}
      </div>
      <div class="vm-card" style="padding:16px 18px"><p class="vm-card-h">Your week<span>16–22 Nov</span></p><p class="vm-week-n">14 h 20 min</p>
        <div class="vm-week">${WEEK.map(([d, h], k) => `<span class="${k === 6 ? 'today' : ''}"><i style="height:${h}px"></i>${d}</span>`).join('')}</div></div>
    </aside>
  </section>

  <section class="vm-view vm-album" data-view="album" aria-label="Album">
    <div class="vm-col">
      <div class="vm-ahead">
        <span class="cv c-low vm-acover"><span class="vm-pin" role="img" aria-label="On this Mac">${svg(P.dl, { s: 15, w: 2.6 })}</span></span>
        <div class="vm-ainfo">
          <p class="vm-cap">Album</p>
          <h1>${ALBUM.title}</h1>
          <p class="vm-meta">${av('a1', 'MK', 22)}<a href="#">${ALBUM.artist}</a><span>·</span><span>${ALBUM.year}</span><span>·</span><span>12 songs, 48 min</span></p>
          <div class="vm-acts">
            <button class="vm-play" type="button" aria-label="Play album" data-play="0">${svg(P.play, { s: 20, fill: 'currentColor' })}</button>
            <button class="vm-dl" type="button" data-download><span class="vm-dl-ic">${svg(P.dl, { s: 16, w: 2.2 })}</span><span class="vm-dl-ring"></span><span class="vm-dl-ok">${svg(P.check, { s: 16, w: 2.4 })}</span><span data-dl-label>Download album</span></button>
            <button class="vm-ib" type="button" aria-label="Shuffle">${svg(P.shuffle, { s: 19 })}</button>
            <button class="vm-ib" type="button" aria-label="Save to library">${svg(P.heart, { s: 19 })}</button>
            <button class="vm-ib" type="button" aria-label="More">${svg(P.more, { s: 19, fill: 'currentColor' })}</button>
          </div>
        </div>
      </div>
      <div class="vm-table">
        <p class="vm-thead"><span>#</span><span>Title</span><span>Waveform</span><span class="r">Plays</span><span role="img" aria-label="Length">${svg(P.clock, { s: 14, w: 2 })}</span><span></span></p>
        <ul>${T.map(([t, d, p], i) => `<li><button class="vm-row" type="button" data-row="${i}" aria-label="Play ${t}">
          <span class="n num">${i + 1}</span><span class="t">${t}</span>
          <span class="vm-wave" aria-hidden="true"><span class="vm-wave-l">${wave(i)}</span><span class="vm-wave-l vm-wave-fill">${wave(i)}</span></span>
          <span class="r num">${p}</span><span class="d num">${d}</span>
          <span class="vm-st"><span class="vm-dlc">${svg(P.dlc, { s: 20, w: 1.6 })}</span><span class="ring"></span><span class="ok">${svg(P.check, { s: 12, w: 3 })}</span></span>
        </button></li>`).join('')}</ul>
      </div>
    </div>
    <aside class="vm-rail">
      <div class="vm-card">
        <p class="vm-card-h">On this Mac<span>${svg(P.mac)}</span></p>
        <p class="vm-count"><b class="num" data-count>0</b><span>of 12 songs offline</span></p>
        <p class="vm-segs" aria-hidden="true">${T.map(() => '<i></i>').join('')}</p>
        <p class="vm-count-m"><span class="num" data-mb>0 MB of ${ALBUM.mb} MB</span><span data-eta>about 1 min on Wi-Fi</span></p>
        <p class="vm-rule"></p>
        <p class="vm-opt">High quality · 320 kbps<span class="vm-sw on"></span></p>
        <p class="vm-opt">Remove after 30 days unplayed<span class="vm-sw"></span></p>
      </div>
      <div class="vm-card vm-artist">
        <p class="vm-artist-h">${av('a1', 'MK', 60)}<b>${ALBUM.artist}<small>1.2M monthly listeners</small></b></p>
        <p>Songwriter from Porto. Recorded the album on night shifts at the harbour radio.</p>
        <button class="vm-follow" type="button">Following</button>
      </div>
      <div class="vm-fans"><p class="vm-cap">Fans also like</p>
        ${FANS.map(([a, i, n]) => `<a class="vm-fan" href="#">${av(a, i, 36)}<b>${n}<small>Artist</small></b></a>`).join('')}</div>
    </aside>
  </section>

  <section class="vm-view vm-dls" data-view="downloads" aria-label="Downloads">
    <div class="vm-col">
      <div class="vm-dhead"><div><h1>Downloads</h1><span class="num" data-dl-sum>3 items · 3 h 13 min · ${BEFORE_MB} MB on this Mac</span></div>
        <button class="vm-chip is-on" type="button">All</button><button class="vm-chip" type="button">Albums</button><button class="vm-chip" type="button">Playlists</button><button class="vm-chip" type="button">Podcasts</button>
        <button class="vm-chip" type="button" style="display:flex;align-items:center;gap:6px">Recently added${svg(P.down, { s: 12, w: 2.4 })}</button></div>
      <div class="vm-ready">
        <p class="vm-ready-h"><i>${svg(P.check, { s: 13, w: 3 })}</i><span style="margin:0;color:inherit;font-weight:600;font-size:14px" data-ready-t>Ready for Friday's flight</span><span data-ready-m>4 h 01 min offline · flight 2 h 55 min</span></p>
        <p class="vm-ready-bar"><i></i></p>
        <p class="vm-ready-m"><span style="left:0">AMS 12:45</span><span style="left:69%">LIS 14:40</span><span style="right:0">+1 h 06 min spare</span></p>
      </div>
      <div class="vm-grid" data-grid>
        <a class="vm-item is-new" href="#" data-go="album" data-new hidden><span class="cv c-low"><span class="tag">Just added</span></span><span class="vm-item-t"><b>${ALBUM.title}<small>Album · 12 songs · ${ALBUM.mb} MB</small></b>${svg(P.dl, { s: 16, w: 2.2 })}</span></a>
        ${ON_MAC.map(([c, t, s]) => `<a class="vm-item" href="#"><span class="cv ${c}"></span><span class="vm-item-t"><b>${t}<small>${s}</small></b>${svg(P.dl, { s: 16, w: 2.2 })}</span></a>`).join('')}
      </div>
      <div><p class="vm-h3" style="font-size:16px">More for the trip<span>Based on Low Tide Hours</span></p>
        <div class="vm-more">${MORE.map(([c, t, s]) => `<a class="vm-pod is-online-only" href="#">${cover(c, 60)}<b>${t}<small>${s}</small></b><span class="vm-dlc">${svg(P.dlc, { s: 20, w: 1.6 })}</span></a>`).join('')}</div></div>
    </div>
    <aside class="vm-rail">
      <div class="vm-card"><p class="vm-card-h">Storage on this Mac<span>${svg(P.mac)}</span></p>
        <p class="vm-big"><b>18.4 GB</b>free of 256 GB</p>
        <p class="vm-stack"><i style="width:2%;background:var(--amber)"></i><i style="width:24%;background:#6A6E80"></i><i style="width:66%;background:#44475A"></i></p>
        <div class="vm-legend"><p><i style="background:var(--amber)"></i>Music downloads<span class="num" data-legend-mb>${BEFORE_MB} MB</span></p><p><i style="background:#6A6E80"></i>Apps<span class="num">61.2 GB</span></p><p><i style="background:#44475A"></i>Documents and other<span class="num">175.9 GB</span></p></div></div>
      <div class="vm-card vm-sets">
        <p class="vm-set"><b>High quality<small>320 kbps · about 9 MB a song</small></b><span class="vm-sw on"></span></p>
        <p class="vm-set"><b>Download over hotspot<small>Uses your phone data</small></b><span class="vm-sw"></span></p>
        <p class="vm-set"><b>New episodes<small>Download automatically</small></b><span class="vm-sw on"></span></p>
        <p class="vm-set"><b>Remove after 30 days<small>Only if not played</small></b><span class="vm-sw"></span></p>
      </div>
    </aside>
  </section>
</main>

<footer class="vm-player">
  <div class="vm-np"><span class="cv c-sun" data-np-c></span><b><span data-np-t>Kettle Song</span><small data-np-a>June Arlo</small><em class="vm-np-off">${svg(P.plane, { s: 12, fill: 'currentColor' })}Offline · from this Mac</em></b><button class="vm-ib" type="button" aria-label="Like">${svg(P.heart, { s: 17 })}</button></div>
  <div class="vm-ctl">
    <div class="vm-ctl-b"><button class="vm-ib" type="button" aria-label="Shuffle">${svg(P.shuffle, { s: 17 })}</button><button class="vm-ib" type="button" aria-label="Previous" style="color:var(--text)">${svg(P.prev, { fill: 'currentColor' })}</button>
      <button class="main" type="button" aria-label="Play or pause" data-toggle><span class="playi">${svg(P.play, { s: 16, fill: 'currentColor' })}</span><span class="pause">${svg(P.pause, { s: 16, fill: 'currentColor' })}</span></button>
      <button class="vm-ib" type="button" aria-label="Next" style="color:var(--text)">${svg(P.next, { fill: 'currentColor' })}</button><button class="vm-ib" type="button" aria-label="Repeat">${svg(P.repeat, { s: 17 })}</button></div>
    <p class="vm-prog num"><span data-np-pos>2:04</span><i><b data-np-bar style="width:64%"></b></i><span data-np-dur>3:15</span></p>
  </div>
  <div class="vm-vol"><button class="vm-ib" type="button" aria-label="Queue">${svg(P.queue, { s: 17 })}</button><button class="vm-ib here" type="button" aria-label="Playing on This Mac">${svg(P.mac, { s: 17 })}</button>${svg(P.vol, { s: 17 })}<i><b></b></i></div>
</footer>`;
  }

  class MusicApp {
    constructor(root) {
      this.root = root;
      root.innerHTML = template();
      const q = s => root.querySelector(s);
      this.rows = [...root.querySelectorAll('[data-row]')];
      this.segs = [...root.querySelectorAll('.vm-segs i')];
      this.el = { count: q('[data-count]'), mb: q('[data-mb]'), eta: q('[data-eta]'), label: q('[data-dl-label]'), dl: q('[data-download]'),
        badge: q('[data-badge]'), sideMb: q('[data-side-mb]'), legendMb: q('[data-legend-mb]'), sum: q('[data-dl-sum]'), added: q('[data-new]'),
        off: q('[data-offline]'), tg: q('.vm-tg'), npC: q('[data-np-c]'), npT: q('[data-np-t]'), npA: q('[data-np-a]'),
        npPos: q('[data-np-pos]'), npDur: q('[data-np-dur]'), npBar: q('[data-np-bar]') };
      root.addEventListener('click', e => {
        const go = e.target.closest('[data-go]'), row = e.target.closest('[data-row]');
        if (e.target.closest('a[href="#"]')) e.preventDefault();
        if (e.target.closest('[data-download]')) this.download();
        else if (e.target.closest('[data-offline]')) this.setOffline(!this.offline);
        else if (e.target.closest('[data-toggle]')) this.root.classList.toggle('is-playing');
        else if (row) this.play(+row.dataset.row);
        else if (e.target.closest('[data-play]')) this.play(0);
        else if (go) this.go(go.dataset.go);
      });
      this.reset();
    }

    go(view, quiet = false) {   // quiet: no entrance fade, so the first frame of the screen is already whole
      this.root.dataset.view = view;
      this.root.querySelectorAll('.vm-view').forEach(v => {
        v.classList.toggle('is-on', v.dataset.view === view);
        v.classList.toggle('is-enter', v.dataset.view === view && !quiet);
      });
      this.root.querySelectorAll('.vm-nav-i').forEach(n => n.classList.toggle('is-on', n.dataset.go === view));
    }

    // the cascade: track i starts STAGGER ms after track i-1 and fills in FILL ms,
    // so the next wave is already pouring while the previous one is finishing
    download() {
      if (this.root.dataset.dl !== 'idle') return;
      this.root.dataset.dl = 'going';
      const STAGGER = 260, FILL = 620, t0 = performance.now(), n = this.rows.length;
      const tick = now => {
        const t = now - t0;
        let done = 0, got = 0;
        this.rows.forEach((row, i) => {
          const f = Math.min(1, Math.max(0, (t - i * STAGGER) / FILL));
          row.style.setProperty('--fill', f);
          row.style.setProperty('--deg', `${f * 360}deg`);
          row.classList.toggle('is-going', f > 0 && f < 1);
          row.classList.toggle('is-done', f === 1);
          this.segs[i].className = f === 1 ? 'on' : f > 0 ? 'half' : '';
          if (f === 1) done++;
          got += f;
        });
        this.count(done, got);
        if (done < n) this.raf = requestAnimationFrame(tick);
        else this.finish();
      };
      this.raf = requestAnimationFrame(tick);
    }

    count(done, got) {
      const n = this.rows.length;
      this.el.count.textContent = done;
      this.el.mb.textContent = `${Math.round(got / n * ALBUM.mb)} MB of ${ALBUM.mb} MB`;
      this.el.eta.textContent = done === n ? 'Ready offline' : `about ${Math.max(1, Math.round((n - got) * 0.4))} s left`;
      this.el.label.textContent = done === n ? 'On this Mac' : `Downloading · ${done} of ${n}`;
      this.el.dl.style.setProperty('--deg', `${got / n * 360}deg`);
    }

    finish() {
      this.root.dataset.dl = 'done';
      const mb = `${BEFORE_MB + ALBUM.mb} MB`;
      this.el.badge.textContent = '4';
      this.el.badge.classList.add('is-new');
      this.el.sideMb.textContent = this.el.legendMb.textContent = mb;
      this.el.sum.textContent = `4 items · 4 h 01 min · ${mb} on this Mac`;
      this.el.added.hidden = false;
    }

    // the album is already on this Mac: the end state of download() without the cascade
    complete() {
      this.root.classList.add('is-instant');
      this.rows.forEach((row, i) => { row.style.setProperty('--fill', 1); row.classList.add('is-done'); this.segs[i].className = 'on'; });
      this.count(this.rows.length, this.rows.length);
      this.finish();
      requestAnimationFrame(() => requestAnimationFrame(() => this.root.classList.remove('is-instant')));
    }

    setOffline(on) {
      this.offline = on;
      this.root.classList.toggle('is-offline', on);
      this.el.off.setAttribute('aria-pressed', on);
      this.el.tg.classList.toggle('on', on);
    }

    play(i) {
      const [t, d] = ALBUM.tracks[i];
      if (this.offline && !this.rows[i].classList.contains('is-done')) return;   // not on this Mac
      this.rows.forEach((r, k) => r.classList.toggle('is-playing', k === i));
      this.root.classList.add('is-playing');
      this.el.npC.className = 'cv c-low';
      this.el.npT.textContent = t;
      this.el.npA.textContent = ALBUM.artist;
      this.el.npPos.textContent = '0:00';
      this.el.npDur.textContent = d;
      this.el.npBar.style.width = '0%';
      const [m, s] = d.split(':').map(Number), len = (m * 60 + s) * 1000, t0 = performance.now();
      cancelAnimationFrame(this.prog);
      const tick = now => {   // the bar walks at real speed; the clock reads whole seconds
        const k = Math.min(1, (now - t0) / len), sec = Math.floor(k * len / 1000);
        this.el.npBar.style.width = `${k * 100}%`;
        this.el.npPos.textContent = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
        if (k < 1 && this.root.classList.contains('is-playing')) this.prog = requestAnimationFrame(tick);
      };
      this.prog = requestAnimationFrame(tick);
    }

    reset() {
      cancelAnimationFrame(this.raf); cancelAnimationFrame(this.prog);
      this.root.dataset.dl = 'idle';
      this.rows.forEach(r => { r.classList.remove('is-going', 'is-done', 'is-playing'); r.style.setProperty('--fill', 0); });
      this.segs.forEach(s => { s.className = ''; });
      this.count(0, 0);
      this.el.label.textContent = 'Download album';
      this.el.eta.textContent = 'about 1 min on Wi-Fi';
      this.el.badge.textContent = '3';
      this.el.badge.classList.remove('is-new');
      this.el.sideMb.textContent = this.el.legendMb.textContent = `${BEFORE_MB} MB`;
      this.el.sum.textContent = `3 items · 3 h 13 min · ${BEFORE_MB} MB on this Mac`;
      this.el.added.hidden = true;
      this.root.classList.remove('is-playing');
      this.el.npC.className = 'cv c-sun';
      this.el.npT.textContent = 'Kettle Song'; this.el.npA.textContent = 'June Arlo';
      this.el.npPos.textContent = '2:04'; this.el.npDur.textContent = '3:15'; this.el.npBar.style.width = '64%';
      this.setOffline(false);
      this.go('home', true);
    }
  }

  document.querySelectorAll('.vm').forEach(el => { el.musicApp = new MusicApp(el); });
})();
