/* ===== SCIENCE · 1st Period (exam: Skeletal, Muscular and Digestive Systems) ===== */
const SKEL_SVG = (px, py) => `<svg class="diag" viewBox="0 0 200 330" xmlns="http://www.w3.org/2000/svg" aria-label="skeleton">
 <g fill="#fff" stroke="#5a4a3a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="100" cy="30" r="20"/><circle cx="92" cy="27" r="4" fill="#5a4a3a"/><circle cx="108" cy="27" r="4" fill="#5a4a3a"/>
  <path d="M88 50 Q100 62 112 50"/>
  <line x1="100" y1="60" x2="100" y2="172"/>
  <path d="M100 72 Q74 74 76 92 M100 86 Q72 88 75 106 M100 100 Q73 102 77 120 M100 114 Q76 116 80 130 M100 72 Q126 74 124 92 M100 86 Q128 88 125 106 M100 100 Q127 102 123 120 M100 114 Q124 116 120 130" fill="none"/>
  <line x1="72" y1="66" x2="128" y2="66"/>
  <line x1="70" y1="68" x2="60" y2="132"/><line x1="130" y1="68" x2="140" y2="132"/>
  <line x1="58" y1="136" x2="46" y2="196"/><line x1="63" y1="136" x2="58" y2="198"/>
  <line x1="142" y1="136" x2="154" y2="196"/><line x1="137" y1="136" x2="142" y2="198"/>
  <path d="M74 168 Q100 156 126 168 Q130 190 112 192 L100 182 L88 192 Q70 190 74 168Z"/>
  <line x1="86" y1="194" x2="82" y2="255"/><line x1="114" y1="194" x2="118" y2="255"/>
  <circle cx="81" cy="261" r="6"/><circle cx="119" cy="261" r="6"/>
  <line x1="80" y1="270" x2="81" y2="322"/><line x1="87" y1="270" x2="88" y2="320"/>
  <line x1="120" y1="270" x2="119" y2="322"/><line x1="113" y1="270" x2="112" y2="320"/>
 </g>${px != null ? `<line x1="${px < 100 ? 6 : 194}" y1="${py}" x2="${px}" y2="${py}" stroke="#C23B34" stroke-width="3"/><circle cx="${px}" cy="${py}" r="7" fill="#C23B34" opacity=".85"/>` : ''}</svg>`;
const BONES = { skull:[100,18,'skull'], jaw:[100,55,'jaw'], ribs:[80,100,'ribs'], spine:[100,150,'spine'], humerus:[65,100,'humerus'], radius:[49,170,'radius'], ulna:[61,170,'ulna'],
  pelvis:[100,174,'pelvis'], femur:[84,225,'femur'], patella:[81,261,'patella'], tibia:[81,295,'tibia'], fibula:[88,295,'fibula'] };
const BONE_NEAR = { skull:['jaw','spine','ribs'], jaw:['skull','spine','ribs'], ribs:['spine','pelvis','humerus'], spine:['ribs','pelvis','skull'], humerus:['radius','ulna','femur'],
  radius:['ulna','humerus','fibula'], ulna:['radius','humerus','tibia'], pelvis:['femur','spine','ribs'], femur:['tibia','humerus','fibula'], patella:['femur','tibia','pelvis'],
  tibia:['fibula','femur','radius'], fibula:['tibia','ulna','femur'] };
const BONE_WHY = { radius:'The radius is on the THUMB side of the forearm. The ulna is on the little-finger side.', ulna:'The ulna is on the little-finger side of the forearm. The radius is on the thumb side.',
  femur:'The femur is the long bone of the THIGH (above the knee). Below the knee are the tibia and fibula.', tibia:'The tibia is the big bone BELOW the knee (the shin). The fibula is the thin one next to it.',
  fibula:'The fibula is the THIN bone next to the tibia, below the knee.', humerus:'The humerus is the bone of the UPPER arm.', patella:'The patella is the kneecap.', pelvis:'The pelvis is the hip bone.',
  spine:'The spine protects the spinal cord.', ribs:'The ribs protect the heart and lungs.', skull:'The skull protects the brain.', jaw:'The jaw helps us chew.' };
const BONEW = k => { const [x, y] = BONES[k]; return { p:'Write the correct name of the bone:', html:SKEL_SVG(x, y), f:[{ a:k, w:10 }], why:BONE_WHY[k] || `This is the ${k}.`, ojo: ['radius','ulna','femur','tibia','fibula'].includes(k) ? 1 : 0 }; };
const BONEQ = k => { const [x, y] = BONES[k]; return { p:'Which bone is it?', html:SKEL_SVG(x, y), a:k, w:BONE_NEAR[k], why:BONE_WHY[k] || `This is the ${k}.`, ojo: ['radius','ulna','femur','tibia','fibula'].includes(k) ? 1 : 0, cls:'small' }; };

const MUSC_SVG = (px, py, back) => `<svg class="diag" viewBox="0 0 200 342" xmlns="http://www.w3.org/2000/svg" aria-label="muscles">
 <g fill="#F6C9B8" stroke="#8a4a3a" stroke-width="2.5" stroke-linejoin="round">
  <circle cx="100" cy="30" r="20"/>${back ? '' : '<circle cx="93" cy="27" r="2.5" fill="#8a4a3a"/><circle cx="107" cy="27" r="2.5" fill="#8a4a3a"/><path d="M93 37 Q100 42 107 37" fill="none"/>'}
  <rect x="92" y="48" width="16" height="12"/>
  <path d="M66 62 Q100 54 134 62 L130 160 Q100 170 70 160Z"/>
  ${back ? '<path d="M74 150 Q100 140 126 150 Q128 180 100 182 Q72 180 74 150Z" fill="#E9A890"/>' : '<path d="M72 66 Q86 64 98 70 L98 92 Q84 96 72 88Z M128 66 Q114 64 102 70 L102 92 Q116 96 128 88Z" fill="#EFB39E"/><path d="M88 100 h24 v48 h-24z M100 100 v48 M88 112 h24 M88 124 h24 M88 136 h24" fill="#EFB39E"/>'}
  <path d="M66 64 L54 70 L46 132 L58 134 L66 90Z M134 64 L146 70 L154 132 L142 134 L134 90Z" fill="#EFB39E"/>
  <path d="M46 134 L40 196 L52 198 L58 136Z M154 134 L160 196 L148 198 L142 136Z"/>
  <path d="M72 162 L66 250 L90 250 L98 170Z M128 162 L134 250 L110 250 L102 170Z" fill="#EFB39E"/>
  <path d="M68 254 L72 320 L88 320 L90 254Z M132 254 L128 320 L112 320 L110 254Z"/>
 </g>${px != null ? `<line x1="${px < 100 ? 4 : 196}" y1="${py}" x2="${px}" y2="${py}" stroke="#2B63D1" stroke-width="3"/><circle cx="${px}" cy="${py}" r="7" fill="#2B63D1" opacity=".85"/>` : ''}
 ${back ? '<text x="100" y="338" text-anchor="middle" font-size="13" font-weight="800" fill="#6B6250">back view</text>' : '<text x="100" y="338" text-anchor="middle" font-size="13" font-weight="800" fill="#6B6250">front view</text>'}</svg>`;
const MUSCLES = { 'facial muscles':[100,32,0], biceps:[56,100,0], triceps:[52,105,1], pectoral:[84,80,0], abdominal:[100,124,0], quadriceps:[80,205,0], gluteus:[100,165,1] };
const MUS_WHY = { biceps:'The biceps is on the FRONT of the upper arm.', triceps:'The triceps is on the BACK of the upper arm.', pectoral:'The pectoral is the chest muscle.', abdominal:'The abdominals are the muscles of the belly.',
  quadriceps:'The quadriceps is on the FRONT of the thigh.', 'facial muscles':'The facial muscles help us smile and make faces.', gluteus:'The gluteus is the muscle we sit on (back view).' };
const MUSW = k => { const [x, y, b] = MUSCLES[k]; return { p:'Write the correct name of the muscle:', html:MUSC_SVG(x, y, b), f:[{ a: k === 'facial muscles' ? ['facial muscles','facial muscle','facial'] : k === 'abdominal' ? ['abdominal','abdominals'] : k === 'gluteus' ? ['gluteus','glutes','gluteus maximus'] : k, w:14 }], why:MUS_WHY[k], ojo: ['triceps','pectoral','quadriceps'].includes(k) ? 1 : 0 }; };
const MUSQ = k => { const [x, y, b] = MUSCLES[k]; const all = Object.keys(MUSCLES).filter(m => m !== k); return { p:'Which muscle is it?', html:MUSC_SVG(x, y, b), a:k, w: (k === 'biceps' ? ['triceps','pectoral','quadriceps'] : k === 'triceps' ? ['biceps','pectoral','gluteus'] : k === 'pectoral' ? ['triceps','abdominal','biceps'] : k === 'quadriceps' ? ['gluteus','biceps','abdominal'] : all.slice().sort(() => Math.random() - .5).slice(0, 3)), why:MUS_WHY[k], cls:'small', ojo: ['triceps','pectoral','quadriceps'].includes(k) ? 1 : 0 }; };

const ORG_SVG = (px, py) => `<svg class="diag" viewBox="0 0 200 330" xmlns="http://www.w3.org/2000/svg" aria-label="digestive system">
 <path d="M100 6 Q132 6 132 40 Q132 58 118 64 L150 74 Q160 80 160 100 L160 300 L40 300 L40 100 Q40 80 50 74 L82 64 Q68 58 68 40 Q68 6 100 6Z" fill="#FFF6EA" stroke="#9C7246" stroke-width="2.5"/>
 <g stroke="#7E4F28" stroke-width="2.5" stroke-linejoin="round">
  <path d="M86 46 Q100 54 114 46" fill="#F4A3A3"/>
  <path d="M100 50 L100 120" fill="none" stroke="#E07B7B" stroke-width="7" stroke-linecap="round"/>
  <path d="M62 118 Q64 104 90 106 L100 116 Q98 142 76 144 Q60 142 62 118Z" fill="#B5523F"/>
  <path d="M100 116 Q132 106 136 128 Q138 150 116 152 Q104 150 104 140 Z" fill="#F08A8A"/>
  <path d="M66 168 L66 232 L134 232 L134 168 Q100 158 66 168Z" fill="#E9C07A"/>
  <path d="M78 178 q10 -8 20 0 t20 0 t12 4 M76 192 q10 -8 20 0 t20 0 t14 0 M76 206 q10 -8 20 0 t20 0 t14 0 M78 220 q10 -8 20 0 t20 0" fill="none"/>
  <path d="M62 236 L62 164 Q100 150 138 164 L138 236 Q120 244 104 238" fill="none" stroke="#C98A4A" stroke-width="9"/>
  <path d="M104 238 Q100 256 100 266" fill="none" stroke="#C98A4A" stroke-width="8"/>
  <rect x="96" y="266" width="8" height="10" fill="#7E4F28"/>
 </g>${px != null ? `<line x1="${px < 100 ? 4 : 196}" y1="${py}" x2="${px}" y2="${py}" stroke="#23804D" stroke-width="3"/><circle cx="${px}" cy="${py}" r="7" fill="#23804D" opacity=".9"/>` : ''}</svg>`;
const ORGANS = { mouth:[100,48], esophagus:[100,86], liver:[72,126], stomach:[124,132], 'small intestine':[100,200], 'large intestine':[62,200], rectum:[100,256], anus:[100,272] };
const ORG_WHY = { mouth:'Digestion begins in the mouth.', esophagus:'The esophagus carries food from the mouth to the stomach.', stomach:'The stomach mixes food with digestive juices.', liver:'The liver is next to the stomach and helps digestion.',
  'small intestine':'Most nutrients are absorbed in the small intestine.', 'large intestine':'The large intestine goes around the small intestine and absorbs water.', rectum:'The rectum is at the end of the large intestine.', anus:'The anus is the end of the digestive system.' };
const ORGW = k => { const [x, y] = ORGANS[k]; return { p:'Write the correct name of the organ:', html:ORG_SVG(x, y), f:[{ a:k, w:16 }], why:ORG_WHY[k], ojo: k === 'esophagus' ? 1 : 0 }; };
const RULE_SKEL = '<b>The skeletal system</b> is made up of <b>bones</b>. It gives our body <b>structure</b>, supports and protects it.<br>skull (protects the brain) · jaw · ribs (protect heart and lungs) · spine (protects the spinal cord) · humerus (upper arm) · radius (thumb side) and ulna (little-finger side) · pelvis (hip) · femur (thigh) · patella (knee) · tibia and fibula (below the knee).';
const RULE_MUS = '<b>The muscular system</b> helps us <b>move</b>. Muscles move our bones.<br>facial muscles (face) · biceps (FRONT of the upper arm) · triceps (BACK of the upper arm) · pectoral (chest) · abdominal (belly) · quadriceps (FRONT of the thigh) · gluteus (we sit on it).<br>Take care of your muscles: <b>stretch before and after exercise</b>.';
const RULE_DIG = '<b>The digestive system</b> gives us the <b>nutrients and energy</b> our body needs.<br>Order: <b>1. mouth</b> (digestion begins) → <b>2. esophagus</b> (carries food to the stomach) → <b>3. stomach</b> (mixes food with digestive juices) → <b>4. small intestine</b> (absorbs most nutrients) → large intestine → rectum → anus. The <b>liver</b> helps too.';
const RULE_ALL = RULE_SKEL + '<br><br>' + RULE_MUS + '<br><br>' + RULE_DIG;
const MC = (p, a, w, why, o) => ({ p, a, w, why, ojo:o, cls:'small' });
const FB = (pre, a, post, why, o, bank) => ({ p:'Write the correct word that is missing:', big:pre + ' ___ ' + post, f:[{ a, w:12 }], why, ojo:o });
const ANS = (p, why, kw, o) => ({ p, w:'', hint:'', kw, why, ojo:o });

const ACTS = [
  /* ---------- I. Multiple choice ---------- */
  {g:'sci', id:'mc', type:'elige', title:'I. Multiple choice', src:'Circle the correct answer', rule:RULE_ALL, inst:'Read the question and tap the correct answer.',
   items:[MC('What is the main function of the skeletal system?','To support and protect the body',['To digest food','To pump blood'],'The skeletal system supports and protects the body.'),
     MC('Which bone protects the brain?','Skull',['Rib','Femur'],'The skull protects the brain.'),
     MC('What helps our bones move?','Muscles',['Stomach','Intestines'],'Muscles move our bones.'),
     MC('Where does digestion begin?','Mouth',['Stomach','Small intestine'],'Digestion begins in the mouth, when we chew.'),
     MC('Which organ mixes food and digestive juices?','Stomach',['Heart','Skull'],'The stomach mixes food with digestive juices.'),
     MC('Where are most nutrients absorbed?','Small intestine',['Esophagus','Large intestine'],'Most nutrients are absorbed in the small intestine.'),
     MC('Which bone protects the spinal cord?','Spine',['Skull','Pelvis'],'The spine protects the spinal cord.'),
     MC('Which bones protect the heart and lungs?','Ribs',['Femur','Patella'],'The ribs protect the heart and lungs.'),
     MC('What carries food from the mouth to the stomach?','Esophagus',['Liver','Large intestine'],'The esophagus carries food from the mouth to the stomach.',1),
     MC('Which muscle is on the BACK of the upper arm?','Triceps',['Biceps','Pectoral'],'Triceps = back of the upper arm. Biceps = front.',1),
     MC('Which muscle is on the FRONT of the thigh?','Quadriceps',['Gluteus','Biceps'],'The quadriceps is on the front of the thigh.',1),
     MC('Which is the long bone of the thigh?','Femur',['Tibia','Humerus'],'The femur is in the thigh, above the knee.',1)]},
  /* ---------- II. Fill in the blanks (paragraph) ---------- */
  {g:'sci', id:'fill1', type:'campos', title:'II. Fill in the blanks', src:'Write the missing word in the paragraph', rule:RULE_ALL, inst:'Write the missing word. Check your spelling!',
   items:[{p:'Complete the paragraph:', big:'The skeletal system gives our body ___, the ___ system helps us move, and the digestive system gives us the ___ and energy our body needs.', f:[{l:'1.', a:'structure', w:10},{l:'2.', a:'muscular', w:10},{l:'3.', a:'nutrients', w:10}], why:'structure · muscular · nutrients. Careful! «structure» starts with ST (not «estructure»).', ojo:1},
     {p:'Complete:', big:'The skeletal system gives our body ___.', f:[{a:'structure'}], why:'structure: starts with ST, not «estructure».', ojo:1},
     {p:'Complete:', big:'The ___ system helps us move.', f:[{a:'muscular'}], why:'muscular: M-U-S-C-U-L-A-R.', ojo:1},
     {p:'Complete:', big:'The digestive system gives us the ___ and energy our body needs.', f:[{a:'nutrients'}], why:'nutrients.'}]},
  /* ---------- III. Fill in the blanks (word bank) ---------- */
  {g:'sci', id:'fill2', type:'campos', title:'III. Use the words in the box', src:'bones · energy · esophagus · muscles · nutrients · spine', rule:'Word box: <b>bones – energy – esophagus – muscles – nutrients – spine</b>', inst:'Use the words in the box. Write the missing word.',
   items:[{p:'Use the words in the box:', big:'The skeletal system is made up of ___.', f:[{a:'bones'}], why:'The skeletal system is made up of bones.'},
     {p:'Use the words in the box:', big:'The ___ helps protect the spinal cord.', f:[{a:'spine'}], why:'The spine protects the spinal cord.'},
     {p:'Use the words in the box:', big:'The ___ help us move.', f:[{a:'muscles'}], why:'The muscles help us move.'},
     {p:'Use the words in the box:', big:'The ___ carries food from the mouth to the stomach.', f:[{a:'esophagus'}], why:'esophagus: e-s-o-p-h-a-g-u-s (PH sounds like F).', ojo:1},
     {p:'Use the words in the box:', big:'The digestive system helps our body absorb ___.', f:[{a:'nutrients'}], why:'nutrients.'},
     {p:'Use the words in the box:', big:'Food provides the body with ___.', f:[{a:'energy'}], why:'energy.'}]},
  /* ---------- IV. Put in order ---------- */
  {g:'sci', id:'order', type:'ordena', title:'IV. Put the digestive organs in order', src:'Number the organs in the order food passes through them', rule:RULE_DIG, inst:'Tap the organs in the order food passes through them.',
   items:[{p:'Order: where does food go first?', nums:['mouth','esophagus','stomach','small intestine'], a:['mouth','esophagus','stomach','small intestine'], why:'mouth → esophagus → stomach → small intestine.'},
     {p:'Order the whole trip of the food:', nums:['mouth','esophagus','stomach','small intestine','large intestine','rectum','anus'], a:['mouth','esophagus','stomach','small intestine','large intestine','rectum','anus'], why:'mouth → esophagus → stomach → small intestine → large intestine → rectum → anus.', ojo:1}]},
  /* ---------- V. Questions (write a complete sentence) ---------- */
  {g:'sci', id:'quest', type:'elige', title:'V. Questions', src:'Answer the questions', rule:RULE_ALL + '<br><br>Answer with a complete sentence: <b>We would not be able to…</b> · <b>We can…</b> · <b>I take care of my body by…</b>', inst:'Choose the best complete answer.',
   items:[MC('What might happen if we did not have a skeletal system?','We would not be able to stand or move.',['We can doesn\'t move.','We would not eat.'],'Use «We would not be able to…». Not «We can doesn\'t»!',1),
     MC('What can we do to take care of our bones?','We can eat things with calcium, like milk.',['We can eat candy.','We can sleep all day.'],'Calcium makes our bones strong.'),
     MC('What can we do to take care of our muscles?','We can stretch before and after exercise.',['We can stretch after and den of doing exercise.','We can stop moving.'],'stretch BEFORE and AFTER exercise.',1),
     MC('What can we do to take care of our digestive system?','We can eat healthy food and drink water.',['We can eat a lot of junk food.','We can skip breakfast.'],'Healthy food and water help digestion.'),
     MC('Which sentence with «my body» is correct?','I take care of my body by doing exercise.',['I care my body doing exercise.','I take care my body doing exercise.'],'take care OF my body BY doing exercise.',1)]},
  {g:'sci', id:'questw', type:'escribe', title:'V. Write a sentence', src:'Write a sentence with the words', rule:RULE_ALL, inst:'Write a complete sentence in English. Start with a capital letter and end with a period.',
   items:[{w:'body', hint:'Example: I take care of my body by…'}, {w:'bones', hint:'Example: My bones…'}, {w:'muscles', hint:'Example: My muscles help me…'}, {w:'stomach', hint:'Example: The stomach…'}, {w:'calcium', hint:'Example: Milk has…'}, {w:'exercise', hint:'Example: I stretch before…'}]},
  /* ---------- VI–VIII. Diagrams ---------- */
  {g:'sci', id:'bonesq', type:'elige', title:'VI. Which bone is it?', src:'Look at the arrow', rule:RULE_SKEL, inst:'Look at the red arrow and tap the name of the bone.', items:Object.keys(BONES).map(BONEQ)},
  {g:'sci', id:'bonesw', type:'campos', title:'VI. Write the name of the bone', src:'Like the exam: write the correct name', rule:RULE_SKEL, inst:'Look at the red arrow. Write the name of the bone.', items:Object.keys(BONES).map(BONEW)},
  {g:'sci', id:'musq', type:'elige', title:'VII. Which muscle is it?', src:'Look at the arrow', rule:RULE_MUS, inst:'Look at the blue arrow and tap the name of the muscle.', items:Object.keys(MUSCLES).map(MUSQ)},
  {g:'sci', id:'musw', type:'campos', title:'VII. Write the name of the muscle', src:'Like the exam: write the correct name', rule:RULE_MUS, inst:'Look at the blue arrow. Write the name of the muscle.', items:Object.keys(MUSCLES).map(MUSW)},
  {g:'sci', id:'orgw', type:'campos', title:'VIII. Write the name of the organ', src:'Like the exam: write the correct name', rule:RULE_DIG, inst:'Look at the green arrow. Write the name of the organ.', items:Object.keys(ORGANS).map(ORGW)},
  {g:'sci', id:'sys', type:'clas', title:'Which system?', src:'Skeletal, muscular or digestive', buckets:['Skeletal','Muscular','Digestive'], rule:RULE_ALL, inst:'Read the word and tap its system.',
   items:[['skull',0],['femur',0],['ribs',0],['spine',0],['patella',0],['biceps',1],['triceps',1],['pectoral',1],['quadriceps',1],['abdominal',1],['stomach',2],['esophagus',2],['liver',2],['small intestine',2],['mouth',2]].map(([t, b]) => ({ t, b, why:`«${t}» belongs to the ${['skeletal','muscular','digestive'][b]} system.` }))}
];
const GROUPS = [
  {g:'sci', p:1, x:'🏆 Final challenge: The Human Body!', h:'The Human Body: skeletal, muscular and digestive systems', d:'Like the 1st period exam: multiple choice, fill in the blanks, order, questions and diagrams.'}
];
