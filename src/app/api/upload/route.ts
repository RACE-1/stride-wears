import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { isAuthenticatedAdmin } from '@/lib/auth';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

export async function POST(request: Request) {
  try {
    // Check authorization
    if (!isAuthenticatedAdmin(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin credentials required.' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided.' },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported image format (${file.type}). Supported formats: JPG, JPEG, PNG, WebP.`,
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: 'Image is too large. Maximum file size allowed is 15MB.',
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Prepare destination folder in public/uploads/products
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const filename = `product-${timestamp}-${randomSuffix}.webp`;
    const outputPath = path.join(uploadDir, filename);

    // Optimize with sharp:
    // 1. .rotate() handles EXIF orientation from smartphone cameras
    // 2. .resize() bounds maximum dimension to 1600px without upscaling
    // 3. .webp() provides high-fidelity modern web compression with alpha transparency
    const imageProcessor = sharp(buffer)
      .rotate()
      .resize({
        width: 1600,
        height: 1600,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({
        quality: 88,
        effort: 4,
      });

    const optimizedBuffer = await imageProcessor.toBuffer();
    const metadata = await sharp(optimizedBuffer).metadata();

    await fs.promises.writeFile(outputPath, optimizedBuffer);

    const publicUrl = `/uploads/products/${filename}`;

    return NextResponse.json({
      success: true,
      message: 'Image uploaded and optimized successfully',
      url: publicUrl,
      width: metadata.width,
      height: metadata.height,
      size: optimizedBuffer.length,
    });
  } catch (error) {
    console.error('Error uploading product image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process and save product image.' },
      { status: 500 }
    );
  }
}
