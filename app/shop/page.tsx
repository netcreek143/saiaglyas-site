'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, Grid3x3, List } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string;
    category: { name: string; slug: string };
    stock: number;
}

function ShopContent() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [sortBy, setSortBy] = useState('newest');
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchProducts(true);
    }, [searchTerm, selectedCategory, sortBy, priceRange]); // Reset when filters change

    const fetchProducts = async (reset = false) => {
        setLoading(true);
        try {
            const currentPage = reset ? 1 : page;
            const params = new URLSearchParams();
            if (searchTerm) params.append('search', searchTerm);
            if (selectedCategory) params.append('category', selectedCategory);
            if (priceRange.min) params.append('minPrice', priceRange.min);
            if (priceRange.max) params.append('maxPrice', priceRange.max);
            params.append('sort', sortBy);
            params.append('page', currentPage.toString());
            params.append('limit', '12');

            const res = await fetch(`/api/products?${params.toString()}`);
            const data = await res.json();

            if (reset) {
                setProducts(data.products || []);
                setPage(2); // Next page will be 2
            } else {
                setProducts(prev => {
                    const newProducts = (data.products || []).filter((p: Product) =>
                        !prev.some(existing => existing.id === p.id)
                    );
                    return [...prev, ...newProducts];
                });
                setPage(prev => prev + 1);
            }

            // Check if we reached the end
            const totalPages = data.pagination?.totalPages || 1;
            setHasMore(currentPage < totalPages);

        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchProducts();
    };

    return (
        <div className="min-h-screen bg-muted">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">Shop All Products</h1>
                    <p className="text-gray-600">Discover our complete collection of exquisite fashion</p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-14 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    style={{ paddingLeft: '3.5rem' }}
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </form>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.slug}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="popular">Most Popular</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    {/* Price Range */}
                    <div className="mt-4 flex items-center gap-4">
                        <span className="text-sm font-medium">Price Range:</span>
                        <input
                            type="number"
                            placeholder="Min"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                            className="w-32 px-3 py-1 border border-gray-300 rounded"
                        />
                        <span>-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                            className="w-32 px-3 py-1 border border-gray-300 rounded"
                        />
                        <button
                            onClick={() => fetchProducts()}
                            className="btn btn-primary px-4 py-1 text-sm"
                        >
                            Apply
                        </button>
                    </div>
                </div>
                <br />

                {/* View Toggle */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600">
                        {products.length} {products.length === 1 ? 'product' : 'products'} found
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white'}`}
                        >
                            <Grid3x3 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white'}`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <br />
                {/* Products Grid/List */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="card">
                                <div className="skeleton h-64 mb-4"></div>
                                <div className="skeleton h-4 w-3/4 mb-2"></div>
                                <div className="skeleton h-4 w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">No products found</p>
                    </div>
                ) : (
                    <div
                        className={
                            viewMode === 'grid'
                                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                                : 'space-y-4'
                        }
                    >
                        {products.map((product) => {
                            const images = JSON.parse(product.images);
                            const firstImage = images[0] || '/images/placeholder-product.jpg';

                            if (viewMode === 'list') {
                                return (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.id}`}
                                        className="flex gap-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                                    >
                                        <div className="relative w-32 h-32 flex-shrink-0">
                                            <Image
                                                src={firstImage}
                                                alt={product.title}
                                                fill
                                                className="object-cover rounded"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 mb-1">{product.category.name}</p>
                                            <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                                {product.description}
                                            </p>
                                            <p className="text-primary font-bold text-xl">
                                                {formatPrice(product.price)}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            }

                            return (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.id}`}
                                    className="group card p-0 overflow-hidden"
                                >
                                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                        <Image
                                            src={firstImage}
                                            alt={product.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p className="text-xs text-gray-500 mb-1">{product.category.name}</p>
                                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                                            {product.title}
                                        </h3>
                                        <p className="text-primary font-bold text-xl">
                                            {formatPrice(product.price)}
                                        </p>
                                    </div>

                                </Link>

                            );

                        })}
                    </div>

                )}

                {/* Load More Button */}
                {products.length > 0 && hasMore && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={() => fetchProducts(false)}
                            disabled={loading}
                            className="btn btn-outline px-8 py-3 min-w-[200px]"
                        >
                            {loading ? 'Loading...' : 'Load More Products'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>}>
            <ShopContent />
        </Suspense>
    );
}
