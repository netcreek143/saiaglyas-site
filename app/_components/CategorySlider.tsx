'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Package } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
}

export default function CategorySlider({ categories }: { categories: Category[] }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = 320;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    if (!categories || categories.length === 0) return null;

    return (
        <div className="relative group/container">
            {/* Scroll Buttons */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover/container:opacity-100 transition-opacity disabled:opacity-0 hover:bg-gray-50 flex items-center justify-center transform hover:scale-105 duration-200"
                aria-label="Scroll Left"
            >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover/container:opacity-100 transition-opacity disabled:opacity-0 hover:bg-gray-50 flex items-center justify-center transform hover:scale-105 duration-200"
                aria-label="Scroll Right"
            >
                <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-6 pb-8 px-2 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/shop?category=${category.slug}`}
                        className="min-w-[280px] md:min-w-[320px] snap-start group bg-white p-2 rounded-[1.5rem] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 block border border-gray-100 flex-shrink-0"
                    >
                        <div className="relative overflow-hidden rounded-[1rem] bg-gray-100 mb-3">
                            {category.image ? (
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    width={400}
                                    height={400}
                                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-64 flex items-center justify-center text-gray-300">
                                    <Package className="w-12 h-12" />
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
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
