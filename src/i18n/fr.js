// Textes du site en français (langue principale).
// Les trois fichiers fr.js / en.js / ar.js doivent garder exactement la même
// structure. Les données non traduisibles (téléphone, horaires, URLs…) sont
// dans src/data/site.js.
export default {
  meta: {
    code: "fr",
    htmlLang: "fr-MA",
    dir: "ltr",
    ogLocale: "fr_MA",
    path: "/",
    label: "FR",
    name: "Français",
  },

  seo: {
    title: "Dr Mahjouba Boudkour – Médecin Généraliste à Rabat | Cabinet Jouba",
    description:
      "Cabinet du Dr Mahjouba Boudkour, médecin généraliste à Rabat (Avenue Essalam). Consultations, maladies chroniques, bilans de santé. RDV par téléphone ou WhatsApp.",
    ogAlt: "Cabinet Jouba – Dr Mahjouba Boudkour, Médecin Généraliste à Rabat",
  },

  doctor: "Dr Mahjouba Boudkour",

  brand: {
    logoAlt: "Logo du Cabinet Jouba de Médecine générale",
  },

  clinic: {
    specialty: "Médecin Généraliste",
    tagline: "Une médecine générale attentive, humaine et à votre écoute.",
    address: "13 Avenue Essalam (C.Y.M.), 1er étage, Rabat, Maroc",
    streetAddress: "13 Avenue Essalam (C.Y.M.), 1er étage",
    city: "Rabat",
    whatsappMessage: "Bonjour Docteur, je souhaite prendre rendez-vous.",
  },

  nav: {
    home: "Accueil",
    services: "Services",
    about: "À propos",
    reviews: "Avis",
    location: "Localisation",
    contact: "Contact",
  },

  navbar: {
    cta: "Prendre RDV",
    ctaLong: "Prendre RDV sur WhatsApp",
    whatsappAria: "Contacter le cabinet sur WhatsApp",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    language: "Langue",
  },

  hero: {
    badge: "Médecin Généraliste · Rabat",
    subtitle: "Médecin généraliste à Rabat",
    ctaBook: "Prendre rendez-vous",
    ctaCall: "Appeler le cabinet",
    statSatisfied: "Patients satisfaits",
    statRating: "Note Google",
    statSince: "À Rabat depuis",
  },

  services: {
    eyebrow: "Nos services",
    title: "Des soins complets, pour toute la famille",
    subtitle:
      "Une prise en charge médicale générale, humaine et adaptée à chaque étape de votre vie.",
    items: {
      consultation: {
        title: "Consultation générale",
        desc: "Diagnostic, suivi et conseils médicaux adaptés à chaque patient.",
      },
      chronic: {
        title: "Suivi des maladies chroniques",
        desc: "Diabète, hypertension, cholestérol : un accompagnement régulier et personnalisé.",
      },
      checkup: {
        title: "Bilans de santé & check-up",
        desc: "Examens préventifs pour détecter tôt et agir efficacement.",
      },
      certificates: {
        title: "Certificats médicaux",
        desc: "Délivrance de certificats pour le sport, le travail ou l'administration.",
      },
      vaccination: {
        title: "Vaccination",
        desc: "Mise à jour du calendrier vaccinal pour toute la famille.",
      },
      prevention: {
        title: "Conseils & prévention",
        desc: "Nutrition, hygiène de vie et prévention adaptées à votre profil.",
      },
    },
  },

  about: {
    eyebrow: "À propos",
    badgeSince: (year) => `Depuis ${year}`,
    badgeText: "au service des patients de Rabat",
    body:
      "Médecin généraliste installée à Rabat, le Dr Mahjouba Boudkour est reconnue pour son approche attentionnée et holistique envers ses patients. Elle accorde une attention particulière au bien-être global de chacun, en combinant écoute, rigueur médicale et pédagogie dans ses explications.",
    points: [
      {
        icon: "sparkles",
        title: "Approche holistique",
        desc: "Une écoute attentive qui prend en compte votre bien-être global, pas seulement les symptômes.",
      },
      {
        icon: "globe",
        title: "Français & Arabe",
        desc: "Des consultations menées dans la langue avec laquelle vous êtes le plus à l'aise.",
      },
      {
        icon: "academic",
        title: "Expertise reconnue",
        desc: "Une pratique rigoureuse de la médecine générale au service des patients de Rabat.",
      },
    ],
  },

  reviews: {
    eyebrow: "Avis des patients",
    title: "Ce que disent nos patients",
    subtitle: "Des avis authentiques laissés par nos patients sur Google.",
    satisfied: "de patients satisfaits",
    basedOn: "Basé sur",
    count: (n) => `+${n} avis Google`,
    verifiedFor: (name) => `vérifiés pour ${name}.`,
    viewAll: "Voir tous les avis sur Google",
    carouselLabel: "Avis des patients",
    prev: "Avis précédents",
    next: "Avis suivants",
    goTo: (n) => `Aller à l'avis ${n}`,
    starsLabel: (r) => `Note : ${r} sur 5 étoiles`,
    quote: (text) => `« ${text} »`,
    items: {
      r1: {
        author: "Patient vérifié",
        context: "Consultation",
        text: "La Dre Mahjouba est incroyable ! Elle prend le temps d'écouter vos problèmes et propose un excellent traitement. Elle est très aimable, bienveillante et d'une grande rigueur dans ses soins. En tant qu'étranger venu chercher des soins médicaux, j'ai été très rassuré par son expertise et par la qualité de la prise en charge. Merci Dre Mahjouba pour ces soins de très grande qualité !",
      },
      r2: {
        author: "Patient",
        context: "Consultation de suivi",
        text: "C'est une personne très gentille et adorable. Après m'avoir prescrit mes médicaments, elle prend toujours de mes nouvelles, n'hésite pas à aider et à vérifier de nouveau s'il y a le moindre doute, afin de s'assurer qu'elle a fait du bon travail et que vous retrouvez la santé. Je recommande à tout le monde de la consulter : elle est très talentueuse et bienveillante.",
      },
      r3: {
        author: "Patient",
        context: "Consultation de routine",
        text: "Médecin très compétente, à l'écoute et bienveillante. Elle prend le temps de bien expliquer le diagnostic et le traitement. Je la recommande vivement.",
      },
      r4: {
        author: "Patient",
        context: "Suivi médical régulier",
        text: "Excellent accueil, docteur très humaine et professionnelle. Un suivi personnalisé et une vraie écoute des symptômes.",
      },
      r5: {
        author: "Patient",
        context: "Première visite",
        text: "Cabinet propre et accueillant. Dr Boudkour est d'une grande douceur et prend tout le temps nécessaire pour examiner et conseiller ses patients.",
      },
      r6: {
        author: "Patient",
        context: "Prise en charge générale",
        text: "Très bonne expérience avec le Dr Mahjouba. Diagnostic précis, disponibilité et grand professionnalisme.",
      },
    },
  },

  location: {
    eyebrow: "Nous trouver",
    title: "Localisation du cabinet",
    subtitle: "Le cabinet est situé en plein cœur de Rabat, facilement accessible.",
    directions: "Itinéraire sur Google Maps",
    mapTitle: (name) => `Localisation de ${name} sur Google Maps`,
  },

  hours: {
    eyebrow: "Horaires & contact",
    title: "Prenez rendez-vous facilement",
    subtitle:
      "Contactez-nous par téléphone ou WhatsApp, ou consultez nos horaires d'ouverture.",
    cardTitle: "Horaires d'ouverture",
    days: {
      weekdays: "Lundi – Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
    },
    closed: "Fermé",
    note: "* Horaires à titre indicatif — merci de confirmer par téléphone.",
    contactTitle: "Contactez-nous",
    whatsapp: "WhatsApp",
    call: "Appeler",
  },

  footer: {
    blurb: "Dr Mahjouba Boudkour — Médecin Généraliste, à votre écoute à Rabat.",
    navigation: "Navigation",
    contact: "Contact",
    follow: "Suivez-nous",
    instagramAria: "Instagram du cabinet",
    facebookAria: "Facebook du cabinet",
    whatsappAria: "WhatsApp du cabinet",
    rights: "Tous droits réservés.",
  },

  whatsapp: {
    tooltip: "Discuter sur WhatsApp",
    aria: "Démarrer une conversation WhatsApp avec le cabinet",
  },
};
