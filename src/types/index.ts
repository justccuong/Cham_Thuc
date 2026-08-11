export interface CraftItem {
  id: string;
  name: string;
  village: string;
  subtitle: string;
  description: string;
  icon: string;
  image: string;
  gallery?: string[];  // multiple product images
  price: number;       // price in VND
  materials: string[];
  secretItem: string;
  tag: string;
  ctaLabel: string;
}

export interface ValueItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}
