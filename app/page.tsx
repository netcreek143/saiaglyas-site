import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Users, Award } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import CategorySlider from './_components/CategorySlider';

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
      take: 4,
      include: { category: true },
    });
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      take: 8,
      orderBy: { name: 'asc' }
    });
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const categories = await getCategories();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="absolute inset-0 bg-[url('/images/hero-banner.jpg')] bg-cover bg-center opacity-20"></div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in flex flex-col items-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2.5 rounded-full mb-10 shadow-sm border border-white/50">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-gray-800 tracking-wide">Premium Bridal Collections 2026</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-gray-900 font-playfair leading-snug text-balance">
              Elegance Crafted <br className="hidden md:block" />
              <span className="text-primary italic">For Your Special Day</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-loose text-balance">
              Discover exquisite bridal wear and custom designs that celebrate your unique style. Handcrafted with love in Chennai.
            </p>
            <br />

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
              <Link href="/shop" className="btn btn-primary px-10 py-4 text-lg min-w-[220px] shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                Explore Collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/contact" className="btn btn-secondary px-10 py-4 text-lg min-w-[220px] hover:bg-white hover:text-primary border-transparent hover:border-primary/20 transition-all hover:-translate-y-1">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
      </section>
      <br />
      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6 flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-playfair font-semibold mb-4 text-gray-900">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed text-balance max-w-xs mx-auto">Handcrafted with finest fabrics and intricate detailing</p>
            </div>
            <div className="text-center p-6 flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-playfair font-semibold mb-4 text-gray-900">Custom Designs</h3>
              <p className="text-gray-600 leading-relaxed text-balance max-w-xs mx-auto">Bespoke fashion tailored to your unique preferences</p>
            </div>
            <div className="text-center p-6 flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-playfair font-semibold mb-4 text-gray-900">20+ Years Experience</h3>
              <p className="text-gray-600 leading-relaxed text-balance max-w-xs mx-auto">Trusted by brides across Tamil Nadu for decades</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gray-50 border-t border-gray-200" style={{ padding: '3.0rem 0', marginTop: '2.8rem' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-gray-900">Featured Collections</h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              Explore our handpicked selection of exquisite pieces designed to make you shine
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const images = JSON.parse(product.images);
              const firstImage = images[0] || '/images/placeholder-product.jpg';

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
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <br />

          <div className="text-center mt-12">
            <Link href="/shop" className="btn btn-primary px-8 py-3">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-gray-900">Shop by Category</h2>
            <p className="text-lg text-gray-600 leading-relaxed">Find the perfect style for every occasion</p>
          </div>
          <br />
          <CategorySlider categories={categories} />
        </div>
      </section>
      <br />

      {/* Custom Design CTA */}
      <section className="py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-gray-900">Have Something Special in Mind?</h2>
          <br />
          <p className="text-gray-700 text-xl mb-10 leading-relaxed text-center">
            Let our expert designers bring your vision to life with our bespoke custom design service
          </p>
          <br />
          <Link href="/contact" className="btn btn-primary px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Request Custom Design
          </Link>
        </div>
        <br />
      </section>
    </div>
  );
}
