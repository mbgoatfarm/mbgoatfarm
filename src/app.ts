import { goats, feedProducts, type GoatPurpose } from './data/goats'
import { images } from './data/images'
import { PHONE, PHONE_DISPLAY, callUrl, whatsappLink } from './config/contact'
import { formatPrice } from './utils/format'

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

function contactButtons(message: string, fullWidth = true): string {
  const w = fullWidth ? 'w-full' : ''
  return `
    <div class="flex flex-col gap-2">
      <a href="${callUrl}" class="btn-gold ${w} text-center text-sm">📞 Call ${PHONE}</a>
      <a href="${whatsappLink(message)}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp ${w} text-center text-sm">💬 WhatsApp Us</a>
    </div>
  `
}

function renderGoatCard(goat: (typeof goats)[0]): string {
  const msg = `Hi MB Goat Farm, I am interested in ${goat.name} (${goat.breed} - ${purposeLabel(goat.purpose)}). Please share details.`
  return `
    <article class="card group" data-goat-id="${goat.id}">
      <div class="relative h-52 overflow-hidden">
        <img src="${goat.image}" alt="${goat.name} - ${goat.breed} goat" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
        <span class="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold ${purposeBadgeClass(goat.purpose)}">${purposeLabel(goat.purpose)}</span>
        ${goat.available ? '' : '<span class="absolute top-3 right-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">Sold Out</span>'}
      </div>
      <div class="p-5">
        <div class="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 class="text-xl font-bold text-forest">${goat.name}</h3>
            <p class="text-sm text-sage font-semibold">${goat.breed} Breed</p>
          </div>
          <p class="text-lg font-extrabold text-gold whitespace-nowrap">${formatPrice(goat.price)}</p>
        </div>
        <p class="text-sm text-earth/70 mb-3">${goat.description}</p>
        <div class="flex gap-3 text-xs text-earth/60 mb-4">
          <span>🎂 ${goat.age}</span>
          <span>⚖️ ${goat.weight}</span>
        </div>
        ${goat.available ? contactButtons(msg) : `<p class="text-center text-sm text-earth/60">Currently unavailable — call ${PHONE} for updates</p>`}
      </div>
    </article>
  `
}

function renderFeedCard(product: (typeof feedProducts)[0]): string {
  const msg = `Hi MB Goat Farm, I want to order ${product.name}. Please share price and delivery details.`
  return `
    <article class="card group">
      <div class="relative h-44 overflow-hidden">
        <img src="${product.image}" alt="${product.name}" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
      </div>
      <div class="p-5">
        <h3 class="text-lg font-bold text-forest mb-1">${product.name}</h3>
        <p class="text-sm text-earth/70 mb-3">${product.description}</p>
        <div class="mb-4">
          <p class="text-lg font-extrabold text-gold">${formatPrice(product.price)}</p>
          <p class="text-xs text-earth/50">${product.unit}</p>
        </div>
        ${contactButtons(msg)}
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
    <!-- Navigation -->
    <nav id="navbar" class="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">
          <a href="#home" class="flex items-center gap-2 group">
            <span class="text-3xl animate-float">🐐</span>
            <div>
              <p class="font-display font-bold text-lg text-white group-[.nav-scrolled_&]:text-forest leading-none nav-logo-text">MB Goat Farm</p>
              <p class="text-[10px] text-meadow group-[.nav-scrolled_&]:text-sage nav-logo-sub">Healthy Goats, Trusted Care</p>
            </div>
          </a>
          <div class="hidden md:flex items-center gap-8">
            <a href="#about" class="nav-link text-sm font-semibold text-white/90 hover:text-meadow transition nav-link-text">About</a>
            <a href="#services" class="nav-link text-sm font-semibold text-white/90 hover:text-meadow transition nav-link-text">Services</a>
            <a href="#shop" class="nav-link text-sm font-semibold text-white/90 hover:text-meadow transition nav-link-text">Goats</a>
            <a href="#feed" class="nav-link text-sm font-semibold text-white/90 hover:text-meadow transition nav-link-text">Feed</a>
            <a href="#contact" class="nav-link text-sm font-semibold text-white/90 hover:text-meadow transition nav-link-text">Contact</a>
          </div>
          <div class="flex items-center gap-3">
            <a href="${callUrl}" class="hidden sm:inline-flex btn-gold text-xs px-4 py-2 nav-contact-btn">📞 ${PHONE_DISPLAY}</a>
            <button id="mobile-menu-btn" class="md:hidden rounded-full p-2.5 bg-white/10 hover:bg-white/20 transition">
              <svg class="h-5 w-5 text-white nav-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </div>
      <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-wheat shadow-lg">
        <div class="px-4 py-4 flex flex-col gap-3">
          <a href="#about" class="mobile-nav-link text-forest font-semibold py-2">About</a>
          <a href="#services" class="mobile-nav-link text-forest font-semibold py-2">Services</a>
          <a href="#shop" class="mobile-nav-link text-forest font-semibold py-2">Goats</a>
          <a href="#feed" class="mobile-nav-link text-forest font-semibold py-2">Feed</a>
          <a href="#contact" class="mobile-nav-link text-forest font-semibold py-2">Contact</a>
          <a href="${callUrl}" class="btn-gold text-center">📞 Call ${PHONE}</a>
          <a href="${whatsappLink('Hi MB Goat Farm, I want to know more about your goats and services.')}" target="_blank" rel="noopener noreferrer" class="btn-primary text-center">💬 WhatsApp</a>
        </div>
      </div>
    </nav>

    <!-- Hero -->
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
            <span class="text-meadow">Trusted Genetics</span>
          </h1>
          <p class="text-lg md:text-xl text-white/85 leading-relaxed mb-4 max-w-xl">
            At MB Goat Farm, we raise healthy goats with care and honesty. Buy goats, book Qurbani animals, get fresh meat, or pick up quality animal feed — all from one trusted farm.
          </p>
          <p class="text-meadow font-bold text-lg mb-8">📞 Call or WhatsApp: ${PHONE}</p>
          <div class="flex flex-wrap gap-4">
            <a href="${callUrl}" class="btn-gold text-base px-8 py-3.5">📞 Contact — ${PHONE}</a>
            <a href="${whatsappLink('Hi MB Goat Farm, I want to know about your goats and services.')}" target="_blank" rel="noopener noreferrer" class="btn-secondary border-white/40 text-white hover:bg-white hover:text-forest text-base px-8 py-3.5">💬 WhatsApp Us</a>
          </div>
          <div class="flex flex-wrap gap-6 mt-12">
            <div class="text-center">
              <p class="text-3xl font-extrabold text-meadow">500+</p>
              <p class="text-sm text-white/70">Goats Raised</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-extrabold text-meadow">15+</p>
              <p class="text-sm text-white/70">Years Experience</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-extrabold text-meadow">1000+</p>
              <p class="text-sm text-white/70">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" class="text-white/60 hover:text-white transition">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
        </a>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="py-20 md:py-28 grass-pasture grass-texture">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-inner">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="reveal">
            <span class="text-sage font-bold text-sm uppercase tracking-wider">About Us</span>
            <h2 class="section-title mt-2 mb-6">A Farm Built on Trust & Care</h2>
            <p class="text-earth/80 leading-relaxed mb-4">
              MB Goat Farm is a trusted goat farm where customers can find healthy goats, quality livestock, fresh goat meat service, and dry animal feed. We focus on providing well-cared-for goats and reliable farm services.
            </p>
            <p class="text-earth/80 leading-relaxed mb-4">
              We believe in quality, honesty, and customer satisfaction. Our goats are raised with proper care, clean feeding, and attention to health. Whether you need goats for your home, farm, Qurbani, or meat — we help you choose the right animal.
            </p>
            <p class="text-earth/80 leading-relaxed mb-6">
              Call or WhatsApp us anytime at <strong class="text-forest">${PHONE}</strong> for details and booking.
            </p>
            <div class="flex flex-wrap gap-3 mb-8">
              <a href="${callUrl}" class="btn-gold">📞 Call ${PHONE}</a>
              <a href="${whatsappLink('Hi MB Goat Farm, I want to know more about your farm.')}" target="_blank" rel="noopener noreferrer" class="btn-primary">💬 WhatsApp</a>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-xl bg-white/90 backdrop-blur-sm p-4 border border-wheat shadow-sm">
                <p class="text-2xl mb-1">🏡</p>
                <p class="font-bold text-forest text-sm">Clean Farm</p>
                <p class="text-xs text-earth/60">Open and well-maintained spaces</p>
              </div>
              <div class="rounded-xl bg-white/90 backdrop-blur-sm p-4 border border-wheat shadow-sm">
                <p class="text-2xl mb-1">💚</p>
                <p class="font-bold text-forest text-sm">Healthy Feed</p>
                <p class="text-xs text-earth/60">Green fodder and balanced diet</p>
              </div>
              <div class="rounded-xl bg-white/90 backdrop-blur-sm p-4 border border-wheat shadow-sm">
                <p class="text-2xl mb-1">🩺</p>
                <p class="font-bold text-forest text-sm">Health Checks</p>
                <p class="text-xs text-earth/60">Regular vet care for every goat</p>
              </div>
              <div class="rounded-xl bg-white/90 backdrop-blur-sm p-4 border border-wheat shadow-sm">
                <p class="text-2xl mb-1">🤝</p>
                <p class="font-bold text-forest text-sm">Fair Dealing</p>
                <p class="text-xs text-earth/60">Honest prices, no hidden costs</p>
              </div>
            </div>
          </div>
          <div class="reveal relative">
            <div class="rounded-2xl overflow-hidden shadow-2xl">
              <img src="${ABOUT_IMG}" alt="Goats at MB Goat Farm" class="w-full h-80 md:h-[480px] object-cover" />
            </div>
            <div class="absolute -bottom-6 -left-6 bg-forest text-white rounded-2xl p-5 shadow-xl max-w-[200px]">
              <p class="text-3xl font-extrabold text-meadow">15+</p>
              <p class="text-sm font-semibold">Years of farming with love and dedication</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section id="services" class="py-20 md:py-28 bg-forest text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <img src="${SERVICES_BG}" alt="" class="h-full w-full object-cover" />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14 reveal">
          <span class="text-meadow font-bold text-sm uppercase tracking-wider">What We Offer</span>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">Our Services</h2>
          <p class="section-subtitle mx-auto text-white/70">Everything you need from a trusted goat farm — in one place.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${[
            { icon: '🐐', title: 'Goats for Sale', desc: 'Healthy goats available for your home or farm. Many breeds to choose from.', link: '#shop' },
            { icon: '🕌', title: 'Qurbani Goats', desc: 'Quality goats ready for Qurbani booking. Reserve early for Eid.', link: '#shop' },
            { icon: '🥩', title: 'Meat Service', desc: 'Fresh goat meat service available. Clean, halal, and farm-fresh.', link: '#contact' },
            { icon: '🌾', title: 'Animal Feed', desc: 'Dry lusan and wanda available for your goats and other animals.', link: '#feed' },
          ]
            .map(
              (s) => `
            <a href="${s.link}" class="reveal card bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/15 p-6 text-center group">
              <p class="text-4xl mb-4 group-hover:animate-float">${s.icon}</p>
              <h3 class="text-xl font-bold mb-2">${s.title}</h3>
              <p class="text-sm text-white/70 leading-relaxed mb-4">${s.desc}</p>
              <span class="text-meadow text-sm font-semibold">Contact ${PHONE} →</span>
            </a>
          `
            )
            .join('')}
        </div>
        <div class="text-center mt-10 reveal">
          <a href="${callUrl}" class="btn-gold mr-3">📞 Call ${PHONE}</a>
          <a href="${whatsappLink('Hi MB Goat Farm, I need help choosing a service.')}" target="_blank" rel="noopener noreferrer" class="btn-secondary border-white/40 text-white hover:bg-white hover:text-forest">💬 WhatsApp</a>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-20 md:py-28 grass-field grass-texture">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-inner">
        <div class="text-center mb-14 reveal">
          <span class="text-sage font-bold text-sm uppercase tracking-wider">Why Us</span>
          <h2 class="section-title mt-2 mb-4">Why Choose MB Goat Farm?</h2>
          <p class="section-subtitle mx-auto">We make it easy for you to view animals, ask questions, and book goats with full confidence.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          ${[
            { icon: '✅', title: 'Healthy Animals', desc: 'Every goat is raised with clean feed, open space, and regular health checks.' },
            { icon: '💰', title: 'Fair Prices', desc: 'Honest dealing with clear prices. No surprises — what you see is what you pay.' },
            { icon: '📞', title: 'Easy Contact', desc: `Call or WhatsApp ${PHONE} anytime to ask questions or book goats.` },
            { icon: '🚚', title: 'Farm Delivery', desc: 'We can arrange delivery of goats and feed to your location when needed.' },
            { icon: '🕌', title: 'Qurbani Ready', desc: 'Special Qurbani goats fed and cared for to meet your Eid requirements.' },
            { icon: '🌿', title: 'Green Farming', desc: 'Our goats graze on green pastures and eat natural, balanced feed daily.' },
          ]
            .map(
              (item) => `
            <div class="reveal card p-6 text-center">
              <p class="text-3xl mb-3">${item.icon}</p>
              <h3 class="text-lg font-bold text-forest mb-2">${item.title}</h3>
              <p class="text-sm text-earth/70 leading-relaxed">${item.desc}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </section>

    <!-- Goat Shop -->
    <section id="shop" class="py-20 md:py-28 grass-field grass-texture">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-inner">
        <div class="text-center mb-10 reveal">
          <span class="text-sage font-bold text-sm uppercase tracking-wider">Our Goats</span>
          <h2 class="section-title mt-2 mb-4">Buy or Book a Goat</h2>
          <p class="section-subtitle mx-auto">See our goats below. Call or WhatsApp <strong>${PHONE}</strong> to check availability and place your order.</p>
        </div>
        <div class="flex flex-wrap justify-center gap-3 mb-10 reveal" id="filter-buttons">
          ${(['all', 'sale', 'qurbani', 'breeding'] as Filter[])
            .map(
              (f) => `
            <button class="filter-btn ${activeFilter === f ? 'active' : ''}" data-filter="${f}">
              ${f === 'all' ? 'All Goats' : f === 'sale' ? 'For Sale' : f === 'qurbani' ? 'Qurbani' : 'Breeding'}
            </button>
          `
            )
            .join('')}
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="goat-grid">
          ${filteredGoats().map(renderGoatCard).join('')}
        </div>
      </div>
    </section>

    <!-- Meat Service Banner -->
    <section class="relative py-20 overflow-hidden">
      <img src="${MEAT_IMG}" alt="Fresh goat meat from MB Goat Farm" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-forest/80"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
        <span class="text-4xl mb-4 block">🥩</span>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Fresh Goat Meat Service</h2>
        <p class="text-white/80 max-w-xl mx-auto mb-4 leading-relaxed">
          Need fresh, clean, halal goat meat? We provide farm-fresh meat cut and prepared with care.
        </p>
        <p class="text-meadow font-bold text-lg mb-8">📞 Order on call or WhatsApp: ${PHONE}</p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="${callUrl}" class="btn-gold">📞 Call ${PHONE}</a>
          <a href="${whatsappLink('Hi MB Goat Farm, I want to order fresh goat meat.')}" target="_blank" rel="noopener noreferrer" class="btn-secondary border-white/40 text-white hover:bg-white hover:text-forest">💬 WhatsApp Order</a>
        </div>
      </div>
    </section>

    <!-- Feed Products -->
    <section id="feed" class="py-20 md:py-28 grass-pasture grass-texture">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-inner">
        <div class="text-center mb-10 reveal">
          <span class="text-sage font-bold text-sm uppercase tracking-wider">Animal Feed</span>
          <h2 class="section-title mt-2 mb-4">Feed for Your Animals</h2>
          <p class="section-subtitle mx-auto">Dry lusan, wanda, and green fodder — contact <strong>${PHONE}</strong> to order.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          ${feedProducts.map(renderFeedCard).join('')}
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 md:py-28 grass-pattern grass-texture">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-inner">
        <div class="text-center mb-14 reveal">
          <span class="text-sage font-bold text-sm uppercase tracking-wider">Reviews</span>
          <h2 class="section-title mt-2 mb-4">What Our Customers Say</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          ${[
            { name: 'Ahmed Khan', text: 'I bought two Beetal goats from MB Goat Farm. Both were healthy and exactly as shown. Very honest people.', stars: 5 },
            { name: 'Fatima Bibi', text: 'Booked our Qurbani goat early. The goat was well-fed and strong. Highly recommend for Eid booking.', stars: 5 },
            { name: 'Usman Ali', text: 'Good prices and clean farm. They delivered the wanda feed to my farm on time. Will buy again.', stars: 5 },
          ]
            .map(
              (t) => `
            <div class="reveal card p-6">
              <div class="flex gap-1 mb-3">${'⭐'.repeat(t.stars)}</div>
              <p class="text-earth/80 text-sm leading-relaxed mb-4">"${t.text}"</p>
              <p class="font-bold text-forest text-sm">— ${t.name}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="py-20 md:py-28 bg-forest text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 reveal">
          <span class="text-meadow font-bold text-sm uppercase tracking-wider">Get in Touch</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-2 mb-4">Contact MB Goat Farm</h2>
          <p class="text-white/75 leading-relaxed max-w-2xl mx-auto">
            Need goats, Qurbani animals, fresh meat, or feed? Reach us on call or WhatsApp — we reply quickly.
          </p>
        </div>

        <div class="reveal rounded-2xl bg-white/10 border border-white/15 p-8 md:p-10 text-center mb-10">
          <p class="text-sm uppercase tracking-wider text-meadow font-semibold mb-2">Call or WhatsApp</p>
          <a href="${callUrl}" class="text-3xl md:text-4xl font-extrabold text-white hover:text-meadow transition block mb-6">${PHONE_DISPLAY}</a>
          <div class="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <a href="${callUrl}" class="btn-gold flex-1">📞 Call Now</a>
            <a href="${whatsappLink('Hi MB Goat Farm, I want to get in touch with you.')}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp flex-1">💬 WhatsApp</a>
          </div>
        </div>

        <div class="reveal grid sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div class="rounded-xl bg-white/5 border border-white/10 p-5">
            <span class="text-2xl block mb-2">📧</span>
            <p class="font-bold text-sm mb-1">Email</p>
            <p class="text-white/70 text-sm">info@mbgoatfarm.com</p>
          </div>
          <div class="rounded-xl bg-white/5 border border-white/10 p-5">
            <span class="text-2xl block mb-2">📍</span>
            <p class="font-bold text-sm mb-1">Farm Location</p>
            <p class="text-white/70 text-sm">Green Valley Road, Punjab, Pakistan</p>
          </div>
          <div class="rounded-xl bg-white/5 border border-white/10 p-5">
            <span class="text-2xl block mb-2">🕐</span>
            <p class="font-bold text-sm mb-1">Farm Hours</p>
            <p class="text-white/70 text-sm">Mon – Sat: 8 AM – 6 PM</p>
            <p class="text-white/70 text-sm">Sun: 9 AM – 2 PM</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#0f2410] border-t border-meadow/20 text-white/75 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p class="flex items-center gap-2 font-display font-bold text-white text-lg mb-3">
              <span>🐐</span> MB Goat Farm
            </p>
            <p class="text-sm leading-relaxed text-white/60">Healthy goats, trusted genetics, and sustainable farming for families and farmers.</p>
          </div>
          <div>
            <p class="font-bold text-meadow mb-3">Quick Links</p>
            <ul class="space-y-2 text-sm">
              <li><a href="#about" class="hover:text-white transition">About Us</a></li>
              <li><a href="#shop" class="hover:text-white transition">Our Goats</a></li>
              <li><a href="#feed" class="hover:text-white transition">Animal Feed</a></li>
              <li><a href="#contact" class="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <p class="font-bold text-meadow mb-3">Services</p>
            <ul class="space-y-2 text-sm">
              <li>Goats for Sale</li>
              <li>Qurbani Booking</li>
              <li>Fresh Meat</li>
              <li>Dry Lusan & Wanda</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>&copy; ${new Date().getFullYear()} MB Goat Farm. All rights reserved.</p>
          <div class="flex gap-4">
            <a href="${callUrl}" class="hover:text-meadow transition">📞 ${PHONE}</a>
            <a href="${whatsappLink('Hi MB Goat Farm!')}" target="_blank" rel="noopener noreferrer" class="hover:text-meadow transition">💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Floating contact -->
    <a href="${whatsappLink('Hi MB Goat Farm, I want to know about your goats!')}" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white text-2xl shadow-2xl hover:scale-110 transition-transform" title="WhatsApp ${PHONE}">💬</a>
    <a href="${callUrl}" class="fixed bottom-6 right-24 z-50 hidden sm:flex btn-call-float" title="Call ${PHONE}">📞 ${PHONE_DISPLAY}</a>
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
    link.addEventListener('click', () => {
      document.getElementById('mobile-menu')?.classList.add('hidden')
    })
  })

  document.getElementById('filter-buttons')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.filter-btn') as HTMLElement | null
    if (!btn) return
    activeFilter = btn.dataset.filter as Filter
    updateGoatGrid()
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
    navbar.querySelectorAll('.nav-logo-text').forEach((el) => {
      el.classList.toggle('text-forest', scrolled)
      el.classList.toggle('text-white', !scrolled)
    })
    navbar.querySelectorAll('.nav-logo-sub').forEach((el) => {
      el.classList.toggle('text-sage', scrolled)
      el.classList.toggle('text-meadow', !scrolled)
    })
    navbar.querySelectorAll('.nav-menu-icon').forEach((el) => {
      el.classList.toggle('text-forest', scrolled)
      el.classList.toggle('text-white', !scrolled)
    })
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    },
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
