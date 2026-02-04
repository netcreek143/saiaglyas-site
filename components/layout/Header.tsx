'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { ShoppingBag, User, Menu, X, Heart, Search } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';

export default function Header() {
    const { data: session } = useSession();
    const { totalItems } = useCart();
    const { totalItems: wishlistCount } = useWishlist();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        document.body.classList.toggle('modal-open');
    };

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'Categories', href: '/categories' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                            <span className="font-playfair tracking-normal">Sai Agalyas</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-12">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group relative text-foreground font-medium px-1 py-1 tracking-wide"
                            >
                                <span className="relative z-10 transition-colors group-hover:text-primary">
                                    {item.name}
                                </span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Icons */}
                    <div className="flex items-center gap-6">
                        {/* Search Icon / Bar */}
                        <div className="relative flex items-center">
                            {isSearchOpen ? (
                                <form onSubmit={handleSearchSubmit} className="flex items-center">
                                    <input
                                        type="text"
                                        autoFocus
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onBlur={() => !searchQuery && setIsSearchOpen(false)}
                                        placeholder="Search..."
                                        className="w-40 lg:w-64 pl-4 pr-10 py-1.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all duration-300 ease-in-out"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                                    >
                                        <Search className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsSearchOpen(false);
                                            setSearchQuery('');
                                        }}
                                        className="absolute -right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 md:hidden"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </form>
                            ) : (
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="p-2 hover:bg-muted rounded-full transition-colors text-gray-700 hover:text-primary"
                                    aria-label="Search"
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Wishlist */}
                        {session && (
                            <Link
                                href="/wishlist"
                                className="p-2 hover:bg-muted rounded-full transition-colors hidden md:block text-gray-700 hover:text-primary"
                                aria-label="Wishlist"
                            >
                                <Heart className="w-5 h-5" />
                            </Link>
                        )}

                        <Link
                            href="/cart"
                            className="relative p-2 hover:bg-muted rounded-full transition-colors text-gray-700 hover:text-primary"
                            aria-label="Shopping Cart"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        <div className="relative hidden md:block">
                            {session ? (
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={session.user.role === 'ADMIN' ? '/admin' : '/profile'}
                                        className="p-2 hover:bg-muted rounded-full transition-colors text-gray-700 hover:text-primary"
                                    >
                                        <User className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="text-sm font-medium text-gray-600 hover:text-primary transition-colors tracking-wide"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="btn btn-primary text-sm px-6 py-2.5 rounded-full shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-0.5 tracking-wide"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle Menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-border mobile-menu-open">
                    <nav className="container mx-auto px-4 py-4 space-y-3">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="border-t border-border pt-3 space-y-3">
                            {session ? (
                                <>
                                    <Link
                                        href="/wishlist"
                                        className="block py-2 text-foreground hover:text-primary transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Wishlist
                                    </Link>
                                    <Link
                                        href={session.user.role === 'ADMIN' ? '/admin' : '/profile'}
                                        className="block py-2 text-foreground hover:text-primary transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {session.user.role === 'ADMIN' ? 'Admin Panel' : 'My Profile'}
                                    </Link>
                                    <button
                                        onClick={() => {
                                            signOut();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    className="block py-2 text-primary font-semibold"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login / Register
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
