import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Default asset fallbacks for Packages
import img1BHK from "../assets/1bhk_new.jpg";
import img2BHK from "../assets/2bhk_new.jpg";
import img3BHK from "../assets/3bhk_new.jpg";
import img4BHK from "../assets/4bhk_new.jpg";

// Default asset fallbacks for Services
import imgDCHouse from "../assets/dcshop_new.jpg";
import imgDCRestaurant from "../assets/dcresraunt_new.jpg";
import imgDCHotel from "../assets/dchotel_new.jpg";
import imgDCWarehouse from "../assets/dcwarehouse_new.jpg";
import imgDCOffice from "../assets/dcoffice_new.jpg";
import imgDCResort from "../assets/dcresort_new.jpg";
import imgDCBungalow from "../assets/dcbungalow_villa_new.jpg";

// Default asset fallbacks for Results
import imgKitchenB from "../assets/kitchenB_new.jpg";
import imgKitchenA from "../assets/kitchenA_new.jpg";
import imgBefore from "../assets/before_new.jpg";
import imgAfter from "../assets/after_new.jpg";

// Default asset fallbacks for Products
import imgFloorCleaner from "../assets/floorcleaner_new.jpg";
import imgToiletCleaner from "../assets/toiletcleaner_new.jpg";
import imgGlassCleaner from "../assets/glasscleaner_new.jpg";
import imgBathroomCleaner from "../assets/bathroomcleaner_new.jpg";
import imgKitchenDegreaser from "../assets/kitchendegreaser_new.jpg";
import imgMultiPurpose from "../assets/multipurpose_new.jpg";
import imgHardWater from "../assets/hardwaterremover_new.jpg";
import imgFurniturePolish from "../assets/furniturepolish_new.jpg";
import imgTileCleaner from "../assets/tilecleaner_new.jpg";
import imgMicrofiber from "../assets/microfiber_new.jpg";
import imgToiletBrush from "../assets/toiletbrush_new.jpg";
import imgMop from "../assets/mop_new.jpg";
import imgSprayBottle from "../assets/spraybottle_new.jpg";

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const rawKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  rawUrl &&
  rawKey &&
  !rawUrl.includes('your-project-id') &&
  !rawUrl.includes('MY_SUPABASE')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(rawUrl, rawKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

/**
 * Resolves a storage path or full image URL from a specified Supabase storage bucket.
 */
export function resolveStorageUrl(bucket: 'packages' | 'services' | 'results' | 'products', pathOrUrl?: string | null): string | null {
  if (!pathOrUrl || typeof pathOrUrl !== 'string') return null;
  const trimmed = pathOrUrl.trim();
  if (!trimmed) return null;

  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  if (supabase) {
    try {
      const { data } = supabase.storage.from(bucket).getPublicUrl(trimmed);
      if (data?.publicUrl) return data.publicUrl;
    } catch {
      // Ignore resolution failure and return null
    }
  }

  return null;
}

// -------------------------------------------------------------
// Data Types
// -------------------------------------------------------------

export interface PackageItem {
  id: string | number;
  name: string;
  price: string;
  rawPrice?: number | string;
  description?: string;
  image: string;
  inclusions?: string[];
  isPublished?: boolean;
}

export interface ServiceItem {
  id: string | number;
  name: string;
  category?: string;
  description: string;
  image: string;
  inclusions?: string[];
  iconName?: string;
  isPublished?: boolean;
}

export interface ResultItem {
  id: string;
  title: string;
  subtitle: string;
  before: string;
  after: string;
  highlights: string[];
  category?: string;
  isPublished?: boolean;
}

export interface ProductItem {
  id: string | number;
  name: string;
  price?: string;
  description?: string;
  image: string;
  isAvailable: boolean;
  isPublished?: boolean;
}

// -------------------------------------------------------------
// Baseline Defaults (Preserving all original assets & copy)
// -------------------------------------------------------------

export const DEFAULT_PACKAGES: PackageItem[] = [
  {
    id: "pkg-1bhk",
    name: "1 BHK",
    price: "₹2799",
    image: img1BHK,
    description: "Full deep cleaning for 1 BHK including kitchen, bathroom, bedroom & balcony",
    inclusions: ["Living Room & Bedroom dusting & mopping", "Kitchen platform & tile degreasing", "Bathroom descaling & sanitization", "Window track & balcony scrubbing"]
  },
  {
    id: "pkg-2bhk",
    name: "2 BHK",
    price: "₹3599",
    image: img2BHK,
    description: "Complete 2 BHK home deep sanitization & comprehensive surface cleaning",
    inclusions: ["All bedrooms and living area", "2 Bathrooms deep descaling", "Kitchen grease & chimney wipe", "Balcony wash & cobweb removal"]
  },
  {
    id: "pkg-3bhk",
    name: "3 BHK",
    price: "₹4399",
    image: img3BHK,
    description: "Intensive 3 BHK deep cleaning package covering every nook and corner",
    inclusions: ["3 Bedrooms & spacious living/dining", "Up to 3 Bathrooms cleaned & polished", "Heavy kitchen degreasing", "Fans, switchboards, windows & grills"]
  },
  {
    id: "pkg-4bhk",
    name: "4 BHK",
    price: "₹5499",
    image: img4BHK,
    description: "Premium large residence deep sanitation with heavy duty scrubbing",
    inclusions: ["Full house comprehensive detailing", "All attached & common bathrooms", "Deep kitchen & utility sanitation", "Complete floor machine buffing/mopping"]
  }
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "srv-house",
    name: "House Deep Cleaning",
    category: "Residential",
    description: "Complete home deep cleaning for a fresh and hygienic living space.",
    image: imgDCHouse,
    inclusions: ["Floor scrubbing and mopping", "Window glass, tracks & grill cleaning", "Cobweb removal & wall cleaning", "Switchboard & door frame detailing"]
  },
  {
    id: "srv-restaurant",
    name: "Restaurant Deep Cleaning",
    category: "Commercial",
    description: "Professional kitchen, dining area and restaurant deep cleaning.",
    image: imgDCRestaurant,
    inclusions: ["Commercial kitchen degreasing", "Dining hall sanitization", "Exhaust hood & chimney cleaning", "Food prep area disinfection"]
  },
  {
    id: "srv-hotel",
    name: "Hotel Deep Cleaning",
    category: "Commercial",
    description: "Complete hotel room, lobby and common area deep cleaning.",
    image: imgDCHotel,
    inclusions: ["Guest room sanitization", "Lobby and corridor buffing", "Washroom deep sanitation", "Linen and upholstery vacuuming"]
  },
  {
    id: "srv-warehouse",
    name: "Warehouse Deep Cleaning",
    category: "Commercial",
    description: "Industrial warehouse dust removal and deep sanitation.",
    image: imgDCWarehouse,
    inclusions: ["Industrial dust extraction", "High ceiling cobweb removal", "Floor power scrubbing", "Storage rack wipe-down"]
  },
  {
    id: "srv-office",
    name: "Office Deep Cleaning",
    category: "Commercial",
    description: "Professional office workspace cleaning and sanitization.",
    image: imgDCOffice,
    inclusions: ["Workstation & keyboard dusting", "Conference room polishing", "Pantry & washroom disinfection", "Glass partition streak-free wipe"]
  },
  {
    id: "srv-resort",
    name: "Resort Deep Cleaning",
    category: "Commercial",
    description: "Luxury resort and hospitality property deep cleaning.",
    image: imgDCResort,
    inclusions: ["Cottage & villa refresh", "Patio & deck power wash", "Clubhouse and lounge sanitation", "Glass facade cleaning"]
  },
  {
    id: "srv-bungalow",
    name: "Bungalow & Villa Deep Cleaning",
    category: "Residential",
    description: "Premium deep cleaning for luxury villas and bungalows.",
    image: imgDCBungalow,
    inclusions: ["Multi-story thorough scrubbing", "Terrace & balcony cleaning", "Grand living area chandelier & window dusting", "Complete perimeter sanitation"]
  }
];

export const DEFAULT_RESULTS: ResultItem[] = [
  {
    id: "kitchen",
    title: "Heavy Grease & Kitchen Degreasing",
    subtitle: "Complete platform, chimney, wall tiles & stove scrubbing",
    before: imgKitchenB,
    after: imgKitchenA,
    highlights: ["100% Oil & Grease Removed", "Sanitized Food Contact Areas", "Sparkling Tile Finish"],
    category: "Kitchen"
  },
  {
    id: "hall",
    title: "Living Room & Floor Tile Deep Clean",
    subtitle: "Intensive scrubbing, grout stain descaling & brightening",
    before: imgBefore,
    after: imgAfter,
    highlights: ["Deep Grout Descaling", "Mirror-Bright Floor Shine", "Dust & Allergen Free"],
    category: "Living Area"
  }
];

export const DEFAULT_PRODUCTS: ProductItem[] = [
  { id: "prod-floor", name: "Floor Cleaner\nDevil Cleanerz", image: imgFloorCleaner, isAvailable: true, description: "Heavy-duty scented floor disinfectant" },
  { id: "prod-toilet", name: "Toilet Cleaner\nDevil Cleanerz", image: imgToiletCleaner, isAvailable: true, description: "Anti-bacterial limescale and stain remover" },
  { id: "prod-glass", name: "Glass Cleaner\nDevil Cleanerz", image: imgGlassCleaner, isAvailable: true, description: "Streak-free shine formula for mirrors and windows" },
  { id: "prod-bathroom", name: "Bathroom Cleaner\nDevil Cleanerz", image: imgBathroomCleaner, isAvailable: true, description: "Tile descaler and soap scum dissolver" },
  { id: "prod-degreaser", name: "Kitchen Degreaser\nDevil Cleanerz", image: imgKitchenDegreaser, isAvailable: true, description: "Industrial strength oil and chimney grease cutter" },
  { id: "prod-multi", name: "Multi-Purpose Surface Cleaner\nDevil Cleanerz", image: imgMultiPurpose, isAvailable: true, description: "All-surface quick sanitizing spray" },
  { id: "prod-hardwater", name: "Hard Water Stain Remover\nDevil Cleanerz", image: imgHardWater, isAvailable: true, description: "Fast acting tap and glass scale remover" },
  { id: "prod-polish", name: "Furniture Polish\nDevil Cleanerz", image: imgFurniturePolish, isAvailable: true, description: "Wood nourisher and dust repellent shine" },
  { id: "prod-tile", name: "Tile & Marble Cleaner\nDevil Cleanerz", image: imgTileCleaner, isAvailable: true, description: "pH-neutral safe marble and tile cleaner" },
  { id: "prod-microfiber", name: "Microfiber Cloths\nDevil Cleanerz", image: imgMicrofiber, isAvailable: true, description: "Ultra-absorbent lint-free microfiber pack" },
  { id: "prod-brush", name: "Toilet Brushes\nDevil Cleanerz", image: imgToiletBrush, isAvailable: true, description: "Ergonomic deep rim cleaning brush" },
  { id: "prod-mop", name: "3-in-1 Mops\nDevil Cleanerz", image: imgMop, isAvailable: true, description: "Adjustable 3-in-1 floor scrubbing mop" },
  { id: "prod-spray", name: "Spray Bottles\nDevil Cleanerz", image: imgSprayBottle, isAvailable: true, description: "Industrial trigger spray applicator bottle" }
];

// Helper to match fallback package images
function getPackageFallbackImage(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("1")) return img1BHK;
  if (lower.includes("2")) return img2BHK;
  if (lower.includes("3")) return img3BHK;
  if (lower.includes("4")) return img4BHK;
  return img1BHK;
}

// Helper to match fallback service images
function getServiceFallbackImage(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("restaurant")) return imgDCRestaurant;
  if (lower.includes("hotel")) return imgDCHotel;
  if (lower.includes("warehouse")) return imgDCWarehouse;
  if (lower.includes("office")) return imgDCOffice;
  if (lower.includes("resort")) return imgDCResort;
  if (lower.includes("bungalow") || lower.includes("villa")) return imgDCBungalow;
  return imgDCHouse;
}

// Helper to match fallback product images
function getProductFallbackImage(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("floor")) return imgFloorCleaner;
  if (lower.includes("toilet clean")) return imgToiletCleaner;
  if (lower.includes("glass")) return imgGlassCleaner;
  if (lower.includes("bathroom")) return imgBathroomCleaner;
  if (lower.includes("greas") || lower.includes("kitchen")) return imgKitchenDegreaser;
  if (lower.includes("multi")) return imgMultiPurpose;
  if (lower.includes("hard water")) return imgHardWater;
  if (lower.includes("furnitur") || lower.includes("polish")) return imgFurniturePolish;
  if (lower.includes("tile") || lower.includes("marble")) return imgTileCleaner;
  if (lower.includes("cloth") || lower.includes("microfiber")) return imgMicrofiber;
  if (lower.includes("brush")) return imgToiletBrush;
  if (lower.includes("mop")) return imgMop;
  if (lower.includes("spray")) return imgSprayBottle;
  return imgFloorCleaner;
}

function parseInclusions(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(v => String(v).trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.map(v => String(v).trim()).filter(Boolean);
      } catch {
        // Fall back to newline or comma split
      }
    }
    if (trimmed.includes('\n')) {
      return trimmed.split('\n').map(s => s.trim().replace(/^[-•*]\s*/, '')).filter(Boolean);
    }
    if (trimmed.includes(',')) {
      return trimmed.split(',').map(s => s.trim()).filter(Boolean);
    }
    return [trimmed];
  }
  return [];
}

function formatPrice(val: unknown): string {
  if (val === null || val === undefined || val === '') return '';
  const str = String(val).trim();
  if (str.startsWith('₹') || str.startsWith('$') || str.startsWith('Rs')) {
    return str;
  }
  const numeric = Number(str.replace(/[^0-9.]/g, ''));
  if (!isNaN(numeric) && numeric > 0) {
    return `₹${numeric}`;
  }
  return str ? `₹${str}` : '';
}

function isPublishedRecord(row: Record<string, unknown>): boolean {
  if (row.is_published !== undefined) return Boolean(row.is_published);
  if (row.published !== undefined) return Boolean(row.published);
  if (row.status !== undefined) {
    const s = String(row.status).toLowerCase();
    return s === 'published' || s === 'active' || s === 'true';
  }
  return true;
}

// -------------------------------------------------------------
// Safe Fetching APIs
// -------------------------------------------------------------

export async function fetchPublishedPackages(): Promise<{
  data: PackageItem[];
  isLive: boolean;
  error: string | null;
}> {
  if (!supabase) {
    return { data: DEFAULT_PACKAGES, isLive: false, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*');

    if (error) {
      console.warn('[Supabase] Failed to fetch packages table:', error.message);
      return { data: DEFAULT_PACKAGES, isLive: false, error: error.message };
    }

    if (!data) {
      return { data: [], isLive: true, error: null };
    }

    const filtered = (data as Record<string, unknown>[]).filter(isPublishedRecord);

    // If database returned 0 published records, return empty array (do NOT silently replace with demo data)
    if (filtered.length === 0) {
      return { data: [], isLive: true, error: null };
    }

    // Sort by display order if present
    filtered.sort((a, b) => {
      const orderA = Number(a.display_order ?? a.order_index ?? a.sort_order ?? 9999);
      const orderB = Number(b.display_order ?? b.order_index ?? b.sort_order ?? 9999);
      return orderA - orderB;
    });

    const packages: PackageItem[] = filtered.map((row) => {
      const name = String(row.name || row.title || row.package_name || 'Cleaning Package');
      const resolvedImg = resolveStorageUrl('packages', (row.image_url || row.image || row.photo_url || row.img) as string);
      
      return {
        id: (row.id as string | number) || name,
        name,
        price: formatPrice(row.price),
        rawPrice: row.price as number | string,
        description: (row.description || row.desc || '') as string,
        image: resolvedImg || getPackageFallbackImage(name),
        inclusions: parseInclusions(row.inclusions || row.items || row.features),
        isPublished: true,
      };
    });

    return { data: packages, isLive: true, error: null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn('[Supabase] Exception fetching packages:', msg);
    return { data: DEFAULT_PACKAGES, isLive: false, error: msg };
  }
}

export async function fetchPublishedServices(): Promise<{
  data: ServiceItem[];
  isLive: boolean;
  error: string | null;
}> {
  if (!supabase) {
    return { data: DEFAULT_SERVICES, isLive: false, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*');

    if (error) {
      console.warn('[Supabase] Failed to fetch services table:', error.message);
      return { data: DEFAULT_SERVICES, isLive: false, error: error.message };
    }

    if (!data) {
      return { data: [], isLive: true, error: null };
    }

    const filtered = (data as Record<string, unknown>[]).filter(isPublishedRecord);

    if (filtered.length === 0) {
      return { data: [], isLive: true, error: null };
    }

    filtered.sort((a, b) => {
      const orderA = Number(a.display_order ?? a.order_index ?? a.sort_order ?? 9999);
      const orderB = Number(b.display_order ?? b.order_index ?? b.sort_order ?? 9999);
      return orderA - orderB;
    });

    const services: ServiceItem[] = filtered.map((row) => {
      const name = String(row.name || row.title || row.service_name || 'Cleaning Service');
      const resolvedImg = resolveStorageUrl('services', (row.image_url || row.image || row.photo_url || row.img) as string);

      return {
        id: (row.id as string | number) || name,
        name,
        category: (row.category || row.type || 'General') as string,
        description: String(row.description || row.desc || 'Professional deep cleaning service.'),
        image: resolvedImg || getServiceFallbackImage(name),
        inclusions: parseInclusions(row.inclusions || row.items || row.features),
        iconName: (row.icon || row.icon_name || '') as string,
        isPublished: true,
      };
    });

    return { data: services, isLive: true, error: null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn('[Supabase] Exception fetching services:', msg);
    return { data: DEFAULT_SERVICES, isLive: false, error: msg };
  }
}

export async function fetchPublishedResults(): Promise<{
  data: ResultItem[];
  isLive: boolean;
  error: string | null;
}> {
  if (!supabase) {
    return { data: [], isLive: false, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('results')
      .select('*');

    if (error) {
      console.warn('[Supabase] Failed to fetch results table:', error.message);
      return { data: [], isLive: false, error: error.message };
    }

    if (!data) {
      return { data: [], isLive: true, error: null };
    }

    const filtered = (data as Record<string, unknown>[]).filter(isPublishedRecord);

    if (filtered.length === 0) {
      return { data: [], isLive: true, error: null };
    }

    filtered.sort((a, b) => {
      const orderA = Number(a.display_order ?? a.order_index ?? a.sort_order ?? 9999);
      const orderB = Number(b.display_order ?? b.order_index ?? b.sort_order ?? 9999);
      return orderA - orderB;
    });

    const results: ResultItem[] = filtered
      .map((row, idx) => {
        const title = String(row.title || row.label || row.name || `Result Transformation ${idx + 1}`);
        const subtitle = String(row.subtitle || row.description || row.desc || '');

        const beforeUrl = resolveStorageUrl('results', (row.before_image_url || row.before_image || row.before_img || row.before) as string);
        const afterUrl = resolveStorageUrl('results', (row.after_image_url || row.after_image || row.after_img || row.after) as string);

        return {
          id: String(row.id || `result-${idx}`),
          title,
          subtitle,
          before: beforeUrl || '',
          after: afterUrl || '',
          highlights: parseInclusions(row.highlights || row.tags || row.features || row.inclusions),
          category: (row.category || 'Deep Cleaning') as string,
          isPublished: true,
        };
      })
      .filter((r) => Boolean(r.before && r.after));

    return { data: results, isLive: true, error: null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn('[Supabase] Exception fetching results:', msg);
    return { data: [], isLive: false, error: msg };
  }
}

export async function fetchPublishedProducts(): Promise<{
  data: ProductItem[];
  isLive: boolean;
  error: string | null;
}> {
  if (!supabase) {
    return { data: DEFAULT_PRODUCTS, isLive: false, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.warn('[Supabase] Failed to fetch products table:', error.message);
      return { data: DEFAULT_PRODUCTS, isLive: false, error: error.message };
    }

    if (!data) {
      return { data: [], isLive: true, error: null };
    }

    const filtered = (data as Record<string, unknown>[]).filter(isPublishedRecord);

    if (filtered.length === 0) {
      return { data: [], isLive: true, error: null };
    }

    filtered.sort((a, b) => {
      const orderA = Number(a.display_order ?? a.order_index ?? a.sort_order ?? 9999);
      const orderB = Number(b.display_order ?? b.order_index ?? b.sort_order ?? 9999);
      return orderA - orderB;
    });

    const products: ProductItem[] = filtered.map((row) => {
      const name = String(row.name || row.title || row.product_name || 'Cleaning Product');
      const resolvedImg = resolveStorageUrl('products', (row.image_url || row.image || row.photo_url || row.img) as string);

      const isAvailable = row.is_available !== undefined
        ? Boolean(row.is_available)
        : row.available !== undefined
          ? Boolean(row.available)
          : row.in_stock !== undefined
            ? Boolean(row.in_stock)
            : row.status !== undefined
              ? String(row.status).toLowerCase() !== 'out_of_stock'
              : true;

      return {
        id: (row.id as string | number) || name,
        name,
        price: formatPrice(row.price),
        description: (row.description || row.desc || '') as string,
        image: resolvedImg || getProductFallbackImage(name),
        isAvailable,
        isPublished: true,
      };
    });

    return { data: products, isLive: true, error: null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn('[Supabase] Exception fetching products:', msg);
    return { data: DEFAULT_PRODUCTS, isLive: false, error: msg };
  }
}
