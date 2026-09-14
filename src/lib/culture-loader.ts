import provincesData from "@/data/provinces.json";

export type ProvinceMeta = {
  id: string;
  code: string;
  name: string;
  island: string;
  capital: string;
  population: string;
  area: string;
  funFact: string;
  stampIcon: string;
  filename: string;
  cultureProps?: {
    bajuAdat: string;
    tarian: string;
    rumahAdat: string;
    senjata: string;
    makanan: string;
    warisan: string;
    cagar: string;
    alatMusik: string;
    flora?: string;
    floraLatin?: string;
    floraEnglish?: string;
    fauna?: string;
    faunaLatin?: string;
    faunaEnglish?: string;
  };
};

export type CultureDetail = {
  id: string;
  nama: string;
  ibu_kota: string;
  luas_km2: number;
  jumlah_penduduk: number;
  budaya: {
    baju_adat: string;
    tarian: string;
    rumah_adat: string;
    senjata_tradisional: string;
    makanan_khas: string;
    warisan_budaya: string;
    cagar_budaya: string;
    alat_musik: string;
    flora?: string;
    flora_latin?: string;
    flora_english?: string;
    fauna?: string;
    fauna_latin?: string;
    fauna_english?: string;
  };
};

export const allProvincesMeta: ProvinceMeta[] = provincesData as ProvinceMeta[];

// Cache loaded culture details to avoid re-fetching
const cultureCache: Record<string, CultureDetail> = {};

// Glob import all JSON files in src/data/cultures dynamically
const cultureModules = import.meta.glob<CultureDetail>("@/data/cultures/*.json");

export async function loadProvinceCulture(filename: string): Promise<CultureDetail | null> {
  if (cultureCache[filename]) {
    return cultureCache[filename];
  }

  try {
    const key = `/src/data/cultures/${filename}`;
    if (cultureModules[key]) {
      const module = await cultureModules[key]();
      const data = (module as any).default || (module as any);
      cultureCache[filename] = data;
      return data;
    }
  } catch (error) {
    console.error(`Failed to lazy load culture detail for ${filename}:`, error);
  }

  return null;
}
