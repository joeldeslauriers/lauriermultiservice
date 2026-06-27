/* ============================================================
   LAURIER MULTI SERVICE — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Lucide icons ─────────────────────────────────────────── */
  if (typeof lucide !== 'undefined') lucide.createIcons();

  /* ── Preloader ────────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('done'), 500);
    });
    // Fallback in case load never fires
    setTimeout(() => preloader?.classList.add('done'), 3000);
  }

  /* ── Navigation scroll ────────────────────────────────────── */
  const nav = document.getElementById('nav');
  if (nav) {
    const handleScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ── Mobile menu ──────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  const closeMobile = () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    mobileOverlay?.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileOverlay?.addEventListener('click', closeMobile);
  document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', closeMobile));

  /* ── Active nav link ──────────────────────────────────────── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Scroll-to-top FAB ────────────────────────────────────── */
  const fabTop = document.getElementById('fabTop');
  if (fabTop) {
    window.addEventListener('scroll', () => {
      fabTop.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    fabTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── Before / After sliders ───────────────────────────────── */
  document.querySelectorAll('.ba-container').forEach(container => {
    const before = container.querySelector('.ba-before');
    const line   = container.querySelector('.ba-line');
    const handle = container.querySelector('.ba-handle');
    if (!before || !line || !handle) return;

    let dragging = false;

    const setPos = (clientX) => {
      const r = container.getBoundingClientRect();
      let p = ((clientX - r.left) / r.width) * 100;
      p = Math.max(2, Math.min(98, p));
      before.style.clipPath = `inset(0 ${100 - p}% 0 0)`;
      line.style.left   = `${p}%`;
      handle.style.left = `${p}%`;
      handle.style.transform = 'translate(-50%, -50%)';
    };

    container.addEventListener('mousedown', (e) => { dragging = true; setPos(e.clientX); });
    document.addEventListener('mouseup',    () => { dragging = false; });
    document.addEventListener('mousemove',  (e) => { if (dragging) setPos(e.clientX); });
    container.addEventListener('touchstart', (e) => { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('touchend',    () => { dragging = false; });
    document.addEventListener('touchmove',   (e) => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
    container.addEventListener('click', (e) => setPos(e.clientX));
  });

  /* ── Gallery filter ───────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCells = document.querySelectorAll('.gallery-cell');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      galleryCells.forEach(cell => {
        const show = filter === '*' || cell.dataset.category === filter;
        cell.style.display = show ? '' : 'none';
        if (show) {
          cell.style.opacity = '0';
          cell.style.transform = 'scale(0.94)';
          requestAnimationFrame(() => {
            cell.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            cell.style.opacity = '1';
            cell.style.transform = 'scale(1)';
          });
        }
      });
    });
  });

  /* ── Contact / Soumission form ────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const serviceSelect = document.getElementById('typeService');
    const sousServiceWrapper = document.getElementById('sousServiceWrapper');
    const sousServiceSelect  = document.getElementById('sousService');

    const subServices = {
      'Rénovation': ['Pose de plancher flottant','Moulures','Installation de portes','Remplacement de toilette','Construction de deck','Réparation de deck','Construction de clôture','Réparation de clôture','Recouvrement d\'escalier','Restauration d\'escalier','Peinture','Teinture','Installation de luminaires','Backsplash','Installation de hotte de cuisine','Autre'],
      'Entretien extérieur': ['Nettoyage de gouttières','Tonte de pelouse','Coupe-bordure','Taille de haies','Application de scellant d\'asphalte','Autre'],
      'Informatique': ['Réparation d\'ordinateur','Réparation logicielle','Nettoyage d\'ordinateur','Optimisation Windows','Installation de caméras de sécurité','Création de site web','Gestion de site web','Réseau résidentiel','Autre'],
      'Mécanique légère': ['Changement d\'huile','Changement d\'ampoules','Changement d\'essuie-glaces','Changement de batterie','Changement de filtre à air','Changement de roues','Autre'],
    };

    serviceSelect?.addEventListener('change', () => {
      const subs = subServices[serviceSelect.value];
      if (subs && sousServiceWrapper && sousServiceSelect) {
        sousServiceWrapper.style.display = '';
        sousServiceSelect.innerHTML = '<option value="">Sélectionner...</option>' +
          subs.map(s => `<option value="${s}">${s}</option>`).join('');
      } else if (sousServiceWrapper) {
        sousServiceWrapper.style.display = 'none';
      }
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Envoi en cours...';
      }

      const formData = new FormData(contactForm);

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (data.success) {
          const formEl  = document.getElementById('formContent');
          const success = document.getElementById('formSuccess');
          if (formEl)  formEl.style.display = 'none';
          if (success) { success.style.display = 'block'; success.classList.add('show'); }
          if (typeof lucide !== 'undefined') lucide.createIcons();
        } else {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i data-lucide="send"></i> Envoyer ma demande';
            if (typeof lucide !== 'undefined') lucide.createIcons();
          }
          alert('Une erreur s\'est produite. Veuillez réessayer ou nous appeler au 514-622-7486.');
        }
      } catch {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '<i data-lucide="send"></i> Envoyer ma demande';
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }
        alert('Impossible d\'envoyer le formulaire. Vérifiez votre connexion ou appelez-nous au 514-622-7486.');
      }
    });
  }


  /* ── Spinner helper ───────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `.spinner{display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;vertical-align:middle;margin-right:8px;}`;
  document.head.appendChild(style);

});
