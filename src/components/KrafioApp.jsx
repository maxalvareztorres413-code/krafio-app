import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Search, Star, MapPin, Phone, MessageCircle, Shield, Award, Clock,
  Heart, Filter, ChevronRight, ArrowLeft, Briefcase, User, Home,
  Plus, Check, X, Hammer, Paintbrush, Wrench, Zap, Truck, Sparkles,
  Trees, Bug, Wind, Droplet, Settings, TrendingUp, Calendar, DollarSign,
  Camera, Edit3, Send, Bell, Globe, LogOut, Share2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import AuthModal from './auth/AuthModal';
import ProviderSetupForm from './provider/ProviderSetupForm';
import ChatView from './chat/ChatView';
import InboxView from './chat/InboxView';
import AdminPanel from './admin/AdminPanel';

const ADMIN_EMAIL = 'maxalvareztorres413@gmail.com';

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
    sortDistance: 'Cercanía', sortRating: 'Calificación', sortPrice: 'Precio',
    enableLocation: 'Activar ubicación', locationActive: 'Mostrando proveedores cercanos',
    enableLocationSub: 'Ver proveedores más cercanos a ti',
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
    sortDistance: 'Nearest', sortRating: 'Rating', sortPrice: 'Price',
    enableLocation: 'Enable location', locationActive: 'Showing nearby providers',
    enableLocationSub: 'See the closest professionals to you',
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
    sortDistance: 'Proximidade', sortRating: 'Avaliação', sortPrice: 'Preço',
    enableLocation: 'Ativar localização', locationActive: 'Mostrando prestadores próximos',
    enableLocationSub: 'Ver os profissionais mais próximos de você',
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
    sortDistance: 'Proximité', sortRating: 'Note', sortPrice: 'Prix',
    enableLocation: 'Activer la localisation', locationActive: 'Affichage des prestataires proches',
    enableLocationSub: 'Voir les professionnels les plus proches de vous',
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

  // Auth
  const { user, profile, signOut, loading: authLoading, fetchProfile } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalRole, setAuthModalRole] = useState(null);
  const [providerData, setProviderData] = useState(null);
  const [needsProfileSetup, setNeedsProfileSetup] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [userLocation, setUserLocation] = useState(null); // { lat, lng }
  const [locationLoading, setLocationLoading] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [userAddress, setUserAddress] = useState('');
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [addressInputText, setAddressInputText] = useState('');
  const [geocoding, setGeocoding] = useState(false);
  const [geocodeError, setGeocodeError] = useState('');
  const [activeChatConversationId, setActiveChatConversationId] = useState(null);
  const [activeChatOtherName, setActiveChatOtherName] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [realProviders, setRealProviders] = useState([]);
  const [chatToast, setChatToast] = useState('');
  const [shareToast, setShareToast] = useState(false);
  const [bookingMsg, setBookingMsg] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [providerReviews, setProviderReviews] = useState([]);
  const [hasConversation, setHasConversation] = useState(false);
  const [clientJobStatus, setClientJobStatus] = useState(null); // null | 'accepted' | 'in_progress' | 'completed'
  const [myReview, setMyReview] = useState(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewModalProviderId, setReviewModalProviderId] = useState(null);
  const [reviewModalProviderName, setReviewModalProviderName] = useState('');
  const [reviewModalRating, setReviewModalRating] = useState(0);
  const [reviewModalText, setReviewModalText] = useState('');
  const [reviewModalSaving, setReviewModalSaving] = useState(false);
  const [clientReviewMap, setClientReviewMap] = useState({});
  const [clientHistory, setClientHistory] = useState([]);
  // Photos
  const [providerPhotos, setProviderPhotos] = useState([]);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [providerDetailPhotos, setProviderDetailPhotos] = useState([]);
  // Availability
  const [blockedDates, setBlockedDates] = useState(new Set());
  const [availMonth, setAvailMonth] = useState(() => { const d = new Date(); return { year: d.getFullYear(), month: d.getMonth() }; });
  const [clientBookingBlocked, setClientBookingBlocked] = useState(new Set());
  const [bookingCalMonth, setBookingCalMonth] = useState(() => { const d = new Date(); return { year: d.getFullYear(), month: d.getMonth() }; });
  // Push notifications
  const [pushPermission, setPushPermission] = useState('default');
  // Client profile
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [clientEditName, setClientEditName] = useState('');
  const [savingName, setSavingName] = useState(false);
  // Quote photos
  const [quotePhotos, setQuotePhotos] = useState([]);
  const [quotePhotoUploading, setQuotePhotoUploading] = useState(false);
  // Jobs
  const [myRealJobs, setMyRealJobs] = useState([]);
  // Provider reviews (received)
  const [myProviderReviews, setMyProviderReviews] = useState([]);
  const [myProviderReviewsLoading, setMyProviderReviewsLoading] = useState(false);
  // Provider edit — geocoding
  const [providerAddrGeocoding, setProviderAddrGeocoding] = useState(false);
  const [providerAddrError, setProviderAddrError] = useState('');
  const [idPhotoUploading, setIdPhotoUploading] = useState(false);

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

  // Cargar datos del proveedor logueado
  const loadProviderData = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.from('providers').select('*').eq('id', user.id).single();
    if (data) {
      setProviderData(data);
      setMode('provider');
      setProviderView('dashboard');
      setNeedsProfileSetup(false);
      subscribeToPush(user.id);
    } else {
      setNeedsProfileSetup(true);
    }
  }, [user]);

  // Auto-verify when all 3 criteria met: avatar, phone, id_photo
  useEffect(() => {
    if (!user || !providerData || providerData.verified) return;
    const ok = !!(profile?.avatar_url) && !!(providerData.phone) && !!(providerData.id_photo_url);
    if (ok) {
      supabase.from('providers').update({ verified: true }).eq('id', user.id)
        .then(() => setProviderData(prev => ({ ...prev, verified: true })));
    }
  }, [user, providerData, profile]);

  // Routing basado en auth
  useEffect(() => {
    if (authLoading) return;
    if (user && profile) {
      // Admin shortcut
      if (user.email === ADMIN_EMAIL) {
        setMode('admin');
        return;
      }
      // Blocked account
      if (profile.blocked) {
        signOut();
        return;
      }
      // Rol pendiente por Google OAuth
      const pendingRole = localStorage.getItem('krafio_pending_role');
      if (pendingRole && !profile.role) {
        localStorage.removeItem('krafio_pending_role');
        supabase.from('profiles').update({ role: pendingRole }).eq('id', user.id)
          .then(() => fetchProfile(user.id));
        return;
      }
      if (profile.role === 'client') {
        setMode('client');
        setClientView('home');
        if (profile.avatar_url) setAvatarUrl(profile.avatar_url);
        if (profile.address && !userAddress) setUserAddress(profile.address);
        subscribeToPush(user.id);
      } else if (profile.role === 'provider') {
        loadProviderData();
      }
    } else if (!user) {
      setMode('landing');
      setNeedsProfileSetup(false);
      setProviderData(null);
    }
  }, [user, profile, authLoading, loadProviderData, fetchProfile]);

  const openAuth = (role) => {
    setAuthModalRole(role);
    setShowAuthModal(true);
  };

  // Load favorites from Supabase
  useEffect(() => {
    if (!user || mode !== 'client') return;
    supabase.from('favorites').select('provider_ref').eq('user_id', user.id)
      .then(({ data }) => { if (data) setFavorites(new Set(data.map(f => f.provider_ref))); });
  }, [user, mode]);

  // Load reviews + conversation check + photos + availability when viewing a real provider detail
  useEffect(() => {
    if (mode !== 'client' || clientView !== 'detail' || !selectedProvider) return;
    const providerId = typeof selectedProvider.id === 'string' ? selectedProvider.id : null;
    if (!providerId) { setProviderReviews([]); setHasConversation(false); setMyReview(null); setProviderDetailPhotos([]); return; }

    // Photos
    supabase.from('provider_photos').select('id, url').eq('provider_id', providerId).order('created_at')
      .then(({ data }) => setProviderDetailPhotos(data || []));

    const loadReviews = async () => {
      const { data: revs } = await supabase
        .from('reviews').select('id, rating, content, created_at, client_id')
        .eq('provider_id', providerId).order('created_at', { ascending: false });
      if (!revs?.length) { setProviderReviews([]); return; }
      const { data: profs } = await supabase
        .from('profiles').select('id, full_name').in('id', revs.map(r => r.client_id));
      const pm = {}; profs?.forEach(p => { pm[p.id] = p; });
      setProviderReviews(revs.map(r => ({ ...r, clientName: pm[r.client_id]?.full_name || 'Cliente' })));
    };
    loadReviews();

    if (user) {
      supabase.from('conversations').select('id')
        .eq('client_id', user.id).eq('provider_id', providerId).maybeSingle()
        .then(async ({ data }) => {
          setHasConversation(!!data);
          if (data?.id) {
            const { data: job } = await supabase.from('jobs').select('status').eq('conversation_id', data.id).maybeSingle();
            setClientJobStatus(job?.status || null);
          } else {
            setClientJobStatus(null);
          }
        });
      supabase.from('reviews').select('*')
        .eq('provider_id', providerId).eq('client_id', user.id).maybeSingle()
        .then(({ data }) => {
          setMyReview(data || null);
          if (data) { setReviewRating(data.rating); setReviewText(data.content); }
          else { setReviewRating(0); setReviewText(''); }
          setShowReviewForm(false);
        });
    }
  }, [mode, clientView, selectedProvider, user]);

  const loadClientHistory = async () => {
    const { data: convs } = await supabase
      .from('conversations').select('id, last_message_at, last_message_preview, provider_id')
      .eq('client_id', user.id).order('last_message_at', { ascending: false });
    if (!convs?.length) { setClientHistory([]); return; }
    const provIds = [...new Set(convs.map(c => c.provider_id))];
    const convIds = convs.map(c => c.id);
    const [{ data: profs }, { data: provs }, { data: myRevs }, { data: jobs }] = await Promise.all([
      supabase.from('profiles').select('id, full_name').in('id', provIds),
      supabase.from('providers').select('id, company, category').in('id', provIds),
      supabase.from('reviews').select('provider_id, rating').eq('client_id', user.id),
      supabase.from('jobs').select('id, conversation_id, status').in('conversation_id', convIds),
    ]);
    const pm = {}; profs?.forEach(p => { pm[p.id] = p; });
    const dm = {}; provs?.forEach(p => { dm[p.id] = p; });
    const rm = {}; myRevs?.forEach(r => { rm[r.provider_id] = r; });
    const jm = {}; jobs?.forEach(j => { jm[j.conversation_id] = j; });
    setClientReviewMap(rm);
    setClientHistory(convs.map(c => ({
      id: c.id,
      providerId: c.provider_id,
      company: dm[c.provider_id]?.company || pm[c.provider_id]?.full_name || 'Proveedor',
      category: dm[c.provider_id]?.category || 'todos',
      preview: c.last_message_preview,
      date: c.last_message_at,
      job: jm[c.id] || null,
    })));
  };

  const handleSubmitModalReview = async () => {
    if (!reviewModalRating || !user || !reviewModalProviderId) return;
    setReviewModalSaving(true);
    const { data } = await supabase.from('reviews').upsert(
      { provider_id: reviewModalProviderId, client_id: user.id, rating: reviewModalRating, content: reviewModalText.trim() },
      { onConflict: 'provider_id,client_id' }
    ).select().single();
    if (data) {
      setClientReviewMap(prev => ({ ...prev, [reviewModalProviderId]: data }));
      setReviewModalProviderId(null);
      setReviewModalRating(0);
      setReviewModalText('');
    }
    setReviewModalSaving(false);
  };

  const handleSubmitReview = async () => {
    if (!reviewRating || !user || !selectedProvider) return;
    const providerId = typeof selectedProvider.id === 'string' ? selectedProvider.id : null;
    if (!providerId) return;
    const { data, error } = await supabase.from('reviews').upsert(
      { provider_id: providerId, client_id: user.id, rating: reviewRating, content: reviewText.trim() },
      { onConflict: 'provider_id,client_id' }
    ).select().single();
    if (!error && data) {
      setMyReview(data);
      setShowReviewForm(false);
      setProviderReviews(prev => {
        const exists = prev.find(r => r.client_id === user.id);
        const updated = { ...data, clientName: data.clientName || 'Tú' };
        return exists ? prev.map(r => r.client_id === user.id ? updated : r) : [updated, ...prev];
      });
    }
  };

  // Refresh jobs when navigating to the jobs view
  useEffect(() => {
    if (mode !== 'provider' || providerView !== 'jobs' || !user) return;
    loadJobs();
  }, [mode, providerView, user]);

  // Load provider's received reviews when entering reviews view
  useEffect(() => {
    if (mode !== 'provider' || providerView !== 'myreviews' || !user) return;
    loadProviderReviews();
  }, [mode, providerView, user]);

  // Load provider's own photos when entering edit view
  useEffect(() => {
    if (mode !== 'provider' || providerView !== 'edit' || !user) return;
    supabase.from('provider_photos').select('id, url').eq('provider_id', user.id).order('created_at')
      .then(({ data }) => setProviderPhotos(data || []));
  }, [mode, providerView, user]);

  // Load provider availability when entering availability view
  useEffect(() => {
    if (mode !== 'provider' || providerView !== 'availability' || !user) return;
    const d = new Date();
    setAvailMonth({ year: d.getFullYear(), month: d.getMonth() });
    supabase.from('availability_blocks').select('blocked_date').eq('provider_id', user.id)
      .then(({ data }) => setBlockedDates(new Set(data?.map(r => r.blocked_date) || [])));
  }, [mode, providerView, user]);

  // Load blocked dates when entering booking view (for client)
  useEffect(() => {
    if (mode !== 'client' || clientView !== 'booking' || !selectedProvider) return;
    const providerId = typeof selectedProvider.id === 'string' ? selectedProvider.id : null;
    if (!providerId) { setClientBookingBlocked(new Set()); return; }
    supabase.from('availability_blocks').select('blocked_date').eq('provider_id', providerId)
      .then(({ data }) => setClientBookingBlocked(new Set(data?.map(r => r.blocked_date) || [])));
  }, [mode, clientView, selectedProvider]);

  // Service worker + push subscription
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
    if ('Notification' in window) {
      setPushPermission(Notification.permission);
    }
  }, []);

  const subscribeToPush = async (userId) => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    if (Notification.permission === 'denied') return;
    try {
      const permission = await Notification.requestPermission();
      setPushPermission(permission);
      if (permission !== 'granted') return;
      const reg = await navigator.serviceWorker.ready;
      const existing = await reg.pushManager.getSubscription();
      const subscription = existing || await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
      });
      await supabase.from('push_subscriptions').upsert(
        { user_id: userId, subscription: subscription.toJSON(), updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      );
    } catch {
      // Push not supported or blocked — silently ignore
    }
  };

  // Handle ?provider=<id> URL param — open that provider's profile directly
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pid = params.get('provider');
    if (!pid) return;
    window.history.replaceState({}, '', window.location.pathname);
    supabase.from('providers').select('*, profiles(full_name)').eq('id', pid).single()
      .then(({ data: p }) => {
        if (!p) return;
        setSelectedProvider({
          id: p.id, supabaseId: p.id,
          name: p.profiles?.full_name || '',
          company: p.company || p.profiles?.full_name || 'Proveedor',
          category: p.category || 'todos',
          rating: p.rating || 0, reviews: p.reviews_count || 0, jobs: 0,
          lat: p.latitude || null, lng: p.longitude || null,
          minPrice: 0, price: p.reference_price || '—',
          experience: p.years_experience || 0,
          verified: p.verified || false,
          badge: p.verified ? 'Verificado' : 'Nuevo en Krafio',
          distance: '—', bio: p.bio || '',
          responseTime: '< 1h', availabilityKey: 'today',
          tags: p.tags || [], address: p.address || '',
          phone: p.phone || '', isReal: true, distanceKm: null,
        });
        setMode('client');
        setClientView('detail');
      });
  }, []);

  const shareProvider = (p) => {
    const url = `${window.location.origin}?provider=${p.id}`;
    const title = `${p.company || p.name} — Krafio`;
    const text = `${lang === 'en' ? 'Check out this professional on Krafio' : 'Mira este profesional en Krafio'}: ${p.company || p.name}`;
    if (navigator.share) {
      navigator.share({ title, text, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2500);
      }).catch(() => {});
    }
  };

  // Load real providers from Supabase for client view
  useEffect(() => {
    if (mode !== 'client') return;
    supabase
      .from('providers')
      .select('*, profiles(full_name)')
      .eq('approved', true)
      .then(({ data }) => {
        if (!data) return;
        setRealProviders(data.map(p => ({
          id: p.id,
          supabaseId: p.id,
          name: p.profiles?.full_name || '',
          company: p.company || p.profiles?.full_name || 'Proveedor',
          category: p.category || 'todos',
          rating: p.rating || 0, reviews: p.reviews_count || 0, jobs: 0,
          lat: p.latitude || null, lng: p.longitude || null,
          minPrice: 0,
          price: p.reference_price || '—',
          experience: p.years_experience || 0,
          verified: p.verified || false,
          badge: p.verified ? 'Verificado' : 'Nuevo en Krafio',
          distance: '—',
          bio: p.bio || '',
          responseTime: '< 1h',
          availabilityKey: 'today',
          tags: p.tags || [],
          address: p.address || '',
          phone: p.phone || '',
          isReal: true,
        })));
      });
  }, [mode]);

  // Provider unread count + quote requests
  useEffect(() => {
    if (!user || mode !== 'provider') return;

    const fetchUnread = async () => {
      const { data: convs } = await supabase
        .from('conversations')
        .select('id')
        .eq('provider_id', user.id);
      if (!convs?.length) { setUnreadCount(0); return; }
      const { data: unread } = await supabase
        .from('messages')
        .select('conversation_id')
        .in('conversation_id', convs.map(c => c.id))
        .neq('sender_id', user.id)
        .is('read_at', null);
      const unique = new Set(unread?.map(m => m.conversation_id) || []);
      setUnreadCount(unique.size);
    };

    const fetchQuotes = async () => {
      const { data: convs } = await supabase
        .from('conversations')
        .select('id, client_id')
        .eq('provider_id', user.id);
      if (!convs?.length) { setQuoteRequests([]); return; }

      // Exclude conversations that already have a job (already accepted)
      const { data: existingJobs } = await supabase
        .from('jobs')
        .select('conversation_id')
        .eq('provider_id', user.id);
      const acceptedConvIds = new Set(existingJobs?.map(j => j.conversation_id) || []);
      const pendingConvs = convs.filter(c => !acceptedConvIds.has(c.id));
      if (!pendingConvs.length) { setQuoteRequests([]); return; }

      const { data: msgs } = await supabase
        .from('messages')
        .select('id, content, created_at, conversation_id')
        .in('conversation_id', pendingConvs.map(c => c.id))
        .ilike('content', '📋%')
        .order('created_at', { ascending: false });
      if (!msgs?.length) { setQuoteRequests([]); return; }

      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', pendingConvs.map(c => c.client_id));

      const profileMap = {};
      profiles?.forEach(p => { profileMap[p.id] = p; });
      const convMap = {};
      pendingConvs.forEach(c => { convMap[c.id] = c; });

      setQuoteRequests(msgs.map(msg => ({
        id: msg.id,
        conversationId: msg.conversation_id,
        clientName: profileMap[convMap[msg.conversation_id]?.client_id]?.full_name || 'Cliente',
        content: msg.content.replace(/^📋 Solicitud de cotización:\n/, ''),
        createdAt: msg.created_at,
      })));
    };

    fetchUnread();
    fetchQuotes();
    loadJobs();

    const channel = supabase
      .channel(`provider-data-${user.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'conversations', filter: `provider_id=eq.${user.id}` }, () => { fetchUnread(); fetchQuotes(); })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, () => { fetchUnread(); fetchQuotes(); })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs', filter: `provider_id=eq.${user.id}` }, () => { loadJobs(); fetchQuotes(); })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'providers', filter: `id=eq.${user.id}` }, async () => {
        const { data } = await supabase.from('providers').select('*').eq('id', user.id).single();
        if (data) setProviderData(data);
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reviews', filter: `provider_id=eq.${user.id}` }, async () => {
        const { data } = await supabase.from('providers').select('rating, reviews_count').eq('id', user.id).single();
        if (data) setProviderData(prev => ({ ...prev, ...data }));
        loadProviderReviews();
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [user, mode]);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const formatDistance = (km) => km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;

  const requestLocation = () => {
    if (!navigator.geolocation) return;
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => { setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setLocationLoading(false); },
      () => setLocationLoading(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const geocodeAddress = async (address) => {
    setGeocoding(true);
    setGeocodeError('');
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`,
        { headers: { 'Accept-Language': lang } }
      );
      const data = await res.json();
      if (!data.length) { setGeocodeError(lang === 'en' ? 'Address not found' : 'Dirección no encontrada'); setGeocoding(false); return; }
      setUserLocation({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
      setUserAddress(address);
      setShowAddressInput(false);
      setAddressInputText('');
      if (user) supabase.from('profiles').update({ address }).eq('id', user.id);
    } catch {
      setGeocodeError(lang === 'en' ? 'Error searching address' : 'Error al buscar la dirección');
    }
    setGeocoding(false);
  };

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
      category: 'pintura', rating: 4.9, reviews: 187, lat: 4.6097, lng: -74.0817, minPrice: 45,
      price: country === 'US' ? '$45/m²' : country === 'BR' ? 'R$ 80/m²' : country === 'FR' || country === 'ES' ? '€38/m²' : '$45.000/m²',
      experience: 18, verified: true,
      badge: lang === 'en' ? 'Top Rated' : lang === 'pt' ? 'Top Rated' : lang === 'fr' ? 'Top Rated' : 'Top Rated',
      distance: '1.2 km',
      bio: lang === 'en' ? 'Three generations painting homes in the city. Specialists in decorative finishes, Venetian techniques and eco-friendly paint.' :
           lang === 'pt' ? 'Três gerações pintando casas. Especialistas em acabamentos decorativos, técnicas venezianas e tinta ecológica.' :
           lang === 'fr' ? 'Trois générations à peindre des maisons. Spécialistes des finitions décoratives, techniques vénitiennes et peinture écologique.' :
           'Tres generaciones pintando casas en la ciudad. Especialistas en acabados decorativos, técnicas venecianas y pintura ecológica.',
      jobs: 542, responseTime: '< 1h', availabilityKey: 'today', distanceKm: null,
      tags: lang === 'en' ? ['Interior', 'Exterior', 'Decorative', 'Eco-friendly'] :
            lang === 'pt' ? ['Interior', 'Exterior', 'Decorativa', 'Ecológica'] :
            lang === 'fr' ? ['Intérieur', 'Extérieur', 'Décorative', 'Écologique'] :
            ['Pintura interior', 'Exterior', 'Decorativa', 'Ecológica']
    },
    {
      id: 2,
      name: lang === 'en' ? 'Laura Mendoza' : 'Laura Mendoza',
      company: lang === 'en' ? 'AquaFix Solutions' : lang === 'pt' ? 'AquaFix Soluções' : lang === 'fr' ? 'AquaFix Solutions' : 'AquaFix Soluciones',
      category: 'fontaneria', rating: 4.8, reviews: 234, lat: 4.6480, lng: -74.0847, minPrice: 80,
      price: country === 'US' ? 'From $80' : country === 'BR' ? 'A partir de R$ 150' : country === 'FR' || country === 'ES' ? 'Dès €70' : 'Desde $80.000',
      experience: 12, verified: true,
      badge: lang === 'en' ? 'Fast response' : lang === 'pt' ? 'Resposta rápida' : lang === 'fr' ? 'Réponse rapide' : 'Respuesta rápida',
      distance: '0.8 km',
      bio: lang === 'en' ? 'Certified plumber. 24/7 emergencies, new installations and leak detection with thermal technology.' :
           lang === 'pt' ? 'Encanadora certificada. Emergências 24/7, instalações novas e detecção de vazamentos com tecnologia térmica.' :
           lang === 'fr' ? 'Plombière certifiée. Urgences 24/7, nouvelles installations et détection de fuites par thermographie.' :
           'Fontanera certificada. Emergencias 24/7, instalaciones nuevas y detección de fugas con tecnología termográfica.',
      jobs: 689, responseTime: '< 30min', availabilityKey: 'now', distanceKm: null,
      tags: lang === 'en' ? ['24h Emergency', 'Leak detection', 'Install', 'Heaters'] :
            lang === 'pt' ? ['Emergência 24h', 'Detecção', 'Instalação', 'Aquecedores'] :
            lang === 'fr' ? ['Urgence 24h', 'Détection fuites', 'Installation', 'Chauffe-eau'] :
            ['Emergencias 24h', 'Detección fugas', 'Instalación', 'Calentadores']
    },
    {
      id: 3,
      name: 'Carlos Ríos',
      company: 'ElectroSur',
      category: 'electricidad', rating: 4.7, reviews: 156, lat: 4.5981, lng: -74.0761, minPrice: 65,
      price: country === 'US' ? 'From $65' : country === 'BR' ? 'A partir de R$ 120' : country === 'FR' || country === 'ES' ? 'Dès €55' : 'Desde $65.000',
      experience: 15, verified: true,
      badge: t.verified, distance: '2.1 km',
      bio: lang === 'en' ? 'Licensed electrician. Residential installations, panels, home automation and solar panels.' :
           lang === 'pt' ? 'Eletricista licenciado. Instalações residenciais, quadros, automação e painéis solares.' :
           lang === 'fr' ? 'Électricien diplômé. Installations résidentielles, tableaux, domotique et panneaux solaires.' :
           'Electricista matriculado. Instalaciones residenciales, tableros, automatización del hogar y paneles solares.',
      jobs: 412, responseTime: '< 2h', availabilityKey: 'tomorrow', distanceKm: null,
      tags: lang === 'en' ? ['Installation', 'Smart home', 'Solar', 'Panels'] :
            lang === 'pt' ? ['Instalação', 'Domótica', 'Solar', 'Quadros'] :
            lang === 'fr' ? ['Installation', 'Domotique', 'Solaire', 'Tableaux'] :
            ['Instalación', 'Domótica', 'Solar', 'Tableros']
    },
    {
      id: 4,
      name: 'Ana Solís',
      company: lang === 'en' ? 'Express Moving' : lang === 'pt' ? 'Mudanças Express' : lang === 'fr' ? 'Déménagements Express' : 'Mudanzas Express',
      category: 'mudanza', rating: 4.9, reviews: 98, lat: 4.7110, lng: -74.0721, minPrice: 250,
      price: country === 'US' ? 'From $250' : country === 'BR' ? 'A partir de R$ 500' : country === 'FR' || country === 'ES' ? 'Dès €220' : 'Desde $250.000',
      experience: 8, verified: true,
      badge: 'Top Rated', distance: '3.5 km',
      bio: lang === 'en' ? 'Local and intercity moves. Professional packing team, insurance included and furniture disassembly.' :
           lang === 'pt' ? 'Mudanças locais e interestaduais. Equipe de embalagem profissional, seguro incluído.' :
           lang === 'fr' ? 'Déménagements locaux et interurbains. Équipe d\'emballage professionnelle, assurance incluse.' :
           'Mudanzas locales e interurbanas. Equipo de embalaje profesional, seguro incluido y desmonte de muebles.',
      jobs: 234, responseTime: '< 3h', availabilityKey: 'book', distanceKm: null,
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
    const ref = String(id);
    const newFavs = new Set(favorites);
    if (newFavs.has(ref)) {
      newFavs.delete(ref);
      if (user) supabase.from('favorites').delete().eq('user_id', user.id).eq('provider_ref', ref);
    } else {
      newFavs.add(ref);
      if (user) supabase.from('favorites').upsert({ user_id: user.id, provider_ref: ref });
    }
    setFavorites(newFavs);
  };

  const filteredProviders = useMemo(() => {
    // Merge hardcoded demo providers with real providers loaded from Supabase
    // Real providers are deduplicated by supabaseId to avoid showing logged-in provider twice
    const allProviders = [...providers, ...realProviders.filter(rp => rp.id !== user?.id)];
    let filtered = allProviders;
    if (selectedCategory && selectedCategory !== 'todos') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => {
        const catName = (t.categoriesData[p.category] || '').toLowerCase();
        return (
          (p.name || '').toLowerCase().includes(q) ||
          (p.company || '').toLowerCase().includes(q) ||
          (p.category || '').toLowerCase().includes(q) ||
          catName.includes(q) ||
          (p.bio || '').toLowerCase().includes(q) ||
          (p.tags || []).some(tag => tag.toLowerCase().includes(q))
        );
      });
    }
    // Calcular distancia real si hay ubicación del usuario
    filtered = filtered.map(p => {
      const calcDist = userLocation && p.lat ? getDistance(userLocation.lat, userLocation.lng, p.lat, p.lng) : null;
      return { ...p, distanceKm: calcDist, distanceLabel: calcDist !== null ? formatDistance(calcDist) : p.distance };
    });
    // Ordenar
    return [...filtered].sort((a, b) => {
      if (sortBy === 'distance') {
        if (a.distanceKm === null && b.distanceKm === null) return 0;
        if (a.distanceKm === null) return 1;
        if (b.distanceKm === null) return -1;
        return a.distanceKm - b.distanceKm;
      }
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return (a.minPrice || 999) - (b.minPrice || 999);
      return 0;
    });
  }, [selectedCategory, searchQuery, country, userLocation, sortBy, realProviders, user]);

  const showChatToast = (msg) => {
    setChatToast(msg);
    setTimeout(() => setChatToast(''), 3000);
  };

  const getOrCreateConversation = async (providerId) => {
    let { data: conv, error: selErr } = await supabase
      .from('conversations')
      .select('id')
      .eq('client_id', user.id)
      .eq('provider_id', providerId)
      .maybeSingle();
    if (selErr) return null;
    if (!conv) {
      const { data: newConv, error: insErr } = await supabase
        .from('conversations')
        .insert({ client_id: user.id, provider_id: providerId })
        .select('id')
        .single();
      if (insErr) { showChatToast('Error al crear la conversación. ¿Ya corriste el SQL en Supabase?'); return null; }
      conv = newConv;
    }
    return conv;
  };

  const handleStartChat = async () => {
    if (!user) { openAuth('client'); return; }
    const providerId = typeof selectedProvider?.id === 'string' ? selectedProvider.id : null;
    if (!providerId) {
      showChatToast(lang === 'en'
        ? 'Demo provider — not yet registered on the platform.'
        : 'Proveedor de demo — aún no registrado en la plataforma.');
      return;
    }
    const conv = await getOrCreateConversation(providerId);
    if (conv?.id) {
      setActiveChatConversationId(conv.id);
      setActiveChatOtherName(selectedProvider.company || selectedProvider.name);
      setClientView('chat');
    }
  };

  const handleBookingSubmit = async () => {
    const text = bookingMsg.trim();
    if (!text) return;
    const providerId = typeof selectedProvider?.id === 'string' ? selectedProvider.id : null;
    if (providerId && user) {
      const conv = await getOrCreateConversation(providerId);
      if (conv?.id) {
        const content = bookingDate
          ? `📋 Solicitud de cotización:\n${text}\n📅 Fecha deseada: ${bookingDate}`
          : `📋 Solicitud de cotización:\n${text}`;
        const metadata = quotePhotos.length > 0 ? { photos: quotePhotos } : null;
        await supabase.from('messages').insert({ conversation_id: conv.id, sender_id: user.id, content, metadata });
        await supabase.from('conversations').update({
          last_message_at: new Date().toISOString(),
          last_message_preview: content.slice(0, 100),
        }).eq('id', conv.id);
      }
    }
    setQuotePhotos([]);
    setBookingSubmitted(true);
  };

  const loadJobs = async () => {
    if (!user) return;
    const { data: jobs } = await supabase.from('jobs').select('*').eq('provider_id', user.id).order('created_at', { ascending: false });
    if (!jobs?.length) { setMyRealJobs([]); return; }
    const { data: profs } = await supabase.from('profiles').select('id, full_name').in('id', jobs.map(j => j.client_id));
    const pm = {}; profs?.forEach(p => { pm[p.id] = p; });
    setMyRealJobs(jobs.map(j => ({ ...j, clientName: pm[j.client_id]?.full_name || 'Cliente' })));
  };

  const loadProviderReviews = async () => {
    if (!user) return;
    setMyProviderReviewsLoading(true);
    const { data: revs } = await supabase
      .from('reviews').select('id, rating, content, created_at, client_id')
      .eq('provider_id', user.id).order('created_at', { ascending: false });
    if (!revs?.length) { setMyProviderReviews([]); setMyProviderReviewsLoading(false); return; }
    const { data: profs } = await supabase
      .from('profiles').select('id, full_name').in('id', revs.map(r => r.client_id));
    const pm = {}; profs?.forEach(p => { pm[p.id] = p; });
    setMyProviderReviews(revs.map(r => ({ ...r, clientName: pm[r.client_id]?.full_name || 'Cliente' })));
    setMyProviderReviewsLoading(false);
  };

  const acceptQuote = async (req) => {
    const { data: conv } = await supabase.from('conversations').select('client_id').eq('id', req.conversationId).single();
    if (!conv) return;
    await supabase.from('jobs').insert({
      conversation_id: req.conversationId,
      provider_id: user.id,
      client_id: conv.client_id,
      status: 'accepted',
      title: req.content.split('\n')[0].slice(0, 120),
    });
    const acceptMsg = lang === 'en' ? '✅ I have accepted your request. I will contact you soon to coordinate the details.'
      : lang === 'pt' ? '✅ Aceitei sua solicitação. Entrarei em contato para combinar os detalhes.'
      : lang === 'fr' ? '✅ J\'ai accepté votre demande. Je vous contacterai bientôt pour coordonner les détails.'
      : '✅ He aceptado tu solicitud. Pronto me pondré en contacto para coordinar los detalles.';
    await supabase.from('messages').insert({ conversation_id: req.conversationId, sender_id: user.id, content: acceptMsg });
    await supabase.from('conversations').update({ last_message_at: new Date().toISOString(), last_message_preview: acceptMsg.slice(0, 100) }).eq('id', req.conversationId);
    setQuoteRequests(prev => prev.filter(r => r.id !== req.id));
  };

  const updateJobStatus = async (jobId, newStatus) => {
    await supabase.from('jobs').update({ status: newStatus, updated_at: new Date().toISOString() }).eq('id', jobId);
    setMyRealJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
  };

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

  const SortBar = () => (
    <div className="flex gap-2 overflow-x-auto pb-1 mb-4" style={{ scrollbarWidth: 'none' }}>
      {[
        { key: 'distance', icon: '📍', label: t.sortDistance },
        { key: 'rating', icon: '⭐', label: t.sortRating },
        { key: 'price', icon: '💰', label: t.sortPrice },
      ].map(s => (
        <button key={s.key} onClick={() => setSortBy(s.key)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap flex-shrink-0 border"
          style={{
            background: sortBy === s.key ? '#2C2416' : 'white',
            color: sortBy === s.key ? '#F4EFE6' : '#2C2416',
            borderColor: sortBy === s.key ? '#2C2416' : '#D4C9B5',
            fontFamily: 'system-ui', fontWeight: sortBy === s.key ? 600 : 400,
          }}>
          {s.icon} {s.label}
        </button>
      ))}
    </div>
  );

  const LocationBanner = () => (
    !userLocation ? (
      <button onClick={requestLocation} disabled={locationLoading}
        className="w-full mb-4 p-3 rounded-2xl flex items-center gap-3"
        style={{ background: '#EBE4D4' }}>
        <MapPin size={18} color="#D97757" />
        <div className="text-left flex-1">
          <div className="text-sm" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>
            {locationLoading ? '...' : t.enableLocation}
          </div>
          <div className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{t.enableLocationSub}</div>
        </div>
        <ChevronRight size={16} color="#7A6F5C" />
      </button>
    ) : (
      <button onClick={() => { setAddressInputText(userAddress); setGeocodeError(''); setShowAddressInput(true); }}
        className="w-full mb-4 p-3 rounded-2xl flex items-center gap-2"
        style={{ background: '#E8F0E0' }}>
        <MapPin size={16} color="#6B8E4E" />
        <span className="text-sm flex-1 text-left truncate" style={{ color: '#3F5A2A', fontFamily: 'system-ui', fontWeight: 500 }}>
          {userAddress || t.locationActive}
        </span>
        <ChevronRight size={14} color="#6B8E4E" />
      </button>
    )
  );

  const AddressModal = () => showAddressInput && (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={() => setShowAddressInput(false)}>
      <div className="w-full max-w-md rounded-t-3xl p-5 pb-8" style={{ background: '#F4EFE6' }} onClick={e => e.stopPropagation()}>
        <div className="w-12 h-1 rounded-full mx-auto mb-5" style={{ background: '#D4C9B5' }} />
        <h3 className="text-xl mb-1" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>
          {lang === 'en' ? 'Where should we look?' : lang === 'pt' ? 'Onde devemos buscar?' : lang === 'fr' ? 'Où chercher ?' : '¿Dónde buscamos?'}
        </h3>
        <p className="text-xs mb-4" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
          {lang === 'en' ? 'Providers will be sorted by proximity to this address.' : lang === 'pt' ? 'Os prestadores serão ordenados pela proximidade a este endereço.' : lang === 'fr' ? 'Les prestataires seront triés par proximité de cette adresse.' : 'Los proveedores se ordenarán por cercanía a esta dirección.'}
        </p>
        {geocodeError && (
          <div className="mb-3 p-2 rounded-xl text-xs" style={{ background: '#FAE4DC', color: '#A8553C', fontFamily: 'system-ui' }}>
            {geocodeError}
          </div>
        )}
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color="#7A6F5C" />
            <input
              autoFocus
              type="text"
              value={addressInputText}
              onChange={e => setAddressInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addressInputText.trim() && geocodeAddress(addressInputText.trim())}
              placeholder={lang === 'en' ? 'e.g. 123 Main St, City' : lang === 'pt' ? 'Ex: Rua das Flores, 45, São Paulo' : lang === 'fr' ? 'Ex: 12 rue de la Paix, Paris' : 'Ej: Calle 45 #12-30, Bogotá'}
              className="w-full py-3 pl-9 pr-4 rounded-2xl outline-none text-sm"
              style={{ background: 'white', color: '#2C2416', fontFamily: 'system-ui', border: '1px solid #D4C9B5' }}
            />
          </div>
          <button
            onClick={() => addressInputText.trim() && geocodeAddress(addressInputText.trim())}
            disabled={geocoding || !addressInputText.trim()}
            className="px-4 rounded-2xl text-sm"
            style={{ background: '#2C2416', color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600, opacity: (geocoding || !addressInputText.trim()) ? 0.5 : 1 }}
          >
            {geocoding ? '...' : (lang === 'en' ? 'Set' : lang === 'pt' ? 'Ok' : 'Ok')}
          </button>
        </div>
        {userAddress ? (
          <button onClick={() => { setUserAddress(''); setUserLocation(null); setShowAddressInput(false); if (user) supabase.from('profiles').update({ address: null }).eq('id', user.id); }}
            className="w-full py-2 text-xs text-center"
            style={{ color: '#A8553C', fontFamily: 'system-ui' }}>
            {lang === 'en' ? 'Remove saved address' : lang === 'pt' ? 'Remover endereço' : lang === 'fr' ? 'Supprimer l\'adresse' : 'Quitar dirección guardada'}
          </button>
        ) : (
          <button onClick={() => { requestLocation(); setShowAddressInput(false); }}
            className="w-full py-2 text-xs text-center flex items-center justify-center gap-1.5"
            style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
            <MapPin size={12} />
            {lang === 'en' ? 'Use my current location instead' : lang === 'pt' ? 'Usar minha localização atual' : lang === 'fr' ? 'Utiliser ma position actuelle' : 'Usar mi ubicación actual'}
          </button>
        )}
      </div>
    </div>
  );

  // ============ PANTALLAS GLOBALES ============
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F4EFE6' }}>
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: '#2C2416', animation: 'pulse 2s infinite' }}>
            <Home size={26} color="#F4EFE6" />
          </div>
          <p style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontSize: '14px' }}>Cargando...</p>
        </div>
      </div>
    );
  }

  if (user && profile && !profile.role) {
    return (
      <div className="min-h-screen flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
        <div className="w-full max-w-md rounded-t-3xl p-6 pb-8" style={{ background: '#F4EFE6' }}>
          <div className="w-12 h-1 rounded-full mx-auto mb-6" style={{ background: '#D4C9B5' }} />
          <h2 className="text-2xl mb-5" style={{ color: '#2C2416', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>¿Cómo usarás Krafio?</h2>
          <div className="space-y-3">
            {[{ role: 'client', icon: Home, label: 'Soy cliente', sub: 'Necesito un servicio' }, { role: 'provider', icon: Briefcase, label: 'Soy proveedor', sub: 'Quiero ofrecer servicios' }].map(item => {
              const Icon = item.icon;
              return (
                <button key={item.role} onClick={async () => { await supabase.from('profiles').update({ role: item.role }).eq('id', user.id); await fetchProfile(user.id); }}
                  className="w-full p-5 rounded-2xl flex items-center gap-4 text-left border-2"
                  style={{ borderColor: '#2C2416', color: '#2C2416', background: 'transparent' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#EBE4D4' }}><Icon size={22} color="#2C2416" /></div>
                  <div><div className="text-xs uppercase tracking-wider opacity-60 mb-0.5" style={{ fontFamily: 'system-ui' }}>{item.label}</div><div className="text-base" style={{ fontFamily: 'system-ui', fontWeight: 500 }}>{item.sub}</div></div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'admin') {
    return <AdminPanel onSignOut={signOut} />;
  }

  if (needsProfileSetup) {
    return <ProviderSetupForm onComplete={loadProviderData} />;
  }

  // ============ LANDING ============
  if (mode === 'landing') {
    return (
      <>
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
                onClick={() => openAuth('client')}
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
                onClick={() => openAuth('provider')}
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
      {showAuthModal && (
        <AuthModal
          defaultRole={authModalRole}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
        />
      )}
      <AddressModal />
      </>
    );
  }

  // ============ MODAL RESEÑA ============
  const ReviewModal = reviewModalProviderId ? (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', background: 'rgba(0,0,0,0.5)' }}
      onClick={e => { if (e.target === e.currentTarget) setReviewModalProviderId(null); }}>
      <div style={{ width: '100%', maxWidth: 480, background: '#F4EFE6', borderRadius: '24px 24px 0 0', padding: '24px 24px 40px', fontFamily: 'system-ui' }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: '#D4C9B5', margin: '0 auto 20px' }} />
        <p style={{ fontSize: 11, color: '#7A6F5C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
          {lang === 'en' ? 'Leave a review' : 'Dejar reseña'}
        </p>
        <h3 style={{ fontSize: 20, color: '#2C2416', fontFamily: 'Georgia, serif', fontStyle: 'italic', marginBottom: 20 }}>
          {reviewModalProviderName}
        </h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {[1,2,3,4,5].map(i => (
            <button key={i} onClick={() => setReviewModalRating(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
              <Star size={32} fill={i <= reviewModalRating ? '#E0A458' : 'none'} color="#E0A458" strokeWidth={1.5} />
            </button>
          ))}
        </div>
        <textarea
          rows={3}
          placeholder={lang === 'en' ? 'Tell others about your experience...' : 'Cuéntale a otros cómo fue tu experiencia...'}
          value={reviewModalText}
          onChange={e => setReviewModalText(e.target.value)}
          style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #D4C9B5', background: 'white', color: '#2C2416', fontFamily: 'system-ui', fontSize: 14, resize: 'none', outline: 'none', boxSizing: 'border-box', marginBottom: 12 }}
        />
        <button
          onClick={handleSubmitModalReview}
          disabled={!reviewModalRating || reviewModalSaving}
          style={{ width: '100%', padding: '14px', borderRadius: 14, border: 'none', cursor: reviewModalRating ? 'pointer' : 'default', background: reviewModalRating ? '#2C2416' : '#D4C9B5', color: '#F4EFE6', fontWeight: 600, fontSize: 15, opacity: reviewModalSaving ? 0.7 : 1 }}>
          {reviewModalSaving ? (lang === 'en' ? 'Saving...' : 'Guardando...') : (lang === 'en' ? 'Publish review' : 'Publicar reseña')}
        </button>
      </div>
    </div>
  ) : null;

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
                <button onClick={() => { setClientView(selectedCategory ? 'category' : 'home'); }} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
                  <ArrowLeft size={20} color="white" />
                </button>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => shareProvider(p)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
                    <Share2 size={18} color="white" />
                  </button>
                  <button onClick={() => toggleFavorite(p.id)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
                    <Heart size={20} color="white" fill={favorites.has(String(p.id)) ? 'white' : 'none'} />
                  </button>
                </div>
                {shareToast && (
                  <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', background: '#2C2416', color: '#F4EFE6', padding: '8px 18px', borderRadius: 20, fontSize: 13, fontFamily: 'system-ui', fontWeight: 600, whiteSpace: 'nowrap', zIndex: 100 }}>
                    {lang === 'en' ? 'Link copied!' : 'Link copiado!'}
                  </div>
                )}
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

              {providerDetailPhotos.length > 0 && (
                <div className="mb-5">
                  <h3 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
                    {lang === 'en' ? 'Work photos' : lang === 'pt' ? 'Fotos de trabalhos' : lang === 'fr' ? 'Photos de travaux' : 'Fotos de trabajos'}
                  </h3>
                  <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
                    {providerDetailPhotos.map(photo => (
                      <img key={photo.id} src={photo.url} alt="" style={{ width: 160, height: 120, objectFit: 'cover', borderRadius: 12, flexShrink: 0 }} />
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-xs uppercase tracking-widest mb-2" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>{t.aboutCraft}</h3>
                <p className="text-base leading-relaxed" style={{ color: '#2C2416' }}>{p.bio}</p>
              </div>

              <div className="mb-5">
                <h3 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>{t.specialties}</h3>
                <div className="flex flex-wrap gap-2">
                  {(p.tags || []).map((tag, i) => (
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
                </div>
                <div className="space-y-3">
                  {(providerReviews.length > 0 ? providerReviews : reviewsData).map(r => {
                    const name = r.clientName || r.name || 'Cliente';
                    const dateStr = r.created_at ? new Date(r.created_at).toLocaleDateString([], { year: 'numeric', month: 'short' }) : r.date;
                    const text = r.content || r.text || '';
                    return (
                      <div key={r.id} className="p-4 rounded-xl" style={{ background: 'white', borderLeft: `3px solid ${catColor}` }}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs" style={{ background: '#EBE4D4', color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>
                              {name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>{name}</div>
                              <div className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{dateStr}</div>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} size={10} fill={i <= r.rating ? '#E0A458' : 'none'} color="#E0A458" />
                            ))}
                          </div>
                        </div>
                        {text ? <p className="text-sm leading-relaxed" style={{ color: '#2C2416' }}>"{text}"</p> : null}
                      </div>
                    );
                  })}
                </div>

                {/* Review form — only shown after job is completed */}
                {user && clientJobStatus === 'completed' && (
                  <div className="mt-4">
                    {myReview && !showReviewForm ? (
                      <div className="p-4 rounded-xl flex items-center justify-between" style={{ background: '#EBE4D4' }}>
                        <div>
                          <div className="flex gap-0.5 mb-1">
                            {[1,2,3,4,5].map(i => <Star key={i} size={12} fill={i <= myReview.rating ? '#E0A458' : 'none'} color="#E0A458" />)}
                          </div>
                          <p className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                            {lang === 'en' ? 'Your review' : lang === 'pt' ? 'Sua avaliação' : lang === 'fr' ? 'Votre avis' : 'Tu reseña'}
                          </p>
                        </div>
                        <button onClick={() => setShowReviewForm(true)} className="text-xs px-3 py-1.5 rounded-full" style={{ background: '#D97757', color: 'white', fontFamily: 'system-ui' }}>
                          {lang === 'en' ? 'Edit' : lang === 'pt' ? 'Editar' : lang === 'fr' ? 'Modifier' : 'Editar'}
                        </button>
                      </div>
                    ) : (!myReview || showReviewForm) ? (
                      <div className="p-4 rounded-xl" style={{ background: 'white', border: '1px solid #D4C9B5' }}>
                        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
                          {lang === 'en' ? 'Leave a review' : lang === 'pt' ? 'Deixar avaliação' : lang === 'fr' ? 'Laisser un avis' : 'Dejar una reseña'}
                        </p>
                        <div className="flex gap-2 mb-3">
                          {[1,2,3,4,5].map(i => (
                            <button key={i} onClick={() => setReviewRating(i)}>
                              <Star size={28} fill={i <= reviewRating ? '#E0A458' : 'none'} color="#E0A458" />
                            </button>
                          ))}
                        </div>
                        <textarea
                          rows={3}
                          value={reviewText}
                          onChange={e => setReviewText(e.target.value)}
                          placeholder={lang === 'en' ? 'Share your experience (optional)...' : lang === 'pt' ? 'Compartilhe sua experiência (opcional)...' : lang === 'fr' ? 'Partagez votre expérience (optionnel)...' : 'Comparte tu experiencia (opcional)...'}
                          className="w-full px-3 py-2 rounded-xl outline-none border resize-none text-sm mb-3"
                          style={{ borderColor: '#D4C9B5', background: '#F9F7F3', color: '#2C2416', fontFamily: 'system-ui' }}
                        />
                        <div className="flex gap-2">
                          {showReviewForm && (
                            <button onClick={() => setShowReviewForm(false)} className="flex-1 py-2.5 rounded-xl text-sm" style={{ background: '#EBE4D4', color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>
                              {lang === 'en' ? 'Cancel' : 'Cancelar'}
                            </button>
                          )}
                          <button
                            onClick={handleSubmitReview}
                            disabled={!reviewRating}
                            className="flex-1 py-2.5 rounded-xl text-sm"
                            style={{ background: reviewRating ? '#2C2416' : '#D4C9B5', color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600 }}
                          >
                            {lang === 'en' ? 'Publish' : lang === 'pt' ? 'Publicar' : lang === 'fr' ? 'Publier' : 'Publicar'}
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>

            {chatToast && (
              <div className="fixed top-6 left-0 right-0 flex justify-center z-50 px-5">
                <div className="px-4 py-3 rounded-2xl text-sm max-w-sm text-center shadow-lg" style={{ background: '#2C2416', color: '#F4EFE6', fontFamily: 'system-ui' }}>
                  {chatToast}
                </div>
              </div>
            )}
            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-5 py-4" style={{ background: 'linear-gradient(to top, #F4EFE6 70%, transparent)' }}>
              <div className="flex gap-2">
                <button onClick={handleStartChat} className="w-14 h-14 rounded-2xl flex items-center justify-center border-2" style={{ borderColor: '#2C2416', background: 'transparent' }}>
                  <MessageCircle size={22} color="#2C2416" />
                </button>
                <button
                  onClick={() => { setBookingMsg(''); setBookingDate(''); setBookingSubmitted(false); setClientView('booking'); }}
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

    if (clientView === 'chat') {
      return (
        <ChatView
          conversationId={activeChatConversationId}
          currentUserId={user.id}
          currentUserName={profile?.full_name || ''}
          otherUserName={activeChatOtherName}
          onBack={() => setClientView('detail')}
          lang={lang}
        />
      );
    }

    if (clientView === 'booking') {
      const p = selectedProvider;
      if (bookingSubmitted) {
        return (
          <div className="min-h-screen flex items-center justify-center" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
            <div className="max-w-md mx-auto px-6 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: '#6B8E4E' }}>
                <Check size={48} color="white" />
              </div>
              <h2 className="text-3xl mb-3" style={{ color: '#2C2416', fontStyle: 'italic' }}>{t.requestSent}</h2>
              <p className="text-base mb-8" style={{ color: '#5C5446', fontFamily: 'system-ui' }}>
                {p?.name} {t.requestSentMsg} {p?.responseTime}.
              </p>
              <button
                onClick={() => { setClientView('home'); setSelectedProvider(null); setBookingSubmitted(false); setBookingMsg(''); setBookingDate(''); }}
                className="w-full py-4 rounded-2xl shadow-lg"
                style={{ background: '#2C2416', color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600 }}
              >
                {t.backHome}
              </button>
            </div>
          </div>
        );
      }
      return (
        <div className="min-h-screen" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
          <div className="max-w-md mx-auto px-5 pt-12 pb-36">
            <button onClick={() => setClientView('detail')} className="w-10 h-10 rounded-full flex items-center justify-center mb-6" style={{ background: '#EBE4D4' }}>
              <ArrowLeft size={20} color="#2C2416" />
            </button>
            <div className="mb-1 inline-block px-3 py-1 rounded-full" style={{ background: 'rgba(217,119,87,0.15)' }}>
              <p className="text-xs uppercase tracking-widest" style={{ color: '#A8553C', fontFamily: 'system-ui', fontWeight: 700 }}>
                {p?.company}
              </p>
            </div>
            <h2 className="text-3xl mt-2 mb-1" style={{ color: '#2C2416', fontStyle: 'italic', fontWeight: 400 }}>
              {lang === 'en' ? 'Request a quote' : lang === 'pt' ? 'Solicitar orçamento' : lang === 'fr' ? 'Demander un devis' : 'Solicitar cotización'}
            </h2>
            <p className="text-sm mb-6" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
              {lang === 'en' ? "Describe what you need and we'll send it to the provider." : lang === 'pt' ? 'Descreva o que precisa e enviaremos ao prestador.' : lang === 'fr' ? "Décrivez votre besoin, nous l'enverrons au prestataire." : 'Describe lo que necesitas y se lo enviaremos al proveedor.'}
            </p>

            <div className="mb-4">
              <label className="text-xs uppercase tracking-wider block mb-2" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
                {lang === 'en' ? 'What do you need?' : lang === 'pt' ? 'O que você precisa?' : lang === 'fr' ? 'Qu\'avez-vous besoin ?' : '¿Qué necesitas?'} *
              </label>
              <textarea
                rows={5}
                value={bookingMsg}
                onChange={e => setBookingMsg(e.target.value)}
                placeholder={lang === 'en' ? 'e.g. Paint the living room, approx. 25 m², white walls...' : lang === 'pt' ? 'Ex: Pintar a sala, aprox. 25 m², paredes brancas...' : lang === 'fr' ? 'Ex: Peindre le salon, environ 25 m², murs blancs...' : 'Ej: Pintar la sala, aprox. 25 m², paredes blancas y techo...'}
                className="w-full px-4 py-3 rounded-2xl outline-none border resize-none"
                style={{ borderColor: '#D4C9B5', background: 'white', color: '#2C2416', fontFamily: 'system-ui', fontSize: 14 }}
              />
            </div>

            {/* Quote photos */}
            <div className="mb-4">
              <label className="text-xs uppercase tracking-wider block mb-2" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
                {lang === 'en' ? 'Photos (optional)' : lang === 'pt' ? 'Fotos (opcional)' : lang === 'fr' ? 'Photos (optionnel)' : 'Fotos del trabajo (opcional)'}
              </label>
              <p className="text-xs mb-3" style={{ color: '#B0A898', fontFamily: 'system-ui' }}>
                {lang === 'en' ? 'Help the provider understand what you need.' : lang === 'pt' ? 'Ajude o prestador a entender o que você precisa.' : lang === 'fr' ? 'Aidez le prestataire à comprendre votre besoin.' : 'Ayuda al proveedor a entender mejor lo que necesitas.'}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {quotePhotos.map((url, idx) => (
                  <div key={idx} style={{ position: 'relative', width: 80, height: 80 }}>
                    <img src={url} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 10 }} />
                    <button onClick={() => setQuotePhotos(prev => prev.filter((_, i) => i !== idx))}
                      style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', background: '#D97757', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <X size={10} color="white" />
                    </button>
                  </div>
                ))}
                {quotePhotos.length < 5 && (
                  <label style={{ width: 80, height: 80, borderRadius: 10, border: '2px dashed #D4C9B5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: quotePhotoUploading ? 'wait' : 'pointer', background: '#F9F7F3', flexShrink: 0 }}>
                    {quotePhotoUploading ? (
                      <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #D4C9B5', borderTopColor: '#D97757', animation: 'spin 0.8s linear infinite' }} />
                    ) : (
                      <>
                        <Camera size={18} color="#B0A898" />
                        <span style={{ fontSize: 9, color: '#B0A898', fontFamily: 'system-ui' }}>+ foto</span>
                      </>
                    )}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setQuotePhotoUploading(true);
                      const ext = file.name.split('.').pop();
                      const path = `${user?.id || 'anon'}/${Date.now()}.${ext}`;
                      const { error: upErr } = await supabase.storage.from('quote-photos').upload(path, file);
                      if (!upErr) {
                        const { data: { publicUrl } } = supabase.storage.from('quote-photos').getPublicUrl(path);
                        setQuotePhotos(prev => [...prev, publicUrl]);
                      }
                      setQuotePhotoUploading(false);
                      e.target.value = '';
                    }} />
                  </label>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs uppercase tracking-wider block mb-2" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
                {lang === 'en' ? 'Preferred date (optional)' : lang === 'pt' ? 'Data preferida (opcional)' : lang === 'fr' ? 'Date souhaitée (optionnel)' : 'Fecha deseada (opcional)'}
              </label>
              {(() => {
                const todayStr = new Date().toISOString().split('T')[0];
                const { year: cy, month: cm } = bookingCalMonth;
                const daysInMonth = new Date(cy, cm + 1, 0).getDate();
                const startDow = new Date(cy, cm, 1).getDay();
                const mNames = lang === 'en'
                  ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                  : ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
                const dNames = lang === 'en' ? ['S','M','T','W','T','F','S'] : ['D','L','M','M','J','V','S'];
                const cells = [...Array(startDow).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
                while (cells.length % 7 !== 0) cells.push(null);
                const canPrev = cy > new Date().getFullYear() || cm > new Date().getMonth();
                return (
                  <div className="rounded-2xl p-4" style={{ background: 'white', border: '1px solid #D4C9B5' }}>
                    <div className="flex items-center justify-between mb-3">
                      <button disabled={!canPrev} onClick={() => setBookingCalMonth(({ year, month }) => month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 })}
                        style={{ color: canPrev ? '#2C2416' : '#D4C9B5', fontFamily: 'system-ui', background: 'none', border: 'none', cursor: canPrev ? 'pointer' : 'default', fontSize: 18 }}>‹</button>
                      <span style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600, fontSize: 14 }}>{mNames[cm]} {cy}</span>
                      <button onClick={() => setBookingCalMonth(({ year, month }) => month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 })}
                        style={{ color: '#2C2416', fontFamily: 'system-ui', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>›</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 6 }}>
                      {dNames.map((d, i) => <div key={i} style={{ textAlign: 'center', fontSize: 10, color: '#B0A898', fontFamily: 'system-ui', fontWeight: 600, paddingBottom: 4 }}>{d}</div>)}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
                      {cells.map((day, i) => {
                        if (!day) return <div key={i} />;
                        const dateStr = `${cy}-${String(cm + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const isPast = dateStr < todayStr;
                        const isBlocked = clientBookingBlocked.has(dateStr);
                        const isSelected = bookingDate === dateStr;
                        const isToday = dateStr === todayStr;
                        const disabled = isPast || isBlocked;
                        return (
                          <button key={i} disabled={disabled} onClick={() => setBookingDate(isSelected ? '' : dateStr)}
                            style={{
                              height: 36, borderRadius: 8, border: 'none', cursor: disabled ? 'default' : 'pointer', fontFamily: 'system-ui', fontSize: 13,
                              background: isSelected ? '#2C2416' : isBlocked ? '#FAE4DC' : isToday ? '#EBE4D4' : 'transparent',
                              color: isSelected ? '#F4EFE6' : isBlocked ? '#D97757' : isPast ? '#D4C9B5' : '#2C2416',
                              fontWeight: isSelected || isToday ? 600 : 400,
                              textDecoration: isBlocked ? 'line-through' : 'none',
                            }}>
                            {day}
                          </button>
                        );
                      })}
                    </div>
                    {bookingDate && (
                      <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid #EBE4D4' }}>
                        <span style={{ fontSize: 13, color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>
                          {new Date(bookingDate + 'T12:00').toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'pt' ? 'pt-BR' : lang === 'fr' ? 'fr-FR' : 'es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </span>
                        <button onClick={() => setBookingDate('')} style={{ fontSize: 12, color: '#7A6F5C', fontFamily: 'system-ui', background: 'none', border: 'none', cursor: 'pointer' }}>
                          {lang === 'en' ? 'Clear' : 'Quitar'}
                        </button>
                      </div>
                    )}
                    {clientBookingBlocked.size > 0 && (
                      <p style={{ fontSize: 11, color: '#B0A898', fontFamily: 'system-ui', marginTop: 8 }}>
                        {lang === 'en' ? 'Strikethrough dates: provider unavailable' : 'Fechas tachadas: proveedor no disponible'}
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-5 py-4" style={{ background: 'linear-gradient(to top, #F4EFE6 70%, transparent)' }}>
            <button
              onClick={handleBookingSubmit}
              disabled={!bookingMsg.trim()}
              className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
              style={{ background: bookingMsg.trim() ? '#2C2416' : '#D4C9B5', color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600 }}
            >
              <Send size={18} />
              {lang === 'en' ? 'Send request' : lang === 'pt' ? 'Enviar solicitação' : lang === 'fr' ? 'Envoyer la demande' : 'Enviar solicitud'}
            </button>
          </div>
        </div>
      );
    }

    if (clientView === 'history') {
      const relTime = ts => {
        const m = Math.floor((Date.now() - new Date(ts)) / 60000);
        if (m < 60) return `${m}m`;
        if (m < 1440) return `${Math.floor(m / 60)}h`;
        return `${Math.floor(m / 1440)}d`;
      };
      return (
        <>
        <div className="min-h-screen" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
          <div className="max-w-md mx-auto px-5 pt-12 pb-10">
            <button onClick={() => setClientView('home')} className="w-10 h-10 rounded-full flex items-center justify-center mb-5" style={{ background: '#EBE4D4' }}>
              <ArrowLeft size={20} color="#2C2416" />
            </button>
            <h2 className="text-3xl mb-1" style={{ color: '#2C2416', fontStyle: 'italic', fontWeight: 400 }}>
              {lang === 'en' ? 'My requests' : lang === 'pt' ? 'Minhas solicitações' : lang === 'fr' ? 'Mes demandes' : 'Mis solicitudes'}
            </h2>
            <p className="text-sm mb-6" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
              {lang === 'en' ? 'Providers you have contacted' : lang === 'pt' ? 'Prestadores que você contactou' : lang === 'fr' ? 'Prestataires que vous avez contactés' : 'Proveedores que has contactado'}
            </p>
            {clientHistory.length === 0 ? (
              <div className="text-center py-14">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: '#EBE4D4' }}>
                  <Briefcase size={24} color="#7A6F5C" />
                </div>
                <p className="text-sm" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                  {lang === 'en' ? 'No requests yet' : 'Sin solicitudes aún'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {clientHistory.map(item => {
                  const cat = categories.find(c => c.id === item.category);
                  const Icon = cat?.icon || Briefcase;
                  const cColor = cat?.color || '#D97757';
                  const alreadyReviewed = clientReviewMap[item.providerId];
                  const job = item.job;
                  const isActive = job && (job.status === 'accepted' || job.status === 'in_progress');
                  const isCompleted = job?.status === 'completed';

                  const jobStatusChip = job ? (
                    <span style={{
                      fontSize: 10, fontFamily: 'system-ui', fontWeight: 700, borderRadius: 20,
                      padding: '2px 8px', marginLeft: 6,
                      background: isCompleted ? '#D1E7DD' : '#E0EDF8',
                      color: isCompleted ? '#0A5729' : '#2A4A7A',
                    }}>
                      {isCompleted
                        ? (lang === 'en' ? 'Completed' : 'Completado')
                        : (lang === 'en' ? 'In progress' : 'En curso')}
                    </span>
                  ) : null;

                  const markComplete = async () => {
                    await supabase.from('jobs').update({ status: 'completed', updated_at: new Date().toISOString() }).eq('id', job.id);
                    setClientHistory(prev => prev.map(h => h.id === item.id ? { ...h, job: { ...h.job, status: 'completed' } } : h));
                    setReviewModalProviderId(item.providerId);
                    setReviewModalProviderName(item.company);
                    setReviewModalRating(0);
                    setReviewModalText('');
                  };

                  return (
                    <div key={item.id} className="rounded-2xl overflow-hidden" style={{ background: 'white' }}>
                      <button
                        onClick={() => { setActiveChatConversationId(item.id); setActiveChatOtherName(item.company); setClientView('chat'); }}
                        className="w-full p-4 flex items-center gap-3 text-left">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${cColor}22` }}>
                          <Icon size={22} color={cColor} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <div className="flex items-center min-w-0">
                              <span className="text-sm" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>{item.company}</span>
                              {jobStatusChip}
                            </div>
                            <span className="text-xs ml-2 flex-shrink-0" style={{ color: '#B0A898', fontFamily: 'system-ui' }}>{relTime(item.date)}</span>
                          </div>
                          <p className="text-xs truncate" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{item.preview || '—'}</p>
                        </div>
                      </button>
                      <div style={{ borderTop: '1px solid #F0EBE1', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                        {isActive && (
                          <button
                            onClick={markComplete}
                            style={{ fontSize: 12, color: '#3F5A2A', fontFamily: 'system-ui', fontWeight: 600, background: '#E8F0E0', border: 'none', cursor: 'pointer', padding: '5px 12px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Check size={13} color="#3F5A2A" />
                            {lang === 'en' ? 'Mark complete' : 'Marcar completado'}
                          </button>
                        )}
                        {alreadyReviewed ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: isActive ? 'auto' : 0 }}>
                            <div style={{ display: 'flex', gap: 2 }}>
                              {[1,2,3,4,5].map(i => <Star key={i} size={12} fill={i <= alreadyReviewed.rating ? '#E0A458' : 'none'} color="#E0A458" />)}
                            </div>
                            <span style={{ fontSize: 11, color: '#7A6F5C', fontFamily: 'system-ui' }}>
                              {lang === 'en' ? 'Reviewed' : 'Reseñado'}
                            </span>
                          </div>
                        ) : isCompleted ? (
                          <button
                            onClick={() => { setReviewModalProviderId(item.providerId); setReviewModalProviderName(item.company); setReviewModalRating(0); setReviewModalText(''); }}
                            style={{ fontSize: 12, color: '#D97757', fontFamily: 'system-ui', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Star size={13} color="#D97757" />
                            {lang === 'en' ? 'Leave a review' : lang === 'pt' ? 'Deixar avaliação' : lang === 'fr' ? 'Laisser un avis' : 'Dejar reseña'}
                          </button>
                        ) : !job ? (
                          <span style={{ fontSize: 11, color: '#B0A898', fontFamily: 'system-ui' }}>
                            {lang === 'en' ? 'Awaiting response' : 'Esperando respuesta'}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {ReviewModal}
        </>
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

            <div className="px-5 pb-8">
              <SortBar />
              <div className="space-y-3">
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
                        <p className="text-xs mb-2" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{p.name} · {p.distanceLabel || p.distance}</p>
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
      </div>
      );
    }

    if (clientView === 'profile') {
      const initials = (profile?.full_name || user?.email || 'U').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
      const totalRequests = clientHistory.length;
      const uniqueProviders = new Set(clientHistory.map(c => c.providerId)).size;

      return (
        <>
        <div className="min-h-screen" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
          <div className="max-w-md mx-auto pb-10">
            <div className="px-5 pt-12 pb-4 flex items-center justify-between">
              <button onClick={() => setClientView('home')} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#EBE4D4' }}>
                <ArrowLeft size={20} color="#2C2416" />
              </button>
              <h2 className="text-lg" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>
                {lang === 'en' ? 'My profile' : lang === 'pt' ? 'Meu perfil' : lang === 'fr' ? 'Mon profil' : 'Mi perfil'}
              </h2>
              <div style={{ width: 40 }} />
            </div>

            {/* Avatar + name */}
            <div className="px-5 pb-6 text-center">
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
                <div style={{ width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', background: '#D97757', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {avatarUrl
                    ? <img src={avatarUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ fontSize: 32, color: 'white', fontFamily: 'system-ui', fontWeight: 700 }}>{initials}</span>
                  }
                </div>
                <label style={{ position: 'absolute', bottom: -4, right: -4, width: 32, height: 32, borderRadius: '50%', background: '#2C2416', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: avatarUploading ? 'wait' : 'pointer', border: '3px solid #F4EFE6' }}>
                  {avatarUploading
                    ? <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(244,239,230,0.3)', borderTopColor: '#F4EFE6', animation: 'spin 0.8s linear infinite' }} />
                    : <Camera size={14} color="#F4EFE6" />
                  }
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setAvatarUploading(true);
                    const ext = file.name.split('.').pop();
                    const path = `${user.id}/avatar.${ext}`;
                    await supabase.storage.from('avatars').remove([`${user.id}/avatar.jpg`, `${user.id}/avatar.jpeg`, `${user.id}/avatar.png`, `${user.id}/avatar.webp`]).catch(() => {});
                    const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
                    if (!error) {
                      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path);
                      const urlWithBust = `${publicUrl}?t=${Date.now()}`;
                      setAvatarUrl(urlWithBust);
                      await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id);
                    }
                    setAvatarUploading(false);
                    e.target.value = '';
                  }} />
                </label>
              </div>

              {/* Editable name */}
              <div className="flex items-center justify-center gap-2">
                {savingName ? (
                  <input
                    autoFocus
                    value={clientEditName}
                    onChange={e => setClientEditName(e.target.value)}
                    onBlur={async () => {
                      const name = clientEditName.trim();
                      if (name && name !== profile?.full_name) {
                        await supabase.from('profiles').update({ full_name: name }).eq('id', user.id);
                        await fetchProfile(user.id);
                      }
                      setSavingName(false);
                    }}
                    onKeyDown={e => { if (e.key === 'Enter') e.target.blur(); if (e.key === 'Escape') setSavingName(false); }}
                    className="text-xl text-center outline-none border-b-2 bg-transparent"
                    style={{ borderColor: '#D97757', color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600, minWidth: 120 }}
                  />
                ) : (
                  <h3 className="text-xl" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>{profile?.full_name || user?.email?.split('@')[0]}</h3>
                )}
                <button onClick={() => { setClientEditName(profile?.full_name || ''); setSavingName(true); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                  <Edit3 size={14} color="#7A6F5C" />
                </button>
              </div>
              <p className="text-sm mt-1" style={{ color: '#B0A898', fontFamily: 'system-ui' }}>{user?.email}</p>
            </div>

            {/* Address */}
            <div className="px-5 mb-5">
              <h3 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
                {lang === 'en' ? 'My zone' : lang === 'pt' ? 'Minha zona' : lang === 'fr' ? 'Ma zone' : 'Mi zona'}
              </h3>
              <button
                onClick={() => { setAddressInputText(userAddress); setGeocodeError(''); setShowAddressInput(true); }}
                className="w-full p-4 rounded-2xl flex items-center gap-3"
                style={{ background: 'white', textAlign: 'left' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: userAddress ? '#FAE4DC' : '#EBE4D4' }}>
                  <MapPin size={18} color={userAddress ? '#D97757' : '#7A6F5C'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate" style={{ color: userAddress ? '#2C2416' : '#B0A898', fontFamily: 'system-ui', fontWeight: userAddress ? 500 : 400 }}>
                    {userAddress || (lang === 'en' ? 'No address saved' : 'Sin dirección guardada')}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#B0A898', fontFamily: 'system-ui' }}>
                    {lang === 'en' ? 'Tap to change' : 'Toca para cambiar'}
                  </p>
                </div>
              </button>
            </div>

            {/* Activity stats */}
            <div className="px-5 mb-5">
              <h3 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
                {lang === 'en' ? 'Activity' : lang === 'pt' ? 'Atividade' : lang === 'fr' ? 'Activité' : 'Actividad'}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl text-center" style={{ background: 'white' }}>
                  <div className="text-2xl mb-1" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 700 }}>{totalRequests}</div>
                  <div className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                    {lang === 'en' ? 'Requests sent' : lang === 'pt' ? 'Solicitações' : lang === 'fr' ? 'Demandes' : 'Solicitudes'}
                  </div>
                </div>
                <div className="p-4 rounded-2xl text-center" style={{ background: 'white' }}>
                  <div className="text-2xl mb-1" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 700 }}>{uniqueProviders}</div>
                  <div className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                    {lang === 'en' ? 'Providers' : lang === 'pt' ? 'Prestadores' : lang === 'fr' ? 'Prestataires' : 'Proveedores'}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent requests */}
            {clientHistory.length > 0 && (
              <div className="px-5 mb-5">
                <h3 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
                  {lang === 'en' ? 'Recent requests' : lang === 'pt' ? 'Solicitações recentes' : lang === 'fr' ? 'Demandes récentes' : 'Solicitudes recientes'}
                </h3>
                <div className="space-y-2">
                  {clientHistory.slice(0, 5).map(item => {
                    const cat = categories.find(c => c.id === item.category);
                    const Icon = cat?.icon || Briefcase;
                    const cColor = cat?.color || '#D97757';
                    const relTime = ts => { const m = Math.floor((Date.now() - new Date(ts)) / 60000); if (m < 60) return `${m}m`; if (m < 1440) return `${Math.floor(m / 60)}h`; return `${Math.floor(m / 1440)}d`; };
                    return (
                      <button key={item.id}
                        onClick={() => { setActiveChatConversationId(item.id); setActiveChatOtherName(item.company); setClientView('chat'); }}
                        className="w-full p-3 rounded-2xl flex items-center gap-3 text-left"
                        style={{ background: 'white' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${cColor}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={18} color={cColor} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <span className="text-sm truncate" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>{item.company}</span>
                            <span className="text-xs ml-2 flex-shrink-0" style={{ color: '#B0A898', fontFamily: 'system-ui' }}>{relTime(item.date)}</span>
                          </div>
                          <p className="text-xs truncate mt-0.5" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{item.preview || '—'}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Notifications */}
            {pushPermission !== 'granted' && (
              <div className="px-5 mb-3">
                <button onClick={() => subscribeToPush(user.id)} className="w-full p-4 rounded-2xl flex items-center gap-3" style={{ background: '#2C2416' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(244,239,230,0.15)' }}>
                    <Bell size={18} color="#F4EFE6" />
                  </div>
                  <span className="text-sm" style={{ color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 500 }}>
                    {lang === 'en' ? 'Enable notifications' : 'Activar notificaciones'}
                  </span>
                </button>
              </div>
            )}

            {/* Sign out */}
            <div className="px-5">
              <button onClick={signOut} className="w-full p-4 rounded-2xl flex items-center gap-3" style={{ background: 'white' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FAE4DC' }}>
                  <LogOut size={18} color="#D97757" />
                </div>
                <span className="text-sm" style={{ color: '#D97757', fontFamily: 'system-ui', fontWeight: 500 }}>
                  {lang === 'en' ? 'Sign out' : lang === 'pt' ? 'Sair' : lang === 'fr' ? 'Se déconnecter' : 'Cerrar sesión'}
                </span>
              </button>
            </div>
          </div>
        </div>
        <AddressModal />
        </>
      );
    }

    // Home cliente
    return (
      <>
      <div className="min-h-screen" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
        <LangPicker />
        <div className="max-w-md mx-auto" style={{ background: '#F4EFE6' }}>
          {/* Hero */}
          <div style={{ background: '#2C2416', padding: '48px 20px 28px' }}>
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => { loadClientHistory(); setClientView('profile'); }} style={{ width: 38, height: 38, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: avatarUrl ? 'transparent' : '#D97757', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {avatarUrl
                  ? <img src={avatarUrl} alt="" style={{ width: 38, height: 38, objectFit: 'cover' }} />
                  : <span style={{ color: 'white', fontFamily: 'system-ui', fontWeight: 700, fontSize: 13 }}>{(profile?.full_name || user?.email || 'U').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}</span>
                }
              </button>
              <button
                onClick={() => { setAddressInputText(userAddress); setGeocodeError(''); setShowAddressInput(true); }}
                style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(244,239,230,0.12)', border: 'none', borderRadius: 20, padding: '6px 12px', cursor: 'pointer', maxWidth: 160 }}
              >
                <MapPin size={12} color="#D97757" />
                <span style={{ color: '#F4EFE6', fontFamily: 'system-ui', fontSize: 12, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {userAddress || t.yourZone}
                </span>
              </button>
              <button onClick={() => setShowLangPicker(true)} style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(244,239,230,0.12)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={15} color="#F4EFE6" />
              </button>
            </div>

            <p style={{ color: '#D97757', fontFamily: 'system-ui', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>
              Krafio
            </p>
            <h1 style={{ color: '#F4EFE6', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400, fontSize: 32, lineHeight: 1.2, margin: '0 0 8px' }}>
              {lang === 'en' ? 'Expert hands for your home, today.' : lang === 'pt' ? 'Mãos expertas para sua casa, hoje.' : lang === 'fr' ? 'Des experts pour votre maison, aujourd\'hui.' : 'Manos expertas para tu hogar, hoy.'}
            </h1>
            <p style={{ color: 'rgba(244,239,230,0.55)', fontFamily: 'system-ui', fontSize: 13, margin: '0 0 20px' }}>
              {lang === 'en' ? 'Verified professionals · Clear prices · No surprises' : lang === 'pt' ? 'Profissionais verificados · Preços claros · Sem surpresas' : lang === 'fr' ? 'Pros vérifiés · Prix clairs · Sans surprises' : 'Profesionales verificados · Precios claros · Sin sorpresas'}
            </p>

            {/* Activity signal */}
            {(() => {
              const total = filteredProviders.length;
              const verified = filteredProviders.filter(p => p.verified).length;
              return total > 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(244,239,230,0.1)', borderRadius: 12, padding: '10px 14px', marginBottom: 20 }}>
                  <div style={{ display: 'flex' }}>
                    {filteredProviders.slice(0, 4).map((p, i) => (
                      <button key={p.id} type="button" onClick={() => { setSelectedProvider(p); setClientView('detail'); }} style={{ width: 26, height: 26, borderRadius: '50%', background: `${categories.find(c => c.id === p.category)?.color || '#D97757'}66`, border: '2px solid #2C2416', marginLeft: i > 0 ? -8 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#F4EFE6', fontWeight: 700, fontFamily: 'system-ui', cursor: 'pointer', padding: 0 }}>
                        {(p.company || p.name || '?')[0].toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <button type="button" onClick={() => { if (filteredProviders.length === 1) { setSelectedProvider(filteredProviders[0]); setClientView('detail'); } }} style={{ flex: 1, background: 'none', border: 'none', padding: 0, cursor: filteredProviders.length === 1 ? 'pointer' : 'default', textAlign: 'left' }}>
                    <p style={{ color: 'rgba(244,239,230,0.85)', fontFamily: 'system-ui', fontSize: 12, margin: 0 }}>
                      <strong style={{ color: '#F4EFE6' }}>{total}</strong>
                      {' '}{lang === 'en' ? 'pros available' : lang === 'pt' ? 'profissionais disponíveis' : lang === 'fr' ? 'pros disponibles' : 'profesionales disponibles'}
                      {verified > 0 && <span style={{ color: '#D97757' }}> · {verified} {lang === 'en' ? 'verified' : 'verificados'}</span>}
                    </p>
                  </button>
                </div>
              ) : null;
            })()}

            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#7A6F5C', pointerEvents: 'none' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                style={{ width: '100%', padding: '14px 14px 14px 42px', borderRadius: 16, border: 'none', outline: 'none', background: '#F4EFE6', color: '#2C2416', fontFamily: 'system-ui', fontSize: 14, boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div className="px-5 pt-5 pb-2">
            <LocationBanner />
          </div>

          {searchQuery ? (
            /* ── Resultados de búsqueda ── */
            <div className="px-5 pb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs uppercase tracking-widest" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
                  {filteredProviders.length} {lang === 'en' ? 'results' : 'resultados'} · «{searchQuery}»
                </h2>
                <button onClick={() => setSearchQuery('')} style={{ fontSize: 12, color: '#D97757', fontFamily: 'system-ui', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                  {lang === 'en' ? 'Clear' : 'Borrar'}
                </button>
              </div>
              {filteredProviders.length === 0 ? (
                <div className="p-10 rounded-2xl text-center" style={{ background: 'white' }}>
                  <Search size={28} color="#B0A898" style={{ margin: '0 auto 10px' }} />
                  <p style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontSize: 14 }}>
                    {lang === 'en' ? 'No providers found.' : 'No encontramos proveedores para esa búsqueda.'}
                  </p>
                  <p style={{ color: '#B0A898', fontFamily: 'system-ui', fontSize: 12, marginTop: 6 }}>
                    {lang === 'en' ? 'Try another keyword.' : 'Prueba con otra palabra clave.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProviders.map(p => {
                    const c = categories.find(cat => cat.id === p.category);
                    const Icon = c?.icon || Briefcase;
                    const cColor = c?.color || '#D97757';
                    return (
                      <button key={p.id} type="button" onClick={() => { setSelectedProvider(p); setClientView('detail'); setSearchQuery(''); }}
                        className="w-full p-4 rounded-2xl text-left" style={{ background: 'white', cursor: 'pointer' }}>
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
                              <Star size={12} fill="#E0A458" color="#E0A458" />
                              <span style={{ color: '#2C2416', fontWeight: 600 }}>{p.rating}</span>
                              <span style={{ color: '#D4C9B5' }}>•</span>
                              <span style={{ color: '#7A6F5C' }}>{t.categoriesData[p.category] || p.category}</span>
                              {p.price && p.price !== '—' && <><span style={{ color: '#D4C9B5' }}>•</span><span style={{ color: '#2C2416' }}>{p.price}</span></>}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
          <>
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

          <div className="px-5 pb-5">
            <button
              onClick={() => { loadClientHistory(); setClientView('history'); }}
              className="w-full p-4 rounded-2xl flex items-center justify-between"
              style={{ background: 'white' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#EBE4D4' }}>
                  <Briefcase size={18} color="#2C2416" />
                </div>
                <span className="text-sm" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>
                  {lang === 'en' ? 'My requests' : lang === 'pt' ? 'Minhas solicitações' : lang === 'fr' ? 'Mes demandes' : 'Mis solicitudes'}
                </span>
              </div>
              <ArrowLeft size={16} color="#7A6F5C" style={{ transform: 'rotate(180deg)' }} />
            </button>
          </div>

          <div className="px-5 pb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs uppercase tracking-widest" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>{t.topNear}</h2>
            </div>
            <SortBar />
            <div className="space-y-3">
              {filteredProviders.slice(0, 3).map(p => {
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
          </>
          )}
        </div>
      </div>
      <AddressModal />
      </>
    );
  }

  // ============ PROVEEDOR ============
  if (mode === 'provider') {
    if (providerView === 'inbox') {
      return (
        <InboxView
          currentUserId={user.id}
          onOpenChat={(convId, name) => {
            setActiveChatConversationId(convId);
            setActiveChatOtherName(name);
            setProviderView('chat');
          }}
          onBack={() => setProviderView('dashboard')}
          lang={lang}
        />
      );
    }

    if (providerView === 'chat') {
      return (
        <ChatView
          conversationId={activeChatConversationId}
          currentUserId={user.id}
          currentUserName={providerData?.company || profile?.full_name || ''}
          otherUserName={activeChatOtherName}
          onBack={() => setProviderView('inbox')}
          lang={lang}
        />
      );
    }

    if (providerView === 'jobs') {
      const statusLabel = (s) => ({
        pending:     lang === 'en' ? 'Pending'      : lang === 'pt' ? 'Pendente'      : lang === 'fr' ? 'En attente'    : 'Pendiente',
        accepted:    lang === 'en' ? 'Accepted'     : lang === 'pt' ? 'Aceito'        : lang === 'fr' ? 'Accepté'       : 'Aceptado',
        in_progress: lang === 'en' ? 'In progress'  : lang === 'pt' ? 'Em andamento'  : lang === 'fr' ? 'En cours'      : 'En curso',
        completed:   lang === 'en' ? 'Completed'    : lang === 'pt' ? 'Concluído'     : lang === 'fr' ? 'Terminé'       : 'Completado',
        cancelled:   lang === 'en' ? 'Cancelled'    : lang === 'pt' ? 'Cancelado'     : lang === 'fr' ? 'Annulé'        : 'Cancelado',
      }[s] || s);
      const statusStyle = (s) => ({
        pending:     { bg: '#FFF4E0', color: '#8B6914' },
        accepted:    { bg: '#E8F0E0', color: '#3F5A2A' },
        in_progress: { bg: '#E0EDF8', color: '#2A4A7A' },
        completed:   { bg: '#EBE4D4', color: '#5C5446' },
        cancelled:   { bg: '#FAE4DC', color: '#A8553C' },
      }[s] || { bg: '#EBE4D4', color: '#5C5446' });
      const nextAction = (s) => ({
        pending:     { status: 'accepted',    label: lang === 'en' ? 'Accept' : 'Aceptar' },
        accepted:    { status: 'in_progress', label: lang === 'en' ? 'Start work' : 'Comenzar' },
        in_progress: { status: 'completed',   label: lang === 'en' ? 'Complete' : 'Completar' },
      }[s]);
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
              {myRealJobs.length === 0 ? (
                <div className="p-8 rounded-2xl text-center" style={{ background: 'white' }}>
                  <Briefcase size={28} color="#B0A898" style={{ margin: '0 auto 10px' }} />
                  <p className="text-sm" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                    {lang === 'en' ? 'No jobs yet. Accept a quote to get started.' : 'Aún no hay trabajos. Acepta una solicitud para empezar.'}
                  </p>
                </div>
              ) : myRealJobs.map(j => {
                const ss = statusStyle(j.status);
                const na = nextAction(j.status);
                return (
                  <div key={j.id} className="p-4 rounded-2xl" style={{ background: 'white' }}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0 pr-2">
                        <h3 className="text-sm leading-snug" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>{j.title || '—'}</h3>
                        <p className="text-xs mt-0.5" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{j.clientName}</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full flex-shrink-0" style={{ background: ss.bg, color: ss.color, fontFamily: 'system-ui', fontWeight: 600 }}>
                        {statusLabel(j.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: '#EBE4D4' }}>
                      <span className="text-xs flex items-center gap-1" style={{ color: '#B0A898', fontFamily: 'system-ui' }}>
                        <Calendar size={11} />{new Date(j.created_at).toLocaleDateString([], { day: 'numeric', month: 'short' })}
                      </span>
                      <div className="flex gap-2 ml-auto">
                        {j.conversation_id && (
                          <button onClick={() => { setActiveChatConversationId(j.conversation_id); setActiveChatOtherName(j.clientName); setProviderView('chat'); }}
                            className="px-3 py-1.5 rounded-xl text-xs"
                            style={{ background: '#EBE4D4', color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>
                            {lang === 'en' ? 'Chat' : 'Chat'}
                          </button>
                        )}
                        {na && (
                          <button onClick={() => updateJobStatus(j.id, na.status)}
                            className="px-3 py-1.5 rounded-xl text-xs"
                            style={{ background: '#2C2416', color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600 }}>
                            {na.label}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    if (providerView === 'availability') {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      const { year: cy, month: cm } = availMonth;
      const daysInMonth = new Date(cy, cm + 1, 0).getDate();
      const startDow = new Date(cy, cm, 1).getDay();
      const mNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      const dNames = ['D','L','M','M','J','V','S'];
      const cells = [...Array(startDow).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
      while (cells.length % 7 !== 0) cells.push(null);
      const canPrev = cy > today.getFullYear() || cm > today.getMonth();

      const toggleBlock = async (dateStr) => {
        const next = new Set(blockedDates);
        if (next.has(dateStr)) {
          next.delete(dateStr);
          await supabase.from('availability_blocks').delete().eq('provider_id', user.id).eq('blocked_date', dateStr);
        } else {
          next.add(dateStr);
          await supabase.from('availability_blocks').insert({ provider_id: user.id, blocked_date: dateStr });
        }
        setBlockedDates(next);
      };

      return (
        <div className="min-h-screen" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
          <div className="max-w-md mx-auto pb-10">
            <div className="px-5 pt-12 pb-4">
              <button onClick={() => setProviderView('dashboard')} className="w-10 h-10 rounded-full flex items-center justify-center mb-5" style={{ background: '#EBE4D4' }}>
                <ArrowLeft size={20} color="#2C2416" />
              </button>
              <h2 className="text-3xl mb-1" style={{ color: '#2C2416', fontStyle: 'italic', fontWeight: 400 }}>
                {lang === 'en' ? 'My availability' : lang === 'pt' ? 'Minha disponibilidade' : lang === 'fr' ? 'Mes disponibilités' : 'Mi disponibilidad'}
              </h2>
              <p className="text-sm mb-6" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                {lang === 'en' ? 'Tap a day to mark it as unavailable. Clients will see these days blocked when booking.' : 'Toca un día para marcarlo como no disponible. Los clientes verán esos días bloqueados al reservar.'}
              </p>
            </div>

            <div className="px-5">
              <div className="rounded-2xl p-4" style={{ background: 'white' }}>
                <div className="flex items-center justify-between mb-4">
                  <button disabled={!canPrev} onClick={() => setAvailMonth(({ year, month }) => month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 })}
                    style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: canPrev ? '#EBE4D4' : 'transparent', cursor: canPrev ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2C2416', fontSize: 18 }}>‹</button>
                  <span style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600, fontSize: 15 }}>{mNames[cm]} {cy}</span>
                  <button onClick={() => setAvailMonth(({ year, month }) => month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 })}
                    style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: '#EBE4D4', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2C2416', fontSize: 18 }}>›</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
                  {dNames.map((d, i) => <div key={i} style={{ textAlign: 'center', fontSize: 11, color: '#B0A898', fontFamily: 'system-ui', fontWeight: 600 }}>{d}</div>)}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                  {cells.map((day, i) => {
                    if (!day) return <div key={i} />;
                    const dateStr = `${cy}-${String(cm + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const isPast = dateStr < todayStr;
                    const isBlocked = blockedDates.has(dateStr);
                    const isToday = dateStr === todayStr;
                    return (
                      <button key={i} disabled={isPast} onClick={() => toggleBlock(dateStr)}
                        style={{
                          height: 44, borderRadius: 10, border: isBlocked ? '2px solid #D97757' : '2px solid transparent',
                          cursor: isPast ? 'default' : 'pointer', fontFamily: 'system-ui', fontSize: 14,
                          background: isBlocked ? '#FAE4DC' : isToday ? '#EBE4D4' : 'transparent',
                          color: isBlocked ? '#D97757' : isPast ? '#D4C9B5' : '#2C2416',
                          fontWeight: isBlocked || isToday ? 600 : 400,
                          textDecoration: isBlocked ? 'line-through' : 'none',
                        }}>
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 p-3 rounded-xl" style={{ background: '#EBE4D4' }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: '#FAE4DC', border: '1px solid #D97757', flexShrink: 0 }} />
                <p style={{ fontSize: 12, color: '#7A6F5C', fontFamily: 'system-ui' }}>
                  {lang === 'en' ? `${blockedDates.size} day(s) blocked this month` : `${blockedDates.size} día(s) bloqueado(s)`}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (providerView === 'myreviews') {
      const avg = myProviderReviews.length
        ? (myProviderReviews.reduce((s, r) => s + r.rating, 0) / myProviderReviews.length).toFixed(1)
        : null;
      return (
        <div className="min-h-screen" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
          <div className="max-w-md mx-auto pb-10">
            <div className="px-5 pt-12 pb-4">
              <button onClick={() => setProviderView('dashboard')} className="w-10 h-10 rounded-full flex items-center justify-center mb-5" style={{ background: '#EBE4D4' }}>
                <ArrowLeft size={20} color="#2C2416" />
              </button>
              <h2 className="text-3xl mb-1" style={{ color: '#2C2416', fontStyle: 'italic', fontWeight: 400 }}>{t.myReviews}</h2>
              {avg && (
                <div className="flex items-center gap-2 mt-2 mb-4">
                  <Star size={16} fill="#E0A458" color="#E0A458" />
                  <span style={{ fontFamily: 'system-ui', fontWeight: 700, color: '#2C2416', fontSize: 18 }}>{avg}</span>
                  <span style={{ fontFamily: 'system-ui', color: '#7A6F5C', fontSize: 14 }}>({myProviderReviews.length} {t.reviews})</span>
                </div>
              )}
            </div>
            <div className="px-5 space-y-3">
              {myProviderReviewsLoading ? (
                <div className="p-8 text-center" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                  {lang === 'en' ? 'Loading...' : 'Cargando...'}
                </div>
              ) : myProviderReviews.length === 0 ? (
                <div className="p-8 rounded-2xl text-center" style={{ background: 'white' }}>
                  <Star size={28} color="#B0A898" style={{ margin: '0 auto 10px' }} />
                  <p className="text-sm" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                    {lang === 'en' ? 'No reviews yet. Complete jobs to receive ratings.' : 'Aún no tienes reseñas. Completa trabajos para recibir calificaciones.'}
                  </p>
                </div>
              ) : myProviderReviews.map(r => (
                <div key={r.id} className="p-4 rounded-2xl" style={{ background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontFamily: 'system-ui', fontWeight: 600, color: '#2C2416', fontSize: 14 }}>{r.clientName}</span>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={13} fill={s <= r.rating ? '#E0A458' : 'none'} color={s <= r.rating ? '#E0A458' : '#D4C9B5'} />
                      ))}
                    </div>
                  </div>
                  {r.content && (
                    <p style={{ fontFamily: 'system-ui', color: '#5A5040', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{r.content}</p>
                  )}
                  <p style={{ fontFamily: 'system-ui', color: '#B0A898', fontSize: 11, marginTop: 6 }}>
                    {new Date(r.created_at).toLocaleDateString(lang === 'es' ? 'es' : lang, { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (providerView === 'edit') {
      const initials = (editFormData.full_name || profile?.full_name || 'U').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
      const handleSave = async () => {
        await supabase.from('providers').update({
          company: editFormData.company,
          phone: editFormData.phone,
          years_experience: parseInt(editFormData.years_experience) || 0,
          reference_price: editFormData.reference_price,
          bio: editFormData.bio,
          category: editFormData.category || null,
          tags: editFormData.tags || [],
          address: editFormData.address || null,
          latitude: editFormData.latitude || null,
          longitude: editFormData.longitude || null,
        }).eq('id', user.id);
        await supabase.from('profiles').update({ full_name: editFormData.full_name }).eq('id', user.id);
        setProviderData(prev => ({ ...prev, ...editFormData }));
        setProviderView('dashboard');
      };
      const editFields = [
        { key: 'full_name', label: t.fullName },
        { key: 'company', label: t.company },
        { key: 'phone', label: t.phone },
        { key: 'years_experience', label: t.yearsExp, type: 'number' },
        { key: 'reference_price', label: t.refPrice },
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
              <button onClick={handleSave} className="px-4 py-2 rounded-full text-sm" style={{ background: '#2C2416', color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600 }}>{t.save}</button>
            </div>
            <div className="px-5 space-y-4">
              <div className="flex justify-center py-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center relative" style={{ background: '#D97757' }}>
                  <span className="text-3xl text-white" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>{initials}</span>
                  <button className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center shadow-lg" style={{ background: '#2C2416' }}>
                    <Camera size={16} color="#F4EFE6" />
                  </button>
                </div>
              </div>
              {editFields.map((field) => (
                <div key={field.key}>
                  <label className="text-xs uppercase tracking-wider mb-1.5 block" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    value={editFormData[field.key] || ''}
                    onChange={e => setEditFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl outline-none border"
                    style={{ background: 'white', borderColor: '#D4C9B5', color: '#2C2416', fontFamily: 'system-ui' }}
                  />
                </div>
              ))}
              <div>
                <label className="text-xs uppercase tracking-wider mb-1.5 block" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>{t.aboutCraft}</label>
                <textarea
                  rows={4}
                  value={editFormData.bio || ''}
                  onChange={e => setEditFormData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl outline-none border resize-none"
                  style={{ background: 'white', borderColor: '#D4C9B5', color: '#2C2416', fontFamily: 'system-ui' }}
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-xs uppercase tracking-wider mb-3 block" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
                  {t.category || 'Categoría principal'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map(cat => {
                    const Icon = cat.icon;
                    const sel = editFormData.category === cat.id;
                    return (
                      <button key={cat.id} type="button" onClick={() => setEditFormData(prev => ({ ...prev, category: cat.id }))}
                        className="p-3 rounded-xl flex flex-col items-center gap-1.5 border-2 transition-all"
                        style={{ borderColor: sel ? cat.color : 'transparent', background: sel ? `${cat.color}22` : 'white' }}>
                        <Icon size={18} color={cat.color} />
                        <span style={{ fontSize: 11, color: '#2C2416', fontFamily: 'system-ui', fontWeight: sel ? 600 : 400, textAlign: 'center', lineHeight: 1.2 }}>
                          {t.categoriesData[cat.id]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tags / Specialties */}
              <div>
                <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
                  {lang === 'en' ? 'Specialties (up to 6)' : lang === 'pt' ? 'Especialidades (até 6)' : lang === 'fr' ? 'Spécialités (jusqu\'à 6)' : 'Especialidades (máx. 6)'}
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                  {(editFormData.tags || []).map((tag, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#EBE4D4', color: '#2C2416', borderRadius: 20, padding: '4px 10px 4px 12px', fontSize: 13, fontFamily: 'system-ui' }}>
                      {tag}
                      <button type="button" onClick={() => setEditFormData(prev => ({ ...prev, tags: prev.tags.filter((_, j) => j !== i) }))}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                        <X size={12} color="#7A6F5C" />
                      </button>
                    </span>
                  ))}
                </div>
                {(editFormData.tags || []).length < 6 && (
                  <input
                    placeholder={lang === 'en' ? 'Type and press Enter...' : 'Escribe y presiona Enter...'}
                    className="w-full px-4 py-3 rounded-xl outline-none border"
                    style={{ background: 'white', borderColor: '#D4C9B5', color: '#2C2416', fontFamily: 'system-ui' }}
                    onKeyDown={e => {
                      if ((e.key === 'Enter' || e.key === ',') && e.currentTarget.value.trim()) {
                        e.preventDefault();
                        const tag = e.currentTarget.value.trim().replace(/,$/, '');
                        if (tag) setEditFormData(prev => ({ ...prev, tags: [...(prev.tags || []), tag] }));
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                )}
              </div>

              {/* Location */}
              <div>
                <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
                  {lang === 'en' ? 'Your work area (address)' : lang === 'pt' ? 'Sua área de trabalho' : lang === 'fr' ? 'Votre zone de travail' : 'Tu zona de trabajo (dirección)'}
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    value={editFormData.address || ''}
                    onChange={e => setEditFormData(prev => ({ ...prev, address: e.target.value }))}
                    onKeyDown={async e => {
                      if (e.key === 'Enter' && editFormData.address?.trim()) {
                        e.preventDefault();
                        setProviderAddrGeocoding(true); setProviderAddrError('');
                        try {
                          const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(editFormData.address)}&format=json&limit=1`, { headers: { 'Accept-Language': 'es' } });
                          const data = await res.json();
                          if (data.length) setEditFormData(prev => ({ ...prev, latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) }));
                          else setProviderAddrError(lang === 'en' ? 'Address not found' : 'Dirección no encontrada');
                        } catch { setProviderAddrError('Error'); }
                        setProviderAddrGeocoding(false);
                      }
                    }}
                    placeholder={lang === 'en' ? 'e.g. Calle 45 #12-30, Bogotá' : 'Ej: Calle 45 #12-30, Bogotá'}
                    className="flex-1 px-4 py-3 rounded-xl outline-none border"
                    style={{ background: 'white', borderColor: '#D4C9B5', color: '#2C2416', fontFamily: 'system-ui' }}
                  />
                  <button type="button" disabled={providerAddrGeocoding || !editFormData.address?.trim()}
                    onClick={async () => {
                      if (!editFormData.address?.trim()) return;
                      setProviderAddrGeocoding(true); setProviderAddrError('');
                      try {
                        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(editFormData.address)}&format=json&limit=1`, { headers: { 'Accept-Language': 'es' } });
                        const data = await res.json();
                        if (data.length) setEditFormData(prev => ({ ...prev, latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) }));
                        else setProviderAddrError(lang === 'en' ? 'Address not found' : 'Dirección no encontrada');
                      } catch { setProviderAddrError('Error'); }
                      setProviderAddrGeocoding(false);
                    }}
                    style={{ padding: '0 16px', borderRadius: 12, border: 'none', background: '#2C2416', color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600, cursor: 'pointer', opacity: providerAddrGeocoding || !editFormData.address?.trim() ? 0.5 : 1, whiteSpace: 'nowrap' }}>
                    {providerAddrGeocoding ? '...' : 'OK'}
                  </button>
                </div>
                {editFormData.latitude && !providerAddrError && (
                  <p style={{ fontSize: 11, color: '#6B8E4E', fontFamily: 'system-ui', marginTop: 4 }}>
                    ✓ {lang === 'en' ? 'Location set' : 'Ubicación guardada'} ({(editFormData.latitude).toFixed(4)}, {(editFormData.longitude).toFixed(4)})
                  </p>
                )}
                {providerAddrError && <p style={{ fontSize: 11, color: '#D97757', fontFamily: 'system-ui', marginTop: 4 }}>{providerAddrError}</p>}
              </div>

              {/* Work photos */}
              <div>
                <label className="text-xs uppercase tracking-wider mb-3 block" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
                  {lang === 'en' ? 'Work photos' : lang === 'pt' ? 'Fotos de trabalhos' : lang === 'fr' ? 'Photos de travaux' : 'Fotos de trabajos'} ({providerPhotos.length}/6)
                </label>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {providerPhotos.map(photo => (
                    <div key={photo.id} style={{ position: 'relative', width: 90, height: 90 }}>
                      <img src={photo.url} alt="" style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 12 }} />
                      <button
                        onClick={async () => {
                          const path = photo.url.split('/provider-photos/')[1];
                          await supabase.storage.from('provider-photos').remove([path]);
                          await supabase.from('provider_photos').delete().eq('id', photo.id);
                          setProviderPhotos(prev => prev.filter(p => p.id !== photo.id));
                        }}
                        style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: '50%', background: '#D97757', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={12} color="white" />
                      </button>
                    </div>
                  ))}
                  {providerPhotos.length < 6 && (
                    <label style={{ width: 90, height: 90, borderRadius: 12, border: '2px dashed #D4C9B5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: photoUploading ? 'wait' : 'pointer', background: '#F9F7F3', flexShrink: 0 }}>
                      {photoUploading ? (
                        <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid #D4C9B5', borderTopColor: '#D97757', animation: 'spin 0.8s linear infinite' }} />
                      ) : (
                        <Camera size={22} color="#B0A898" />
                      )}
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setPhotoUploading(true);
                        const ext = file.name.split('.').pop();
                        const path = `${user.id}/${Date.now()}.${ext}`;
                        const { error: upErr } = await supabase.storage.from('provider-photos').upload(path, file);
                        if (!upErr) {
                          const { data: { publicUrl } } = supabase.storage.from('provider-photos').getPublicUrl(path);
                          const { data: row } = await supabase.from('provider_photos').insert({ provider_id: user.id, url: publicUrl }).select().single();
                          if (row) setProviderPhotos(prev => [...prev, row]);
                        }
                        setPhotoUploading(false);
                        e.target.value = '';
                      }} />
                    </label>
                  )}
                </div>
              </div>
              {/* ID Document */}
              <div>
                <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
                  {lang === 'en' ? 'ID document (private)' : 'Documento de identidad (privado)'}
                </label>
                <p className="text-xs mb-3" style={{ color: '#B0A898', fontFamily: 'system-ui' }}>
                  {lang === 'en' ? 'Required for Verified badge. Only admins can see this.' : 'Necesario para el badge Verificado. Solo admins lo ven.'}
                </p>
                {providerData?.id_photo_url ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#D1E7DD', borderRadius: 12 }}>
                    <Check size={16} color="#0A5729" />
                    <span style={{ fontSize: 13, color: '#0A5729', fontFamily: 'system-ui', fontWeight: 600, flex: 1 }}>
                      {lang === 'en' ? 'Document uploaded' : 'Documento subido'}
                    </span>
                    <label style={{ fontSize: 12, color: '#0A5729', fontFamily: 'system-ui', cursor: 'pointer', textDecoration: 'underline' }}>
                      {lang === 'en' ? 'Replace' : 'Reemplazar'}
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => {
                        const file = e.target.files?.[0]; if (!file) return;
                        setIdPhotoUploading(true);
                        const ext = file.name.split('.').pop();
                        const path = `id-${user.id}.${ext}`;
                        const { error: upErr } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
                        if (!upErr) {
                          const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path);
                          await supabase.from('providers').update({ id_photo_url: publicUrl }).eq('id', user.id);
                          setProviderData(prev => ({ ...prev, id_photo_url: publicUrl }));
                        }
                        setIdPhotoUploading(false); e.target.value = '';
                      }} />
                    </label>
                  </div>
                ) : (
                  <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px', background: 'white', borderRadius: 12, border: '2px dashed #D4C9B5', cursor: idPhotoUploading ? 'wait' : 'pointer' }}>
                    {idPhotoUploading ? (
                      <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid #D4C9B5', borderTopColor: '#D97757', animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
                    ) : (
                      <Camera size={20} color="#B0A898" />
                    )}
                    <span style={{ fontSize: 13, color: '#7A6F5C', fontFamily: 'system-ui' }}>
                      {idPhotoUploading ? (lang === 'en' ? 'Uploading...' : 'Subiendo...') : (lang === 'en' ? 'Upload ID / passport photo' : 'Subir foto de cédula o pasaporte')}
                    </span>
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => {
                      const file = e.target.files?.[0]; if (!file) return;
                      setIdPhotoUploading(true);
                      const ext = file.name.split('.').pop();
                      const path = `id-${user.id}.${ext}`;
                      const { error: upErr } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
                      if (!upErr) {
                        const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path);
                        await supabase.from('providers').update({ id_photo_url: publicUrl }).eq('id', user.id);
                        setProviderData(prev => ({ ...prev, id_photo_url: publicUrl }));
                      }
                      setIdPhotoUploading(false); e.target.value = '';
                    }} />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
      <div className="min-h-screen" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
        <LangPicker />
        <div className="max-w-md mx-auto pb-8" style={{ background: '#F4EFE6' }}>
          <div className="relative px-5 pt-12 pb-6" style={{ background: '#2C2416' }}>
            <div className="flex items-center justify-between mb-3">
              <button onClick={signOut} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(244,239,230,0.15)' }}>
                <LogOut size={20} color="#F4EFE6" />
              </button>
              <button onClick={() => setShowLangPicker(true)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(244,239,230,0.15)' }}>
                <Globe size={16} color="#F4EFE6" />
              </button>
            </div>
            <p className="text-xs uppercase tracking-widest mb-4 opacity-50" style={{ color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600, letterSpacing: '0.15em' }}>
              {t.slogan}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#D97757' }}>
                <span className="text-2xl text-white" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                  {(profile?.full_name || 'U').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest opacity-60" style={{ color: '#F4EFE6', fontFamily: 'system-ui' }}>{t.welcome}</div>
                <h2 className="text-xl" style={{ color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600 }}>
                  {profile?.full_name || providerData?.company || 'Proveedor'}
                </h2>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={12} fill="#E0A458" color="#E0A458" />
                  <span className="text-xs" style={{ color: '#F4EFE6', fontFamily: 'system-ui' }}>
                    {providerData?.rating || '—'} · {providerData?.reviews_count || 0} {t.reviews}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 -mt-4 mb-5">
            <div className="grid grid-cols-3 gap-2 p-4 rounded-2xl shadow-lg" style={{ background: 'white' }}>
              <div className="text-center">
                <div className="text-2xl" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>
                  {quoteRequests.length}
                </div>
                <div className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{t.new}</div>
              </div>
              <div className="text-center border-x" style={{ borderColor: '#EBE4D4' }}>
                <div className="text-2xl" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>
                  {myRealJobs.filter(j => j.status === 'accepted' || j.status === 'in_progress').length}
                </div>
                <div className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{t.inProgress}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl" style={{ color: '#6B8E4E', fontFamily: 'system-ui', fontWeight: 600 }}>
                  {myRealJobs.filter(j => j.status === 'completed' && new Date(j.updated_at || j.created_at).getMonth() === new Date().getMonth() && new Date(j.updated_at || j.created_at).getFullYear() === new Date().getFullYear()).length}
                </div>
                <div className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{t.thisMonth}</div>
              </div>
            </div>
          </div>

          {/* Verification progress card — hide when already verified */}
          {!providerData?.verified && (
            <div className="px-5 mb-5">
              <div className="p-4 rounded-2xl" style={{ background: 'white', border: '2px solid #E0A458' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={16} color="#E0A458" />
                  <span style={{ fontSize: 13, fontFamily: 'system-ui', fontWeight: 700, color: '#2C2416' }}>
                    {lang === 'en' ? 'Get Verified badge' : 'Consigue el badge Verificado'}
                  </span>
                </div>
                {[
                  { label: lang === 'en' ? 'Profile photo' : 'Foto de perfil', done: !!(profile?.avatar_url), action: () => setProviderView('edit') },
                  { label: lang === 'en' ? 'Phone number' : 'Número de teléfono', done: !!(providerData?.phone), action: () => setProviderView('edit') },
                  { label: lang === 'en' ? 'ID document' : 'Documento de identidad', done: !!(providerData?.id_photo_url), action: () => setProviderView('edit') },
                ].map((step, i) => (
                  <div key={i} onClick={!step.done ? step.action : undefined}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i > 0 ? '1px solid #F0EBE1' : 'none', cursor: step.done ? 'default' : 'pointer' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: step.done ? '#D1E7DD' : '#EBE4D4' }}>
                      {step.done ? <Check size={13} color="#0A5729" /> : <span style={{ fontSize: 11, color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 700 }}>{i + 1}</span>}
                    </div>
                    <span style={{ flex: 1, fontSize: 13, fontFamily: 'system-ui', color: step.done ? '#7A6F5C' : '#2C2416', fontWeight: step.done ? 400 : 600, textDecoration: step.done ? 'line-through' : 'none' }}>
                      {step.label}
                    </span>
                    {!step.done && <ChevronRight size={14} color="#B0A898" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="px-5 mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs uppercase tracking-widest" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>{t.newRequests}</h3>
              {quoteRequests.length > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#D97757', color: 'white', fontFamily: 'system-ui', fontWeight: 600 }}>
                  {quoteRequests.length} {t.newCount}
                </span>
              )}
            </div>
            {quoteRequests.length === 0 ? (
              <div className="p-5 rounded-2xl text-center" style={{ background: 'white' }}>
                <p className="text-sm" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                  {lang === 'en' ? 'No requests yet' : lang === 'pt' ? 'Sem solicitações ainda' : lang === 'fr' ? 'Aucune demande' : 'Sin solicitudes aún'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {quoteRequests.map(req => {
                  const diff = Date.now() - new Date(req.createdAt).getTime();
                  const mins = Math.floor(diff / 60000);
                  const timeLabel = mins < 60
                    ? `hace ${mins}m`
                    : mins < 1440 ? `hace ${Math.floor(mins / 60)}h`
                    : `hace ${Math.floor(mins / 1440)}d`;
                  const lines = req.content.split('\n');
                  const description = lines[0];
                  const dateLine = lines.find(l => l.startsWith('📅'));
                  return (
                    <div key={req.id} className="p-4 rounded-2xl" style={{ background: 'white', borderLeft: '3px solid #D97757' }}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-base" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>{req.clientName}</h4>
                        <span className="text-xs ml-2 flex-shrink-0" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{timeLabel}</span>
                      </div>
                      <p className="text-sm mb-1" style={{ color: '#2C2416', fontFamily: 'system-ui' }}>"{description}"</p>
                      {dateLine && (
                        <p className="text-xs mb-3" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>{dateLine}</p>
                      )}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => { setActiveChatConversationId(req.conversationId); setActiveChatOtherName(req.clientName); setProviderView('chat'); }}
                          className="flex-1 py-2.5 rounded-xl text-sm"
                          style={{ background: '#EBE4D4', color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}
                        >
                          {t.respond}
                        </button>
                        <button
                          onClick={async () => { await acceptQuote(req); loadJobs(); }}
                          className="flex-1 py-2.5 rounded-xl text-sm"
                          style={{ background: '#6B8E4E', color: 'white', fontFamily: 'system-ui', fontWeight: 600 }}
                        >
                          {lang === 'en' ? '✓ Accept' : lang === 'pt' ? '✓ Aceitar' : lang === 'fr' ? '✓ Accepter' : '✓ Aceptar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="px-5 mb-5">
            <h3 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>{t.manageBusiness}</h3>
            <div className="space-y-2">
              <button onClick={() => setProviderView('inbox')} className="w-full p-4 rounded-2xl flex items-center justify-between" style={{ background: 'white' }}>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FAE4DC' }}>
                    <MessageCircle size={18} color="#D97757" />
                    {unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#D97757' }}>
                        <span style={{ color: 'white', fontSize: 10, fontFamily: 'system-ui', fontWeight: 700 }}>{unreadCount > 9 ? '9+' : unreadCount}</span>
                      </div>
                    )}
                  </div>
                  <span style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>
                    {lang === 'en' ? 'Messages' : lang === 'pt' ? 'Mensagens' : lang === 'fr' ? 'Messagerie' : 'Mensajes'}
                  </span>
                </div>
                <ChevronRight size={20} color="#7A6F5C" />
              </button>
              <button
                onClick={() => {
                  const url = `${window.location.origin}?provider=${user.id}`;
                  const name = providerData?.company || profile?.full_name || 'Krafio';
                  const text = `${lang === 'en' ? 'Hire me on Krafio' : 'Contráctame en Krafio'} — ${name}`;
                  if (navigator.share) {
                    navigator.share({ title: name, text, url }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(url).then(() => {
                      setShareToast(true);
                      setTimeout(() => setShareToast(false), 2500);
                    });
                  }
                }}
                className="w-full p-4 rounded-2xl flex items-center justify-between"
                style={{ background: 'linear-gradient(135deg, #D97757 0%, #C4643F 100%)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    <Share2 size={18} color="white" />
                  </div>
                  <span style={{ color: 'white', fontFamily: 'system-ui', fontWeight: 600 }}>
                    {lang === 'en' ? 'Share my profile' : lang === 'pt' ? 'Compartilhar perfil' : lang === 'fr' ? 'Partager mon profil' : 'Compartir mi perfil'}
                  </span>
                </div>
                <ChevronRight size={20} color="rgba(255,255,255,0.7)" />
              </button>
              <button onClick={() => setProviderView('jobs')} className="w-full p-4 rounded-2xl flex items-center justify-between" style={{ background: 'white' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FFF4E0' }}>
                    <Briefcase size={18} color="#8B6914" />
                  </div>
                  <span style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>{t.myJobs}</span>
                </div>
                <ChevronRight size={20} color="#7A6F5C" />
              </button>
              <button onClick={() => { setEditFormData({ full_name: profile?.full_name || '', company: providerData?.company || '', phone: providerData?.phone || '', years_experience: String(providerData?.years_experience || ''), reference_price: providerData?.reference_price || '', bio: providerData?.bio || '', category: providerData?.category || '', tags: providerData?.tags || [], address: providerData?.address || '', latitude: providerData?.latitude || null, longitude: providerData?.longitude || null }); setProviderAddrError(''); setProviderView('edit'); }} className="w-full p-4 rounded-2xl flex items-center justify-between" style={{ background: 'white' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#E8F0E0' }}>
                    <Edit3 size={18} color="#3F5A2A" />
                  </div>
                  <span style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>{t.editProfile}</span>
                </div>
                <ChevronRight size={20} color="#7A6F5C" />
              </button>
              <button onClick={() => setProviderView('availability')} className="w-full p-4 rounded-2xl flex items-center justify-between" style={{ background: 'white' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#E8F0E0' }}>
                    <Calendar size={18} color="#3F5A2A" />
                  </div>
                  <span style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>
                    {lang === 'en' ? 'My availability' : lang === 'pt' ? 'Disponibilidade' : lang === 'fr' ? 'Disponibilités' : 'Mi disponibilidad'}
                  </span>
                </div>
                <ChevronRight size={20} color="#7A6F5C" />
              </button>
              <button onClick={() => { setEditFormData({ full_name: profile?.full_name || '', company: providerData?.company || '', phone: providerData?.phone || '', years_experience: String(providerData?.years_experience || ''), reference_price: providerData?.reference_price || '', bio: providerData?.bio || '', category: providerData?.category || '', tags: providerData?.tags || [], address: providerData?.address || '', latitude: providerData?.latitude || null, longitude: providerData?.longitude || null }); setProviderAddrError(''); setProviderView('edit'); }} className="w-full p-4 rounded-2xl flex items-center justify-between" style={{ background: 'white' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#F0E8D8' }}>
                    <Camera size={18} color="#8B6F47" />
                  </div>
                  <span style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>
                    {lang === 'en' ? 'Work photos' : lang === 'pt' ? 'Fotos de trabalhos' : lang === 'fr' ? 'Photos de travaux' : 'Fotos de trabajos'}
                  </span>
                </div>
                <ChevronRight size={20} color="#7A6F5C" />
              </button>
              <button onClick={() => setProviderView('myreviews')} className="w-full p-4 rounded-2xl flex items-center justify-between" style={{ background: 'white' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FAE4DC' }}>
                    <Award size={18} color="#D97757" />
                  </div>
                  <div>
                    <span style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}>{t.myReviews}</span>
                    {providerData?.reviews_count > 0 && (
                      <span style={{ marginLeft: 8, fontSize: 12, color: '#D97757', fontFamily: 'system-ui', fontWeight: 600 }}>
                        ★ {providerData.rating?.toFixed(1)} ({providerData.reviews_count})
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight size={20} color="#7A6F5C" />
              </button>
              {pushPermission !== 'granted' && (
                <button
                  onClick={() => subscribeToPush(user.id)}
                  className="w-full p-4 rounded-2xl flex items-center justify-between"
                  style={{ background: '#2C2416' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(244,239,230,0.15)' }}>
                      <Bell size={18} color="#F4EFE6" />
                    </div>
                    <span style={{ color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 500 }}>
                      {lang === 'en' ? 'Enable notifications' : lang === 'pt' ? 'Ativar notificações' : lang === 'fr' ? 'Activer les notifications' : 'Activar notificaciones'}
                    </span>
                  </div>
                  <ChevronRight size={20} color="rgba(244,239,230,0.5)" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {shareToast && (
        <div style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: '#2C2416', color: '#F4EFE6', padding: '10px 20px', borderRadius: 20, fontSize: 13, fontFamily: 'system-ui', fontWeight: 600, zIndex: 9999, whiteSpace: 'nowrap' }}>
          {lang === 'en' ? 'Link copied!' : '¡Link copiado!'}
        </div>
      )}
      </>
    );
  }

  return null;
}
