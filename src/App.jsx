import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Mail, Github, Linkedin, Twitter, Sparkles, MousePointer2, Code2, Palette, Layers } from 'lucide-react';
export default function PortfolioWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [visibleElements, setVisibleElements] = useState(new Set());
  const canvasRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.dataset.animateId]));
          } else {
            setVisibleElements((prev) => {
              const newSet = new Set(prev);
              newSet.delete(entry.target.dataset.animateId);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('[data-animate-id]');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Animated gradient background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: `hsla(${Math.random() * 60 + 260}, 70%, 60%, ${Math.random() * 0.3 + 0.1})`
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particles.slice(i + 1).forEach(particle2 => {
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Quantum Branding",
      category: "Brand Identity",
      description: "Futuristic tech brand with holographic elements",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
      gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
      tech: ["Illustrator", "After Effects"]
    },
    {
      id: 2,
      title: "NeuroFlow App",
      category: "UI/UX Design",
      description: "Mental wellness app with biometric integration",
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&h=600&fit=crop",
      gradient: "from-cyan-500 via-blue-600 to-indigo-700",
      tech: ["Figma", "Protopie"]
    },
    {
      id: 3,
      title: "Ethereal Cosmetics",
      category: "Packaging",
      description: "Luxury skincare with sustainable packaging",
      image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&h=600&fit=crop",
      gradient: "from-emerald-500 via-teal-600 to-cyan-600",
      tech: ["Photoshop", "Dimension"]
    },
    {
      id: 4,
      title: "Vogue Parallax",
      category: "Editorial",
      description: "Interactive digital magazine experience",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop",
      gradient: "from-rose-500 via-pink-600 to-red-600",
      tech: ["InDesign", "WebGL"]
    },
    {
      id: 5,
      title: "Zenith Studios",
      category: "Motion Graphics",
      description: "3D animated logo reveal and brand toolkit",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
      gradient: "from-amber-500 via-orange-600 to-red-600",
      tech: ["Cinema 4D", "After Effects"]
    },
    {
      id: 6,
      title: "Metaverse Gallery",
      category: "3D Design",
      description: "Virtual art exhibition space",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop",
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
      tech: ["Blender", "Unreal Engine"]
    }
  ];

  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Brand Identity",
      description: "Crafting unique visual identities that resonate with your audience and stand the test of time."
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Designing intuitive interfaces that blend aesthetics with seamless user experiences."
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Motion Graphics",
      description: "Bringing designs to life with captivating animations and dynamic visual storytelling."
    }
  ];

  const getAnimationClass = (id, animationType = 'fade-up') => {
    const isVisible = visibleElements.has(id);
    
    const animations = {
      'fade-up': isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20',
      'fade-left': isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20',
      'fade-right': isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20',
      'scale': isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
      'rotate': isVisible ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-3',
    };

    return `transition-all duration-1000 ease-out ${animations[animationType]}`;
  };

  return (
   <>
  {/* GOOGLE VERIFICATION — THIS WORKS EVERYWHERE */}
  <meta name="google-site-verification" content="E_ZBjzLGr06H79oOkP0fimni5ctJCCehZNxZqKRZ4oc" />
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Sahil Ansari - Award-Winning Graphic Designer & UI/UX Expert</title>
  <meta name="description" content="Sahil Ansari — 8+ years crafting stunning brand identities, UI/UX designs, and motion graphics. Available for hire in Pakistan." />

  {/* Open Graph + Twitter */}
  <meta property="og:title" content="Sahil Ansari | Graphic Designer & Creative Director" />
  <meta property="og:description" content="Transforming brands through cutting-edge design." />
  <meta property="og:image" content="https://graphic-designer-olive.vercel.app/sahil.jpg" />
  <meta property="og:url" content="https://graphic-designer-olive.vercel.app" />
  <meta name="twitter:card" content="summary_large_image" />

  {/* Structured Data */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Sahil Ansari",
        "jobTitle": "Graphic Designer & UI/UX Expert",
        "url": "https://graphic-designer-olive.vercel.app",
        "image": "https://graphic-designer-olive.vercel.app/sahil.jpg"
      })
    }}
  />
  {/* REST OF YOUR SITE */}
  <html lang="en">
    <body className="bg-black text-white min-h-screen overflow-x-hidden relative">
      {/* ... all your code ... */}
          {/* Animated Background Canvas */}
          <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />

          {/* Custom Cursor Effect */}
          <div 
            className="fixed w-4 h-4 rounded-full border-2 border-purple-500 pointer-events-none z-50 transition-all duration-100 mix-blend-difference"
            style={{ 
              left: `${mousePosition.x}px`, 
              top: `${mousePosition.y}px`,
              transform: 'translate(-50%, -50%)',
              scale: cursorVariant === 'hover' ? 2 : 1
            }}
            aria-hidden="true"
          />

          {/* Navigation */}
          <nav className={`fixed w-full z-40 transition-all duration-500 ${scrollY > 50 ? 'bg-black/60 backdrop-blur-2xl border-b border-white/5 shadow-2xl' : 'bg-transparent'}`} aria-label="Main navigation">
            <div className="max-w-7xl mx-auto px-6 py-5">
              <div className="flex justify-between items-center">
                <div className="relative group">
                  <div className="text-2xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                      SAHIL
                    </span>
                    <span className="text-white"> ANSARI</span>
                  </div>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
                </div>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center">
                  {['Home', 'Work', 'About', 'Services', 'Contact'].map((item) => (
                    <a 
                      key={item}
                      href={`#${item.toLowerCase()}`} 
                      className="relative group text-sm font-medium tracking-wide"
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                    >
                      <span className="relative z-10 transition-colors group-hover:text-purple-400">
                        {item}
                      </span>
                      <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-violet-400 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </a>
                  ))}
                  <button className="relative group overflow-hidden px-6 py-2.5 rounded-full font-medium text-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 transition-transform group-hover:scale-105"></div>
                    <span className="relative z-10">Hire Me</span>
                  </button>
                </div>

                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden" aria-label="Toggle menu">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {isMenuOpen && (
                <div className="md:hidden pt-6 pb-4 space-y-4 animate-in slide-in-from-top">
                  {['Home', 'Work', 'About', 'Services', 'Contact'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="block py-2 hover:text-purple-400 transition-colors">
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Main Content */}
          <main>
            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center relative pt-20" aria-labelledby="hero-heading">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-black to-fuchsia-950/30"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-1/4 left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
              <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} aria-hidden="true"></div>
              
              <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2.5 mb-10 animate-fade-in">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-medium">Available for Projects</span>
                  <Sparkles size={14} className="text-violet-400" />
                </div>
                
                <h1 id="hero-heading" className="text-7xl md:text-9xl font-black mb-8 tracking-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                    DESIGN
                  </span>
                  <span className="block text-white">EXCELLENCE</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  Pushing the boundaries of visual design with cutting-edge creativity, transforming brands into immersive digital experiences that captivate and inspire.
                </p>
                
                <div className="flex gap-5 justify-center flex-wrap animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <button 
                    className="group relative overflow-hidden px-10 py-4 rounded-full font-semibold text-lg"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    aria-label="View portfolio projects"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      Explore Work <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </span>
                  </button>
                  <button className="px-10 py-4 rounded-full font-semibold text-lg bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all" aria-label="Contact Sahil Ansari">
                    Let's Talk
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20 animate-fade-in" style={{ animationDelay: '0.8s' }} role="region" aria-label="Career statistics">
                  {[
                    { number: '200+', label: 'Projects Completed' },
                    { number: '75+', label: 'Happy Clients' },
                    { number: '15+', label: 'Awards Won' }
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Work Section */}
            <section id="work" className="py-32 px-6 relative z-10" aria-labelledby="work-heading">
              <div className="max-w-7xl mx-auto">
                <div 
                  className={getAnimationClass('work-header', 'fade-up')}
                  data-animate-id="work-header"
                >
                  <div className="mb-20">
                    <h2 id="work-heading" className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                      FEATURED WORK
                    </h2>
                    <p className="text-gray-400 text-xl max-w-2xl">Crafting pixel-perfect designs that blend artistry with innovation</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {projects.map((project, index) => (
                    <article 
                      key={project.id}
                      data-animate-id={`project-${project.id}`}
                      className={`group relative aspect-[4/3] overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 cursor-pointer ${getAnimationClass(`project-${project.id}`, index % 2 === 0 ? 'fade-left' : 'fade-right')}`}
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      <img 
                        src={project.image} 
                        alt={`${project.title} - ${project.category} project by Sahil Ansari`}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-95 transition-all duration-500`}>
                        <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                          <span className="text-xs font-bold uppercase tracking-widest mb-3 opacity-80">{project.category}</span>
                          <h3 className="text-3xl font-black mb-3">{project.title}</h3>
                          <p className="text-sm opacity-90 mb-4">{project.description}</p>
                          <div className="flex gap-2">
                            {project.tech.map((tech, i) => (
                              <span key={i} className="text-xs px-3 py-1.5 bg-black/30 rounded-full backdrop-blur-sm">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight className="transform -rotate-45" size={20} />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" aria-labelledby="about-heading">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div 
                    className={`relative order-2 md:order-1 ${getAnimationClass('about-image', 'fade-right')}`}
                    data-animate-id="about-image"
                  >
                    <div className="relative">
                      <div className="aspect-square rounded-3xl overflow-hidden border-2 border-white/10 relative group">
                        <img 
                          src="./sahil.jpg?w=600&h=600&fit=crop" 
                          alt="Sahil Ansari - Professional Graphic Designer from Pakistan"
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-fuchsia-600/20"></div>
                      </div>
                      
                      <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full blur-3xl opacity-20 animate-pulse" aria-hidden="true"></div>
                      <div className="absolute -top-8 -left-8 w-48 h-48 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} aria-hidden="true"></div>
                    </div>
                  </div>

                  <div 
                    className={`order-1 md:order-2 ${getAnimationClass('about-content', 'fade-left')}`}
                    data-animate-id="about-content"
                  >
                    <h2 id="about-heading" className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                      ABOUT ME
                    </h2>
                    <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                      I'm a passionate graphic designer with over 8 years of experience creating compelling visual narratives for brands worldwide. My work blends creativity with strategy to deliver designs that not only look beautiful but drive results.
                    </p>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                      I specialize in brand identity, UI/UX design, and visual storytelling. Every project is an opportunity to push boundaries and create something extraordinary.
                    </p>

                    <div className="grid grid-cols-3 gap-6 mb-8">
                      {[
                        { number: '8+', label: 'Years Experience', color: 'from-violet-400 to-purple-400' },
                        { number: '200+', label: 'Projects Done', color: 'from-fuchsia-400 to-pink-400' },
                        { number: '75+', label: 'Happy Clients', color: 'from-cyan-400 to-blue-400' }
                      ].map((stat, i) => (
                        <div 
                          key={i} 
                          className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                          data-animate-id={`about-stat-${i}`}
                          style={{ transitionDelay: `${i * 100}ms` }}
                        >
                          <div className={`text-4xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                            {stat.number}
                          </div>
                          <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    <button 
                      className="group relative overflow-hidden px-8 py-4 rounded-full font-semibold"
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                      aria-label="Download Sahil Ansari's resume"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600"></div>
                      <span className="relative z-10 flex items-center gap-2">
                        Download Resume <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-32 px-6 relative z-10" aria-labelledby="services-heading">
              <div className="max-w-7xl mx-auto">
                <div 
                  className={`text-center mb-20 ${getAnimationClass('services-header', 'fade-up')}`}
                  data-animate-id="services-header"
                >
                  <h2 id="services-heading" className="text-6xl md:text-8xl font-black mb-6">SERVICES</h2>
                  <p className="text-gray-400 text-xl">End-to-end design solutions</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {services.map((service, index) => (
                    <article 
                      key={index}
                      data-animate-id={`service-${index}`}
                      className={`group relative p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 overflow-hidden ${getAnimationClass(`service-${index}`, 'scale')}`}
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-fuchsia-600/0 group-hover:from-violet-600/10 group-hover:to-fuchsia-600/10 transition-all duration-500"></div>
                      
                      <div className="relative z-10">
                        <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{service.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="py-32 px-6 relative z-10" aria-labelledby="contact-heading">
              <div className="max-w-5xl mx-auto text-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-cyan-600/20 blur-3xl"></div>
                
                <div 
                  className={`relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-16 ${getAnimationClass('contact-card', 'scale')}`}
                  data-animate-id="contact-card"
                >
                  <h2 id="contact-heading" className="text-5xl md:text-7xl font-black mb-6">
                    <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                      LET'S CREATE
                    </span>
                    <br />
                    SOMETHING AMAZING
                  </h2>
                  <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
                    Ready to elevate your brand? Let's collaborate and craft extraordinary experiences together.
                  </p>

                  <div className="flex gap-5 justify-center flex-wrap mb-10">
                    <button className="group relative overflow-hidden px-10 py-5 rounded-full font-semibold text-lg" aria-label="Email Sahil Ansari to start a project">
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600"></div>
                      <span className="relative z-10 flex items-center gap-2">
                        <Mail size={20} />
                        Start a Project
                      </span>
                    </button>
                    <button className="px-10 py-5 rounded-full font-semibold text-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all" aria-label="Download CV">
                      Download CV
                    </button>
                  </div>

                  <div className="flex gap-5 justify-center" role="list" aria-label="Social media links">
                    {[
                      { icon: <Github size={22} />, href: 'https://github.com/yourusername', label: 'GitHub' },
                      { icon: <Linkedin size={22} />, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
                      { icon: <Twitter size={22} />, href: 'https://twitter.com/yourusername', label: 'Twitter' }
                    ].map((social, i) => (
                      <a 
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                        aria-label={social.label}
                      >
                        <div className="transform group-hover:scale-110 transition-transform">
                          {social.icon}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="py-10 px-6 border-t border-white/5 relative z-10" aria-label="Footer">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">© 2025 sahil ansari. All rights reserved.</p>
              <p className="text-gray-500 text-sm">Crafted with passion & precision</p>
            </div>
          </footer>

          <style jsx>{`
            @keyframes fade-in {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fade-in {
              animation: fade-in 1s ease-out forwards;
              opacity: 0;
            }
          `}</style>
        </body>
      </html>
    </>
  );
}