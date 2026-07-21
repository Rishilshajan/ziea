export interface Category {
    id: string;
    name: string;
    slug?: string;
}

export interface ProductImage {
    url: string;
    crop_x?: number;
    crop_y?: number;
    is_highlight?: boolean;
}

export interface ProductSize {
    size: string;
    quantity: number;
}

export interface Product {
    id: string;
    product_code: string;

    name: string;
    description: string | null;

    category_id: string | null;
    category?: Category;

    original_price: number | null;
    discounted_price: number | null;

    material: string | null;
    care_instructions: string | null;
    shipping_info: string | null;
    contents: string | null;

    images: ProductImage[];
    sizes: ProductSize[];

    badges: string[];

    is_published: boolean;
    status: "draft" | "published" | "hidden";

    view_count: number;

    created_at: string;
    updated_at: string;
}

export interface ProductCardProps {
    id: string;
    productCode: string;
    title: string;
    originalPrice: number;
    discountedPrice: number;
    imageUrl: string;
    altText?: string;
}