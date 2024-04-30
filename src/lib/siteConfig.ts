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
  { info: "+97 2539 661 201", href: "tel:#00972539661201", icon: "Phone" },
  { info: "info@fireprooftech.co.il", href: "mailto:#info@fireprooftech.co.il", icon: "Mail" }
]

