// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, ArrowUpRight, ArrowUp, Mail, Github, Linkedin, Twitter, Instagram,
  Palette, LayoutGrid, Clapperboard, Check, Quote,
} from 'lucide-react';

const CONTACT_EMAIL = 'hello@sahilansari.com';
const NAV_ITEMS = ['Work', 'About', 'Services', 'Contact'];

const projects = [
  { id: 1, title: 'Quantum Branding', category: 'Brand Identity', description: 'Futuristic tech brand with holographic elements', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&h=700&fit=crop', tech: ['Illustrator', 'After Effects'] },
  { id: 2, title: 'NeuroFlow App', category: 'UI/UX Design', description: 'Mental wellness app with biometric integration', image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=900&h=700&fit=crop', tech: ['Figma', 'Protopie'] },
  { id: 3, title: 'Ethereal Cosmetics', category: 'Packaging', description: 'Luxury skincare with sustainable packaging', image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=900&h=700&fit=crop', tech: ['Photoshop', 'Dimension'] },
  { id: 4, title: 'Vogue Parallax', category: 'Editorial', description: 'Interactive digital magazine experience', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&h=700&fit=crop', tech: ['InDesign', 'WebGL'] },
  { id: 5, title: 'Zenith Studios', category: 'Motion Graphics', description: '3D animated logo reveal and brand toolkit', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=700&fit=crop', tech: ['Cinema 4D', 'After Effects'] },
  { id: 6, title: 'Metaverse Gallery', category: '3D Design', description: 'Virtual art exhibition space', image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&h=700&fit=crop', tech: ['Blender', 'Unreal Engine'] },
];

const services = [
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Brand Identity',
    description: 'Distinctive visual identities built on strategy — logos, systems, and guidelines that scale with your brand.',
    deliverables: ['Logo & wordmark', 'Visual identity systems', 'Brand guidelines'],
  },
  {
    icon: <LayoutGrid className="w-6 h-6" />,
    title: 'UI/UX Design',
    description: 'Intuitive, research-driven interfaces that balance clarity and craft for web and mobile products.',
    deliverables: ['Wireframes & prototypes', 'Design systems', 'Usability testing'],
  },
  {
    icon: <Clapperboard className="w-6 h-6" />,
    title: 'Motion & Art Direction',
    description: 'Campaign direction and motion work that brings brands to life across every screen and touchpoint.',
    deliverables: ['Motion graphics', 'Art direction', '3D & animation'],
  },
];

const skills = ['Brand Identity', 'UI/UX Design', 'Typography', 'Motion Graphics', 'Art Direction', 'Packaging', 'Editorial Design', '3D Design'];

export default function PortfolioWebsite() {
  /* ----------  SEO  ---------- */
  const siteUrl = 'https://graphic-designer-olive.vercel.app/';
  const title = 'Sahil Ansari — Graphic Designer & Visual Storyteller';
  const description =
    'Graphic designer crafting bold brand identities, UI/UX, motion graphics and immersive digital experiences for brands worldwide.';
  const ogImage = `${siteUrl}og-image.jpg`;

  /* ----------  state / refs  ---------- */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(new Set());
  const observerRef = useRef(null);

  /* ----------  scroll state  ---------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ----------  reveal-on-scroll  ---------- */
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => new Set(prev).add(entry.target.dataset.reveal));
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const reveal = (id, delay = 0) => ({
    'data-reveal': id,
    style: { transitionDelay: `${delay}ms` },
    className: `reveal ${visible.has(id) ? 'reveal--in' : ''}`,
  });

  const socials = [
    { icon: <Github size={18} />, href: '#', label: 'GitHub' },
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
    { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
  ];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={siteUrl} />
        <meta name="theme-color" content="#faf9f7" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="bg-[#faf9f7] text-stone-900 min-h-screen antialiased selection:bg-stone-900 selection:text-white">
        {/* ---------------- Navigation ---------------- */}
        <header
          className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-[#faf9f7]/85 backdrop-blur-md border-b border-stone-900/10' : 'bg-transparent border-b border-transparent'
          }`}
        >
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <a href="#top" className="flex items-center gap-3 group">
              <span className="w-9 h-9 rounded-lg bg-stone-900 text-white flex items-center justify-center font-display font-semibold text-sm tracking-tight group-hover:bg-stone-700 transition-colors">
                SA
              </span>
              <span className="font-medium tracking-tight text-[15px]">
                Sahil Ansari
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-9">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-stone-600 hover:text-stone-900 transition-colors tracking-wide"
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-stone-900 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-stone-700 transition-colors"
              >
                Let's talk <ArrowUpRight size={15} />
              </a>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-stone-900/15 text-stone-700"
              aria-label="Toggle menu"
            >
              <span className="text-lg leading-none">{isMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-stone-900/10 bg-[#faf9f7]/95 backdrop-blur-md">
              <nav className="px-6 py-4 flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 text-stone-700 border-b border-stone-900/5 last:border-0"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* ---------------- Hero ---------------- */}
        <section id="top" className="relative pt-36 md:pt-44 pb-20 md:pb-28 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-2.5 border border-stone-900/15 rounded-full px-4 py-1.5 mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                  </span>
                  <span className="text-sm text-stone-600">Available for select projects — 2026</span>
                </div>

                <h1 className="font-display font-medium text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-[4.35rem] tracking-tight text-stone-900">
                  Design that makes brands{' '}
                  <em className="italic text-stone-600">unforgettable</em>.
                </h1>

                <p className="mt-7 text-lg text-stone-600 leading-relaxed max-w-xl">
                  I'm Sahil Ansari, an independent graphic designer working across brand identity,
                  UI/UX and motion. Eight years of turning ambitious ideas into clear, confident,
                  award-winning visual work.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 bg-stone-900 text-white font-medium px-7 py-3.5 rounded-full hover:bg-stone-700 transition-colors"
                  >
                    View selected work <ArrowRight size={17} />
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-2 border border-stone-900/20 font-medium px-7 py-3.5 rounded-full hover:border-stone-900 hover:bg-white transition-colors"
                  >
                    <Mail size={17} /> Get in touch
                  </a>
                </div>

                <dl className="mt-14 grid grid-cols-3 gap-8 max-w-lg">
                  {[
                    { number: '8+', label: 'Years of experience' },
                    { number: '200+', label: 'Projects delivered' },
                    { number: '75+', label: 'Happy clients' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <dt className="font-display text-3xl sm:text-4xl font-medium tracking-tight">{stat.number}</dt>
                      <dd className="mt-1.5 text-sm text-stone-500 leading-snug">{stat.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="md:col-span-5">
                <div className="relative max-w-sm md:max-w-none mx-auto">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-stone-900/10 bg-stone-200">
                    <img
                      src="/sahil.jpg"
                      alt="Sahil Ansari, graphic designer"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div className="absolute -bottom-5 -left-5 bg-white border border-stone-900/10 rounded-xl shadow-lg shadow-stone-900/5 px-5 py-4">
                    <p className="font-display text-2xl font-medium leading-none">15+</p>
                    <p className="text-xs text-stone-500 mt-1.5">Design awards</p>
                  </div>
                  <div className="hidden sm:flex absolute -top-5 -right-5 items-center gap-2 bg-stone-900 text-white rounded-full pl-2 pr-4 py-2">
                    <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                      <Quote size={14} />
                    </span>
                    <span className="text-xs leading-tight max-w-[7.5rem]">
                      Precision in every pixel
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Work ---------------- */}
        <section id="work" className="py-24 md:py-32 border-t border-stone-900/10 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-6">
            <div {...reveal('work-header')} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500 mb-4">
                  Selected Work
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight">
                  Recent projects
                </h2>
              </div>
              <p className="text-stone-600 max-w-sm md:text-right">
                A selection of brand, product and motion work from the last few years.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <a
                  key={project.id}
                  href="#contact"
                  {...reveal(`project-${project.id}`, (i % 3) * 90)}
                  className="group block bg-white border border-stone-900/10 rounded-2xl overflow-hidden hover:border-stone-900/25 hover:shadow-xl hover:shadow-stone-900/5 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 border border-stone-900/10 flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-stone-500 mb-2">
                      {project.category}
                    </p>
                    <h3 className="font-display text-xl font-medium tracking-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs text-stone-500 flex items-center gap-3">
                          <span className="w-1 h-1 rounded-full bg-stone-400" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- About ---------------- */}
        <section id="about" className="py-24 md:py-32 border-t border-stone-900/10 bg-white scroll-mt-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-12">
              <div {...reveal('about-label')} className="md:col-span-4">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500 mb-4">
                  About
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
                  Eight years of design, <em className="italic text-stone-600">done with intent</em>.
                </h2>
              </div>

              <div className="md:col-span-7 md:col-start-6">
                <p {...reveal('about-p1')} className="text-lg text-stone-700 leading-relaxed mb-6">
                  I'm a graphic designer who partners with startups, studios and established brands
                  around the world. My practice sits at the intersection of strategy and craft —
                  every mark, grid and motion frame is made to communicate clearly and last.
                </p>
                <p {...reveal('about-p2', 80)} className="text-lg text-stone-600 leading-relaxed mb-10">
                  From complete identity systems to product interfaces and campaign direction, I
                  partner closely with clients to build visual language that feels considered,
                  confident and unmistakably theirs.
                </p>

                <div {...reveal('about-skills', 120)} className="flex flex-wrap gap-2.5 mb-10">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm px-4 py-2 rounded-full border border-stone-900/15 text-stone-700 bg-[#faf9f7]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  {...reveal('about-cta', 160)}
                  className="inline-flex items-center gap-2 bg-stone-900 text-white font-medium px-7 py-3.5 rounded-full hover:bg-stone-700 transition-colors"
                >
                  Work with me <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Services ---------------- */}
        <section id="services" className="py-24 md:py-32 border-t border-stone-900/10 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-6">
            <div {...reveal('services-header')} className="text-center max-w-xl mx-auto mb-16">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500 mb-4">
                Services
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight">
                What I do
              </h2>
              <p className="mt-5 text-stone-600 leading-relaxed">
                End-to-end design services, delivered with the attention to detail of an independent
                studio.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <div
                  key={service.title}
                  {...reveal(`service-${i}`, i * 100)}
                  className="group relative bg-white border border-stone-900/10 rounded-2xl p-8 hover:border-stone-900/25 hover:shadow-xl hover:shadow-stone-900/5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-7">
                    <span className="w-12 h-12 rounded-xl bg-[#faf9f7] border border-stone-900/10 flex items-center justify-center text-stone-800 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-300">
                      {service.icon}
                    </span>
                    <span className="font-display text-sm text-stone-400">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-medium tracking-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2.5 border-t border-stone-900/10 pt-6">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-3 text-sm text-stone-700">
                        <Check size={15} className="text-stone-500 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Contact ---------------- */}
        <section id="contact" className="scroll-mt-24">
          <div className="bg-stone-950 text-stone-100">
            <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">
              <div {...reveal('contact-inner')}>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-400 mb-5">
                  Contact
                </p>
                <h2 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-white max-w-2xl mx-auto leading-[1.1]">
                  Have a project in mind? <em className="italic text-stone-400">Let's talk.</em>
                </h2>
                <p className="mt-6 text-stone-400 text-lg max-w-xl mx-auto leading-relaxed">
                  Whether it's a full rebrand, a product launch or a campaign that needs direction,
                  I'd love to hear what you're building.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-2 bg-white text-stone-900 font-medium px-7 py-3.5 rounded-full hover:bg-stone-200 transition-colors"
                  >
                    <Mail size={17} /> {CONTACT_EMAIL}
                  </a>
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 border border-white/25 font-medium px-7 py-3.5 rounded-full hover:border-white hover:bg-white/5 transition-colors"
                  >
                    See more work <ArrowRight size={17} />
                  </a>
                </div>

                <div className="mt-12 flex justify-center gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-stone-300 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-white/10">
              <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-stone-500">
                  © {new Date().getFullYear()} Sahil Ansari. All rights reserved.
                </p>
                <nav className="flex items-center gap-7">
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-sm text-stone-500 hover:text-stone-200 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                  <a
                    href="#top"
                    aria-label="Back to top"
                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-stone-300 hover:text-white hover:border-white/40 transition-colors"
                  >
                    <ArrowUp size={15} />
                  </a>
                </nav>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </>
  );
}
