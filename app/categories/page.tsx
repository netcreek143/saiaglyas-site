'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    _count?: {
        products: number;
    }
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                setCategories(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="min-h-screen bg-muted py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 font-playfair">Browse Categories</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our wide range of collections. Find exactly what you're looking for.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/shop?category=${category.slug}`}
                                className="group bg-white p-2 rounded-[1.5rem] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 block h-full border border-gray-100"
                            >
                                <div className="relative overflow-hidden rounded-[1rem] bg-gray-100 mb-3">
                                    {category.image ? (
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <Package className="w-10 h-10" />
                                        </div>
                                    )}
                                </div>

                                <div className="px-2 pb-2">
                                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Collection</p>
                                    <h3 className="text-xl font-bold text-gray-900 font-playfair mb-1 group-hover:text-primary transition-colors">
                                        {category.name}
                                    </h3>
                                    {category.description && (
                                        <p className="text-gray-500 text-xs line-clamp-2 mb-2">
                                            {category.description}
                                        </p>
                                    )}
                                    <p className="text-primary font-bold text-sm">
                                        {category._count?.products || 0} Items
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
