import * as m from '$pg/messages';

const siteMap = {
  home: '/',
  aboutUs: '/about-us',
  contactUs: '/contact-us'
};

export const mainNav = [
  { slug: '/', title: m.home() },
  { slug: siteMap.aboutUs, title: m.about_us() },
  { slug: siteMap.contactUs, title: m.contact_us() },
];

export const socials = [
  { name: 'Instagram', href: '#' },
  { name: 'LinkedIn', href: '#' }
];

export const contactInfo = [
  { info: "123456789", href: "tel:#", icon: "Phone" },
  { info: "email@email.com", href: "mailto:#", icon: "Mail" }
]

