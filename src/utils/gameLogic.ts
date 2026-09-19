import {
  ColorPalette,
  DecorationSlot,
  EcoChoiceType,
  IdolConfig,
  MandalConfig,
  MandalItemType,
  MandalTheme,
  MaterialType,
  SavedCreation,
  ScoreBreakdown,
} from '../types';

export interface MandalItemDefinition {
  type: MandalItemType;
  name: string;
  cost: number;
  ecoScoreDelta: number;
  creativityDelta: number;
  category: 'decor' | 'culture' | 'eco' | 'civic';
  icon: string;
  description: string;
  ecoTip?: string;
}

export const MANDAL_ITEMS_CATALOG: MandalItemDefinition[] = [
  {
    type: 'flowers',
    name: 'Marigold & Jasmine Garlands',
    cost: 300,
    ecoScoreDelta: 10,
    creativityDelta: 8,
    category: 'decor',
    icon: '🌺',
    description: 'Fresh, fragrant marigold & jasmine garlands that biodegrade into rich compost.',
    ecoTip: 'Natural flowers decompose quickly and can be recycled into plant fertilizers.',
  },
  {
    type: 'diyas',
    name: 'Handmade Terracotta Diyas',
    cost: 200,
    ecoScoreDelta: 12,
    creativityDelta: 6,
    category: 'decor',
    icon: '🪔',
    description: 'Pure Shaadu clay oil lamps with cotton wicks and cold-pressed oil.',
    ecoTip: 'Clay diyas are 100% natural, plastic-free, and support traditional local potters.',
  },
  {
    type: 'leaves',
    name: 'Sacred Mango Leaves Toran',
    cost: 250,
    ecoScoreDelta: 10,
    creativityDelta: 5,
    category: 'decor',
    icon: '🌿',
    description: 'Traditional auspicious doorway toran made from fresh mango leaves and jute string.',
    ecoTip: 'Traditional torans replace single-use plastic festoons completely.',
  },
  {
    type: 'rangoli',
    name: 'Natural Rice Powder Rangoli',
    cost: 300,
    ecoScoreDelta: 12,
    creativityDelta: 15,
    category: 'decor',
    icon: '🎨',
    description: 'Artistic welcoming floor patterns made with rice flour and botanical pigments.',
    ecoTip: 'Traditional rice powder also feeds harmless garden birds and ants.',
  },
  {
    type: 'lights',
    name: 'Energy-Saving Warm LED Strings',
    cost: 1000,
    ecoScoreDelta: 6,
    creativityDelta: 10,
    category: 'decor',
    icon: '💡',
    description: 'Low-voltage warm golden LED lights to illuminate Bappa with energy efficiency.',
    ecoTip: 'Modern LEDs consume up to 80% less electricity than incandescent festival bulbs.',
  },
  {
    type: 'dhol',
    name: 'Nashik Dhol-Tasha Troupe Area',
    cost: 900,
    ecoScoreDelta: 5,
    creativityDelta: 12,
    category: 'culture',
    icon: '🥁',
    description: 'Designated stage for traditional rhythm artists, celebrating without high-decibel DJ amplifiers.',
    ecoTip: 'Acoustic Indian instruments preserve folklore without causing heavy noise pollution.',
  },
  {
    type: 'plants',
    name: 'Living Potted Sacred Plants',
    cost: 500,
    ecoScoreDelta: 15,
    creativityDelta: 10,
    category: 'eco',
    icon: '🌱',
    description: 'Living potted Tulsi, flowering hibiscus, and dwarf banana plants that stay alive year-round.',
    ecoTip: 'Potted plants clean the air and continue thriving long after the festival concludes.',
  },
  {
    type: 'fabric',
    name: 'Reusable Khadi Cotton Drapes',
    cost: 700,
    ecoScoreDelta: 12,
    creativityDelta: 9,
    category: 'decor',
    icon: '🧵',
    description: 'Handwoven natural khadi and cotton textiles, reusable across festivals for years.',
    ecoTip: 'Reusable fabrics eliminate tons of non-recyclable plastic flex banners.',
  },
  {
    type: 'eco-decor',
    name: 'Upcycled Paper & Bamboo Decor',
    cost: 800,
    ecoScoreDelta: 15,
    creativityDelta: 14,
    category: 'eco',
    icon: '♻️',
    description: 'Recycled origami lanterns, carved coconut shells, and hand-woven jute ceiling hangings.',
    ecoTip: 'Upcycled crafts celebrate creativity while keeping landfill waste to zero.',
  },
  {
    type: 'entrance',
    name: 'Carved Wooden Welcome Toran',
    cost: 600,
    ecoScoreDelta: 8,
    creativityDelta: 10,
    category: 'civic',
    icon: '🚪',
    description: 'Majestic open archway crafted to welcome devotees with dignity and graceful airflow.',
  },
  {
    type: 'seating',
    name: 'Devotee Floor Mats & Baithak',
    cost: 400,
    ecoScoreDelta: 8,
    creativityDelta: 7,
    category: 'civic',
    icon: '👥',
    description: 'Natural woven grass mats and bolster cushions for serene bhajan and meditation.',
  },
  {
    type: 'accessibility',
    name: 'Wheelchair Ramp & Priority Zone',
    cost: 600,
    ecoScoreDelta: 12,
    creativityDelta: 10,
    category: 'civic',
    icon: '♿',
    description: 'Gentle ramp and dedicated seating ensuring elderly devotees and people of all abilities can visit.',
    ecoTip: 'True community celebration is inclusive and accessible to every devotee.',
  },
  {
    type: 'safety',
    name: 'Eco Fire-Sand & First Aid Station',
    cost: 400,
    ecoScoreDelta: 10,
    creativityDelta: 6,
    category: 'civic',
    icon: '🚨',
    description: 'Clean sand buckets, emergency medical kit, and clear illuminated exit passage.',
  },
  {
    type: 'waste-bins',
    name: 'Wet & Dry Waste Sorting Bins',
    cost: 350,
    ecoScoreDelta: 15,
    creativityDelta: 8,
    category: 'civic',
    icon: '🗑️',
    description: 'Segregated waste bins for flower/prasadam composting and dry waste recycling.',
    ecoTip: 'Sorting organic flower waste prevents litter and enables local municipal composting.',
  },
];

export interface MandalThemeDefinition {
  id: MandalTheme;
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  pillColor: string;
}

export const MANDAL_THEMES: MandalThemeDefinition[] = [
  {
    id: 'traditional',
    name: 'Traditional Wada',
    tagline: 'Classic Heritage & Brass Warmth',
    description: 'Carved teakwood pillar aesthetics, brass hanging deepas, and rich marigold garlands.',
    accentColor: '#b45309',
    pillColor: 'bg-amber-900/60 text-amber-200 border-amber-600',
  },
  {
    id: 'eco-nature',
    name: 'Eco Nature Sanctum',
    tagline: 'Living Bamboo, Banana Leaves & Terracotta',
    description: 'Sustainable bamboo poles, living tulsi plants, jute drapes, and organic earthen pots.',
    accentColor: '#15803d',
    pillColor: 'bg-emerald-950/70 text-emerald-300 border-emerald-600',
  },
  {
    id: 'village',
    name: 'Gramin Folk Village',
    tagline: 'Warli Art & Earthen Simplicity',
    description: 'Mud-plastered terracotta textures, authentic Warli painted borders, and woven cane canopies.',
    accentColor: '#9a3412',
    pillColor: 'bg-stone-900 text-orange-200 border-orange-700',
  },
  {
    id: 'royal-festival',
    name: 'Royal Durbar',
    tagline: 'Jharokha Arches & Imperial Splendor',
    description: 'Regal scalloped arches, deep crimson & gold brocade backdrops, and auspicious golden kalash.',
    accentColor: '#991b1b',
    pillColor: 'bg-red-950/70 text-amber-200 border-red-600',
  },
  {
    id: 'modern-indian',
    name: 'Modern Indian',
    tagline: 'Minimalist Clean Geometry & Sacred Lotus',
    description: 'Clean architectural lines, indirect warm ambient glow, and stylized brass lotus panels.',
    accentColor: '#78350f',
    pillColor: 'bg-stone-850 text-amber-300 border-stone-600',
  },
];

export const DEFAULT_MANDAL_CONFIG: MandalConfig = {
  theme: 'traditional',
  placedItems: [],
  budgetTotal: 10000,
  budgetSpent: 0,
  ecoScore: 45,
  creativityScore: 50,
  mandalScore: 50,
  rangoliCompleted: false,
};

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'earth',
    name: 'Mitti & Terracotta',
    description: 'Raw river clay, multani mitti, and roasted ochre tones.',
    bodyTone: '#b8754a', // Warm terracotta clay
    dhotiTone: '#8b4513',
    accentTone: '#e6c387',
    tilakTone: '#b91c1c',
    isNaturalCertified: true,
    ecoScoreDelta: 15,
  },
  {
    id: 'turmeric',
    name: 'Turmeric & Chandan',
    description: 'Golden haldi, auspicious sandalwood cream, and natural sun glow.',
    bodyTone: '#d9904e',
    dhotiTone: '#b45309', // Saffron amber
    accentTone: '#fbbf24', // Golden yellow
    tilakTone: '#991b1b',
    isNaturalCertified: true,
    ecoScoreDelta: 15,
  },
  {
    id: 'kumkum',
    name: 'Kumkum & Geru Red',
    description: 'Natural red earth pigments, vermilion accents, and temple vibes.',
    bodyTone: '#a45738',
    dhotiTone: '#991b1b', // Deep sacred red
    accentTone: '#f59e0b',
    tilakTone: '#fef08a',
    isNaturalCertified: true,
    ecoScoreDelta: 15,
  },
  {
    id: 'leaf',
    name: 'Neem & Forest Herbs',
    description: 'Herbal leaf extracts, organic forest moss, and gentle earth harmony.',
    bodyTone: '#9c7356',
    dhotiTone: '#15803d', // Sacred leaf green
    accentTone: '#86efac',
    tilakTone: '#dc2626',
    isNaturalCertified: true,
    ecoScoreDelta: 15,
  },
  {
    id: 'marigold',
    name: 'Genda (Marigold) Saffron',
    description: 'Festive marigold petals, saffron dawn, and rich ceremonial luster.',
    bodyTone: '#ba7748',
    dhotiTone: '#ea580c', // Bright marigold orange
    accentTone: '#fde047',
    tilakTone: '#7f1d1d',
    isNaturalCertified: true,
    ecoScoreDelta: 15,
  },
];

export const DECORATIONS_LIST: DecorationSlot[] = [
  {
    id: 'marigold-garland',
    name: 'Genda Haar (Marigold Garland)',
    category: 'garland',
    description: 'Fresh strings of orange and yellow marigold flowers with green leaves.',
    isEco: true,
    ecoScoreDelta: 10,
  },
  {
    id: 'sacred-durva',
    name: 'Sacred Durva Grass (21 Blades)',
    category: 'sacred',
    description: 'The cool, medicinal three-bladed grass most cherished by Lord Ganesha.',
    isEco: true,
    ecoScoreDelta: 12,
  },
  {
    id: 'clay-diya',
    name: 'Handcrafted Clay Diya',
    category: 'offering',
    description: 'Natural terracotta lamp with cotton wick and pure sesame oil light.',
    isEco: true,
    ecoScoreDelta: 10,
  },
  {
    id: 'sacred-janeyu',
    name: 'Cotton Janeyu (Sacred Thread)',
    category: 'sacred',
    description: 'Hand-spun natural raw cotton thread placed across the chest.',
    isEco: true,
    ecoScoreDelta: 8,
  },
  {
    id: 'golden-modak-plate',
    name: 'Fresh Ukadiche Modaks',
    category: 'offering',
    description: 'Traditional steamed rice-flour dumplings filled with jaggery and coconut.',
    isEco: true,
    ecoScoreDelta: 8,
  },
  {
    id: 'mooshak-companion',
    name: 'Devoted Mooshak (Mouse)',
    category: 'companion',
    description: 'Lord Ganesha’s humble vahana offering a sweet modak with folded paws.',
    isEco: true,
    ecoScoreDelta: 10,
  },
  {
    id: 'rudraksha-beads',
    name: 'Natural Rudraksha Mala',
    category: 'sacred',
    description: 'Seeds of the Elaeocarpus ganitrus tree hand-strung as sacred beads.',
    isEco: true,
    ecoScoreDelta: 8,
  },
];

export const INITIAL_IDOL_CONFIG: IdolConfig = {
  material: 'natural-clay',
  clayQuality: 85,
  bodySize: 'medium',
  bodyPosture: 'sitting',
  eyeStyle: 'calm',
  earStyle: 'classic',
  trunkDirection: 'left',
  expression: 'peaceful',
  crownStyle: 'traditional',
  crownAccent: 'natural-gold',
  decorations: ['marigold-garland', 'sacred-durva', 'clay-diya'],
  paletteId: 'earth',
  ecoChoice: 'natural',
  name: 'Shilpi Bappa',
};

export function calculateScores(
  config: IdolConfig,
  mandalConfig?: MandalConfig
): ScoreBreakdown {
  // 1. Ganesha Design Score (0 - 99)
  let ganeshaScore = 40;
  if (config.material === 'natural-clay') {
    ganeshaScore += 30;
  } else if (config.material === 'paper-pulp') {
    ganeshaScore += 20;
  } else {
    ganeshaScore += 8;
  }
  ganeshaScore += Math.round((config.clayQuality / 100) * 15);
  if (config.crownStyle !== 'simple') ganeshaScore += 5;
  if (config.decorations.length >= 3) ganeshaScore += 6;
  if (config.decorations.includes('sacred-durva')) ganeshaScore += 4;
  ganeshaScore = Math.min(99, Math.max(45, ganeshaScore));

  // 2. Eco Score (0 - 99)
  let eco = 30;
  if (config.material === 'natural-clay') eco += 35;
  else if (config.material === 'paper-pulp') eco += 22;
  else eco += 5;

  if (config.ecoChoice === 'natural') eco += 15;
  else if (config.ecoChoice === 'reusable') eco += 10;
  else eco -= 5;

  // Mandal eco contributors
  if (mandalConfig) {
    const types = new Set(mandalConfig.placedItems.map((i) => i.type));
    if (types.has('plants')) eco += 6;
    if (types.has('diyas')) eco += 5;
    if (types.has('fabric')) eco += 5;
    if (types.has('waste-bins')) eco += 8;
    if (types.has('eco-decor')) eco += 6;
    if (mandalConfig.theme === 'eco-nature') eco += 5;
  }
  eco = Math.min(99, Math.max(35, eco));

  // 3. Creativity Score (0 - 99)
  let creativity = 50;
  creativity += (config.clayQuality / 100) * 10;
  creativity += Math.min(10, config.decorations.length * 2.5);
  if (config.paletteId !== 'earth') creativity += 4;

  if (mandalConfig) {
    // Unique item types in mandal
    const uniqueTypes = new Set(mandalConfig.placedItems.map((i) => i.type)).size;
    creativity += Math.min(18, uniqueTypes * 3);
    if (mandalConfig.rangoliCompleted) creativity += 15;
    if (mandalConfig.placedItems.length >= 6) creativity += 6;
  }
  creativity = Math.min(99, Math.max(45, Math.round(creativity)));

  // 4. Mandal Score (0 - 99)
  let mandalScore = 50;
  if (mandalConfig) {
    const placedCount = mandalConfig.placedItems.length;
    mandalScore += Math.min(20, placedCount * 2.5);

    const types = new Set(mandalConfig.placedItems.map((i) => i.type));
    if (types.has('entrance')) mandalScore += 6;
    if (types.has('seating')) mandalScore += 6;
    if (types.has('accessibility')) mandalScore += 8;
    if (types.has('safety')) mandalScore += 8;
    if (types.has('waste-bins')) mandalScore += 6;
    if (types.has('dhol')) mandalScore += 5;
    if (mandalConfig.rangoliCompleted) mandalScore += 6;
  }
  mandalScore = Math.min(99, Math.max(45, Math.round(mandalScore)));

  // 5. Budget Stewardship Score (0 - 99)
  let budgetScore = 80;
  if (mandalConfig) {
    const spent = mandalConfig.budgetSpent;
    const total = mandalConfig.budgetTotal || 10000;
    if (spent <= total && spent >= 3000) {
      budgetScore = Math.round(75 + ((total - spent) / total) * 20);
    } else if (spent < 3000) {
      budgetScore = 70; // Under-utilized
    } else {
      budgetScore = 55; // Over-budget
    }
  }

  const learning = 85;
  const tradition = 88;

  // Composite Overall
  const overall = Math.round(
    ganeshaScore * 0.25 +
      mandalScore * 0.25 +
      eco * 0.25 +
      creativity * 0.15 +
      budgetScore * 0.1
  );

  // Dynamic Titles
  let shilpiTitle = 'Master Shilpi (Ecological Craftsman)';
  if (eco >= 90 && mandalScore >= 85) {
    shilpiTitle = 'Maha Shilpi (Supreme Craftsman & Pandal Architect)';
  } else if (eco >= 88) {
    shilpiTitle = 'Prakriti Shilpi (Supreme Eco-Artisan & Earth Guardian)';
  } else if (creativity >= 88) {
    shilpiTitle = 'Kala Shilpi (Divine Creative Sculptor & Designer)';
  } else if (mandalScore >= 88) {
    shilpiTitle = 'Utsav Shilpi (Grand Festival Community Organizer)';
  }

  // Badges
  const badges: string[] = [];
  if (config.material === 'natural-clay') badges.push('🌱 Mitti Swaroop (Pure Clay)');
  if (config.clayQuality >= 80) badges.push('✨ Perfect Clay Master');
  if (mandalConfig?.rangoliCompleted) badges.push('🎨 Rangoli Kala Pravin');
  if (mandalConfig?.placedItems.some((i) => i.type === 'accessibility')) {
    badges.push('♿ Sugamya Utsav (Inclusive Pandal)');
  }
  if (mandalConfig?.placedItems.some((i) => i.type === 'safety')) {
    badges.push('🚨 Suraksha Sannadha (Safety Prepared)');
  }
  if (mandalConfig?.placedItems.some((i) => i.type === 'waste-bins')) {
    badges.push('♻️ Swachh Mandal (Zero Waste Hero)');
  }
  if (config.ecoChoice === 'natural') badges.push('💧 Jal Samrakshak (Water Guardian)');

  // Educational Eco Highlights (carefully worded, non-exaggerated)
  const ecoHighlights: string[] = [
    'Handcrafted from natural, biodegradable clay that dissolves safely in water.',
    'Always follow local environmental guidelines for visarjan immersion.',
  ];

  if (mandalConfig?.placedItems.some((i) => i.type === 'waste-bins')) {
    ecoHighlights.push('Color-coded waste segregation keeps sacred flower nirmalya suitable for organic plant compost.');
  }
  if (mandalConfig?.placedItems.some((i) => i.type === 'fabric')) {
    ecoHighlights.push('Reusable khadi fabric drapes eliminate disposable plastic flex banners.');
  }
  if (mandalConfig?.placedItems.some((i) => i.type === 'plants')) {
    ecoHighlights.push('Living potted plants flourish long after the festive 10 days conclude.');
  }

  const mandalHighlights: string[] = [];
  if (mandalConfig) {
    mandalHighlights.push(`Selected ${mandalConfig.theme.toUpperCase()} architectural theme with central Ganesha sanctum.`);
    mandalHighlights.push(`Arranged ${mandalConfig.placedItems.length} sacred & civic installations within ₹${mandalConfig.budgetTotal} budget.`);
  }

  const summaryFeedback =
    'Your hands sculpted Bappa with deep bhakti and built an inclusive, eco-friendly Mandal that honors our sacred Earth.';

  return {
    ganeshaScore,
    creativity,
    mandalScore,
    eco,
    budgetScore,
    learning,
    tradition,
    overall,
    shilpiTitle,
    badges,
    ecoHighlights,
    mandalHighlights,
    summaryFeedback,
  };
}

export const calculateGameScores = calculateScores;

const STORAGE_KEY = 'shilpi_saved_creations_v1';

export function getSavedCreations(): SavedCreation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCreation(
  config: IdolConfig,
  scores: ScoreBreakdown,
  mandalConfig?: MandalConfig
): SavedCreation {
  const list = getSavedCreations();
  const newCreation: SavedCreation = {
    id: 'shilpi_' + Date.now().toString(36),
    name: config.name.trim() || 'Shilpi Bappa',
    createdAt: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    config,
    mandalConfig,
    scores,
  };

  const updated = [newCreation, ...list].slice(0, 15);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // quota exceeded or private mode
  }
  return newCreation;
}

export function deleteSavedCreation(id: string): SavedCreation[] {
  const list = getSavedCreations().filter((c) => c.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {}
  return list;
}
