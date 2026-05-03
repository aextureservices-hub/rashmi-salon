// ─── Service Types ────────────────────────────────────────────────────────────
export type ServiceCategory = 'hair' | 'skin' | 'nails' | 'makeup';

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  icon: string;
  gradient: string;
}

// ─── Gallery Types ─────────────────────────────────────────────────────────────
export type GalleryCategory = 'hair' | 'makeup' | 'nails';

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  icon: string;
  gradient: string;
  label: string;
  tall?: boolean;
}

// ─── Testimonial Types ─────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  text: string;
  authorName: string;
  authorRole: string;
  avatar: string;
  rating: number;
}

// ─── Team Types ────────────────────────────────────────────────────────────────
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

// ─── Booking Types ─────────────────────────────────────────────────────────────
export type BookingStep = 1 | 2 | 3 | 4 | 5;

export interface BookingState {
  service: string;
  servicePrice: string;
  date: string;
  dateLabel: string;
  time: string;
}

export interface BookingDetails extends BookingState {
  name: string;
  phone: string;
  notes: string;
}

// ─── Stat Types ────────────────────────────────────────────────────────────────
export interface Stat {
  id: string;
  target: number;
  suffix: string;
  label: string;
}

// ─── Value Types ───────────────────────────────────────────────────────────────
export interface Value {
  id: string;
  icon: string;
  title: string;
  description: string;
}

// ─── Navigation Types ──────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  path: string;
}

// ─── Contact Types ─────────────────────────────────────────────────────────────
export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
