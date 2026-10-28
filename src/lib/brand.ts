export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: 'facebook' | 'instagram' | 'twitter' | 'amazon';
}

export interface BrandConfig {
  name: string;
  headlineLight: string;
  headlineBold: string;
  tagline: string;
  navLinks: string[];
  navItems: NavLink[];
  socialLinks: SocialLink[];
}

export const brand: BrandConfig = {
  name: 'STRIDE',
  headlineLight: 'Born',
  headlineBold: 'TO RUN',
  tagline:
    'Step into a world where performance meets style. Discover the latest STRIDE shoes designed for speed, comfort, and everyday confidence.',
  navLinks: ['About Us', 'Share', 'Contact'],
  navItems: [
    { label: 'About Us', href: '#technology' },
    { label: 'Share', href: '#share' },
    { label: 'Contact', href: '#contact' },
  ],
  socialLinks: [
    { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { name: 'Twitter / X', href: 'https://x.com', icon: 'twitter' },
    { name: 'Amazon', href: 'https://amazon.com', icon: 'amazon' },
  ],
};

export default brand;
