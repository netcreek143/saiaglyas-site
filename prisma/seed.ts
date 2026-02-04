import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting database seed...');

    // Create admin user
    const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);

    const admin = await prisma.user.upsert({
        where: { email: process.env.ADMIN_EMAIL || 'admin@saiagalyas.com' },
        update: {},
        create: {
            email: process.env.ADMIN_EMAIL || 'admin@saiagalyas.com',
            password: adminPassword,
            name: 'Admin',
            role: 'ADMIN',
        },
    });

    console.log('✓ Admin user created');

    // Create sample customer
    const customerPassword = await bcrypt.hash('customer123', 10);

    const customer = await prisma.user.upsert({
        where: { email: 'customer@example.com' },
        update: {},
        create: {
            email: 'customer@example.com',
            password: customerPassword,
            name: 'Sample Customer',
            role: 'CUSTOMER',
            phone: '9876543210',
        },
    });

    console.log('✓ Sample customer created');

    // Create categories
    const categories = [
        {
            name: 'Bridal Wear',
            slug: 'bridal-wear',
            description: 'Exquisite bridal collections for your special day',
            image: '/images/categories/bridal.jpg',
        },
        {
            name: 'Custom Designs',
            slug: 'custom-designs',
            description: 'Bespoke fashion tailored to your unique style',
            image: '/images/categories/custom.jpg',
        },
        {
            name: 'Traditional Wear',
            slug: 'traditional-wear',
            description: 'Classic traditional Indian attire',
            image: '/images/categories/traditional.jpg',
        },
        {
            name: 'Accessories',
            slug: 'accessories',
            description: 'Complete your look with stunning accessories',
            image: '/images/categories/accessories.jpg',
        },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }

    console.log('✓ Categories created');

    // Get category IDs
    const bridalCategory = await prisma.category.findUnique({ where: { slug: 'bridal-wear' } });
    const customCategory = await prisma.category.findUnique({ where: { slug: 'custom-designs' } });
    const traditionalCategory = await prisma.category.findUnique({ where: { slug: 'traditional-wear' } });
    const accessoriesCategory = await prisma.category.findUnique({ where: { slug: 'accessories' } });

    // Create sample products
    const products = [
        {
            title: 'Royal Bridal Lehenga',
            description: 'Stunning red and gold bridal lehenga with intricate embroidery and sequin work. Perfect for your wedding day.',
            price: 45000,
            images: JSON.stringify(['/images/products/bridal-lehenga-1.jpg', '/images/products/bridal-lehenga-2.jpg']),
            categoryId: bridalCategory!.id,
            stock: 3,
            variants: JSON.stringify([
                { type: 'Size', options: ['S', 'M', 'L', 'XL', 'Custom'] },
                { type: 'Color', options: ['Red', 'Maroon', 'Pink'] },
            ]),
            featured: true,
        },
        {
            title: 'Designer Bridal Saree',
            description: 'Elegant silk bridal saree with zari work and traditional motifs. Handcrafted by expert artisans.',
            price: 35000,
            images: JSON.stringify(['/images/products/bridal-saree-1.jpg']),
            categoryId: bridalCategory!.id,
            stock: 5,
            variants: JSON.stringify([
                { type: 'Color', options: ['Red', 'Gold', 'Green', 'Blue'] },
            ]),
            featured: true,
        },
        {
            title: 'Custom Embroidered Anarkali',
            description: 'Beautifully tailored Anarkali suit with custom embroidery patterns designed as per your preference.',
            price: 18000,
            images: JSON.stringify(['/images/products/anarkali-1.jpg', '/images/products/anarkali-2.jpg']),
            categoryId: customCategory!.id,
            stock: 10,
            variants: JSON.stringify([
                { type: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'] },
                { type: 'Color', options: ['Pink', 'Blue', 'Yellow', 'Green'] },
            ]),
            featured: false,
        },
        {
            title: 'Bespoke Party Gown',
            description: 'Elegant floor-length gown with your choice of fabric, color, and embellishments. Made to measure.',
            price: 25000,
            images: JSON.stringify(['/images/products/gown-1.jpg']),
            categoryId: customCategory!.id,
            stock: 8,
            variants: JSON.stringify([
                { type: 'Size', options: ['Custom'] },
                { type: 'Fabric', options: ['Silk', 'Georgette', 'Velvet', 'Satin'] },
            ]),
            featured: true,
        },
        {
            title: 'Silk Kanjivaram Saree',
            description: 'Pure silk Kanjivaram saree with traditional temple border and rich pallu. A timeless classic.',
            price: 15000,
            images: JSON.stringify(['/images/products/kanjivaram-1.jpg']),
            categoryId: traditionalCategory!.id,
            stock: 12,
            featured: false,
        },
        {
            title: 'Banarasi Silk Saree',
            description: 'Luxurious Banarasi silk with brocade work and intricate gold patterns. Perfect for weddings and festivals.',
            price: 12000,
            images: JSON.stringify(['/images/products/banarasi-1.jpg']),
            categoryId: traditionalCategory!.id,
            stock: 15,
            featured: true,
        },
        {
            title: 'Traditional Salwar Kameez',
            description: 'Comfortable and elegant salwar kameez with dupatta. Ideal for daily wear and formal occasions.',
            price: 5000,
            images: JSON.stringify(['/images/products/salwar-1.jpg']),
            categoryId: traditionalCategory!.id,
            stock: 20,
            variants: JSON.stringify([
                { type: 'Size', options: ['S', 'M', 'L', 'XL'] },
                { type: 'Color', options: ['White', 'Cream', 'Peach', 'Mint'] },
            ]),
            featured: false,
        },
        {
            title: 'Kundan Jewelry Set',
            description: 'Exquisite kundan necklace, earring, and maangtikka set. Perfect complement to bridal wear.',
            price: 8000,
            images: JSON.stringify(['/images/products/kundan-set-1.jpg']),
            categoryId: accessoriesCategory!.id,
            stock: 6,
            featured: false,
        },
        {
            title: 'Designer Clutch Bag',
            description: 'Elegant beaded clutch with metallic finish. Perfect for weddings and parties.',
            price: 2500,
            images: JSON.stringify(['/images/products/clutch-1.jpg']),
            categoryId: accessoriesCategory!.id,
            stock: 25,
            variants: JSON.stringify([
                { type: 'Color', options: ['Gold', 'Silver', 'Rose Gold', 'Black'] },
            ]),
            featured: false,
        },
        {
            title: 'Embroidered Dupatta',
            description: 'Beautiful embroidered dupatta to complete your ethnic ensemble. Available in multiple colors.',
            price: 1500,
            images: JSON.stringify(['/images/products/dupatta-1.jpg']),
            categoryId: accessoriesCategory!.id,
            stock: 30,
            variants: JSON.stringify([
                { type: 'Color', options: ['Red', 'Pink', 'Blue', 'Green', 'Orange'] },
            ]),
            featured: false,
        },
    ];

    for (const product of products) {
        await prisma.product.create({
            data: product,
        });
    }

    console.log('✓ Products created');

    // Create sample address for customer
    await prisma.address.create({
        data: {
            userId: customer.id,
            fullName: 'Sample Customer',
            phone: '9876543210',
            addressLine: '123 Mount Road',
            city: 'Chennai',
            state: 'Tamil Nadu',
            pincode: '600002',
            isDefault: true,
        },
    });

    console.log('✓ Sample address created');
    console.log('\n🎉 Database seeded successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@saiagalyas.com / admin123');
    console.log('Customer: customer@example.com / customer123');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
