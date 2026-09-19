export type GameStage =
  | 'menu'
  | 'story'
  | 'material'
  | 'clay-prep'
  | 'build-body'
  | 'face-trunk'
  | 'crown'
  | 'decorate'
  | 'colors'
  | 'eco-choice'
  | 'naming'
  | 'bappa-ready'
  | 'mandal-builder'
  | 'final-reveal'
  | 'score';

export type SculptStep =
  | 'lump'
  | 'base'
  | 'body'
  | 'belly'
  | 'head'
  | 'ears'
  | 'trunk'
  | 'arms'
  | 'legs'
  | 'face'
  | 'crown'
  | 'ornaments'
  | 'colors'
  | 'complete';

export type MaterialType = 'natural-clay' | 'paper-pulp' | 'plaster-of-paris';

export interface ClayState {
  waterLevel: number; // 0-100 (ideal 45-65)
  kneadProgress: number; // 0-100
  pressProgress: number; // 0-100
  shapeProgress: number; // 0-100
  airBubblesRemaining: number; // 5 -> 0
  quality: number; // 0-100
  status: 'dry' | 'perfect' | 'soft' | 'needs-work';
  message: string;
}

export type BodySize = 'small' | 'medium' | 'large';
export type BodyPosture = 'sitting' | 'standing' | 'blessing';

export type EyeStyle = 'calm' | 'joyful' | 'traditional';
export type EarStyle = 'classic' | 'wide' | 'decorative';
export type TrunkDirection = 'left' | 'right' | 'center';
export type ExpressionType = 'peaceful' | 'joyful' | 'blessing';

export type CrownStyle = 'traditional' | 'flower' | 'leaf' | 'simple';
export type CrownAccent = 'natural-gold' | 'earth-clay' | 'turmeric' | 'leaf-green' | 'vermilion';

export type DecorationId =
  | 'marigold-garland'
  | 'sacred-durva'
  | 'clay-diya'
  | 'sacred-janeyu'
  | 'golden-modak-plate'
  | 'mooshak-companion'
  | 'rudraksha-beads';

export interface DecorationSlot {
  id: DecorationId;
  name: string;
  category: 'garland' | 'offering' | 'sacred' | 'companion';
  description: string;
  isEco: boolean;
  ecoScoreDelta: number;
}

export type PaletteId = 'earth' | 'turmeric' | 'kumkum' | 'leaf' | 'marigold';

export interface ColorPalette {
  id: PaletteId;
  name: string;
  description: string;
  bodyTone: string;
  dhotiTone: string;
  accentTone: string;
  tilakTone: string;
  isNaturalCertified: boolean;
  ecoScoreDelta: number;
}

export type EcoChoiceType = 'natural' | 'reusable' | 'single-use';

export interface IdolConfig {
  material: MaterialType;
  clayQuality: number;
  bodySize: BodySize;
  bodyPosture: BodyPosture;
  eyeStyle: EyeStyle;
  earStyle: EarStyle;
  trunkDirection: TrunkDirection;
  expression: ExpressionType;
  crownStyle: CrownStyle;
  crownAccent: CrownAccent;
  decorations: DecorationId[];
  paletteId: PaletteId;
  ecoChoice: EcoChoiceType;
  name: string;
}

export type MandalTheme =
  | 'traditional'
  | 'eco-nature'
  | 'village'
  | 'royal-festival'
  | 'modern-indian';

export type MandalItemType =
  | 'flowers'
  | 'diyas'
  | 'leaves'
  | 'rangoli'
  | 'lights'
  | 'dhol'
  | 'plants'
  | 'fabric'
  | 'eco-decor'
  | 'entrance'
  | 'seating'
  | 'accessibility'
  | 'safety'
  | 'waste-bins';

export interface PlacedMandalItem {
  instanceId: string;
  type: MandalItemType;
  x: number; // 5 - 95
  y: number; // 10 - 90
  cost: number;
  ecoScoreDelta: number;
  name: string;
  icon: string;
}

export interface RangoliPoint {
  id: number;
  x: number;
  y: number;
  active: boolean;
  color: string;
}

export interface RangoliDesign {
  pattern: 'lotus' | 'peacock' | 'mandala' | 'geometric';
  completed: boolean;
  points: RangoliPoint[];
}

export interface MandalConfig {
  theme: MandalTheme;
  placedItems: PlacedMandalItem[];
  budgetTotal: number; // 10,000
  budgetSpent: number;
  ecoScore: number;
  creativityScore: number;
  mandalScore: number;
  rangoliCompleted: boolean;
  rangoliDesign?: RangoliDesign;
}

export interface ScoreBreakdown {
  ganeshaScore: number;
  creativity: number;
  mandalScore: number;
  eco: number;
  budgetScore: number;
  learning: number;
  tradition: number;
  overall: number;
  shilpiTitle: string;
  badges: string[];
  ecoHighlights: string[];
  mandalHighlights: string[];
  summaryFeedback: string;
}

export interface SavedCreation {
  id: string;
  name: string;
  createdAt: string;
  config: IdolConfig;
  mandalConfig?: MandalConfig;
  scores: ScoreBreakdown;
}

export interface AudioSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number;
}
