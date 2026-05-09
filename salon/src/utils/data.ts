import type {
  Service,
  GalleryItem,
  Testimonial,
  TeamMember,
  Stat,
  Value,
  NavLink,
  ContactInfo,
} from '../types';

import image1 from '../assets/image1.jpg'
import image2 from '../assets/bride2.jpeg'
import image3 from '../assets/bride.jpg'
import image4 from '../assets/image1.jpg'
import image5 from '../assets/bride2.jpeg'
import image6 from '../assets/bride.jpg'
import image7 from '../assets/image1.jpg'
import image8 from '../assets/bride2.jpeg'
import image9 from '../assets/bride.jpg'

// ─── Navigation ────────────────────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

// ─── Stats ─────────────────────────────────────────────────────────────────────
export const STATS: Stat[] = [
  { id: 'clients', target: 2000, suffix: '+', label: 'Happy Clients' },
  { id: 'services', target: 75, suffix: '+', label: 'Services Offered' },
  { id: 'artists', target: 6, suffix: '+', label: 'Expert Artists' },
  { id: 'years', target: 14, suffix: '+', label: 'Years of Glam' },
];

// ─── Services ──────────────────────────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    id: 'haircut',
    category: 'hair',
    name: 'Haircut & Style',
    description: 'Precision cuts and expert styling for every hair type.',
    price: '₹499',
    priceValue: 499,
    icon: '✂️',
    gradient: 'linear-gradient(135deg,#FDEEF5,#F9D5E5)',
  },
  {
    id: 'balayage',
    category: 'hair',
    name: 'Balayage Color',
    description: 'Natural sun-kissed highlights with signature balayage.',
    price: '₹2499',
    priceValue: 2499,
    icon: '🎨',
    gradient: 'linear-gradient(135deg,#FFF5EB,#FFD5B8)',
  },
  {
    id: 'keratin',
    category: 'hair',
    name: 'Keratin Treatment',
    description: 'Smooth, frizz-free hair for up to 6 months.',
    price: '₹3999',
    priceValue: 3999,
    icon: '✨',
    gradient: 'linear-gradient(135deg,#EEFFF5,#D5F9E8)',
  },
  {
    id: 'hair-spa',
    category: 'hair',
    name: 'Hair Spa',
    description: 'Deep conditioning treatment to repair and revitalize.',
    price: '₹999',
    priceValue: 999,
    icon: '💆‍♀️',
    gradient: 'linear-gradient(135deg,#F5EEFF,#EDD5F9)',
  },
  {
    id: 'glow-facial',
    category: 'skin',
    name: 'Glow Facial',
    description: 'Vitamin C and hyaluronic acid for instant radiance.',
    price: '₹999',
    priceValue: 999,
    icon: '✨',
    gradient: 'linear-gradient(135deg,#F5EEFF,#EDD5F9)',
  },
  {
    id: 'deep-cleanse',
    category: 'skin',
    name: 'Deep Cleanse',
    description: 'Thorough cleansing facial to unclog pores and clear blemishes.',
    price: '₹799',
    priceValue: 799,
    icon: '🌿',
    gradient: 'linear-gradient(135deg,#EEFFF5,#D5F9E8)',
  },
  {
    id: 'anti-aging',
    category: 'skin',
    name: 'Anti-Aging Facial',
    description: 'Collagen-boosting treatment to reduce fine lines.',
    price: '₹1499',
    priceValue: 1499,
    icon: '🌹',
    gradient: 'linear-gradient(135deg,#FDEEF5,#F9D5E5)',
  },
  {
    id: 'gel-mani',
    category: 'nails',
    name: 'Gel Manicure',
    description: 'Long-lasting gel polish with premium finishes.',
    price: '₹499',
    priceValue: 499,
    icon: '💅',
    gradient: 'linear-gradient(135deg,#FFF5EB,#FFE0C4)',
  },
  {
    id: 'nail-art',
    category: 'nails',
    name: 'Nail Art',
    description: 'Custom designs from minimalist to elaborate.',
    price: '₹699',
    priceValue: 699,
    icon: '🎨',
    gradient: 'linear-gradient(135deg,#F5EEFF,#EDD5F9)',
  },
  {
    id: 'pedicure',
    category: 'nails',
    name: 'Pedicure Luxe',
    description: 'Relaxing pedicure with exfoliation and massage.',
    price: '₹699',
    priceValue: 699,
    icon: '🦶',
    gradient: 'linear-gradient(135deg,#EEFFF5,#D5F9E8)',
  },
  {
    id: 'party-makeup',
    category: 'makeup',
    name: 'Party Makeup',
    description: 'Stunning glam looks for every celebration.',
    price: '₹1499',
    priceValue: 1499,
    icon: '💄',
    gradient: 'linear-gradient(135deg,#FDEEF5,#F9D5E5)',
  },
  {
    id: 'bridal-makeup',
    category: 'makeup',
    name: 'Bridal Makeup',
    description: 'Complete bridal transformation with trials.',
    price: '₹4999',
    priceValue: 4999,
    icon: '👰',
    gradient: 'linear-gradient(135deg,#FFF5EB,#FFD5B8)',
  },
];

// ─── Gallery ───────────────────────────────────────────────────────────────────
export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', category: 'hair', image: image1, gradient: 'linear-gradient(160deg,#F9D5E5,#EDD5F9)', label: 'Balayage', tall: true },
  { id: 'g2', category: 'makeup', image: image2, gradient: 'linear-gradient(160deg,#FFE0C4,#F9D5E5)', label: 'Bridal Glow' },
  { id: 'g3', category: 'nails', image: image3, gradient: 'linear-gradient(160deg,#EDD5F9,#D5E8FF)', label: 'Nail Art' },
  { id: 'g4', category: 'hair', image: image4, gradient: 'linear-gradient(160deg,#D5F9E8,#D5E8FF)', label: 'Hair Color' },
  { id: 'g5', category: 'makeup', image: image5, gradient: 'linear-gradient(160deg,#FFD5E8,#FFD5B8)', label: 'Party Look', tall: true },
  { id: 'g6', category: 'nails', image: image6, gradient: 'linear-gradient(160deg,#B8D5FF,#D5B8FF)', label: 'Gel Art' },
  { id: 'g7', category: 'hair', image: image7, gradient: 'linear-gradient(160deg,#FFE8D5,#FFD5E8)', label: 'Keratin' },
  { id: 'g8', category: 'makeup', image: image8, gradient: 'linear-gradient(160deg,#D5FFE8,#D5E8FF)', label: 'Evening Glam' },
  { id: 'g9', category: 'nails', image: image9, gradient: 'linear-gradient(160deg,#E8D5FF,#FFD5E8)', label: 'Chrome Nails' },
];

// ─── Testimonials ──────────────────────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    text: 'Nice and satisied service with calm and sweet staff.. fully satisfied with the service.. hope to come again and again..',
    authorName: 'Zeenat Ghazee',
    authorRole: 'Regular Client',
    avatar: '👩',
    rating: 5,
  },
  {
    id: 't2',
    text: 'My bridal makeup was absolutely stunning. Everyone at my wedding couldn\'t stop complimenting my look. Thank you Lumina!',
    authorName: 'Anjali Mehta',
    authorRole: 'Bride',
    avatar: '👰',
    rating: 5,
  },
  {
    id: 't3',
    text: 'The nail art here is just breathtaking! Kavya is an absolute artist. My nails always look like little masterpieces.',
    authorName: 'Neha Gupta',
    authorRole: 'Nail Enthusiast',
    avatar: '💁‍♀️',
    rating: 5,
  },
  {
    id: 't4',
    text: 'She is expert in hair colour and skin. I always come from Nagpur and use her special services which she provided to her client i just love it.',
    authorName: 'Avish Kumar',
    authorRole: 'Skincare Lover',
    avatar: '🌸',
    rating: 5,
  },
];

// ─── Team ──────────────────────────────────────────────────────────────────────
export const TEAM_MEMBERS: TeamMember[] = [
  { id: 'tm1', name: 'Aishwarya Rao', role: 'Founder & Creative Director', avatar: '👩‍🎨', bio: '15+ years crafting beauty experiences across India\'s top salons.' },
  { id: 'tm2', name: 'Meera Pillai', role: 'Master Hair Stylist', avatar: '💇‍♀️', bio: 'Certified in advanced coloring techniques and keratin treatments.' },
];

// ─── Values ────────────────────────────────────────────────────────────────────
export const VALUES: Value[] = [
  { id: 'v1', icon: '🌸', title: 'Premium Quality', description: 'We use only the finest, cruelty-free products from globally trusted brands.' },
  { id: 'v2', icon: '💎', title: 'Expert Artistry', description: 'Our team undergoes continuous training to bring you the latest techniques.' },
  { id: 'v3', icon: '🤍', title: 'Personal Touch', description: 'Every client receives personalized attention and a customized beauty plan.' },
];

// ─── Contact Info ──────────────────────────────────────────────────────────────
export const CONTACT_INFO: ContactInfo[] = [
  { icon: '📍', label: 'Our Location', value: 'Kavita Complex, Kamla College Road\nRajnandgaon, CG 491441' },
  { icon: '📞', label: 'Call Us', value: '+91 98765 43210' },
  { icon: '✉️', label: 'Email Us', value: 'rashmibuatysalon@gmail.com' },
  { icon: '🕐', label: 'Working Hours', value: 'Mon–Sat: 9:00 AM – 8:00 PM\nSunday: 10:00 AM – 6:00 PM' },
];

// ─── Booking Services (for booking form) ──────────────────────────────────────
export const BOOKING_SERVICES = [
  { icon: '💇‍♀️', name: 'Hair Styling', price: '₹499' },
  { icon: '✨', name: 'Skin Facial', price: '₹799' },
  { icon: '💅', name: 'Nail Art', price: '₹399' },
  { icon: '💄', name: 'Bridal Makeup', price: '₹2499' },
  { icon: '🎨', name: 'Hair Color', price: '₹999' },
  { icon: '🦶', name: 'Pedicure', price: '₹499' },
];

// ─── Salon WhatsApp ────────────────────────────────────────────────────────────
export const SALON_WHATSAPP = '917024409426';
