/* ================= PREMIOS (dibujos generados, sin imágenes) ================= */
const PAL = [['Fresa','#FF7AA8'],['Menta','#6FE0B5'],['Uva','#A983F2'],['Limón','#F5E04A'],['Cielo','#7CC8FF'],['Mango','#FFB347'],['Chicle','#FF9FE0'],['Lima','#9BE15D'],['Coral','#FF7F6E'],['Lavanda','#C3A6FF'],
  ['Turquesa','#3CD3C9'],['Durazno','#FFC3A0'],['Arándano','#5B7CFA'],['Sandía','#FF5E7E'],['Pistache','#B5D99C'],['Caramelo','#E3A35B'],['Algodón','#FFC9EC'],['Océano','#3A9BDC'],['Kiwi','#8CC63F'],['Mora','#8E44AD'],
  ['Naranja','#FF8C32'],['Nube','#DDE6F5'],['Cereza','#E0315B'],['Plátano','#FFE27A'],['Galaxia','#4B3BA8']];
function rng(seed) { let s = hashS(seed) || 1; return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 10000) / 10000; }; }
const crownSVG = (x, y, s) => `<path d="M${x - 14 * s} ${y} l${4 * s} ${-14 * s} l${6 * s} ${8 * s} l${4 * s} ${-12 * s} l${4 * s} ${12 * s} l${6 * s} ${-8 * s} l${4 * s} ${14 * s}z" fill="#FFC531" stroke="#B8860B" stroke-width="2"/><circle cx="${x}" cy="${y - 5 * s}" r="${2.4 * s}" fill="#E0315B"/>`;
const starSVG = (x, y, r) => { let p = ''; for (let i = 0; i < 10; i++) { const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * .45 : r; p += `${i ? 'L' : 'M'}${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`; } return `<path d="${p}Z" fill="#FFD23F" stroke="#C99700" stroke-width="1.5"/>`; };
const eyes = (R, cx, cy, n, sz) => { const xs = n === 1 ? [cx] : n === 2 ? [cx - sz * 1.4, cx + sz * 1.4] : [cx - sz * 2.2, cx, cx + sz * 2.2];
  return xs.map((x, j) => { const yy = cy + (n === 3 && j === 1 ? -sz * .9 : 0), dx = (R() - .5) * sz * .6, dy = (R() - .5) * sz * .6;
    return `<circle cx="${x}" cy="${yy}" r="${sz}" fill="#fff" stroke="#333" stroke-width="1.5"/><circle cx="${x + dx}" cy="${yy + dy}" r="${sz * .5}" fill="#222"/><circle cx="${x + dx - sz * .2}" cy="${yy + dy - sz * .2}" r="${sz * .15}" fill="#fff"/>`; }).join(''); };
function drawSlime(t) {
  const R = rng(t.id), c = t.col || PAL[Math.floor(R() * PAL.length)][1], n = 1 + Math.floor(R() * 3), big = t.doll;
  const fill = big ? 'url(#rb)' : c;
  let x = `<path d="M14 84 Q8 46 32 34 Q50 16 68 34 Q92 46 86 84 Q88 94 76 91 Q72 98 64 91 Q52 98 42 91 Q32 98 26 91 Q12 94 14 84Z" fill="${fill}" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
    <ellipse cx="36" cy="44" rx="10" ry="6" fill="#fff" opacity=".45" transform="rotate(-25 36 44)"/>`;
  if (t.cat === 1 || big) for (let i = 0; i < 9; i++) x += `<circle cx="${22 + R() * 56}" cy="${48 + R() * 36}" r="${1 + R() * 1.6}" fill="${R() > .5 ? '#fff' : '#FFE27A'}" opacity=".9"/>`;
  if (t.cat === 2) x += `<path d="M30 34 q6 -10 14 -4 q6 -10 14 0 q8 -6 12 4" fill="#fff" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>`;
  x += eyes(R, 50, 58, n, 7) + `<path d="M42 74 Q50 ${80 + R() * 4} 58 74" fill="none" stroke="#333" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="30" cy="72" rx="5" ry="3" fill="#FF6F91" opacity=".45"/><ellipse cx="70" cy="72" rx="5" ry="3" fill="#FF6F91" opacity=".45"/>`;
  if (t.royal || big) x += crownSVG(50, 30, 1.2);
  if (t.special) x += starSVG(80, 26, 11);
  return x;
}
const SKIN = ['#F9D7C3','#F1C27D','#E0AC69','#C68642','#FBE3D2'], HAIR = ['#F3D36B','#6B3F1D','#2A1B12','#C1440E','#E8C27A','#9B6B43'];
function drawDoll(t) {
  const R = rng(t.id), skin = SKIN[Math.floor(R() * SKIN.length)], hair = t.hair || HAIR[Math.floor(R() * HAIR.length)], dress = t.col || PAL[Math.floor(R() * PAL.length)][1], st = Math.floor(R() * 3);
  let x = `<path d="M30 96 L36 58 Q50 52 64 58 L70 96Z" fill="${dress}" stroke="rgba(0,0,0,.25)" stroke-width="2"/>`;
  if (t.cat === 1 || t.doll) for (let i = 0; i < 7; i++) x += `<circle cx="${38 + R() * 24}" cy="${66 + R() * 26}" r="2" fill="#fff" opacity=".85"/>`;
  if (t.cat === 0) x += `<path d="M40 70 h20 M38 80 h24" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/>`;
  x += `<rect x="45" y="50" width="10" height="8" fill="${skin}"/>`;
  x += st === 0 ? `<path d="M26 40 Q26 12 50 12 Q74 12 74 40 L74 62 Q68 66 64 58 L36 58 Q32 66 26 62Z" fill="${hair}"/>` : st === 1 ? `<circle cx="27" cy="30" r="9" fill="${hair}"/><circle cx="73" cy="30" r="9" fill="${hair}"/>` : `<path d="M60 18 Q84 22 80 60 Q76 48 70 40Z" fill="${hair}"/>`;
  x += `<circle cx="50" cy="34" r="18" fill="${skin}" stroke="rgba(0,0,0,.2)" stroke-width="1.5"/><path d="M32 30 Q34 14 50 14 Q66 14 68 30 Q58 22 50 24 Q42 22 32 30Z" fill="${hair}"/>
    <circle cx="43" cy="35" r="2.6" fill="#2a1b12"/><circle cx="57" cy="35" r="2.6" fill="#2a1b12"/><path d="M45 42 Q50 46 55 42" fill="none" stroke="#B5523F" stroke-width="2" stroke-linecap="round"/>
    <circle cx="39" cy="40" r="3" fill="#FF8FA3" opacity=".5"/><circle cx="61" cy="40" r="3" fill="#FF8FA3" opacity=".5"/>`;
  if (t.cat === 2) x += `<path d="M30 22 Q50 2 70 22 Z" fill="${PAL[Math.floor(R() * PAL.length)][1]}" stroke="rgba(0,0,0,.2)"/><rect x="26" y="20" width="48" height="4" rx="2" fill="#7E4F28"/>`;
  if (t.royal || t.doll) x += crownSVG(50, 14, 1);
  if (t.special) x += starSVG(80, 22, 11);
  return x;
}
function drawRobot(t) {
  const R = rng(t.id), c = t.col || PAL[Math.floor(R() * PAL.length)][1], eyeC = ['#3CD3C9','#FF5E7E','#FFE27A','#9BE15D'][Math.floor(R() * 4)], n = (Math.floor(R() * 9) + 1);
  let x = `<line x1="50" y1="10" x2="50" y2="20" stroke="#555" stroke-width="3"/><circle cx="50" cy="9" r="4" fill="${eyeC}"/>
    <rect x="28" y="20" width="44" height="30" rx="9" fill="${t.doll ? '#FFC531' : c}" stroke="rgba(0,0,0,.3)" stroke-width="2"/>
    <circle cx="40" cy="34" r="6" fill="#fff"/><circle cx="60" cy="34" r="6" fill="#fff"/><circle cx="40" cy="34" r="3" fill="${eyeC}"/><circle cx="60" cy="34" r="3" fill="${eyeC}"/>
    <rect x="42" y="42" width="16" height="4" rx="2" fill="#333"/>
    <rect x="30" y="52" width="40" height="32" rx="7" fill="${t.doll ? '#FFE27A' : c}" stroke="rgba(0,0,0,.3)" stroke-width="2"/>
    <rect x="38" y="57" width="24" height="16" rx="3" fill="#1d2b3a"/><text x="50" y="70" text-anchor="middle" font-size="13" font-weight="800" fill="${eyeC}" font-family="sans-serif">${t.num || n}</text>
    <rect x="18" y="56" width="10" height="22" rx="5" fill="#9aa7b4"/><rect x="72" y="56" width="10" height="22" rx="5" fill="#9aa7b4"/>
    <rect x="35" y="84" width="10" height="10" rx="3" fill="#6b7785"/><rect x="55" y="84" width="10" height="10" rx="3" fill="#6b7785"/>`;
  if (t.cat === 1) x += `<ellipse cx="50" cy="6" rx="18" ry="3" fill="#9aa7b4" stroke="#555"/>`;
  if (t.cat === 2) x += `<path d="M70 68 h12 m0 -6 v12" stroke="#B8860B" stroke-width="3" stroke-linecap="round"/>`;
  if (t.royal || t.doll) x += crownSVG(50, 20, 1);
  if (t.special) x += starSVG(80, 16, 10);
  return x;
}
const DRAW = { slime: drawSlime, doll: drawDoll, robot: drawRobot }[THEME.kind];
const SVGCACHE = {};
function toySVG(t, extraCls) {
  if (t.img != null) return `<img class="toy photo${extraCls ? ' ' + extraCls : ''}" src="premios/s-${String(t.img).padStart(2, '0')}.webp" alt="${esc(t.name)}" loading="lazy" decoding="async">`;
  if (!SVGCACHE[t.id]) { const defs = '<defs><linearGradient id="rb" x1="0" x2="1"><stop offset="0" stop-color="#FF7AA8"/><stop offset=".33" stop-color="#FFE27A"/><stop offset=".66" stop-color="#6FE0B5"/><stop offset="1" stop-color="#7CC8FF"/></linearGradient></defs>';
    SVGCACHE[t.id] = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${defs}${DRAW(t)}</svg>`); }
  return `<img class="toy photo${extraCls ? ' ' + extraCls : ''}" src="${SVGCACHE[t.id]}" alt="${esc(t.name)}" decoding="async">`;
}
const OLD_ANI = {};
if (THEME.photos) {   // premios con imágenes (fotos recortadas) en lugar de dibujos
  const P = THEME.photos, nm = j => P.names[j];
  const regIdx = P.names.map((_, j) => j).filter(j => !P.royals.includes(j) && j !== P.reto && !P.finals.includes(j) && !(P.skip || []).includes(j));
  var PH_TOYS = regIdx.map((j, k) => ({ id:'ph-' + j, img:j, name:nm(j), cat:0 }));
  var PH_ROY = P.royals.map((j, k) => ({ id:'real-' + k, img:j, name:nm(j), cat:3, royal:true }));
  var PH_FIN = [{ id:'muneca-castana', img:P.finals[0], name:nm(P.finals[0]), cat:5, doll:true }, { id:'muneca-rubia', img:P.finals[1], name:nm(P.finals[1]), cat:5, doll:true }];
  // los premios dibujados que ya ganaron se cambian por fotos (no pierden ninguno)
  for (let c = 0; c < 3; c++) for (let j = 0; j < 25; j++) OLD_ANI[`${THEME.kind}-${c}-${j}`] = PH_TOYS[(c * 25 + j) % PH_TOYS.length].id;
  (P.skip || []).forEach((j, k) => { if (!P.finals.includes(j)) OLD_ANI['ph-' + j] = PH_TOYS[PH_TOYS.length - 1 - k].id; });   // los que se quitaron se cambian por otro
  for (let j = P.royals.length; j < 9; j++) OLD_ANI['real-' + j] = 'real-' + (j % P.royals.length);
}
const TOYS = THEME.photos ? PH_TOYS : [].concat(...THEME.cats.map((cn, cat) => PAL.map(([nm, col], j) => ({ id:`${THEME.kind}-${cat}-${j}`, name:THEME.name(cat, nm, j), cat, col, num: (j % 9) + 1 }))));
const ROYALS = THEME.photos ? PH_ROY : THEME.royals.map((name, j) => ({ id:'real-' + j, name, cat:3, royal:true, col:PAL[(j * 7) % PAL.length][1] }));
const CATS = THEME.cats.concat([THEME.word.realCap + ' 👑', THEME.word.retoCap + ' ⭐', THEME.word.finalCap + ' 💛']);
const SPECIALS = GROUPS.filter(G => G.p === 1).map((G, j) => THEME.photos && j === 0 ? { id:'reto-' + G.g, g:G.g, name:THEME.photos.names[THEME.photos.reto], img:THEME.photos.reto, cat:4, special:true } : ({ id:'reto-' + G.g, g:G.g, name:THEME.specials[j % THEME.specials.length], cat:4, special:true, col:PAL[(j * 5 + 3) % PAL.length][1] }));
const DOLLS = THEME.photos ? PH_FIN : [{ id:'muneca-rubia', name:THEME.finals[1], cat:5, doll:true, hair:'#F3D36B', col:'#FF9FE0' }, { id:'muneca-castana', name:THEME.finals[0], cat:5, doll:true, hair:'#6B3F1D', col:'#7CC8FF' }];
const myDoll = () => { const p = me(); const k = p && (p.doll || (p.id === 'p1' ? 'castana' : p.id === 'p2' ? 'rubia' : (hashS(p.id) % 2 ? 'rubia' : 'castana'))); return DOLLS.find(d => d.id === 'muneca-' + k); };
function hashS(str) { let h = 2166136261; for (const c of String(str)) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; }
const TOYBY = Object.fromEntries(TOYS.concat(ROYALS, SPECIALS, DOLLS).map(t => [t.id, t]));
const ALLIDS = () => TOYS.concat(ROYALS, SPECIALS).map(t => t.id).concat(myDoll() ? [myDoll().id] : []);
const TOTAL = TOYS.length + ROYALS.length + SPECIALS.length + 1;
const owned = () => toys.concat(royals, specials, doll ? [doll] : []);
