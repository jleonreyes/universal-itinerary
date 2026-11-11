/* ===== CIENCIAS SOCIALES · 1.er periodo (examen: México antiguo, Mesoamérica, nómadas y sedentarios, estados y capitales del norte) ===== */
const RULE_AREAS = 'El México antiguo se divide en <b>3 grandes áreas</b>:<br>• <b>Aridoamérica</b>: al norte, tierras secas; pueblos <b>nómadas</b> (cazaban y recolectaban).<br>• <b>Oasisamérica</b>: al noroeste, tierras secas con ríos y oasis; pueblos que sembraban cerca del agua.<br>• <b>Mesoamérica</b>: al centro y sur; pueblos <b>sedentarios</b> que sembraban maíz y construyeron ciudades.';
const RULE_MESO = '<b>Mesoamérica</b> se divide en 3 periodos:<br>• <b>Preclásico</b> (2500 a. C. – 200 d. C.): <b>olmecas</b>.<br>• <b>Clásico</b> (200 d. C. – 900 d. C.): <b>teotihuacanos, zapotecas y mayas</b>.<br>• <b>Posclásico</b> (900 d. C. – 1521): <b>toltecas, mixtecas y mexicas</b>.';
const RULE_NOM = '<b>Nómadas:</b> se movían de un lugar a otro buscando alimento; <b>cazaban, pescaban y recolectaban</b>; vivían en cuevas o chozas.<br><b>Sedentarios:</b> <b>se quedaban a vivir en un lugar fijo</b>; practicaban la <b>agricultura</b> (sembraban maíz), construían casas y ciudades.<br>Los pueblos construyeron <b>canales para regar sus cultivos</b>.';
const CAPS = [['Baja California','Mexicali'],['Baja California Sur','La Paz'],['Sonora','Hermosillo'],['Chihuahua','Chihuahua'],['Coahuila','Saltillo'],['Nuevo León','Monterrey'],['Tamaulipas','Ciudad Victoria'],['Sinaloa','Culiacán'],['Durango','Durango']];
const RULE_CAP = 'Estados del norte y sus capitales:<br>' + CAPS.map(([e, c]) => `<b>${e}</b> → ${c}`).join('<br>') + '<br>¡Ojo! <b>Hermosillo</b> es de <b>Sonora</b>, no de Sinaloa. <b>Culiacán</b> es de Sinaloa.';
const SQ = (p, a, w, why, o) => ({ p, a, w, why, ojo:o, cls:'small' });
const CULT = [['olmecas',0,1],['teotihuacanos',1,1],['zapotecas',1,1],['mayas',1],['toltecas',2],['mixtecas',2,1],['mexicas',2]];
const ACTS = [
  {g:'soc', id:'areas', type:'campos', title:'1. Las 3 áreas del México antiguo', src:'Como en el examen: escribe las 3 áreas', rule:RULE_AREAS, inst:'Escribe las 3 áreas. Cuida la ortografía y los acentos.',
   items:[{p:'Escribe las 3 áreas importantes del México antiguo:', f:[{l:'1.', a:['Aridoamérica'], w:14},{l:'2.', a:['Oasisamérica'], w:14},{l:'3.', a:['Mesoamérica'], w:14}], why:'Aridoamérica, Oasisamérica y Mesoamérica: las tres llevan acento en la é de «América».', ojo:1},
     {p:'El área del norte, con tierras secas y pueblos nómadas, es:', f:[{a:'Aridoamérica', w:14}], why:'Aridoamérica: árida = seca.'},
     {p:'El área con ríos y oasis, al noroeste, es:', f:[{a:'Oasisamérica', w:14}], why:'Oasisamérica: oasis = agua en el desierto.'},
     {p:'El área del centro y sur, con pueblos que sembraban maíz y construyeron ciudades, es:', f:[{a:'Mesoamérica', w:14}], why:'Mesoamérica.'}]},
  {g:'soc', id:'areaclas', type:'clas', title:'¿Qué área es?', src:'Aridoamérica · Oasisamérica · Mesoamérica', buckets:['Aridoamérica','Oasisamérica','Mesoamérica'], rule:RULE_AREAS,
   items:[['tierras muy secas, sin agua',0],['pueblos nómadas que cazaban',0],['al norte',0],['oasis y ríos en el desierto',1],['sembraban cerca de los ríos',1],['al noroeste',1],['sembraban maíz',2],['construyeron pirámides y ciudades',2],['olmecas y mayas',2],['al centro y sur',2]].map(([t, b]) => ({ t, b, why:`${t}: ${['Aridoamérica','Oasisamérica','Mesoamérica'][b]}.` }))},
  {g:'soc', id:'mapa', type:'clas', title:'2. Completa el mapa conceptual', src:'Mesoamérica: Preclásico, Clásico y Posclásico', buckets:['Preclásico','Clásico','Posclásico'], rule:RULE_MESO, inst:'¿En qué periodo va cada cultura? Toca la columna.',
   items:CULT.map(([t, b, o]) => ({ t, b, ojo:o, why:`Los ${t} van en el ${['Preclásico','Clásico','Posclásico'][b]}.` }))},
  {g:'soc', id:'mapaw', type:'campos', title:'2. Escribe las culturas de cada periodo', src:'Como en el examen: llena el mapa conceptual', rule:RULE_MESO, inst:'Escribe las culturas que van en cada periodo.',
   items:[{p:'Preclásico (2500 a. C. – 200 d. C.). Cultura:', f:[{a:['olmecas','olmeca'], w:12}], why:'Preclásico: olmecas, la «cultura madre».'},
     {p:'Clásico (200 d. C. – 900 d. C.). Escribe sus 3 culturas:', f:[{l:'1.', a:['teotihuacanos','zapotecas','mayas']},{l:'2.', a:['teotihuacanos','zapotecas','mayas']},{l:'3.', a:['teotihuacanos','zapotecas','mayas']}], why:'Clásico: teotihuacanos, zapotecas y mayas.', ojo:1, distinct:1},
     {p:'Posclásico (900 d. C. – 1521). Escribe sus 3 culturas:', f:[{l:'1.', a:['toltecas','mixtecas','mexicas']},{l:'2.', a:['toltecas','mixtecas','mexicas']},{l:'3.', a:['toltecas','mixtecas','mexicas']}], why:'Posclásico: toltecas, mixtecas y mexicas.', ojo:1, distinct:1}]},
  {g:'soc', id:'fechas', type:'elige', title:'Fechas de los periodos', src:'Mesoamérica', rule:RULE_MESO,
   items:[SQ('¿Cuándo fue el Preclásico?','2500 a. C. – 200 d. C.',['200 d. C. – 900 d. C.','900 d. C. – 1521'],'Preclásico: 2500 a. C. – 200 d. C.'),
     SQ('¿Cuándo fue el Clásico?','200 d. C. – 900 d. C.',['2500 a. C. – 200 d. C.','900 d. C. – 1521'],'Clásico: 200 d. C. – 900 d. C.'),
     SQ('¿Cuándo fue el Posclásico?','900 d. C. – 1521',['200 d. C. – 900 d. C.','2500 a. C. – 200 d. C.'],'Posclásico: 900 d. C. – 1521.'),
     SQ('¿Qué periodo fue primero?','Preclásico',['Clásico','Posclásico'],'Pre = antes: el Preclásico fue primero.'),
     SQ('¿Qué periodo fue el último?','Posclásico',['Clásico','Preclásico'],'Pos = después: el Posclásico fue el último.')]},
  {g:'soc', id:'canales', type:'elige', title:'3. Opción múltiple', src:'Elige la respuesta correcta', rule:RULE_NOM + '<br><br>' + RULE_AREAS,
   items:[SQ('¿Para qué construyeron canales?','Para regar sus cultivos',['Para viajar','Para vivir dentro de ellos'],'Los canales llevaban agua a los cultivos.'),
     SQ('¿Qué sembraban los pueblos de Mesoamérica?','Maíz',['Trigo','Manzanas'],'El maíz era su alimento principal.'),
     SQ('Los pueblos que se movían de un lugar a otro eran…','nómadas',['sedentarios'],'Nómadas: se movían buscando alimento.',1),
     SQ('Los pueblos que se quedaban a vivir en un lugar fijo eran…','sedentarios',['nómadas'],'Sedentarios: lugar fijo y agricultura.',1),
     SQ('¿Qué hacían los nómadas para comer?','Cazaban, pescaban y recolectaban',['Sembraban maíz en un lugar fijo','Compraban en el mercado'],'Los nómadas no sembraban: cazaban y recolectaban.',1)]},
  {g:'soc', id:'nomsed', type:'clas', title:'4. Nómadas y sedentarios', src:'¿Cuál es la diferencia?', buckets:['Nómadas','Sedentarios'], rule:RULE_NOM, inst:'¿Es de los nómadas o de los sedentarios? Toca la columna.',
   items:[['se movían de un lugar a otro',0,1],['cazaban y recolectaban',0],['vivían en cuevas',0],['seguían a los animales',0],['no tenían casa fija',0],
     ['se quedaban en un lugar fijo',1,1],['sembraban maíz',1],['construían casas',1],['construyeron ciudades',1],['practicaban la agricultura',1]].map(([t, b, o]) => ({ t, b, ojo:o, why:`«${t}»: ${b ? 'sedentarios' : 'nómadas'}.` }))},
  {g:'soc', id:'nomw', type:'escribe', title:'4. Escribe la diferencia', src:'Como en el examen: escríbelo con tus palabras', rule:RULE_NOM, inst:'Escribe una oración completa. Empieza con mayúscula y termina con punto.',
   items:[{w:'nómadas', hint:'Ejemplo: Los nómadas se movían…', ojo:1}, {w:'sedentarios', hint:'Ejemplo: Los sedentarios se quedaban…', ojo:1}]},
  {g:'soc', id:'caps', type:'campos', title:'5. Estados y capitales del norte', src:'Como en el examen: escribe la capital o el estado', rule:RULE_CAP, inst:'Escribe la capital o el estado que falta. Con mayúscula y acentos.',
   items:CAPS.map(([e, c]) => ({ p:`Estado: ${e}. ¿Cuál es su capital?`, f:[{a:c, w:14, no: e !== c ? e : null, noMsg:'La instrucción pide la CAPITAL, no el estado.'}], why:`La capital de ${e} es ${c}.`, ojo: ['Sonora','Sinaloa','Coahuila'].includes(e) ? 1 : 0 }))
     .concat(CAPS.filter(([e, c]) => e !== c).map(([e, c]) => ({ p:`Capital: ${c}. ¿De qué estado es?`, f:[{a:e, w:18, no:c, noMsg:'La instrucción pide el ESTADO, no la capital.'}], why:`${c} es la capital de ${e}.`, ojo: ['Hermosillo','Culiacán'].includes(c) ? 1 : 0 })))},
  {g:'soc', id:'capsu', type:'unir', title:'Une el estado con su capital', src:'Estados del norte', rule:RULE_CAP, pairs:CAPS}
];
{ const CL = CULT.map(x => x[0]), per = ['Preclásico','Clásico','Posclásico'];
  const NOM = ['se movían de un lugar a otro','cazaban y recolectaban','vivían en cuevas','seguían a los animales'], SED = ['se quedaban en un lugar fijo','sembraban maíz','construían casas','construyeron ciudades'];
  ACTS.push({g:'soc', id:'leesoc', type:'marca', title:'📖 Lee la instrucción', src:'A veces pide lo contrario', rule:RULE_MESO + '<br><br>' + RULE_NOM,
    items:[0,1,2].flatMap(k => [0,1].map(inv => { const ok = CULT.filter(x => inv ? x[1] !== k : x[1] === k).map(x => x[0]); return { words:CL, ok, inst: inv ? `Toca las culturas que <b>NO</b> son del <b>${per[k]}</b>.` : `Toca las culturas del <b>${per[k]}</b>.` + (k === 1 ? ' Después escribe <b>cuántas</b> son.' : ''), count: !inv && k === 1, why:`${inv ? 'No son del' : 'Son del'} ${per[k]}: ${ok.join(', ')}.` }; }))
      .concat([0,1].map(inv => ({ words:NOM.concat(SED), ok: inv ? SED : NOM, inst: inv ? 'Toca lo que hacían los <b>sedentarios</b>.' : 'Toca lo que hacían los <b>nómadas</b>.', why: inv ? 'Sedentarios: lugar fijo y agricultura.' : 'Nómadas: se movían, cazaban y recolectaban.' })))
      .concat(CAPS.slice(0, 6).map(([e, c], j) => ({ words:[e, c].concat(CAPS.filter(x => x[0] !== e).slice(j, j + 3).flatMap(x => [x[0], x[1]])).filter((v, i, a) => a.indexOf(v) === i), ok: j % 2 ? [e] : [c], inst: j % 2 ? `Toca el <b>ESTADO</b> cuya capital es ${c}.` : `Toca la <b>CAPITAL</b> de ${e}.`, why: `${e} → ${c}.` })))});
}
const GROUPS = [
  {g:'soc', p:1, x:'👑 ¡Reina de la Historia de México!', h:'El México antiguo', d:'Como en el examen del 1.er periodo: áreas, Mesoamérica, nómadas y sedentarios, y estados del norte.'}
];
