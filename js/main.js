/**
 * SAHAR NASEEM — PORTFOLIO & CV INTERACTION SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPortfolioFilter();
  initCaseStudyModal();
  initClipboardToast();
  initContactForm();
});

/* ==========================================================================
   NAVBAR & SCROLLSPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  // Navbar scroll background change
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scrollspy
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on any link or button click inside nav menu
    const allMenuClickables = navMenu.querySelectorAll('a, button');
    allMenuClickables.forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ==========================================================================
   PORTFOLIO FILTER
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('.case-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      caseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   CASE STUDY MODAL DATA & CONTROLLER
   ========================================================================== */
const caseStudiesData = {
  'case-seating': {
    badge: 'Operations & Logistics',
    client: 'BellaLuxe Events • 350-Guest Private Gala (Texas)',
    title: '350+ Guest Venue Logistics, Prismm 3D CAD & Seating Blueprints',
    image: 'assets/portfolio/seating-plan-layout.webp',
    imageAlt: 'Table Seating & Spatial Planning Blueprint',
    challenge: 'Coordinating high-density seating, VIP staging line-of-sight, and safety clearance for a 350-guest gala wedding across expansive venue spaces.',
    solution: 'Engineered comprehensive 3D CAD venue maps using Prismm; structured 35 numbered table allocations (10 seats/table); orchestrated master run-sheets and attendee databases across Paperless Post and Greenvelope.',
    bullets: [
      'Engineered detailed 3D spatial floor plans and seating assignments for 35 tables (350 attendees).',
      'Coordinated physical and digital guest itineraries, dietary lists, and RSVP delivery issue resolutions.',
      'Ensured full compliance with venue capacities, emergency egress rules, and vendor setup clearances.',
      'Maintained real-time run-sheets keeping vendors, decor teams, and hosts synchronised.'
    ],
    outcome: 'Zero seating bottlenecks on event day, seamless guest check-in, and commendation from the executive client for calm, flawless coordination.'
  },
  'case-rfp': {
    badge: 'Commercial & Procurement',
    client: 'BellaLuxe Events • Nashville Gala & Private Events',
    title: 'Nashville Multi-Vendor Procurement & RFP Cost Analysis',
    image: 'assets/portfolio/vendor-procurement.webp',
    imageAlt: 'Vendor Procurement & RFP Comparison Matrix',
    challenge: 'Identifying, vetting, and negotiating with specialised suppliers (photo booth activations, AV, custom print) in Nashville under stringent delivery deadlines and budget caps.',
    solution: 'Conducted rigorous market research; designed side-by-side RFP comparative matrices evaluating equipment redundancy, custom branding capabilities, insurance, and service SLA.',
    bullets: [
      'Vetted multiple specialised vendors across equipment, print capacity, and redundancy criteria.',
      'Developed detailed cost-comparison matrices detailing hourly rates, setup fees, and contract terms.',
      'Negotiated milestone contracts ensuring vendor accountability and backup equipment guarantees.',
      'Delivered client-ready executive summaries enabling confident and rapid executive sign-off.'
    ],
    outcome: 'Selected top-rated partner with over $1,200 in negotiated budget savings and 100% operational uptime during the event.'
  },
  'case-proposal': {
    badge: 'Commercial & Procurement',
    client: 'BellaLuxe Events • Commercial Production Client',
    title: 'Milestone Commercial Proposals & Financial Invoicing ($12k+)',
    image: 'assets/portfolio/event-decor-proposal.webp',
    imageAlt: 'Commercial Proposal and Decor Invoice Breakdown',
    challenge: 'Structuring clear, transparent, and legally sound financial agreements for high-value decor installations ($10,000+) across international clients.',
    solution: 'Designed comprehensive milestone-based proposals and itemised invoices breaking down stage builds, floral arches, custom monograms, lighting, and breakdown fees with clear payment schedules.',
    bullets: [
      'Created structured milestone invoices ($11,995 total contract) with 50/30/20 deposit and balance terms.',
      'Itemised complex supplier costs (silk florals, sweetheart stages, dance floor monograms, custom signage).',
      'Managed payment tracking, client reconciliation, and supplier disbursements.',
      'Maintained clean, audited financial documentation for accounting records.'
    ],
    outcome: '100% timely invoice payment collection with zero billing disputes, strengthening client trust and commercial cash flow.'
  },
  'case-specs': {
    badge: 'Operations & Logistics',
    client: 'BellaLuxe Events • Ceremony Production Operations',
    title: 'Event Design Specifications, Attire Tracking & Itineraries',
    image: 'assets/portfolio/event-design-specs.webp',
    imageAlt: 'Event Design Specifications & Attire Matrix',
    challenge: 'Managing intricate ceremony decor, custom multi-zone aesthetics (stairway banisters, cocktail hour museum, sweetheart arch), and bridal party measurements across distributed team members.',
    solution: 'Compiled unified visual inspiration decks, precise bridal party measurement trackers, and exact execution specs for on-site production crews.',
    bullets: [
      'Drafted multi-page visual specification decks detailing floral palette, lighting, and custom signage.',
      'Created bridal party attire trackers recording exact tailor measurements and sizing preferences.',
      'Liaised directly with domestic and international fabricators to ensure accurate fabrication.',
      'Directed setup crew on-site protocols to mirror approved visual renderings.'
    ],
    outcome: 'Achieved exact visual fidelity to client brief, completing complex multi-area staging 2 hours ahead of schedule.'
  },
  'case-saharscents': {
    badge: 'Brand & Retail Operations',
    client: 'SaharScents • London, UK (saharscents.com)',
    title: 'End-to-End Luxury Fragrance Supply Chain & Retail Pop-Up Operations',
    image: 'assets/portfolio/saharscents-discovery.webp',
    imageAlt: 'SaharScents Luxury Discovery Fragrance Set',
    challenge: 'Launching and scaling an independent artisan luxury fragrance house (alcohol-free, vegan & cruelty-free perfumes, candles, and beard oils) from supply chain to customer hands.',
    solution: 'Spearheaded end-to-end operational workflows: sourcing domestic bottle/box packaging suppliers, managing batch production records, running retail pop-up market stands, and managing POS and inventory.',
    bullets: [
      'Sourced high-grade amber/matte packaging and print suppliers, negotiating lower unit costs.',
      'Directed in-person retail pop-ups: booth spatial design, POS inventory logistics, and customer sales.',
      'Produced digital marketing assets, product photography, and social videos (Canva, CapCut).',
      'Integrated e-commerce workflows (Shopify), order fulfilment, and HMRC tax documentation.'
    ],
    outcome: 'Rapid multi-channel customer acquisition, verified 5-star product ratings, and a flourishing brand footprint across London and online.'
  }
};

function initCaseStudyModal() {
  const modalBackdrop = document.getElementById('caseModal');
  if (!modalBackdrop) return;

  const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
  const triggerBtns = document.querySelectorAll('[data-case-trigger]');

  const modalBadge = document.getElementById('modalBadge');
  const modalClient = document.getElementById('modalClient');
  const modalTitle = document.getElementById('modalTitle');
  const modalImg = document.getElementById('modalImg');
  const modalChallenge = document.getElementById('modalChallenge');
  const modalSolution = document.getElementById('modalSolution');
  const modalBullets = document.getElementById('modalBullets');
  const modalOutcome = document.getElementById('modalOutcome');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const caseKey = btn.getAttribute('data-case-trigger');
      const data = caseStudiesData[caseKey];

      if (!data) return;

      modalBadge.textContent = data.badge;
      modalClient.textContent = data.client;
      modalTitle.textContent = data.title;
      modalImg.src = data.image;
      modalImg.alt = data.imageAlt;
      modalChallenge.textContent = data.challenge;
      modalSolution.textContent = data.solution;
      modalOutcome.textContent = data.outcome;

      // Render bullets
      modalBullets.innerHTML = '';
      data.bullets.forEach(bulletText => {
        const li = document.createElement('li');
        li.className = 'modal-bullet-item';
        li.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${bulletText}</span>
        `;
        modalBullets.appendChild(li);
      });

      // Show modal
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close handlers
  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  const modalCtaBtn = modalBackdrop.querySelector('.modal-close-btn-cta');
  if (modalCtaBtn) {
    modalCtaBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   CLIPBOARD & TOAST NOTIFICATION
   ========================================================================== */
function initClipboardToast() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');

  let toastTimeout;

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');

      navigator.clipboard.writeText(textToCopy).then(() => {
        if (toastText) toastText.textContent = `Copied: ${textToCopy}`;
        if (toast) {
          toast.classList.add('show');
          clearTimeout(toastTimeout);
          toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
          }, 3000);
        }
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  });
}

/* ==========================================================================
   CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('inquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    const subject = encodeURIComponent(`Enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const mailtoUrl = `mailto:saharnaseem.va@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    const toast = document.getElementById('toastNotification');
    const toastText = document.getElementById('toastText');
    if (toast && toastText) {
      toastText.textContent = 'Opening your email client...';
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    }
  });
}
