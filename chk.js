
  const brl = v => v.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
  const $ = id => document.getElementById(id);
  function calc(){
    const b=+$('base').value||0, v=(+$('volta').value||0)/100, f=(+$('fecha').value||0)/100, t=+$('ticket').value||0;
    const conv=b*v, vend=conv*f, din=vend*t;
    $('r1').textContent = (Math.round(conv*10)/10).toLocaleString('pt-BR');
    $('r2').textContent = (Math.round(vend*10)/10).toLocaleString('pt-BR');
    $('r3').textContent = brl(din);
    $('leitura').innerHTML = din
      ? 'Com os seus números, a base parada vale cerca de <strong>' + brl(din) + '</strong>. Se vier só a metade, são ' + brl(din/2) + '; se vier o dobro, ' + brl(din*2) + '. Os percentuais são chutes: meça o seu primeiro lote de 50 e volte aqui com o número real.'
      : '';
  }
  ['base','volta','fecha','ticket'].forEach(id => $(id).addEventListener('input', calc));
  calc();

  document.querySelectorAll('.copiar').forEach(b => b.addEventListener('click', () => {
    const pre = b.parentElement.querySelector('pre');
    const label = b.textContent;
    const ok = () => { b.textContent = 'Copiado'; setTimeout(() => b.textContent = label, 1800); };
    const manual = () => { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = 'Selecionado: aperte Ctrl+C'; };
    if (navigator.clipboard) navigator.clipboard.writeText(pre.innerText).then(ok).catch(manual); else manual();
  }));
