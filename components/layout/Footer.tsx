import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-950 text-gray-400">
            <br />
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 text-center md:text-left">
                    {/* About Section */}
                    {/* About Section */}
                    {/* About Section */}
                    <div className="space-y-6 flex flex-col items-center md:items-start">
                        <h3 className="text-2xl lg:text-3xl font-bold font-playfair tracking-wide" style={{ color: '#C48B9F' }}>
                            Sai Agalyas <br /><span className="italic">Arts & Fashion</span>
                        </h3>
                        <br />
                        <p className="text-sm leading-relaxed max-w-xs text-balance mx-auto md:mx-0">
                            Chennai's premier destination for exquisite bridal wear, custom designs, and traditional fashion. Creating memories through timeless elegance.
                        </p>
                        <br />
                        <div className="flex gap-6 pt-2 justify-center md:justify-start">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-[#C48B9F] hover:text-white transition-all duration-300 group"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5 group-hover:text-white" style={{ color: '#C48B9F' }} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-[#C48B9F] hover:text-white transition-all duration-300 group"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5 group-hover:text-white" style={{ color: '#C48B9F' }} />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-[#C48B9F] hover:text-white transition-all duration-300 group"
                                aria-label="YouTube"
                            >
                                <Youtube className="w-5 h-5 group-hover:text-white" style={{ color: '#C48B9F' }} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-playfair font-semibold mb-8" style={{ color: '#C48B9F' }}>Quick Links</h4>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <Link href="/shop" className="hover:text-[#C48B9F] transition-colors hover:translate-x-1 inline-block">
                                    Shop All
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=bridal-wear" className="hover:text-[#C48B9F] transition-colors hover:translate-x-1 inline-block">
                                    Bridal Wear
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=custom-designs" className="hover:text-[#C48B9F] transition-colors hover:translate-x-1 inline-block">
                                    Custom Designs
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-[#C48B9F] transition-colors hover:translate-x-1 inline-block">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/orders" className="hover:text-[#C48B9F] transition-colors hover:translate-x-1 inline-block">
                                    Track Order
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-xl font-playfair font-semibold mb-8" style={{ color: '#C48B9F' }}>Customer Service</h4>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <Link href="/profile" className="hover:text-[#C48B9F] transition-colors hover:translate-x-1 inline-block">
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link href="/wishlist" className="hover:text-[#C48B9F] transition-colors hover:translate-x-1 inline-block">
                                    Wishlist
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#C48B9F] transition-colors hover:translate-x-1 inline-block">
                                    Shipping Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#C48B9F] transition-colors hover:translate-x-1 inline-block">
                                    Return & Exchange
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#C48B9F] transition-colors hover:translate-x-1 inline-block">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-playfair font-semibold mb-8" style={{ color: '#C48B9F' }}>Contact Us</h4>
                        <ul className="space-y-6 text-sm">
                            <li className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                                <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: '#C48B9F' }} />
                                </div>
                                <span className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                                    123 Mount Road,<br />
                                    T. Nagar, Chennai,<br />
                                    Tamil Nadu - 600017
                                </span>
                            </li>
                            <li className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                                <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Phone className="w-5 h-5" style={{ color: '#C48B9F' }} />
                                </div>
                                <a href="tel:+919876543210" className="hover:text-[#C48B9F] transition-colors">
                                    +91 98765 43210
                                </a>
                            </li>
                            <li className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                                <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Mail className="w-5 h-5" style={{ color: '#C48B9F' }} />
                                </div>
                                <a href="mailto:info@saiagalyas.com" className="hover:text-[#C48B9F] transition-colors">
                                    info@saiagalyas.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-16 pt-8 text-center text-sm text-gray-500">
                    <p>
                        &copy; {currentYear} Sai Agalyas Arts & Fashion. All rights reserved. | Made with <span className="text-red-500 animate-pulse inline-block">❤️</span> in Chennai
                    </p>
                </div>
            </div>
        </footer>
    );
}
