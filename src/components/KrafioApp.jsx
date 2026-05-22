import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, Star, MapPin, Phone, MessageCircle, Shield, Award, Clock,
  Heart, Filter, ChevronRight, ArrowLeft, Briefcase, User, Home,
  Plus, Check, X, Hammer, Paintbrush, Wrench, Zap, Truck, Sparkles,
  Trees, Bug, Wind, Droplet, Settings, TrendingUp, Calendar, DollarSign,
  Camera, Edit3, Send, Bell, Globe
} from 'lucide-react';

// ============ TRADUCCIONES ============
const translations = {
  es: {
    appName: 'Krafio',
    slogan: 'Every home deserves an expert.',
    tagline: 'Tu casa, en manos expertas.',
    description: 'Conectamos hogares con los mejores profesionales de oficios. Reseñas verificadas, precios claros, sin sorpresas.',
    iAmClient: 'Soy cliente',
    needService: 'Necesito un servicio',
    iAmProvider: 'Soy proveedor',
    wantOffer: 'Quiero ofrecer servicios',
    professionals: 'Profesionales',
    rating: 'Calificación',
    jobs: 'Trabajos',
    whatNeed: '¿Qué necesitas\narreglar hoy?',
    homeSubtitle: 'Profesionales verificados, listos para ayudarte.',
    searchPlaceholder: 'Buscar servicio o profesional...',
    yourZone: 'Tu zona',
    categories: 'Categorías',
    topNear: 'Top Rated cerca de ti',
    nearYou: 'profesionales cerca de ti',
    searchByName: 'Buscar por nombre o especialidad...',
    noProviders: 'No hay proveedores en esta categoría aún.',
    verified: 'Verificado',
    aboutCraft: 'Sobre el oficio',
    specialties: 'Especialidades',
    referencePrice: 'Precio referencial',
    priceNote: 'El presupuesto final se ajusta según el trabajo',
    recentReviews: 'Reseñas recientes',
    viewAll: 'Ver todas',
    requestQuote: 'Solicitar cotización',
    available: 'Disponible',
    respondsIn: 'Responde en',
    experience: 'Experiencia',
    reviews: 'reseñas',
    of: 'de ti',
    requestSent: 'Solicitud enviada',
    requestSentMsg: 'recibió tu solicitud y te responderá en',
    backHome: 'Volver al inicio',
    welcome: 'Bienvenido',
    new: 'Nuevos',
    inProgress: 'En curso',
    thisMonth: 'Este mes',
    newRequests: 'Solicitudes nuevas',
    newCount: 'nuevas',
    respond: 'Responder',
    later: 'Después',
    manageBusiness: 'Gestiona tu negocio',
    myJobs: 'Mis trabajos',
    editProfile: 'Editar mi perfil',
    stats: 'Estadísticas',
    myReviews: 'Mis reseñas',
    save: 'Guardar',
    fullName: 'Nombre completo',
    company: 'Empresa',
    category: 'Categoría',
    phone: 'Teléfono',
    yearsExp: 'Años de experiencia',
    refPrice: 'Precio referencial',
    pending: 'Pendiente',
    completed: 'Completado',
    quoteText: 'Por cotizar',
    categoriesData: {
      pintura: 'Pintura', fontaneria: 'Fontanería', electricidad: 'Electricidad',
      mudanza: 'Mudanza', limpieza: 'Limpieza', jardineria: 'Jardinería',
      plagas: 'Control de plagas', aire: 'Aire acondicionado', carpinteria: 'Carpintería',
      cerrajeria: 'Cerrajería', albanileria: 'Albañilería', todos: 'Todoterreno'
    },
    availabilities: {
      today: 'Disponible hoy',
      now: 'Disponible ahora',
      tomorrow: 'Disponible mañana',
      book: 'Reservar fecha'
    }
  },
  en: {
    appName: 'Krafio',
    slogan: 'Every home deserves an expert.',
    tagline: 'Your home, in expert hands.',
    description: 'We connect homes with the best skilled professionals. Verified reviews, clear pricing, no surprises.',
    iAmClient: "I'm a client",
    needService: 'I need a service',
    iAmProvider: "I'm a provider",
    wantOffer: 'I want to offer services',
    professionals: 'Professionals',
    rating: 'Rating',
    jobs: 'Jobs',
    whatNeed: 'What needs\nfixing today?',
    homeSubtitle: 'Verified pros, ready to help you.',
    searchPlaceholder: 'Search service or pro...',
    yourZone: 'Your area',
    categories: 'Categories',
    topNear: 'Top Rated near you',
    nearYou: 'professionals near you',
    searchByName: 'Search by name or specialty...',
    noProviders: 'No providers in this category yet.',
    verified: 'Verified',
    aboutCraft: 'About the craft',
    specialties: 'Specialties',
    referencePrice: 'Starting price',
    priceNote: 'Final quote adjusts based on the job',
    recentReviews: 'Recent reviews',
    viewAll: 'View all',
    requestQuote: 'Request quote',
    available: 'Available',
    respondsIn: 'Responds in',
    experience: 'Experience',
    reviews: 'reviews',
    of: 'from you',
    requestSent: 'Request sent',
    requestSentMsg: 'received your request and will reply in',
    backHome: 'Back to home',
    welcome: 'Welcome',
    new: 'New',
    inProgress: 'Active',
    thisMonth: 'This month',
    newRequests: 'New requests',
    newCount: 'new',
    respond: 'Reply',
    later: 'Later',
    manageBusiness: 'Manage your business',
    myJobs: 'My jobs',
    editProfile: 'Edit profile',
    stats: 'Statistics',
    myReviews: 'My reviews',
    save: 'Save',
    fullName: 'Full name',
    company: 'Company',
    category: 'Category',
    phone: 'Phone',
    yearsExp: 'Years of experience',
    refPrice: 'Starting price',
    pending: 'Pending',
    completed: 'Completed',
    quoteText: 'To quote',
    categoriesData: {
      pintura: 'Painting', fontaneria: 'Plumbing', electricidad: 'Electrical',
      mudanza: 'Moving', limpieza: 'Cleaning', jardineria: 'Gardening',
      plagas: 'Pest control', aire: 'Air conditioning', carpinteria: 'Carpentry',
      cerrajeria: 'Locksmith', albanileria: 'Masonry', todos: 'Handyman'
    },
    availabilities: {
      today: 'Available today',
      now: 'Available now',
      tomorrow: 'Available tomorrow',
      book: 'Book a date'
    }
  },
  pt: {
    appName: 'Krafio',
    slogan: 'Every home deserves an expert.',
    tagline: 'Sua casa, em mãos expertas.',
    description: 'Conectamos lares com os melhores profissionais. Avaliações verificadas, preços claros, sem surpresas.',
    iAmClient: 'Sou cliente',
    needService: 'Preciso de um serviço',
    iAmProvider: 'Sou prestador',
    wantOffer: 'Quero oferecer serviços',
    professionals: 'Profissionais',
    rating: 'Avaliação',
    jobs: 'Trabalhos',
    whatNeed: 'O que precisa\nconsertar hoje?',
    homeSubtitle: 'Profissionais verificados, prontos para ajudar.',
    searchPlaceholder: 'Buscar serviço ou profissional...',
    yourZone: 'Sua área',
    categories: 'Categorias',
    topNear: 'Top Rated perto de você',
    nearYou: 'profissionais perto de você',
    searchByName: 'Buscar por nome ou especialidade...',
    noProviders: 'Sem prestadores nesta categoria ainda.',
    verified: 'Verificado',
    aboutCraft: 'Sobre o ofício',
    specialties: 'Especialidades',
    referencePrice: 'Preço inicial',
    priceNote: 'O orçamento final se ajusta ao trabalho',
    recentReviews: 'Avaliações recentes',
    viewAll: 'Ver todas',
    requestQuote: 'Solicitar orçamento',
    available: 'Disponível',
    respondsIn: 'Responde em',
    experience: 'Experiência',
    reviews: 'avaliações',
    of: 'de você',
    requestSent: 'Solicitação enviada',
    requestSentMsg: 'recebeu sua solicitação e responderá em',
    backHome: 'Voltar ao início',
    welcome: 'Bem-vindo',
    new: 'Novos',
    inProgress: 'Em curso',
    thisMonth: 'Este mês',
    newRequests: 'Novas solicitações',
    newCount: 'novas',
    respond: 'Responder',
    later: 'Depois',
    manageBusiness: 'Gerencie seu negócio',
    myJobs: 'Meus trabalhos',
    editProfile: 'Editar perfil',
    stats: 'Estatísticas',
    myReviews: 'Minhas avaliações',
    save: 'Salvar',
    fullName: 'Nome completo',
    company: 'Empresa',
    category: 'Categoria',
    phone: 'Telefone',
    yearsExp: 'Anos de experiência',
    refPrice: 'Preço inicial',
    pending: 'Pendente',
    completed: 'Concluído',
    quoteText: 'A orçar',
    categoriesData: {
      pintura: 'Pintura', fontaneria: 'Encanamento', electricidad: 'Elétrica',
      mudanza: 'Mudança', limpieza: 'Limpeza', jardineria: 'Jardinagem',
      plagas: 'Controle de pragas', aire: 'Ar condicionado', carpinteria: 'Marcenaria',
      cerrajeria: 'Chaveiro', albanileria: 'Alvenaria', todos: 'Faz-tudo'
    },
    availabilities: {
      today: 'Disponível hoje',
      now: 'Disponível agora',
      tomorrow: 'Disponível amanhã',
      book: 'Agendar'
    }
  },
  fr: {
    appName: 'Krafio',
    slogan: 'Every home deserves an expert.',
    tagline: 'Votre maison, entre mains expertes.',
    description: 'Nous connectons les foyers aux meilleurs artisans. Avis vérifiés, prix clairs, sans surprises.',
    iAmClient: 'Je suis client',
    needService: "J'ai besoin d'un service",
    iAmProvider: 'Je suis prestataire',
    wantOffer: 'Je veux offrir mes services',
    professionals: 'Professionnels',
    rating: 'Note',
    jobs: 'Travaux',
    whatNeed: 'Que faut-il\nréparer aujourd\'hui?',
    homeSubtitle: 'Professionnels vérifiés, prêts à vous aider.',
    searchPlaceholder: 'Rechercher service ou pro...',
    yourZone: 'Votre zone',
    categories: 'Catégories',
    topNear: 'Top Rated près de vous',
    nearYou: 'professionnels près de vous',
    searchByName: 'Rechercher par nom ou spécialité...',
    noProviders: 'Aucun prestataire dans cette catégorie.',
    verified: 'Vérifié',
    aboutCraft: 'À propos du métier',
    specialties: 'Spécialités',
    referencePrice: 'Prix de départ',
    priceNote: "Le devis final s'ajuste selon le travail",
    recentReviews: 'Avis récents',
    viewAll: 'Voir tous',
    requestQuote: 'Demander un devis',
    available: 'Disponible',
    respondsIn: 'Répond en',
    experience: 'Expérience',
    reviews: 'avis',
    of: 'de vous',
    requestSent: 'Demande envoyée',
    requestSentMsg: 'a reçu votre demande et répondra en',
    backHome: "Retour à l'accueil",
    welcome: 'Bienvenue',
    new: 'Nouveaux',
    inProgress: 'En cours',
    thisMonth: 'Ce mois',
    newRequests: 'Nouvelles demandes',
    newCount: 'nouvelles',
    respond: 'Répondre',
    later: 'Plus tard',
    manageBusiness: 'Gérez votre activité',
    myJobs: 'Mes travaux',
    editProfile: 'Modifier le profil',
    stats: 'Statistiques',
    myReviews: 'Mes avis',
    save: 'Enregistrer',
    fullName: 'Nom complet',
    company: 'Entreprise',
    category: 'Catégorie',
    phone: 'Téléphone',
    yearsExp: "Années d'expérience",
    refPrice: 'Prix de départ',
    pending: 'En attente',
    completed: 'Terminé',
    quoteText: 'À chiffrer',
    categoriesData: {
      pintura: 'Peinture', fontaneria: 'Plomberie', electricidad: 'Électricité',
      mudanza: 'Déménagement', limpieza: 'Nettoyage', jardineria: 'Jardinage',
      plagas: 'Désinsectisation', aire: 'Climatisation', carpinteria: 'Menuiserie',
      cerrajeria: 'Serrurerie', albanileria: 'Maçonnerie', todos: 'Bricoleur'
    },
    availabilities: {
      today: "Disponible aujourd'hui",
      now: 'Disponible maintenant',
      tomorrow: 'Disponible demain',
      book: 'Réserver'
    }
  }
};

// Mapeo de país (código ISO) → idioma
const countryToLanguage = {
  // Español
  MX: 'es', CO: 'es', AR: 'es', ES: 'es', CL: 'es', PE: 'es', VE: 'es',
  EC: 'es', GT: 'es', CU: 'es', BO: 'es', DO: 'es', HN: 'es', PY: 'es',
  SV: 'es', NI: 'es', CR: 'es', PA: 'es', UY: 'es', PR: 'es',
  // Inglés
  US: 'en', GB: 'en', CA: 'en', AU: 'en', IE: 'en', NZ: 'en', ZA: 'en',
  IN: 'en', SG: 'en',
  // Portugués
  BR: 'pt', PT: 'pt',
  // Francés
  FR: 'fr', BE: 'fr', CH: 'fr', LU: 'fr', MC: 'fr'
};

const countryNames = {
  MX: 'México', CO: 'Colombia', AR: 'Argentina', ES: 'España',
  US: 'United States', GB: 'United Kingdom', BR: 'Brasil', FR: 'France',
  CA: 'Canada', AU: 'Australia', CL: 'Chile', PE: 'Perú'
};

export default function KrafioApp() {
  const [mode, setMode] = useState('landing');
  const [clientView, setClientView] = useState('home');
  const [providerView, setProviderView] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [country, setCountry] = useState('MX');
  const [showLangPicker, setShowLangPicker] = useState(false);

  // Detección automática del país (simulada - en producción se haría con geolocation API o IP)
  useEffect(() => {
    // En producción real: fetch a un servicio de geolocalización por IP
    // Por defecto MX para esta demo
    const browserLang = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language.toLowerCase() : 'es-mx';
    if (browserLang.startsWith('en')) setCountry('US');
    else if (browserLang.startsWith('pt')) setCountry('BR');
    else if (browserLang.startsWith('fr')) setCountry('FR');
    else setCountry('MX');
  }, []);

  const lang = countryToLanguage[country] || 'en';
  const t = translations[lang];

  const categories = [
    { id: 'pintura', icon: Paintbrush, count: 142, color: '#D97757' },
    { id: 'fontaneria', icon: Droplet, count: 98, color: '#4A6FA5' },
    { id: 'electricidad', icon: Zap, count: 87, color: '#E0A458' },
    { id: 'mudanza', icon: Truck, count: 56, color: '#6B8E4E' },
    { id: 'limpieza', icon: Sparkles, count: 203, color: '#9B6B9E' },
    { id: 'jardineria', icon: Trees, count: 64, color: '#5C7F3E' },
    { id: 'plagas', icon: Bug, count: 41, color: '#7A5C3E' },
    { id: 'aire', icon: Wind, count: 73, color: '#5A8DA8' },
    { id: 'carpinteria', icon: Hammer, count: 89, color: '#8B6F47' },
    { id: 'cerrajeria', icon: Settings, count: 38, color: '#6E6E6E' },
    { id: 'albanileria', icon: Wrench, count: 71, color: '#A0826D' },
    { id: 'todos', icon: Briefcase, count: 124, color: '#D97757' }
  ];

  // Moneda según país
  const currency = country === 'US' || country === 'CA' ? '$' :
                   country === 'GB' ? '£' :
                   country === 'FR' || country === 'ES' ? '€' :
                   country === 'BR' ? 'R$' : '$';

  const providers = [
    {
      id: 1,
      name: lang === 'en' ? 'Martin Restrepo' : lang === 'pt' ? 'Martín Restrepo' : 'Martín Restrepo',
      company: lang === 'en' ? 'Restrepo & Sons Painting' : lang === 'pt' ? 'Pinturas Restrepo & Filhos' : lang === 'fr' ? 'Peintures Restrepo & Fils' : 'Pinturas Restrepo & Hijos',
      category: 'pintura', rating: 4.9, reviews: 187,
      price: country === 'US' ? '$45/m²' : country === 'BR' ? 'R$ 80/m²' : country === 'FR' || country === 'ES' ? '€38/m²' : '$45.000/m²',
      experience: 18, verified: true,
      badge: lang === 'en' ? 'Top Rated' : lang === 'pt' ? 'Top Rated' : lang === 'fr' ? 'Top Rated' : 'Top Rated',
      distance: '1.2 km',
      bio: lang === 'en' ? 'Three generations painting homes in the city. Specialists in decorative finishes, Venetian techniques and eco-friendly paint.' :
           lang === 'pt' ? 'Três gerações pintando casas. Especialistas em acabamentos decorativos, técnicas venezianas e tinta ecológica.' :
           lang === 'fr' ? 'Trois générations à peindre des maisons. Spécialistes des finitions décoratives, techniques vénitiennes et peinture écologique.' :
           'Tres generaciones pintando casas en la ciudad. Especialistas en acabados decorativos, técnicas venecianas y pintura ecológica.',
      jobs: 542, responseTime: '< 1h', availabilityKey: 'today',
      tags: lang === 'en' ? ['Interior', 'Exterior', 'Decorative', 'Eco-friendly'] :
            lang === 'pt' ? ['Interior', 'Exterior', 'Decorativa', 'Ecológica'] :
            lang === 'fr' ? ['Intérieur', 'Extérieur', 'Décorative', 'Écologique'] :
            ['Pintura interior', 'Exterior', 'Decorativa', 'Ecológica']
    },
    {
      id: 2,
      name: lang === 'en' ? 'Laura Mendoza' : 'Laura Mendoza',
      company: lang === 'en' ? 'AquaFix Solutions' : lang === 'pt' ? 'AquaFix Soluções' : lang === 'fr' ? 'AquaFix Solutions' : 'AquaFix Soluciones',
      category: 'fontaneria', rating: 4.8, reviews: 234,
      price: country === 'US' ? 'From $80' : country === 'BR' ? 'A partir de R$ 150' : country === 'FR' || country === 'ES' ? 'Dès €70' : 'Desde $80.000',
      experience: 12, verified: true,
      badge: lang === 'en' ? 'Fast response' : lang === 'pt' ? 'Resposta rápida' : lang === 'fr' ? 'Réponse rapide' : 'Respuesta rápida',
      distance: '0.8 km',
      bio: lang === 'en' ? 'Certified plumber. 24/7 emergencies, new installations and leak detection with thermal technology.' :
           lang === 'pt' ? 'Encanadora certificada. Emergências 24/7, instalações novas e detecção de vazamentos com tecnologia térmica.' :
           lang === 'fr' ? 'Plombière certifiée. Urgences 24/7, nouvelles installations et détection de fuites par thermographie.' :
           'Fontanera certificada. Emergencias 24/7, instalaciones nuevas y detección de fugas con tecnología termográfica.',
      jobs: 689, responseTime: '< 30min', availabilityKey: 'now',
      tags: lang === 'en' ? ['24h Emergency', 'Leak detection', 'Install', 'Heaters'] :
            lang === 'pt' ? ['Emergência 24h', 'Detecção', 'Instalação', 'Aquecedores'] :
            lang === 'fr' ? ['Urgence 24h', 'Détection fuites', 'Installation', 'Chauffe-eau'] :
            ['Emergencias 24h', 'Detección fugas', 'Instalación', 'Calentadores']
    },
    {
      id: 3,
      name: 'Carlos Ríos',
      company: 'ElectroSur',
      category: 'electricidad', rating: 4.7, reviews: 156,
      price: country === 'US' ? 'From $65' : country === 'BR' ? 'A partir de R$ 120' : country === 'FR' || country === 'ES' ? 'Dès €55' : 'Desde $65.000',
      experience: 15, verified: true,
      badge: t.verified, distance: '2.1 km',
      bio: lang === 'en' ? 'Licensed electrician. Residential installations, panels, home automation and solar panels.' :
           lang === 'pt' ? 'Eletricista licenciado. Instalações residenciais, quadros, automação e painéis solares.' :
           lang === 'fr' ? 'Électricien diplômé. Installations résidentielles, tableaux, domotique et panneaux solaires.' :
           'Electricista matriculado. Instalaciones residenciales, tableros, automatización del hogar y paneles solares.',
      jobs: 412, responseTime: '< 2h', availabilityKey: 'tomorrow',
      tags: lang === 'en' ? ['Installation', 'Smart home', 'Solar', 'Panels'] :
            lang === 'pt' ? ['Instalação', 'Domótica', 'Solar', 'Quadros'] :
            lang === 'fr' ? ['Installation', 'Domotique', 'Solaire', 'Tableaux'] :
            ['Instalación', 'Domótica', 'Solar', 'Tableros']
    },
    {
      id: 4,
      name: 'Ana Solís',
      company: lang === 'en' ? 'Express Moving' : lang === 'pt' ? 'Mudanças Express' : lang === 'fr' ? 'Déménagements Express' : 'Mudanzas Express',
      category: 'mudanza', rating: 4.9, reviews: 98,
      price: country === 'US' ? 'From $250' : country === 'BR' ? 'A partir de R$ 500' : country === 'FR' || country === 'ES' ? 'Dès €220' : 'Desde $250.000',
      experience: 8, verified: true,
      badge: 'Top Rated', distance: '3.5 km',
      bio: lang === 'en' ? 'Local and intercity moves. Professional packing team, insurance included and furniture disassembly.' :
           lang === 'pt' ? 'Mudanças locais e interestaduais. Equipe de embalagem profissional, seguro incluído.' :
           lang === 'fr' ? 'Déménagements locaux et interurbains. Équipe d\'emballage professionnelle, assurance incluse.' :
           'Mudanzas locales e interurbanas. Equipo de embalaje profesional, seguro incluido y desmonte de muebles.',
      jobs: 234, responseTime: '< 3h', availabilityKey: 'book',
      tags: lang === 'en' ? ['Local', 'Intercity', 'Packing', 'Insured'] :
            lang === 'pt' ? ['Local', 'Interestadual', 'Embalagem', 'Seguro'] :
            lang === 'fr' ? ['Local', 'Interurbain', 'Emballage', 'Assuré'] :
            ['Local', 'Interurbana', 'Embalaje', 'Asegurada']
    }
  ];

  const reviewsData = lang === 'en' ? [
    { id: 1, name: 'Patricia G.', rating: 5, date: '3 days ago', text: 'Impeccable work. Arrived on time, left everything clean and the result exceeded my expectations. Would hire again without hesitation.', helpful: 12 },
    { id: 2, name: 'Robert M.', rating: 5, date: '1 week ago', text: 'A true professional. Explained every step and respected the initial budget. Highly recommended.', helpful: 8 },
    { id: 3, name: 'Camila V.', rating: 4, date: '2 weeks ago', text: 'Good service and fair price. I just wish they had given more notice on the start date.', helpful: 5 }
  ] : lang === 'pt' ? [
    { id: 1, name: 'Patricia G.', rating: 5, date: 'há 3 dias', text: 'Trabalho impecável. Chegou pontual, deixou tudo limpo e o resultado superou expectativas. Contrataria de novo.', helpful: 12 },
    { id: 2, name: 'Roberto M.', rating: 5, date: 'há 1 semana', text: 'Profissional de verdade. Explicou cada passo e respeitou o orçamento inicial. Muito recomendado.', helpful: 8 },
    { id: 3, name: 'Camila V.', rating: 4, date: 'há 2 semanas', text: 'Bom serviço e preço justo. Só queria que avisasse com mais antecedência o dia de início.', helpful: 5 }
  ] : lang === 'fr' ? [
    { id: 1, name: 'Patricia G.', rating: 5, date: 'il y a 3 jours', text: 'Travail impeccable. À l\'heure, tout propre et le résultat dépasse mes attentes. Je referais appel sans hésiter.', helpful: 12 },
    { id: 2, name: 'Robert M.', rating: 5, date: 'il y a 1 semaine', text: 'Un vrai professionnel. A expliqué chaque étape et respecté le budget initial. Très recommandé.', helpful: 8 },
    { id: 3, name: 'Camila V.', rating: 4, date: 'il y a 2 semaines', text: 'Bon service et prix juste. J\'aurais juste aimé être prévenue plus tôt de la date de début.', helpful: 5 }
  ] : [
    { id: 1, name: 'Patricia G.', rating: 5, date: 'hace 3 días', text: 'Trabajo impecable. Llegó puntual, dejó todo limpio y el resultado superó lo que esperaba. Volvería a contratarlo sin dudar.', helpful: 12 },
    { id: 2, name: 'Roberto M.', rating: 5, date: 'hace 1 semana', text: 'Profesional de verdad. Explicó cada paso del proceso y respetó el presupuesto inicial. Muy recomendado.', helpful: 8 },
    { id: 3, name: 'Camila V.', rating: 4, date: 'hace 2 semanas', text: 'Buen servicio y precio justo. Solo me hubiera gustado que avisara con más anticipación el día de inicio.', helpful: 5 }
  ];

  const myJobs = [
    { id: 1, client: lang === 'en' ? 'Gomez Family' : 'Familia Gómez',
      service: lang === 'en' ? 'Living room painting' : lang === 'pt' ? 'Pintura sala' : lang === 'fr' ? 'Peinture salon' : 'Pintura sala y comedor',
      date: '24 May', status: t.inProgress, price: country === 'US' ? '$420' : '$420.000', address: 'Calle 45 #12-30' },
    { id: 2, client: 'Andrés P.',
      service: lang === 'en' ? 'Exterior quote' : lang === 'pt' ? 'Orçamento exterior' : lang === 'fr' ? 'Devis extérieur' : 'Cotización pintura exterior',
      date: '26 May', status: t.pending, price: t.quoteText, address: 'Cra 7 #88-15' },
    { id: 3, client: 'María L.',
      service: lang === 'en' ? 'Bedroom painting' : lang === 'pt' ? 'Pintura quarto' : lang === 'fr' ? 'Peinture chambre' : 'Pintura habitación',
      date: '20 May', status: t.completed, price: country === 'US' ? '$180' : '$180.000', address: 'Av 19 #56-22' }
  ];

  const toggleFavorite = (id) => {
    const newFavs = new Set(favorites);
    newFavs.has(id) ? newFavs.delete(id) : newFavs.add(id);
    setFavorites(newFavs);
  };

  const filteredProviders = useMemo(() => {
    let filtered = providers;
    if (selectedCategory && selectedCategory !== 'todos') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return filtered;
  }, [selectedCategory, searchQuery, country]);

  // Selector de idioma/país
  const LangPicker = () => showLangPicker && (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={() => setShowLangPicker(false)}>
      <div className="w-full max-w-md rounded-t-3xl p-5 max-h-96 overflow-y-auto" style={{ background: '#F4EFE6' }} onClick={e => e.stopPropagation()}>
        <div className="w-12 h-1 rounded-full mx-auto mb-4" style={{ background: '#D4C9B5' }} />
        <h3 className="text-lg mb-3" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>
          {lang === 'en' ? 'Choose your country' : lang === 'pt' ? 'Escolha seu país' : lang === 'fr' ? 'Choisissez votre pays' : 'Elige tu país'}
        </h3>
        <div className="space-y-1">
          {Object.entries(countryNames).map(([code, name]) => (
            <button
              key={code}
              onClick={() => { setCountry(code); setShowLangPicker(false); }}
              className="w-full p-3 rounded-xl flex items-center justify-between"
              style={{ background: country === code ? '#2C2416' : 'white', color: country === code ? '#F4EFE6' : '#2C2416' }}
            >
              <span style={{ fontFamily: 'system-ui' }}>{name}</span>
              <span className="text-xs opacity-60" style={{ fontFamily: 'system-ui' }}>{countryToLanguage[code].toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ============ LANDING ============
  if (mode === 'landing') {
    return (
      <div className="min-h-screen" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
        <LangPicker />
        <div className="max-w-md mx-auto min-h-screen relative overflow-hidden" style={{ background: '#F4EFE6' }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #D97757 0%, transparent 70%)' }} />
          <div className="absolute bottom-20 left-0 w-48 h-48 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #4A6FA5 0%, transparent 70%)' }} />

          <div className="relative px-6 pt-12 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#2C2416' }}>
                <Home size={20} color="#F4EFE6" />
              </div>
              <span className="text-sm tracking-widest uppercase" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>{t.appName}</span>
            </div>
            <button onClick={() => setShowLangPicker(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(44,36,22,0.08)' }}>
              <Globe size={14} color="#2C2416" />
              <span className="text-xs uppercase tracking-wider" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>{country}</span>
            </button>
          </div>

          <div className="relative px-6 pb-12">
            {/* Slogan internacional destacado */}
            <div className="mb-5 inline-block px-4 py-1.5 rounded-full" style={{ background: 'rgba(217,119,87,0.15)' }}>
              <p className="text-xs uppercase tracking-widest" style={{ color: '#A8553C', fontFamily: 'system-ui', fontWeight: 700, letterSpacing: '0.15em' }}>
                {t.slogan}
              </p>
            </div>

            <h1 className="text-5xl leading-tight mb-4" style={{ color: '#2C2416', fontWeight: 400, fontStyle: 'italic' }}>
              {t.tagline.split(',')[0]},<br />
              <span style={{ color: '#D97757' }}>{t.tagline.split(',')[1]?.trim() || ''}</span>
            </h1>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#5C5446', fontFamily: 'system-ui' }}>
              {t.description}
            </p>

            <div className="space-y-3 mb-8">
              <button
                onClick={() => { setMode('client'); setClientView('home'); }}
                className="w-full py-5 px-6 rounded-2xl flex items-center justify-between transition-transform active:scale-98 shadow-lg"
                style={{ background: '#2C2416', color: '#F4EFE6' }}
              >
                <div className="text-left">
                  <div className="text-xs uppercase tracking-wider opacity-60" style={{ fontFamily: 'system-ui' }}>{t.iAmClient}</div>
                  <div className="text-lg" style={{ fontFamily: 'system-ui', fontWeight: 500 }}>{t.needService}</div>
                </div>
                <ChevronRight size={24} />
              </button>

              <button
                onClick={() => { setMode('provider'); setProviderView('dashboard'); }}
                className="w-full py-5 px-6 rounded-2xl flex items-center justify-between transition-transform active:scale-98 border-2"
                style={{ borderColor: '#2C2416', background: 'transparent', color: '#2C2416' }}
              >
                <div className="text-left">
                  <div className="text-xs uppercase tracking-wider opacity-60" style={{ fontFamily: 'system-ui' }}>{t.iAmProvider}</div>
                  <div className="text-lg" style={{ fontFamily: 'system-ui', fontWeight: 500 }}>{t.wantOffer}</div>
                </div>
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-6 border-t" style={{ borderColor: '#D4C9B5' }}>
              <div>
                <div className="text-2xl" style={{ color: '#2C2416', fontWeight: 600 }}>1.2K+</div>
                <div className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{t.professionals}</div>
              </div>
              <div>
                <div className="text-2xl" style={{ color: '#2C2416', fontWeight: 600 }}>4.8★</div>
                <div className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{t.rating}</div>
              </div>
              <div>
                <div className="text-2xl" style={{ color: '#2C2416', fontWeight: 600 }}>15K+</div>
                <div className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{t.jobs}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ CLIENTE ============
  if (mode === 'client') {
    if (clientView === 'detail' && selectedProvider) {
      const p = selectedProvider;
      const cat = categories.find(c => c.id === p.category);
      const Icon = cat?.icon || Briefcase;
      const catColor = cat?.color || '#D97757';
      const catName = t.categoriesData[p.category];

      return (
        <div className="min-h-screen" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
          <LangPicker />
          <div className="max-w-md mx-auto" style={{ background: '#F4EFE6' }}>
            <div className="relative h-64" style={{ background: `linear-gradient(135deg, ${catColor} 0%, ${catColor}dd 100%)` }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="relative px-5 pt-12 pb-4 flex justify-between">
                <button onClick={() => setClientView('category')} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
                  <ArrowLeft size={20} color="white" />
                </button>
                <button onClick={() => toggleFavorite(p.id)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
                  <Heart size={20} color="white" fill={favorites.has(p.id) ? 'white' : 'none'} />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
                <div className="flex items-end gap-3">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl" style={{ background: '#F4EFE6' }}>
                    <Icon size={36} color={catColor} />
                  </div>
                  <div className="pb-1 text-white">
                    <div className="text-xs uppercase tracking-wider opacity-80" style={{ fontFamily: 'system-ui' }}>{p.badge}</div>
                    <div className="text-xs opacity-90" style={{ fontFamily: 'system-ui' }}>{p.distance} {t.of}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 pt-5 pb-32">
              <div className="flex items-start justify-between mb-1">
                <h2 className="text-3xl leading-tight" style={{ color: '#2C2416', fontWeight: 400, fontStyle: 'italic' }}>{p.company}</h2>
                {p.verified && (
                  <div className="px-2 py-1 rounded-full flex items-center gap-1" style={{ background: '#2C2416' }}>
                    <Shield size={10} color="#F4EFE6" />
                    <span className="text-xs" style={{ color: '#F4EFE6', fontFamily: 'system-ui' }}>{t.verified}</span>
                  </div>
                )}
              </div>
              <p className="text-sm mb-4" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{lang === 'en' ? 'by' : lang === 'pt' ? 'por' : lang === 'fr' ? 'par' : 'por'} {p.name}</p>

              <div className="flex items-center gap-4 mb-5 pb-5 border-b" style={{ borderColor: '#D4C9B5' }}>
                <div>
                  <div className="text-4xl" style={{ color: '#2C2416', fontWeight: 600, fontFamily: 'system-ui' }}>{p.rating}</div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={12} fill={i <= Math.round(p.rating) ? '#E0A458' : 'none'} color="#E0A458" />
                    ))}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{p.reviews} {t.reviews}</div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-2 text-center">
                  <div className="py-2 rounded-xl" style={{ background: '#EBE4D4' }}>
                    <div className="text-lg" style={{ color: '#2C2416', fontWeight: 600, fontFamily: 'system-ui' }}>{p.jobs}</div>
                    <div className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{t.jobs}</div>
                  </div>
                  <div className="py-2 rounded-xl" style={{ background: '#EBE4D4' }}>
                    <div className="text-lg" style={{ color: '#2C2416', fontWeight: 600, fontFamily: 'system-ui' }}>{p.experience}{lang === 'en' ? 'y' : 'a'}</div>
                    <div className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{t.experience}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-5 p-3 rounded-xl" style={{ background: '#E8F0E0' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: '#6B8E4E' }} />
                <span className="text-sm" style={{ color: '#3F5A2A', fontFamily: 'system-ui', fontWeight: 500 }}>{t.availabilities[p.availabilityKey]}</span>
                <span className="text-xs ml-auto" style={{ color: '#5C7F3E', fontFamily: 'system-ui' }}>{t.respondsIn} {p.responseTime}</span>
              </div>

              <div className="mb-5">
                <h3 className="text-xs uppercase tracking-widest mb-2" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>{t.aboutCraft}</h3>
                <p className="text-base leading-relaxed" style={{ color: '#2C2416' }}>{p.bio}</p>
              </div>

              <div className="mb-5">
                <h3 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>{t.specialties}</h3>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full text-sm" style={{ background: '#EBE4D4', color: '#2C2416', fontFamily: 'system-ui' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-5 p-4 rounded-2xl" style={{ background: '#2C2416', color: '#F4EFE6' }}>
                <div className="text-xs uppercase tracking-widest opacity-60 mb-1" style={{ fontFamily: 'system-ui' }}>{t.referencePrice}</div>
                <div className="text-2xl" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>{p.price}</div>
                <div className="text-xs opacity-70 mt-1" style={{ fontFamily: 'system-ui' }}>{t.priceNote}</div>
              </div>

              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs uppercase tracking-widest" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>{t.recentReviews}</h3>
                  <button className="text-xs" style={{ color: '#D97757', fontFamily: 'system-ui' }}>{t.viewAll}</button>
                </div>
                <div className="space-y-3">
                  {reviewsData.map(r => (
                    <div key={r.id} className="p-4 rounded-xl" style={{ background: 'white', borderLeft: `3px solid ${catColor}` }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs" style={{ background: '#EBE4D4', color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>
                            {r.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>{r.name}</div>
                            <div className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{r.date}</div>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} size={10} fill={i <= r.rating ? '#E0A458' : 'none'} color="#E0A458" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: '#2C2416' }}>"{r.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-5 py-4" style={{ background: 'linear-gradient(to top, #F4EFE6 70%, transparent)' }}>
              <div className="flex gap-2">
                <button className="w-14 h-14 rounded-2xl flex items-center justify-center border-2" style={{ borderColor: '#2C2416', background: 'transparent' }}>
                  <MessageCircle size={22} color="#2C2416" />
                </button>
                <button className="w-14 h-14 rounded-2xl flex items-center justify-center border-2" style={{ borderColor: '#2C2416', background: 'transparent' }}>
                  <Phone size={22} color="#2C2416" />
                </button>
                <button
                  onClick={() => setClientView('booking')}
                  className="flex-1 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
                  style={{ background: '#D97757', color: 'white' }}
                >
                  <span style={{ fontFamily: 'system-ui', fontWeight: 600 }}>{t.requestQuote}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (clientView === 'booking') {
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
          <div className="max-w-md mx-auto px-6 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: '#6B8E4E' }}>
              <Check size={48} color="white" />
            </div>
            <h2 className="text-3xl mb-3" style={{ color: '#2C2416', fontStyle: 'italic' }}>{t.requestSent}</h2>
            <p className="text-base mb-8" style={{ color: '#5C5446', fontFamily: 'system-ui' }}>
              {selectedProvider?.name} {t.requestSentMsg} {selectedProvider?.responseTime}.
            </p>
            <button
              onClick={() => { setClientView('home'); setSelectedProvider(null); }}
              className="w-full py-4 rounded-2xl shadow-lg"
              style={{ background: '#2C2416', color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600 }}
            >
              {t.backHome}
            </button>
          </div>
        </div>
      );
    }

    if (clientView === 'category') {
      const cat = categories.find(c => c.id === selectedCategory);
      const catName = selectedCategory && t.categoriesData[selectedCategory] ? t.categoriesData[selectedCategory] : (lang === 'en' ? 'All' : lang === 'pt' ? 'Todos' : lang === 'fr' ? 'Tous' : 'Todos');
      return (
        <div className="min-h-screen" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
          <LangPicker />
          <div className="max-w-md mx-auto" style={{ background: '#F4EFE6' }}>
            <div className="px-5 pt-12 pb-4">
              <div className="flex items-center justify-between mb-5">
                <button onClick={() => setClientView('home')} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#EBE4D4' }}>
                  <ArrowLeft size={20} color="#2C2416" />
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#EBE4D4' }}>
                  <Filter size={18} color="#2C2416" />
                </button>
              </div>
              <h2 className="text-3xl mb-1" style={{ color: '#2C2416', fontStyle: 'italic', fontWeight: 400 }}>
                {catName}
              </h2>
              <p className="text-sm" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                {filteredProviders.length} {t.nearYou}
              </p>
            </div>

            <div className="px-5 pb-5">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" color="#7A6F5C" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchByName}
                  className="w-full py-3 pl-11 pr-4 rounded-2xl outline-none text-sm"
                  style={{ background: 'white', color: '#2C2416', fontFamily: 'system-ui' }}
                />
              </div>
            </div>

            <div className="px-5 pb-8 space-y-3">
              {filteredProviders.length === 0 ? (
                <div className="text-center py-12">
                  <p style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{t.noProviders}</p>
                </div>
              ) : filteredProviders.map(p => {
                const c = categories.find(cat => cat.id === p.category);
                const Icon = c?.icon || Briefcase;
                const cColor = c?.color || '#D97757';
                return (
                  <button
                    key={p.id}
                    onClick={() => { setSelectedProvider(p); setClientView('detail'); }}
                    className="w-full p-4 rounded-2xl text-left transition-all active:scale-98"
                    style={{ background: 'white' }}
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${cColor}22` }}>
                        <Icon size={28} color={cColor} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-0.5">
                          <h3 className="text-base leading-tight" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>{p.company}</h3>
                          {p.verified && <Shield size={14} color="#6B8E4E" className="flex-shrink-0 mt-0.5" />}
                        </div>
                        <p className="text-xs mb-2" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{p.name} · {p.distance}</p>
                        <div className="flex items-center gap-3 text-xs" style={{ fontFamily: 'system-ui' }}>
                          <div className="flex items-center gap-1">
                            <Star size={12} fill="#E0A458" color="#E0A458" />
                            <span style={{ color: '#2C2416', fontWeight: 600 }}>{p.rating}</span>
                            <span style={{ color: '#7A6F5C' }}>({p.reviews})</span>
                          </div>
                          <span style={{ color: '#D4C9B5' }}>•</span>
                          <span style={{ color: '#2C2416', fontWeight: 500 }}>{p.price}</span>
                        </div>
                        <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: '#E8F0E0' }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#6B8E4E' }} />
                          <span className="text-xs" style={{ color: '#3F5A2A', fontFamily: 'system-ui' }}>{t.availabilities[p.availabilityKey]}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    // Home cliente
    return (
      <div className="min-h-screen" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
        <LangPicker />
        <div className="max-w-md mx-auto" style={{ background: '#F4EFE6' }}>
          <div className="px-5 pt-12 pb-5">
            <div className="flex items-center justify-between mb-5">
              <button onClick={() => setMode('landing')} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#EBE4D4' }}>
                <ArrowLeft size={20} color="#2C2416" />
              </button>
              <div className="flex items-center gap-1 text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                <MapPin size={12} />
                <span>{t.yourZone}</span>
              </div>
              <button onClick={() => setShowLangPicker(true)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#EBE4D4' }}>
                <Globe size={16} color="#2C2416" />
              </button>
            </div>

            {/* Slogan en home */}
            <div className="mb-3 inline-flex items-center gap-1.5">
              <div className="w-6 h-px" style={{ background: '#D97757' }} />
              <p className="text-xs uppercase tracking-widest" style={{ color: '#A8553C', fontFamily: 'system-ui', fontWeight: 700, letterSpacing: '0.12em' }}>
                {t.slogan}
              </p>
            </div>

            <h1 className="text-4xl leading-tight mb-2 whitespace-pre-line" style={{ color: '#2C2416', fontStyle: 'italic', fontWeight: 400 }}>
              {t.whatNeed}
            </h1>
            <p className="text-sm mb-5" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
              {t.homeSubtitle}
            </p>

            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2" color="#7A6F5C" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full py-4 pl-12 pr-4 rounded-2xl outline-none shadow-sm"
                style={{ background: 'white', color: '#2C2416', fontFamily: 'system-ui' }}
              />
            </div>
          </div>

          <div className="px-5 pb-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs uppercase tracking-widest" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>{t.categories}</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {categories.map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setClientView('category'); }}
                    className="aspect-square rounded-2xl p-3 flex flex-col items-center justify-center gap-2 transition-transform active:scale-95"
                    style={{ background: 'white' }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${cat.color}22` }}>
                      <Icon size={22} color={cat.color} />
                    </div>
                    <div className="text-center">
                      <div className="text-xs leading-tight" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>{t.categoriesData[cat.id]}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{cat.count}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="px-5 pb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs uppercase tracking-widest" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>{t.topNear}</h2>
            </div>
            <div className="space-y-3">
              {providers.slice(0, 3).map(p => {
                const c = categories.find(cat => cat.id === p.category);
                const Icon = c?.icon || Briefcase;
                const cColor = c?.color || '#D97757';
                return (
                  <button
                    key={p.id}
                    onClick={() => { setSelectedProvider(p); setClientView('detail'); }}
                    className="w-full p-4 rounded-2xl text-left active:scale-98 transition-transform"
                    style={{ background: 'white' }}
                  >
                    <div className="flex gap-3">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${cColor}22` }}>
                        <Icon size={26} color={cColor} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#2C2416', color: '#F4EFE6', fontFamily: 'system-ui' }}>{p.badge}</span>
                        </div>
                        <h3 className="text-base leading-tight" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>{p.company}</h3>
                        <div className="flex items-center gap-2 mt-1 text-xs" style={{ fontFamily: 'system-ui' }}>
                          <div className="flex items-center gap-1">
                            <Star size={12} fill="#E0A458" color="#E0A458" />
                            <span style={{ color: '#2C2416', fontWeight: 600 }}>{p.rating}</span>
                          </div>
                          <span style={{ color: '#D4C9B5' }}>•</span>
                          <span style={{ color: '#7A6F5C' }}>{p.distance}</span>
                          <span style={{ color: '#D4C9B5' }}>•</span>
                          <span style={{ color: '#2C2416' }}>{p.price}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ PROVEEDOR ============
  if (mode === 'provider') {
    if (providerView === 'jobs') {
      return (
        <div className="min-h-screen" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
          <LangPicker />
          <div className="max-w-md mx-auto pb-24">
            <div className="px-5 pt-12 pb-4">
              <button onClick={() => setProviderView('dashboard')} className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: '#EBE4D4' }}>
                <ArrowLeft size={20} color="#2C2416" />
              </button>
              <h2 className="text-3xl" style={{ color: '#2C2416', fontStyle: 'italic' }}>{t.myJobs}</h2>
            </div>
            <div className="px-5 space-y-3">
              {myJobs.map(j => (
                <div key={j.id} className="p-4 rounded-2xl" style={{ background: 'white' }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-base" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>{j.service}</h3>
                      <p className="text-xs mt-0.5" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{j.client}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full" style={{
                      background: j.status === t.completed ? '#E8F0E0' : j.status === t.inProgress ? '#FFF4E0' : '#F0E8D8',
                      color: j.status === t.completed ? '#3F5A2A' : j.status === t.inProgress ? '#8B6914' : '#5C5446',
                      fontFamily: 'system-ui'
                    }}>{j.status}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: '#EBE4D4' }}>
                    <div className="flex items-center gap-3 text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                      <span className="flex items-center gap-1"><Calendar size={12} />{j.date}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} />{j.address.substring(0, 12)}...</span>
                    </div>
                    <span className="text-sm" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>{j.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (providerView === 'edit') {
      const fields = [
        { label: t.fullName, value: 'Martín Restrepo' },
        { label: t.company, value: lang === 'en' ? 'Restrepo & Sons Painting' : 'Pinturas Restrepo & Hijos' },
        { label: t.category, value: t.categoriesData.pintura },
        { label: t.phone, value: '+57 300 123 4567' },
        { label: t.yearsExp, value: '18' },
        { label: t.refPrice, value: country === 'US' ? '$45/m²' : '$45.000/m²' }
      ];
      return (
        <div className="min-h-screen" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
          <LangPicker />
          <div className="max-w-md mx-auto pb-24">
            <div className="px-5 pt-12 pb-4 flex items-center justify-between">
              <button onClick={() => setProviderView('dashboard')} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#EBE4D4' }}>
                <X size={20} color="#2C2416" />
              </button>
              <h2 className="text-lg" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>{t.editProfile}</h2>
              <button onClick={() => setProviderView('dashboard')} className="px-4 py-2 rounded-full text-sm" style={{ background: '#2C2416', color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600 }}>{t.save}</button>
            </div>
            <div className="px-5 space-y-4">
              <div className="flex justify-center py-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center relative" style={{ background: '#D97757' }}>
                  <span className="text-3xl text-white" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>MR</span>
                  <button className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center shadow-lg" style={{ background: '#2C2416' }}>
                    <Camera size={16} color="#F4EFE6" />
                  </button>
                </div>
              </div>
              {fields.map((field, i) => (
                <div key={i}>
                  <label className="text-xs uppercase tracking-wider mb-1.5 block" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>{field.label}</label>
                  <input
                    defaultValue={field.value}
                    className="w-full px-4 py-3 rounded-xl outline-none border"
                    style={{ background: 'white', borderColor: '#D4C9B5', color: '#2C2416', fontFamily: 'system-ui' }}
                  />
                </div>
              ))}
              <div>
                <label className="text-xs uppercase tracking-wider mb-1.5 block" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>{t.aboutCraft}</label>
                <textarea
                  rows={4}
                  defaultValue={providers[0].bio}
                  className="w-full px-4 py-3 rounded-xl outline-none border resize-none"
                  style={{ background: 'white', borderColor: '#D4C9B5', color: '#2C2416', fontFamily: 'system-ui' }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
        <LangPicker />
        <div className="max-w-md mx-auto pb-8" style={{ background: '#F4EFE6' }}>
          <div className="relative px-5 pt-12 pb-6" style={{ background: '#2C2416' }}>
            <div className="flex items-center justify-between mb-3">
              <button onClick={() => setMode('landing')} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(244,239,230,0.15)' }}>
                <ArrowLeft size={20} color="#F4EFE6" />
              </button>
              <button onClick={() => setShowLangPicker(true)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(244,239,230,0.15)' }}>
                <Globe size={16} color="#F4EFE6" />
              </button>
            </div>
            {/* Slogan en dashboard proveedor */}
            <p className="text-xs uppercase tracking-widest mb-4 opacity-50" style={{ color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600, letterSpacing: '0.15em' }}>
              {t.slogan}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#D97757' }}>
                <span className="text-2xl text-white" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>MR</span>
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest opacity-60" style={{ color: '#F4EFE6', fontFamily: 'system-ui' }}>{t.welcome}</div>
                <h2 className="text-xl" style={{ color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600 }}>Martín Restrepo</h2>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={12} fill="#E0A458" color="#E0A458" />
                  <span className="text-xs" style={{ color: '#F4EFE6', fontFamily: 'system-ui' }}>4.9 · 187 {t.reviews}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 -mt-4 mb-5">
            <div className="grid grid-cols-3 gap-2 p-4 rounded-2xl shadow-lg" style={{ background: 'white' }}>
              <div className="text-center">
                <div className="text-2xl" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>12</div>
                <div className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{t.new}</div>
              </div>
              <div className="text-center border-x" style={{ borderColor: '#EBE4D4' }}>
                <div className="text-2xl" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>3</div>
                <div className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{t.inProgress}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl" style={{ color: '#6B8E4E', fontFamily: 'system-ui', fontWeight: 600 }}>{currency}2.4M</div>
                <div className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{t.thisMonth}</div>
              </div>
            </div>
          </div>

          <div className="px-5 mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs uppercase tracking-widest" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>{t.newRequests}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#D97757', color: 'white', fontFamily: 'system-ui', fontWeight: 600 }}>2 {t.newCount}</span>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-2xl" style={{ background: 'white', borderLeft: '3px solid #D97757' }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-base" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>Carolina Méndez</h4>
                    <p className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                      {lang === 'en' ? 'Apartment painting · 90m²' : lang === 'pt' ? 'Pintura apartamento · 90m²' : lang === 'fr' ? 'Peinture appartement · 90m²' : 'Pintura de apartamento · 90m²'}
                    </p>
                  </div>
                  <span className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                    {lang === 'en' ? '15 min ago' : lang === 'pt' ? 'há 15 min' : lang === 'fr' ? 'il y a 15 min' : 'hace 15 min'}
                  </span>
                </div>
                <p className="text-sm mb-3" style={{ color: '#2C2416' }}>
                  "{lang === 'en' ? 'I need to paint the whole apartment. How much would you charge for labor?' :
                    lang === 'pt' ? 'Preciso pintar o apartamento todo. Quanto cobraria pela mão de obra?' :
                    lang === 'fr' ? 'Je dois peindre tout l\'appartement. Combien coûterait la main d\'œuvre?' :
                    'Necesito pintar todo el apartamento. ¿Cuánto cobrarías por mano de obra?'}"
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 rounded-xl text-sm" style={{ background: '#2C2416', color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600 }}>{t.respond}</button>
                  <button className="px-4 py-2.5 rounded-xl text-sm border" style={{ borderColor: '#D4C9B5', color: '#7A6F5C', fontFamily: 'system-ui' }}>{t.later}</button>
                </div>
              </div>
              <div className="p-4 rounded-2xl" style={{ background: 'white', borderLeft: '3px solid #D97757' }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-base" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>Jorge Salazar</h4>
                    <p className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                      {lang === 'en' ? 'House facade · 2 floors' : lang === 'pt' ? 'Fachada · 2 andares' : lang === 'fr' ? 'Façade · 2 étages' : 'Fachada exterior · Casa 2 pisos'}
                    </p>
                  </div>
                  <span className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                    {lang === 'en' ? '1h ago' : lang === 'pt' ? 'há 1h' : lang === 'fr' ? 'il y a 1h' : 'hace 1h'}
                  </span>
                </div>
                <p className="text-sm mb-3" style={{ color: '#2C2416' }}>
                  "{lang === 'en' ? 'Hi, I need a quote to paint my house facade. It\'s in good condition.' :
                    lang === 'pt' ? 'Olá, preciso de orçamento para pintar a fachada. Está em bom estado.' :
                    lang === 'fr' ? 'Bonjour, j\'ai besoin d\'un devis pour la façade. En bon état.' :
                    'Hola, necesito cotización para pintar la fachada de mi casa. Está en buen estado.'}"
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 rounded-xl text-sm" style={{ background: '#2C2416', color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600 }}>{t.respond}</button>
                  <button className="px-4 py-2.5 rounded-xl text-sm border" style={{ borderColor: '#D4C9B5', color: '#7A6F5C', fontFamily: 'system-ui' }}>{t.later}</button>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 mb-5">
            <h3 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>{t.manageBusiness}</h3>
            <div className="space-y-2">
              <button onClick={() => setProviderView('jobs')} className="w-full p-4 rounded-2xl flex items-center justify-between" style={{ background: 'white' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FFF4E0' }}>
                    <Briefcase size={18} color="#8B6914" />
                  </div>
                  <span style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>{t.myJobs}</span>
                </div>
                <ChevronRight size={20} color="#7A6F5C" />
              </button>
              <button onClick={() => setProviderView('edit')} className="w-full p-4 rounded-2xl flex items-center justify-between" style={{ background: 'white' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#E8F0E0' }}>
                    <Edit3 size={18} color="#3F5A2A" />
                  </div>
                  <span style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>{t.editProfile}</span>
                </div>
                <ChevronRight size={20} color="#7A6F5C" />
              </button>
              <button className="w-full p-4 rounded-2xl flex items-center justify-between" style={{ background: 'white' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#F0E8D8' }}>
                    <TrendingUp size={18} color="#8B6F47" />
                  </div>
                  <span style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>{t.stats}</span>
                </div>
                <ChevronRight size={20} color="#7A6F5C" />
              </button>
              <button className="w-full p-4 rounded-2xl flex items-center justify-between" style={{ background: 'white' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FAE4DC' }}>
                    <Award size={18} color="#D97757" />
                  </div>
                  <span style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>{t.myReviews}</span>
                </div>
                <ChevronRight size={20} color="#7A6F5C" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
