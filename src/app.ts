import { goats, feedProducts, type GoatPurpose } from './data/goats'
import { images } from './data/images'
import { callUrl, whatsappLink } from './config/contact'
import { FARM_ADDRESS, FARM_EMAIL, LOGO_SRC, SOCIAL } from './config/site'

type Filter = 'all' | GoatPurpose

let activeFilter: Filter = 'all'

const HERO_IMG = images.hero
const ABOUT_IMG = images.about
const MEAT_IMG = images.meatBanner
const SERVICES_BG = images.servicesBg

function purposeLabel(purpose: GoatPurpose): string {
  const map: Record<GoatPurpose, string> = {
    sale: 'For Sale',
    qurbani: 'Qurbani',
    breeding: 'Breeding',
  }
  return map[purpose]
}

function purposeBadgeClass(purpose: GoatPurpose): string {
  const map: Record<GoatPurpose, string> = {
    sale: 'bg-sage/20 text-forest',
    qurbani: 'bg-gold/20 text-earth',
    breeding: 'bg-meadow/40 text-forest',
  }
  return map[purpose]
}

function socialIcons(iconClass = 'social-icon'): string {
  return `
    <div class="flex items-center gap-2">
      <a href="${SOCIAL.facebook}" target="_blank" rel="noopener noreferrer" class="${iconClass}" aria-label="Facebook">
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
      </a>
      <a href="${SOCIAL.instagram}" target="_blank" rel="noopener noreferrer" class="${iconClass}" aria-label="Instagram">
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
      </a>
      <a href="${SOCIAL.youtube}" target="_blank" rel="noopener noreferrer" class="${iconClass}" aria-label="YouTube">
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
    </div>
  `
}

function callUsNow(extraClass = ''): string {
  return `<a href="${callUrl}" class="btn-gold ${extraClass}">Call Us Now</a>`
}

function contactActions(message: string, fullWidth = true): string {
  const w = fullWidth ? 'w-full' : ''
  return `
    <div class="flex flex-col gap-2">
      ${callUsNow(`${w} text-center text-sm`)}
      <a href="${whatsappLink(message)}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp ${w} text-center text-sm">WhatsApp Us</a>
      <a href="#contact-form" class="btn-secondary ${w} text-center text-sm border-sage text-forest hover:bg-forest hover:text-white">Contact Form</a>
    </div>
  `
}

function renderGoatCard(goat: (typeof goats)[0]): string {
  const msg = `Hi MB Goat Farm, I am interested in ${goat.breedLabel} (${purposeLabel(goat.purpose)}). Please share details.`
  return `
    <article class="card group" data-goat-id="${goat.id}">
      <div class="relative h-52 overflow-hidden">
        <img src="${goat.image}" alt="${goat.breedLabel} goat at MB Goat Farm" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
        <span class="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold ${purposeBadgeClass(goat.purpose)}">${purposeLabel(goat.purpose)}</span>
        ${goat.available ? '' : '<span class="absolute top-3 right-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">Sold Out</span>'}
      </div>
      <div class="p-5">
        <h3 class="text-xl font-bold text-forest mb-2">${goat.breedLabel}</h3>
        <p class="text-sm text-earth/70 mb-3">${goat.description}</p>
        <div class="flex gap-3 text-xs text-earth/60 mb-4">
          <span>🎂 ${goat.age}</span>
          <span>⚖️ ${goat.weight}</span>
        </div>
        ${goat.available ? contactActions(msg) : '<p class="text-center text-sm text-earth/60">Currently unavailable — contact us for updates</p>'}
      </div>
    </article>
  `
}

function renderFeedCard(product: (typeof feedProducts)[0]): string {
  const msg = `Hi MB Goat Farm, I want to order ${product.name}. Please share details.`
  return `
    <article class="card group">
      <div class="relative h-44 overflow-hidden">
        <img src="${product.image}" alt="${product.name}" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
      </div>
      <div class="p-5">
        <h3 class="text-lg font-bold text-forest mb-1">${product.name}</h3>
        <p class="text-sm text-earth/70 mb-4">${product.description}</p>
        ${contactActions(msg)}
      </div>
    </article>
  `
}

function filteredGoats() {
  if (activeFilter === 'all') return goats
  return goats.filter((g) => g.purpose === activeFilter)
}

function render(): string {
  return `
    <nav id="navbar" class="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 md:h-20 gap-3">
          <div class="flex items-center gap-3 min-w-0">
            ${socialIcons('social-icon hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition')}
            <a href="#home" class="flex items-center shrink-0">
              <img src="${LOGO_SRC}" alt="MB Goat Farm" class="h-10 md:h-12 w-auto nav-logo-img" />
            </a>
          </div>
          <div class="hidden md:flex items-center gap-8">
            <a href="#about" class="nav-link text-sm font-semibold text-white/90 hover:text-meadow transition nav-link-text">About</a>
            <a href="#services" class="nav-link text-sm font-semibold text-white/90 hover:text-meadow transition nav-link-text">Services</a>
            <a href="#shop" class="nav-link text-sm font-semibold text-white/90 hover:text-meadow transition nav-link-text">Goats</a>
            <a href="#feed" class="nav-link text-sm font-semibold text-white/90 hover:text-meadow transition nav-link-text">Feed</a>
            <a href="#contact" class="nav-link text-sm font-semibold text-white/90 hover:text-meadow transition nav-link-text">Contact</a>
          </div>
          <div class="flex items-center gap-2">
            ${callUsNow('hidden sm:inline-flex text-xs px-4 py-2 nav-call-btn')}
            <button id="mobile-menu-btn" class="md:hidden rounded-full p-2.5 bg-white/10 hover:bg-white/20 transition" aria-label="Open menu">
              <svg class="h-5 w-5 text-white nav-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </div>
      <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-wheat shadow-lg">
        <div class="px-4 py-4 flex flex-col gap-3">
          <div class="flex justify-center pb-2">${socialIcons('social-icon-footer h-9 w-9 flex items-center justify-center rounded-full bg-forest/10 text-forest')}</div>
          <a href="#about" class="mobile-nav-link text-forest font-semibold py-2">About</a>
          <a href="#services" class="mobile-nav-link text-forest font-semibold py-2">Services</a>
          <a href="#shop" class="mobile-nav-link text-forest font-semibold py-2">Goats</a>
          <a href="#feed" class="mobile-nav-link text-forest font-semibold py-2">Feed</a>
          <a href="#contact" class="mobile-nav-link text-forest font-semibold py-2">Contact</a>
          ${callUsNow('text-center')}
        </div>
      </div>
    </nav>

    <section id="home" class="relative min-h-screen flex items-center">
      <div class="absolute inset-0">
        <img src="${HERO_IMG}" alt="Goats at MB Goat Farm" class="h-full w-full object-cover" />
        <div class="absolute inset-0 hero-overlay"></div>
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-0">
        <div class="max-w-2xl animate-fade-up">
          <span class="inline-block rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-sm font-semibold text-meadow mb-6">
            🌿 Sustainable Farming Since Day One
          </span>
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Healthy Goats,<br/>
            <span class="text-red-500">Trusted Genetics</span>
          </h1>
          <p class="text-lg md:text-xl text-white/85 leading-relaxed mb-8 max-w-xl">
            At MB Goat Farm, we raise healthy goats with care and honesty. Buy goats, book Qurbani animals, get fresh meat, or pick up quality animal feed — all from one trusted farm.
          </p>
          <div class="flex flex-wrap gap-4">
            ${callUsNow('text-base px-8 py-3.5')}
            <a href="#contact-form" class="btn-secondary border-white/40 text-white hover:bg-white hover:text-forest text-base px-8 py-3.5">Contact Us</a>
          </div>
          <div class="flex flex-wrap gap-6 mt-12">
            <div class="text-center"><p class="text-3xl font-extrabold text-meadow">528+</p><p class="text-sm text-white/70">Goats Raised</p></div>
            <div class="text-center"><p class="text-3xl font-extrabold text-meadow">18+</p><p class="text-sm text-white/70">Years Experience</p></div>
            <div class="text-center"><p class="text-3xl font-extrabold text-meadow">847+</p><p class="text-sm text-white/70">Happy Customers</p></div>
          </div>
        </div>
      </div>
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" class="text-white/60 hover:text-white transition" aria-label="Scroll to about">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
        </a>
      </div>
    </section>

    <section id="about" class="py-20 md:py-28 grass-pasture grass-texture">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-inner">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="reveal">
            <span class="text-sage font-bold text-sm uppercase tracking-wider">About Us</span>
            <h2 class="section-title mt-2 mb-6">A Farm Built on Trust & Care</h2>
            <p class="text-earth/80 leading-relaxed mb-4">MB Goat Farm is a trusted goat farm where customers can find healthy goats, quality livestock, fresh goat meat service, and dry animal feed.</p>
            <p class="text-earth/80 leading-relaxed mb-6">We believe in quality, honesty, and customer satisfaction. Our goats are raised with proper care, clean feeding, and attention to health.</p>
            <div class="flex flex-wrap gap-3 mb-8">
              ${callUsNow('')}
              <a href="#contact-form" class="btn-primary">Contact Us</a>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-xl bg-white/90 backdrop-blur-sm p-4 border border-wheat shadow-sm"><p class="text-2xl mb-1">🏡</p><p class="font-bold text-forest text-sm">Clean Farm</p><p class="text-xs text-earth/60">Open and well-maintained spaces</p></div>
              <div class="rounded-xl bg-white/90 backdrop-blur-sm p-4 border border-wheat shadow-sm"><p class="text-2xl mb-1">💚</p><p class="font-bold text-forest text-sm">Healthy Feed</p><p class="text-xs text-earth/60">Green fodder and balanced diet</p></div>
              <div class="rounded-xl bg-white/90 backdrop-blur-sm p-4 border border-wheat shadow-sm"><p class="text-2xl mb-1">🩺</p><p class="font-bold text-forest text-sm">Health Checks</p><p class="text-xs text-earth/60">Regular vet care for every goat</p></div>
              <div class="rounded-xl bg-white/90 backdrop-blur-sm p-4 border border-wheat shadow-sm"><p class="text-2xl mb-1">🤝</p><p class="font-bold text-forest text-sm">Fair Dealing</p><p class="text-xs text-earth/60">Honest service, no hidden costs</p></div>
            </div>
          </div>
          <div class="reveal relative">
            <div class="rounded-2xl overflow-hidden shadow-2xl">
              <img src="${ABOUT_IMG}" alt="Goats at MB Goat Farm" class="w-full h-80 md:h-[480px] object-cover" />
            </div>
            <div class="absolute -bottom-6 -left-6 bg-forest text-white rounded-2xl p-5 shadow-xl max-w-[200px]">
              <p class="text-3xl font-extrabold text-meadow">18+</p>
              <p class="text-sm font-semibold">Years of farming with love and dedication</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="py-20 md:py-28 bg-forest text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10"><img src="${SERVICES_BG}" alt="" class="h-full w-full object-cover" /></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14 reveal">
          <span class="text-meadow font-bold text-sm uppercase tracking-wider">What We Offer</span>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">Our Services</h2>
          <p class="section-subtitle mx-auto text-white/70">Everything you need from a trusted goat farm — in one place.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${[
            { icon: '🐐', title: 'Goats for Sale', desc: 'Healthy goats for your home or farm. Many breeds to choose from.', link: '#shop' },
            { icon: '🕌', title: 'Qurbani Goats', desc: 'Quality goats ready for Qurbani booking. Reserve early for Eid.', link: '#shop' },
            { icon: '🥩', title: 'Meat Service', desc: 'Fresh goat meat service available. Clean, halal, and farm-fresh.', link: '#contact' },
            { icon: '🌾', title: 'Animal Feed', desc: 'Dry lusan and wanda available for your goats and other animals.', link: '#feed' },
          ].map((s) => `
            <a href="${s.link}" class="reveal card bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/15 p-6 text-center group">
              <p class="text-4xl mb-4 group-hover:animate-float">${s.icon}</p>
              <h3 class="text-xl font-bold mb-2">${s.title}</h3>
              <p class="text-sm text-white/70 leading-relaxed mb-4">${s.desc}</p>
              <span class="text-meadow text-sm font-semibold">Contact us →</span>
            </a>
          `).join('')}
        </div>
        <div class="text-center mt-10 reveal flex flex-wrap justify-center gap-3">
          ${callUsNow('')}
          <a href="#contact-form" class="btn-secondary border-white/40 text-white hover:bg-white hover:text-forest">Contact Form</a>
        </div>
      </div>
    </section>

    <section class="py-20 md:py-28 grass-field grass-texture">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-inner">
        <div class="text-center mb-14 reveal">
          <span class="text-sage font-bold text-sm uppercase tracking-wider">Why Us</span>
          <h2 class="section-title mt-2 mb-4">Why Choose MB Goat Farm?</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          ${[
            { icon: '✅', title: 'Healthy Animals', desc: 'Every goat is raised with clean feed, open space, and regular health checks.' },
            { icon: '🤝', title: 'Honest Service', desc: 'Clear communication and fair dealing on every order and booking.' },
            { icon: '📞', title: 'Easy Contact', desc: 'Use Call Us Now or our contact form — we respond quickly.' },
            { icon: '🚚', title: 'Farm Delivery', desc: 'We can arrange delivery of goats and feed to your location when needed.' },
            { icon: '🕌', title: 'Qurbani Ready', desc: 'Special Qurbani goats fed and cared for to meet your Eid requirements.' },
            { icon: '🌿', title: 'Green Farming', desc: 'Our goats graze on green pastures and eat natural, balanced feed daily.' },
          ].map((item) => `
            <div class="reveal card p-6 text-center">
              <p class="text-3xl mb-3">${item.icon}</p>
              <h3 class="text-lg font-bold text-forest mb-2">${item.title}</h3>
              <p class="text-sm text-earth/70 leading-relaxed">${item.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="shop" class="py-20 md:py-28 grass-field grass-texture">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-inner">
        <div class="text-center mb-10 reveal">
          <span class="text-sage font-bold text-sm uppercase tracking-wider">Our Goats</span>
          <h2 class="section-title mt-2 mb-4">Buy or Book a Goat</h2>
          <p class="section-subtitle mx-auto">Browse by breed type. Tap Call Us Now or send a message through our contact form.</p>
        </div>
        <div class="flex flex-wrap justify-center gap-3 mb-10 reveal" id="filter-buttons">
          ${(['all', 'sale', 'qurbani', 'breeding'] as Filter[]).map((f) => `
            <button class="filter-btn ${activeFilter === f ? 'active' : ''}" data-filter="${f}">
              ${f === 'all' ? 'All Goats' : f === 'sale' ? 'For Sale' : f === 'qurbani' ? 'Qurbani' : 'Breeding'}
            </button>
          `).join('')}
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="goat-grid">
          ${filteredGoats().map(renderGoatCard).join('')}
        </div>
      </div>
    </section>

    <section class="relative py-20 overflow-hidden">
      <img src="${MEAT_IMG}" alt="Fresh goat meat from MB Goat Farm" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-forest/80"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
        <span class="text-4xl mb-4 block">🥩</span>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Fresh Goat Meat Service</h2>
        <p class="text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">Need fresh, clean, halal goat meat? We provide farm-fresh meat cut and prepared with care.</p>
        <div class="flex flex-wrap justify-center gap-4">
          ${callUsNow('')}
          <a href="#contact-form" class="btn-secondary border-white/40 text-white hover:bg-white hover:text-forest">Contact Us</a>
        </div>
      </div>
    </section>

    <section id="feed" class="py-20 md:py-28 grass-pasture grass-texture">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-inner">
        <div class="text-center mb-10 reveal">
          <span class="text-sage font-bold text-sm uppercase tracking-wider">Animal Feed</span>
          <h2 class="section-title mt-2 mb-4">Feed for Your Animals</h2>
          <p class="section-subtitle mx-auto">Dry lusan, wanda, and green fodder — contact us to place your order.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          ${feedProducts.map(renderFeedCard).join('')}
        </div>
      </div>
    </section>

    <section class="py-20 md:py-28 grass-pattern grass-texture">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-inner">
        <div class="text-center mb-14 reveal">
          <span class="text-sage font-bold text-sm uppercase tracking-wider">Reviews</span>
          <h2 class="section-title mt-2 mb-4">What Our Customers Say</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          ${[
            { name: 'Ahmed Khan', text: 'I bought Beetal goats from MB Goat Farm. Both were healthy and exactly as shown. Very honest people.', stars: 5 },
            { name: 'Fatima Bibi', text: 'Booked our Qurbani goat early. The goat was well-fed and strong. Highly recommend for Eid booking.', stars: 5 },
            { name: 'Usman Ali', text: 'Good service and clean farm. They delivered the wanda feed to my farm on time. Will buy again.', stars: 5 },
          ].map((t) => `
            <div class="reveal card p-6">
              <div class="flex gap-1 mb-3">${'⭐'.repeat(t.stars)}</div>
              <p class="text-earth/80 text-sm leading-relaxed mb-4">"${t.text}"</p>
              <p class="font-bold text-forest text-sm">— ${t.name}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="contact" class="py-20 md:py-28 bg-forest text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10 reveal">
          <span class="text-meadow font-bold text-sm uppercase tracking-wider">Get in Touch</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-2 mb-4">Contact MB Goat Farm</h2>
          <p class="text-white/75 leading-relaxed">Need goats, Qurbani animals, fresh meat, or feed? Call us or send a message — we reply quickly.</p>
        </div>
        <div class="reveal rounded-2xl bg-white/10 border border-white/15 p-8 text-center mb-10">
          <div class="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-8">
            ${callUsNow('flex-1')}
            <a href="${whatsappLink('Hi MB Goat Farm, I want to get in touch.')}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp flex-1">WhatsApp Us</a>
          </div>
          <div class="grid sm:grid-cols-3 gap-4 text-left">
            <div class="rounded-xl bg-white/5 border border-white/10 p-4"><span class="text-xl block mb-1">📧</span><p class="font-bold text-sm">Email</p><p class="text-white/70 text-sm">${FARM_EMAIL}</p></div>
            <div class="rounded-xl bg-white/5 border border-white/10 p-4"><span class="text-xl block mb-1">📍</span><p class="font-bold text-sm">Farm Location</p><p class="text-white/70 text-sm">${FARM_ADDRESS}</p></div>
            <div class="rounded-xl bg-white/5 border border-white/10 p-4"><span class="text-xl block mb-1">🕐</span><p class="font-bold text-sm">Farm Hours</p><p class="text-white/70 text-sm">Mon – Sat: 8 AM – 6 PM</p><p class="text-white/70 text-sm">Sun: 9 AM – 2 PM</p></div>
          </div>
        </div>
        <form id="contact-form" class="reveal bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 space-y-4">
          <h3 class="text-xl font-bold text-center mb-2">Send Us a Message</h3>
          <div>
            <label class="form-label text-white/90" for="contact-name">Your Name</label>
            <input class="form-input bg-white/10 border-white/20 text-white placeholder:text-white/40" id="contact-name" type="text" placeholder="Enter your name" required />
          </div>
          <div>
            <label class="form-label text-white/90" for="contact-message">Message</label>
            <textarea class="form-input bg-white/10 border-white/20 text-white placeholder:text-white/40 resize-none" id="contact-message" rows="4" placeholder="Tell us what you need (goat breed, Qurbani, meat, feed...)" required></textarea>
          </div>
          <button type="submit" class="btn-gold w-full">Send Message</button>
          <p id="contact-success" class="hidden text-meadow text-sm text-center font-semibold">✅ Message sent! We will get back to you soon.</p>
        </form>
      </div>
    </section>

    <footer class="bg-[#0f2410] border-t border-meadow/20 text-white/75 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div class="lg:col-span-2">
            <a href="#home"><img src="${LOGO_SRC}" alt="MB Goat Farm" class="h-11 w-auto mb-3" /></a>
            <p class="text-sm leading-relaxed text-white/60 mb-4">Healthy goats, trusted genetics, and sustainable farming for families and farmers in Faisalabad and across Punjab.</p>
            ${socialIcons('social-icon-footer h-9 w-9 inline-flex items-center justify-center rounded-full bg-white/10 text-meadow hover:bg-meadow hover:text-forest transition')}
          </div>
          <div>
            <p class="font-bold text-meadow mb-3">Quick Links</p>
            <ul class="space-y-2 text-sm">
              <li><a href="#home" class="hover:text-white transition">Home</a></li>
              <li><a href="#about" class="hover:text-white transition">About Us</a></li>
              <li><a href="#shop" class="hover:text-white transition">Our Goats</a></li>
              <li><a href="#feed" class="hover:text-white transition">Animal Feed</a></li>
              <li><a href="#contact" class="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <p class="font-bold text-meadow mb-3">Goat Breeds</p>
            <ul class="space-y-2 text-sm">
              <li>Beetal (Black / White)</li>
              <li>Makhni Cheena</li>
              <li>Kamori</li>
              <li>Teddy Goat</li>
              <li>Desi (Local)</li>
              <li>Barbari</li>
            </ul>
          </div>
          <div>
            <p class="font-bold text-meadow mb-3">Services</p>
            <ul class="space-y-2 text-sm">
              <li>Goats for Sale</li>
              <li>Qurbani Booking</li>
              <li>Fresh Goat Meat</li>
              <li>Dry Lusan & Wanda</li>
              <li>Green Fodder</li>
            </ul>
            <div class="mt-4 flex flex-col gap-2">
              ${callUsNow('text-xs px-4 py-2 w-full justify-center')}
              <a href="#contact-form" class="btn-secondary border-meadow/40 text-meadow hover:bg-meadow hover:text-forest text-xs px-4 py-2 w-full justify-center">Contact Form</a>
            </div>
          </div>
        </div>
        <div class="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>&copy; ${new Date().getFullYear()} MB Goat Farm · ${FARM_ADDRESS}</p>
          <p>${FARM_EMAIL}</p>
        </div>
      </div>
    </footer>

    <a href="${whatsappLink('Hi MB Goat Farm, I want to know about your goats!')}" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white text-2xl shadow-2xl hover:scale-110 transition-transform" title="WhatsApp MB Goat Farm">💬</a>
    <a href="${callUrl}" class="fixed bottom-6 right-24 z-50 hidden sm:flex btn-call-float" title="Call MB Goat Farm">Call Us Now</a>
  `
}

function updateGoatGrid(): void {
  const grid = document.getElementById('goat-grid')
  if (grid) grid.innerHTML = filteredGoats().map(renderGoatCard).join('')
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    const filter = (btn as HTMLElement).dataset.filter as Filter
    btn.classList.toggle('active', filter === activeFilter)
  })
}

function bindEvents(): void {
  document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.toggle('hidden')
  })
  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => document.getElementById('mobile-menu')?.classList.add('hidden'))
  })
  document.getElementById('filter-buttons')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.filter-btn') as HTMLElement | null
    if (!btn) return
    activeFilter = btn.dataset.filter as Filter
    updateGoatGrid()
  })
  document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault()
    const success = document.getElementById('contact-success')
    success?.classList.remove('hidden')
    ;(e.target as HTMLFormElement).reset()
    setTimeout(() => success?.classList.add('hidden'), 4000)
  })

  const navbar = document.getElementById('navbar')
  window.addEventListener('scroll', () => {
    if (!navbar) return
    const scrolled = window.scrollY > 60
    navbar.classList.toggle('nav-scrolled', scrolled)
    navbar.querySelectorAll('.nav-link-text').forEach((el) => {
      el.classList.toggle('text-forest', scrolled)
      el.classList.toggle('text-white/90', !scrolled)
    })
    navbar.querySelectorAll('.nav-menu-icon').forEach((el) => {
      el.classList.toggle('text-forest', scrolled)
      el.classList.toggle('text-white', !scrolled)
    })
    navbar.querySelectorAll('.social-icon').forEach((el) => {
      el.classList.toggle('bg-cream', scrolled)
      el.classList.toggle('text-forest', scrolled)
      el.classList.toggle('bg-white/10', !scrolled)
      el.classList.toggle('text-white', !scrolled)
    })
  })

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible') }),
    { threshold: 0.1 }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
}

export function initApp(): void {
  const app = document.getElementById('app')
  if (!app) return
  app.innerHTML = render()
  bindEvents()
}
