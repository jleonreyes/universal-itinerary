import re, sys, json
sys.path.insert(0,'/home/claude/build'); from en import EN, THEME_EN, SL_EN
T = open('/home/claude/universal-itinerary/repaso-espanol/index.html', encoding='utf-8').read()
EXTRA_R = open('/home/claude/build/extra_renders.js', encoding='utf-8').read()
EXTRA_C = open('/home/claude/build/extra_css.css', encoding='utf-8').read()
THEMES = open('/home/claude/build/themes.js', encoding='utf-8').read()

def build(cfg):
    s = T
    # --- head / titles
    s = s.replace('<meta name="apple-mobile-web-app-title" content="Español">', f'<meta name="apple-mobile-web-app-title" content="{cfg["short"]}">')
    s = s.replace('<meta name="theme-color" content="#F9D2E0">', f'<meta name="theme-color" content="{cfg["bg"]}">')
    s = s.replace('<title>Repaso de Español</title>', f'<title>{cfg["title"]}</title>')
    s = s.replace('--bg:#F9D2E0;', f'--bg:{cfg["bg"]};')
    s = s.replace('<div class="kicker">Español · Cuaderno espiral azul</div>', f'<div class="kicker">{cfg["kicker"]}</div>')
    s = s.replace('<h1>Repaso de Español</h1>', f'<h1>{cfg["title"]}</h1>')
    s = s.replace('<html lang="es">', f'<html lang="{cfg.get("lang","es")}">')
    # --- css + renders
    s = s.replace('</style>\n</head>', EXTRA_C + '</style>\n</head>', 1) if '</style>\n</head>' in s else s.replace('</style>', EXTRA_C + '</style>', 2).replace(EXTRA_C, '', 1)
    anchor = "  /* Separa en sílabas y clasifica */\n  sil(q, it) {"
    assert anchor in s; s = s.replace(anchor, EXTRA_R + anchor, 1)
    s = s.replace("  tabla:'Completa la fila de la tabla", "  campos:'Escribe la respuesta en el espacio y toca «Revisar».',\n  ordena:'Toca los elementos en el orden correcto. Toca uno de arriba para quitarlo.',\n  prob:'Sigue los pasos del examen: Comprendo, Planeo, Resuelvo y Resultado.',\n  tabla:'Completa la fila de la tabla", 1)
    # --- content: replace from 'const ACTS = [' up to 'const PERIODS'
    a = s.index('const ACTS = ['); b = s.index('const PERIODS')
    content = open('/home/claude/build/'+cfg['content'], encoding='utf-8').read()
    s = s[:a] + content + "\nconst BYID = Object.fromEntries(ACTS.map(a => [a.id, a]));\n" + s[b:]
    # --- rewards block
    a = s.index('/* ================= PELUCHES'); b = s.index('/* ================= JUGADORAS')
    s = s[:a] + (SL_EN if cfg.get('lang') == 'en' else '') + 'const THEME = ' + cfg['theme'] + ';\n' + THEMES + '\n' + s[b:]
    s = re.sub(r"const FIRST = \{.*?\};\n", "const FIRST = { a: { cat: 0, label: THEME.cats[0] }, b: { cat: 1, label: THEME.cats[1] }, c: { cat: 2, label: THEME.cats[2] } };\n", s, count=1, flags=re.S)
    s = s.replace("first: 'oso' }, { id: 'p2', name: 'Pillus Makakikus', first: 'nutria' }", "first: 'a' }, { id: 'p2', name: 'Pillus Makakikus', first: 'b' }")
    s = re.sub(r"// Pillus empieza con la nutria.*?\nplayers\.forEach\(x => \{ if \(x\.id === 'p2' && x\.first === 'mon'\).*?\n", "", s, count=1)
    s = s.replace("let newFirst = 'ani';", "let newFirst = 'a';").replace("newFirst = 'ani';", "newFirst = 'a';")
    s = s.replace("(FIRST[p && p.first] || FIRST.ani).cat", "(FIRST[p && p.first] || FIRST.a).cat")
    # --- storage prefix
    s = s.replace("'esp-", f"'{cfg['pre']}-").replace("`esp-", f"`{cfg['pre']}-")
    # --- period 2 placeholder
    old = "  $('#groups').innerHTML = GROUPS.filter(G => G.p === PER).map(G => `"
    assert old in s
    s = s.replace(old, "  if (!GROUPS.some(G => G.p === PER)) { $('#groups').innerHTML = `<div class=\"p2empty\"><b>📒 ${PERIODS.find(P => P.p === PER).h}</b><br>Aquí van a aparecer los temas nuevos en cuanto lleguen los apuntes del cuaderno.<br>Mientras, repasa el 1.er periodo.</div>`; return; }\n" + old, 1)
    # retos text
    s = s.replace("¡Gana los 5 para la muñeca final!", "¡Gánalos todos para el premio final!").replace("Ganaste los 5 retos con 3 ★", "Ganaste todos los retos con 3 ★")
    # --- words
    W = cfg['w']
    for a_, b_ in W: s = s.replace(a_, b_)
    s = s.replace('🧸', cfg['emoji'])
    # remove Spanish-only voice? keep. set lang voice for English apps
    if cfg.get('lang') == 'en':
        s = s.replace("/es[-_]MX/i.test(v.lang)) || vs.find(v => /es[-_]US/i.test(v.lang))", "/en[-_]US/i.test(v.lang)) || vs.find(v => /en[-_]/i.test(v.lang))").replace("u.lang = VOICE ? VOICE.lang : 'es-MX'", "u.lang = VOICE ? VOICE.lang : 'en-US'")
    if cfg.get('lang') == 'en':
        miss=[a for a,b in EN if a not in s]
        if miss: print('EN missing:', [m[:50] for m in miss])
        for a_, b_ in EN: s = s.replace(a_, b_)
        s = s.replace("name:(c, n) => SL_EN", "name:(c, n) => SL_EN")
    return s

masc = lambda sg, pl, Sg, Pl: [('Mis repisas de peluches', f'Mi colección de {pl}'), ('Peluches reales', f'{Pl} reales'), ('Peluches de reto', f'{Pl} de reto'), ('Peluche real', f'{Sg} real'), ('Peluche de reto', f'{Sg} de reto'), ('peluches', pl), ('peluche', sg), ('Peluche', Sg), ('Muñeca final', 'Premio final'), ('la muñeca final', 'el premio final'), ('Rubia para Pillus, castaña para Pelonchis.', '')]
fem = [('Mis repisas de peluches', 'Mi casita de muñecas'), ('un peluche', 'una muñeca'), ('Un peluche', 'Una muñeca'), ('el peluche', 'la muñeca'), ('El peluche', 'La muñeca'), ('los peluches', 'las muñecas'), ('Los peluches', 'Las muñecas'), ('Mis peluches', 'Mis muñecas'), ('Peluches reales', 'Muñecas reales'), ('Peluches de reto', 'Muñecas de reto'), ('Peluche real', 'Muñeca real'), ('Peluche de reto', 'Muñeca de reto'), ('peluches', 'muñecas'), ('peluche', 'muñeca'), ('Peluche', 'Muñeca'), ('verlo de cerca', 'verla de cerca'), ('Muñeca final', 'Muñeca gigante')]
CFG = {
 'science': dict(title='Science Review', short='Science', kicker='Science · 3rd grade', bg='#D8F3E6', pre='sci', lang='en', content='science.js', emoji='🟢',
   theme=THEME_EN, theme_es="{ kind:'slime', cats:['Slimes de colores','Slimes con brillitos','Slimes esponjosos'], name:(c, n) => ['Slime ', 'Brillito ', 'Esponjoso '][c] + n, royals:['Reina Slime Fresa','Rey Slime Menta','Reina Slime Uva','Rey Slime Océano','Reina Slime Chicle','Rey Slime Kiwi','Reina Slime Lavanda','Rey Slime Mango','Reina Slime Galaxia'], specials:['Slime Estrella Fugaz','Slime Cometa','Slime Arcoíris'], finals:['Slime Gigante Galaxia','Slime Gigante Arcoíris'], word:{ realCap:'Slime real', retoCap:'Slime de reto', finalCap:'Slime gigante' } }",
   w=masc('slime', 'slimes', 'Slime', 'Slimes')),
 'sociales': dict(title='Ciencias Sociales', short='Sociales', kicker='Ciencias Sociales · 3.º de primaria', bg='#FDE7C8', pre='soc', content='sociales.js', emoji='🪆',
   theme="{ kind:'doll', photos:{ names:['Reina Azul', 'Reina Rosa Roja', 'Reina Violeta', 'Muñeca Arcoíris', 'Princesa de Nieve Rubia', 'Princesa de Perlas Castaña', 'Hada del Bosque', 'Trenza de Nieve', 'Rosa Silvestre', 'Mariposa Monarca', 'Pavo Real', 'Girasol', 'Otoño Dorado', 'Cupcake', 'Lavanda', 'Jardín de Rosas', 'Cereza Roja', 'Sirenita del Mar', 'Noche Estrellada', 'Arcoíris Feliz', 'Bordado de Fiesta', 'Pradera del Conejo', 'Turquesa', 'Campo de Lavanda', 'Flor de Cerezo', 'Talavera', 'Caperucita del Bosque', 'Tulipanes', 'Jardín Tropical', 'Reina del Invierno', 'Flor de Loto', 'Picnic de Cerezas', 'Galaxia', 'Faro del Mar', 'Calabaza de Otoño', 'Luna y Estrellas', 'Globo Aerostático', 'Carrusel', 'Notas Musicales', 'Bailarina', 'Llave del Corazón', 'Limones', 'Moras Azules', 'Plumas de Pavo', 'Flor de Cactus', 'Venadito del Bosque', 'Pueblo Nevado', 'Macarons', 'Farolitos', 'Vitral', 'Escamas de Sirena', 'Libélulas', 'Colibrí', 'Amapolas', 'Margaritas', 'Lirios', 'Grullas de Papel', 'Colcha de Retazos', 'Lunares', 'Picnic de Girasoles', 'Constelaciones', 'Amanecer', 'Tormenta y Arcoíris', 'Hora del Té', 'Puerta del Jardín', 'Faro de la Costa', 'Calabazas', 'Bufanda y Guantes', 'Paraguas de Lluvia', 'Selva', 'Lago de Lotos', 'Remolino Galáctico', 'Exploradora del Templo', 'Aldea Nevada', 'Castillo de Noche', 'Domadora de Dragones', 'Tren a la Escuela de Magia', 'Estudiante de Magia', 'Bebé Dinosaurio', 'Balsa de Rápidos', 'Tobogán de Agua', 'Astronauta y su Amiguito', 'Robotina', 'Superheroína', 'Isla Tropical', 'Montaña Rusa Musical', 'Tacitas Locas', 'Pirata del Tesoro', 'Algodón de Azúcar', 'Máscara de Carnaval', 'Fuegos Artificiales', 'Mansión Embrujada', 'Brujita de la Poción', 'Globo de Aventura', 'Donitas y Lunares', 'Castillo Rosa', 'Isla del Volcán', 'Exploradora de la Selva', 'Laguna de Sirenas', 'Helado de Fresa', 'Copo de Hielo', 'Sol Tropical', 'Pueblito de Invierno', 'Capa Roja', 'Corona de Margaritas', 'Estrella Fugaz', 'Lago de Nenúfares', 'Puerta de Rosas'], royals:[0,1,2], reto:3, finals:[5,4] }, cats:['Muñecas de trapo','Muñecas de fiesta','Muñecas exploradoras'], name:(c, n) => ['Muñeca ', 'Muñeca ', 'Exploradora '][c] + n + ['', ' de Fiesta', ''][c], royals:['Princesa Fresa','Princesa Menta','Princesa Uva','Princesa Cielo','Princesa Mango','Princesa Coral','Princesa Lavanda','Princesa Turquesa','Princesa Galaxia'], specials:['Muñeca Mexica','Muñeca Maya','Muñeca Olmeca'], finals:['Princesa de Perlas Castaña','Princesa de Nieve Rubia'], word:{ realCap:'Muñeca real', retoCap:'Muñeca de reto', finalCap:'Muñeca gigante' } }",
   w=fem),
 'mate': dict(title='Matemáticas', short='Mate', kicker='<a href="../" style="color:inherit">← MultiParque</a> · Matemáticas', bg='#DDE8FB', pre='mat', content='mate.js', emoji='🤖',
   theme="{ kind:'robot', cats:['Robots de juguete','Robots voladores','Robots de cuerda'], name:(c, n) => ['Robot ', 'Volador ', 'Robot de cuerda '][c] + n, royals:['Rey Robot Dorado','Reina Robot Rosa','Rey Robot Turbo','Reina Robot Chispa','Rey Robot Tuerca','Reina Robot Pixel','Rey Robot Cometa','Reina Robot Brillo','Rey Robot Galaxia'], specials:['Robot Calculadora','Robot Ábaco','Robot Regla'], finals:['Megarrobot Plateado','Megarrobot Dorado'], word:{ realCap:'Robot real', retoCap:'Robot de reto', finalCap:'Megarrobot' } }",
   w=masc('robot', 'robots', 'Robot', 'Robots')),
}
for k, out in [('science', sys.argv[1]), ('sociales', sys.argv[2]), ('mate', sys.argv[3])]:
    open(out, 'w', encoding='utf-8').write(build(CFG[k]))
print('built')
