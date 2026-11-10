  /* Escribe la respuesta en uno o varios espacios (como en el examen) */
  campos(q, it) {
    const top = it.html ? `<div class="qcard">${it.html}</div>` : it.big ? `<div class="qcard"><div class="word${it.big.length > 14 ? ' long' : ''}">${esc(it.big)}</div></div>` : '';
    $('#area').innerHTML = `<div class="qp">${esc(it.p)}</div>${top}
      <div class="flds">${it.f.map((f, k) => `<label class="fld">${f.l ? `<span>${esc(f.l)}</span>` : ''}<input data-k="${k}" type="text" ${f.num ? 'inputmode="numeric"' : ''} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" style="width:${f.w || (f.num ? 6 : 12)}ch">${f.r ? `<span>${esc(f.r)}</span>` : ''}</label>`).join('')}</div>
      <div class="actions"><button class="btn" type="button" id="ck">Revisar ✓</button></div><div id="sh"></div>`;
    const ins = [...document.querySelectorAll('.flds input')]; let tries = 0;
    const N = (v, num) => { v = v.normalize('NFC').trim().toLowerCase().replace(/\s+/g, ' '); return num ? v.replace(/[\s,.]/g, '') : v.replace(/[.]$/, ''); };
    const S = v => v.normalize('NFD').replace(/[̀-ͯ]/g, '');
    $('#ck').onclick = () => {
      if (cur.over) return;
      if (ins.some(x => !x.value.trim())) { fb('bad', 'Falta llenar algún espacio.'); return; }
      let bad = 0, acc = 0;
      const used = new Set();
      it.f.forEach((f, k) => { const v = N(ins[k].value, f.num), ok = [].concat(f.a).map(a => N(String(a), f.num));
        let good = ok.includes(v) && !(it.distinct && used.has(v)); used.add(v); if (!good) { bad++; if (ok.map(S).includes(S(v))) acc++; }
        ins[k].classList.toggle('ok', good); ins[k].classList.toggle('bad', !good); });
      if (!bad) { ins.forEach(x => x.blur()); rightQ(q, it.why, 1); return; }
      tries++; wrongQ(q, ...ins.filter(x => x.classList.contains('bad')));
      if (acc) fb('bad', '¡Casi! Revisa los acentos (´).');
      else if (it.hint && tries === 1) fb('bad', it.hint);
      if (tries >= 2) $('#sh').innerHTML = `<div class="hint" style="text-align:center">La respuesta es:</div><div class="show" style="text-align:center">${it.f.map(f => esc(String([].concat(f.a)[0]))).join(' · ')}</div><div class="hint" style="text-align:center">Escríbela tú para seguir.</div>`;
    };
  },
  /* Ordena tocando en orden */
  ordena(q, it) {
    const pool = shuffle(it.nums.map((n, j) => ({ n, j }))), put = [];
    const draw = () => {
      $('#area').innerHTML = `<div class="qp">${esc(it.p)}</div>
        <div class="qcard"><div class="slots">${it.nums.map((_, k) => `<button type="button" class="tok slotb${put[k] ? ' ok' : ''}" data-k="${k}">${put[k] ? esc(put[k].n) : '___'}</button>`).join('')}</div></div>
        <div class="sent" id="pool">${pool.map(x => put.includes(x) ? '' : `<button type="button" class="tok" data-j="${x.j}">${esc(x.n)}</button>`).join('')}</div>
        <div class="actions"><button class="btn" type="button" id="ck">Revisar ✓</button></div>`;
      $('#pool').onclick = e => { const b = e.target.closest('.tok'); if (!b || cur.over) return; put.push(pool.find(x => x.j === +b.dataset.j)); draw(); };
      document.querySelectorAll('.slotb').forEach(b => b.onclick = () => { if (cur.over) return; const k = +b.dataset.k; if (put[k]) { put.splice(k, 1); draw(); } });
      $('#ck').onclick = () => {
        if (cur.over) return;
        if (put.length < it.nums.length) { fb('bad', 'Coloca todos los números.'); return; }
        const okk = put.every((x, k) => String(x.n) === String(it.a[k]));
        if (okk) { rightQ(q, it.why, 1); return; }
        wrongQ(q); fb('bad', 'Casi. Toca un número de arriba para quitarlo y vuelve a acomodarlo.');
      };
    };
    draw();
  },
  /* Problema con los pasos del examen: Comprendo · Planeo (barras) · Resuelvo · Resultado */
  prob(q, it) {
    let k = 0;
    const draw = () => {
      const st = it.steps[k], fin = k >= it.steps.length;
      $('#area').innerHTML = `<div class="qcard"><div class="word long">${esc(it.text)}</div></div>
        <div class="psteps">${['Comprendo', 'Planeo (barras)', 'Resuelvo', 'Resultado'].map((s, j) => `<span class="pst${j < Math.min(k, 3) ? ' done' : j === Math.min(k, 3) ? ' now' : ''}">${s}</span>`).join('')}</div>
        ${fin ? `<div class="qp">Resultado:</div><div class="flds"><label class="fld"><span>${esc(it.res[0])}</span><input id="in" type="text" inputmode="numeric" autocomplete="off" style="width:7ch"><span>${esc(it.res[1])}</span></label></div>
          <div class="actions"><button class="btn" type="button" id="ck">Revisar ✓</button></div><div id="sh"></div>`
        : `<div class="qp">${esc(st.p)}</div><div class="opts" id="op">${shuffle(st.o.map((o, j) => ({ o, j }))).map(x => `<button class="opt small" type="button" data-j="${x.j}">${x.o}</button>`).join('')}</div>`}`;
      if (!fin) $('#op').onclick = e => { const b = e.target.closest('.opt'); if (!b || cur.over) return;
        if (+b.dataset.j === st.a) { b.classList.add('ok'); fb('ok', '¡Bien!'); $('#note').innerHTML = st.why ? `<div class="note"><div class="why">💡 ${st.why}</div></div>` : ''; setTimeout(() => { k++; draw(); }, 1100); }
        else { b.classList.add('bad'); b.disabled = true; wrongQ(q, b); if (st.no) fb('bad', st.no); } };
      else { let tries = 0; const inp = $('#in');
        $('#ck').onclick = () => { if (cur.over) return; const v = inp.value.replace(/[\s,.]/g, ''); if (!v) return;
          if (v === String(it.ans)) { inp.classList.add('ok'); $('#note').innerHTML = ''; rightQ(q, it.why, 1); return; }
          tries++; inp.classList.add('bad'); setTimeout(() => inp.classList.remove('bad'), 700); wrongQ(q, inp);
          fb('bad', 'Revisa tu operación: ¿copiaste bien los números? ¿Llevaste o pediste prestado?');
          if (tries >= 2) $('#sh').innerHTML = `<div class="hint" style="text-align:center">${esc(it.op)}</div>`; }; }
    };
    draw();
  },
