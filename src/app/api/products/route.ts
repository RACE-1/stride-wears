import { NextResponse } from 'next/server';
import { getStoredProducts, createStoredProduct } from '@/lib/productsStore';
import { isAuthenticatedAdmin } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featuredOnly = searchParams.get('featured') === 'true';

    let products = await getStoredProducts();

    if (category && category !== 'All') {
      products = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (featuredOnly) {
      products = products.filter((p) => p.isFeatured);
    }

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check admin authorization
    if (!isAuthenticatedAdmin(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin credentials required.' },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body.name || !body.price || !body.image) {
      return NextResponse.json(
        { success: false, error: 'Product name, price, and image are required.' },
        { status: 400 }
      );
    }

    const newProduct = await createStoredProduct(body);

    return NextResponse.json(
      {
        success: true,
        message: 'Product created successfully',
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
