// Sombra no header ao rolar a página
var header = document.getElementById('topo');
var onScroll = function(){
  if(window.scrollY > 8){ header.classList.add('is-scrolled'); }
  else{ header.classList.remove('is-scrolled'); }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Ano atual no rodapé
var anoEl = document.getElementById('ano-atual');
if(anoEl){ anoEl.textContent = new Date().getFullYear(); }

// Botão "voltar ao topo": aparece depois de rolar a página
var backToTop = document.getElementById('back-to-top');
if(backToTop){
  var toggleBackToTop = function(){
    if(window.scrollY > 480){ backToTop.classList.add('is-visible'); }
    else{ backToTop.classList.remove('is-visible'); }
  };
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTop.addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Formulário de agendamento -> monta mensagem e abre WhatsApp
var form = document.getElementById('booking-form');
var status = document.getElementById('form-status');
// Número FICTÍCIO — trocar pelo mesmo número usado nos botões acima
var WHATSAPP_NUMERO = '5511999999999';

if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();

    var nome = form.nome.value.trim();
    var whatsapp = form.whatsapp.value.trim();

    if(!nome || !whatsapp){
      status.textContent = 'Por favor, preencha nome e WhatsApp para continuar.';
      return;
    }

    var parentesco = form.parentesco.value.trim();
    var periodo = form.periodo.value;
    var mensagem = form.mensagem.value.trim();

    var texto = 'Olá! Gostaria de agendar uma avaliação gratuita.\n' +
      'Nome: ' + nome + '\n' +
      'WhatsApp: ' + whatsapp + '\n' +
      (parentesco ? ('Parentesco: ' + parentesco + '\n') : '') +
      'Melhor período: ' + periodo + '\n' +
      (mensagem ? ('Detalhes: ' + mensagem) : '');

    var link = 'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + encodeURIComponent(texto);

    status.textContent = 'Tudo certo! Abrindo o WhatsApp para você confirmar o envio da mensagem.';
    window.open(link, '_blank', 'noopener');
    form.reset();
  });
}

// Menu hambúrguer (celular/tablet); no desktop o menu fica sempre visível
var menuBtn = document.querySelector('.menu-toggle');
var menuNav = document.getElementById('menu-principal');
if(menuBtn && menuNav){
  var setMenu = function(open){
    menuNav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  menuBtn.addEventListener('click', function(){
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });
  menuNav.addEventListener('click', function(e){
    if(e.target.closest('a')){ setMenu(false); }
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true'){
      setMenu(false);
      menuBtn.focus();
    }
  });
  document.addEventListener('click', function(e){
    if(!header.contains(e.target)){ setMenu(false); }
  });
  window.matchMedia('(min-width: 980px)').addEventListener('change', function(){ setMenu(false); });
}
