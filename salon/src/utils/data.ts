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

import pro3 from '../assets/p3.jpg';

import pro5 from '../assets/p5.jpg';
import pro6 from '../assets/p6.jpg';
import pro7 from '../assets/p7.jpg';
import pro8 from '../assets/p8.jpg';
import pro9 from '../assets/p9.jpg';
import pro10 from '../assets/p10.jpg';
import pro11 from '../assets/p11.jpg';
import pro12 from '../assets/p12.jpg';
import pro13 from '../assets/p13.jpg';

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
    name: 'Haircut',
    description: 'Precision cuts and expert styling for every hair type.',
    price: '₹499',
    priceValue: 499,
    icon: '✂️',
    image: pro3,
    gradient: 'linear-gradient(135deg,#FDEEF5,#F9D5E5)',
  },
  {
    id: 'makeup',
    category: 'makeup',
    name: 'Party Makeup',
    description: 'Professional makeup application for any occasion.',
    price: '₹2000',
    priceValue: 2000,
    icon: '🎨',
    image: pro6,
    gradient: 'linear-gradient(135deg,#FFF5EB,#FFD5B8)',
  },
  {
    id: 'bridal',
    category: 'makeup',
    name: 'Bridal',
    description: 'Complete bridal transformation with trials.',
    price: '₹4999-25000',
    priceValue: 5000,
    icon: '👰',
    image: pro5,
    gradient: 'linear-gradient(135deg,#FFF5EB,#FFD5B8)',
  },
  {
    id: 'hair-spa',
    category: 'hair',
    name: 'Hair Spa',
    description: 'Deep conditioning treatment to repair and revitalize.',
    price: '₹800',
    priceValue: 800,
    icon: '💆‍♀️',
    image: pro7,
    gradient: 'linear-gradient(135deg,#F5EEFF,#EDD5F9)',
  },
  {
    id: 'gold-facial',
    category: 'skin',
    name: 'Gold Facial',
    description: 'Vitamin C and hyaluronic acid for instant radiance.',
    price: '₹3000',
    priceValue: 3000,
    icon: '✨',
    image: pro8,
    gradient: 'linear-gradient(135deg,#F5EEFF,#EDD5F9)',
  },
  {
    id: 'body-wax',
    category: 'skin',
    name: 'Body Wax',
    description: 'Smooth and silky skin with our professional body waxing service.',
    price: '₹1500',
    priceValue: 1500,
    icon: '🌿',
    image: pro9,
    gradient: 'linear-gradient(135deg,#EEFFF5,#D5F9E8)',
  },
  {
    id: 'face-tan',
    category: 'skin',
    name: 'Face-D Tan',
    description: 'Collagen-boosting treatment to reduce fine lines.',
    price: '₹250',
    priceValue: 250,
    icon: '🌹',
    image: pro10,
    gradient: 'linear-gradient(135deg,#FDEEF5,#F9D5E5)',
  },
  {
    id: 'body-bleach',
    category: 'skin',
    name: 'Body Bleach',
    description: 'Gentle bleaching treatment for a more even skin tone.',
    price: '₹3000',
    priceValue: 3000,
    icon: '🌹',
    image: pro11,
    gradient: 'linear-gradient(135deg,#FDEEF5,#F9D5E5)',
  },
  {
    id: 'hd-makeup',
    category: 'makeup',
    name: 'HD Makeup',
    description: 'Stunning glam looks for every celebration.',
    price: '₹12000',
    priceValue: 12000,
    icon: '💄',
    image: pro12,
    gradient: 'linear-gradient(135deg,#FDEEF5,#F9D5E5)',
  },
  {
    id: 'bridal-mac',
    category: 'makeup',
    name: 'Bridal MAC',
    description: 'Complete bridal transformation with trials.',
    price: '₹10000',
    priceValue: 10000,
    icon: '👰',
    image: pro13,
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
  { icon: '💇‍♀️', name: 'Hair Cut',   price: '₹499',  image: pro3 },
  { icon: '✨',    name: 'Gold Facial',    price: '₹3000',  image: pro8 },
  { icon: '💄',    name: 'Bridal Makeup',  price: '₹4999-25000', image: pro5 },
];

// ─── Salon WhatsApp ────────────────────────────────────────────────────────────
export const SALON_WHATSAPP = '917024409426';

export const servicesData = [
    {
      category: 'Threading Services',
      services: [
        { name: 'Eyebrows + Upper Lip', price: '₹70' },
        { name: 'Eyebrows',             price: '₹60' },
        { name: 'Upper Lip',            price: '₹20' },
        { name: 'Face Threading',       price: '₹250' },
        { name: 'Chin',                 price: '₹50' },
        { name: 'Side Lock Threading',  price: '₹50' },
      ],
    },
    {
      category: 'Waxing (Honey)',
      services: [
        { name: 'Underarms',     price: '₹50' },
        { name: 'Arms Wax',      price: '₹200' },
        { name: 'Half Leg Wax',  price: '₹200' },
        { name: 'Full Leg Wax',  price: '₹400' },
        { name: 'Front Wax',     price: '₹300' },
        { name: 'Back Wax',      price: '₹300' },
        { name: 'Full Body Wax', price: '₹1,500' },
      ],
    },
    {
      category: 'Waxing (Chocolate)',
      services: [
        { name: 'Underarms',    price: '₹100' },
        { name: 'Hand Wax',     price: '₹250 - ₹300' },
        { name: 'Half Leg Wax', price: '₹300' },
        { name: 'Full Leg Wax', price: '₹600' },
        { name: 'Arms Wax',     price: '₹400' },
        { name: 'Back Wax',     price: '₹400' },
      ],
    },
    {
      category: 'Waxing (Rica)',
      services: [
        { name: 'Underarms',     price: '₹150' },
        { name: 'Face Wax',      price: '₹350' },
        { name: 'Hand Wax',      price: '₹450' },
        { name: 'Half Leg Wax',  price: '₹400' },
        { name: 'Full Leg Wax',  price: '₹800' },
        { name: 'Arms Wax',      price: '₹500' },
        { name: 'Back Wax',      price: '₹500' },
        { name: 'Full Body Wax', price: '₹2,500' },
        { name: 'Bikini Wax',    price: '₹1,200' },
      ],
    },
    {
      category: 'Facial Service',
      services: [
        { name: 'Raaga Facial',      price: '₹1,000' },
        { name: 'Fruit Facial',      price: '₹1,000' },
        { name: 'Lotus Facial',      price: '₹1,200' },
        { name: 'Brillare Facial',   price: '₹1,500' },
        { name: 'O3+ Facial',        price: '₹2,000' },
        { name: 'Janssen Facial',    price: '₹3,000' },
        { name: 'Skeyndor Facial',   price: '₹3,000' },
        { name: 'Gold Facial',       price: '₹3,000' },
        { name: 'Kiwi Facial',       price: '₹2,000' },
        { name: 'Bio Enzyme Facial', price: '₹2,000' },
      ],
    },
    {
      category: 'Makeup Service',
      services: [
        { name: 'Party Makeup',    price: '₹2,000' },
        { name: 'Bridal (MAC)',    price: '₹10,000' },
        { name: 'HD Makeup',       price: '₹12,000' },
        { name: 'Airbrush Makeup', price: '₹15,000' },
      ],
    },
    {
      category: 'Skeyndor Treatments',
      services: [
        { name: 'Aquatherm',        price: '₹3,500' },
        { name: 'Power C+',         price: '₹4,000' },
        { name: 'Power Oxygen',     price: '₹4,000' },
        { name: 'Power Retinol',    price: '₹4,000' },
        { name: 'Power Hyaluronic', price: '₹4,000' },
        { name: 'Eternal',          price: '₹7,000' },
        { name: 'Corrective',       price: '₹7,000' },
        { name: 'Global Lift',      price: '₹7,000' },
        { name: 'Timeless',         price: '₹10,000' },
      ],
    },
    {
      category: 'Pre-Bridal Treatment',
      services: [
        { name: 'Pre-Bridal Treatment', price: '₹5,000 - ₹25,000' },
      ],
    },
    {
      category: 'Spa & Hair Treatments',
      services: [
        { name: 'Hair Spa (starts)',      price: '₹800' },
        { name: 'Treatment (starts)',     price: '₹1,500' },
        { name: 'Illuvia Hair Treatment', price: '₹3,000' },
        { name: 'Anti-Dandruff (starts)', price: '₹4,000' },
        { name: 'Scalp Treatment',        price: '₹1,500' },
        { name: 'Absolute Repair',        price: '₹1,500' },
        { name: 'Molecular',              price: '₹3,000' },
        { name: 'Botox (starts)',         price: '₹4,000' },
        { name: 'Nanoplastia (starts)',   price: '₹4,000' },
        { name: 'Keratin (starts)',       price: '₹4,000' },
      ],
    },
    {
      category: 'Hair Styling & Haircut',
      services: [
        { name: 'Hairstyle (starts)',      price: '₹500' },
        { name: 'One-Length Haircut',      price: '₹200' },
        { name: 'All Cuts with Hair Wash', price: '₹600' },
      ],
    },
    {
      category: 'Bleach Service',
      services: [
        { name: 'Face',        price: '₹300' },
        { name: 'Face + Neck', price: '₹350' },
        { name: 'Hand',        price: '₹400' },
        { name: 'Leg (Full)',  price: '₹800' },
        { name: 'Full Body',   price: '₹3,000' },
      ],
    },
    {
      category: 'D-Tan Service',
      services: [
        { name: 'Face D-Tan',      price: '₹250' },
        { name: 'Hand D-Tan',      price: '₹500' },
        { name: 'Full Leg D-Tan',  price: '₹1,000' },
        { name: 'Full Body D-Tan', price: '₹3,000' },
      ],
    },
  ];
