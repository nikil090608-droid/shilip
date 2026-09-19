import React, { useState } from 'react';
import {
  IdolConfig,
  MandalConfig,
  MandalItemType,
  MandalTheme,
  PlacedMandalItem,
  RangoliDesign,
} from '../../types';
import {
  MANDAL_ITEMS_CATALOG,
  MANDAL_THEMES,
  MandalItemDefinition,
} from '../../utils/gameLogic';
import { MandalRenderer } from '../MandalRenderer';
import { RangoliDrawerModal } from '../modals/RangoliDrawerModal';
import { sound } from '../../utils/audio';
import {
  Sparkles,
  Sprout,
  Coins,
  Palette,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Info,
  Plus,
  RefreshCw,
  Volume2,
} from 'lucide-react';

interface StageMandalBuilderProps {
  config: IdolConfig;
  mandalConfig: MandalConfig;
  onUpdateMandalConfig: (partial: Partial<MandalConfig>) => void;
  onNext: () => void;
}

type ItemFilterCategory = 'all' | 'decor' | 'eco' | 'culture' | 'civic';

export const StageMandalBuilder: React.FC<StageMandalBuilderProps> = ({
  config,
  mandalConfig,
  onUpdateMandalConfig,
  onNext,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ItemFilterCategory>('all');
  const [activeItemToPlace, setActiveItemToPlace] = useState<MandalItemDefinition | null>(null);
  const [selectedPlacedInstanceId, setSelectedPlacedInstanceId] = useState<string | null>(null);
  const [isRangoliModalOpen, setIsRangoliModalOpen] = useState<boolean>(false);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  const budgetTotal = mandalConfig.budgetTotal || 10000;
  const budgetSpent = mandalConfig.budgetSpent || 0;
  const budgetRemaining = budgetTotal - budgetSpent;

  // Filter items in catalog
  const filteredCatalog = MANDAL_ITEMS_CATALOG.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const showNotice = (msg: string) => {
    setFeedbackNotice(msg);
    setTimeout(() => setFeedbackNotice(null), 3500);
  };

  // Change Theme
  const handleSelectTheme = (themeId: MandalTheme) => {
    sound.playClick();
    onUpdateMandalConfig({ theme: themeId });
  };

  // Select Item from Toolbox to place
  const handleSelectItemToPlace = (itemDef: MandalItemDefinition) => {
    if (budgetRemaining < itemDef.cost) {
      sound.playClick();
      showNotice('⚠️ Budget limit reached! Remove some items or choose affordable eco-decor.');
      return;
    }
    sound.playClick();
    setActiveItemToPlace(itemDef);
  };

  // Place item onto visual canvas
  const handleCanvasClick = (clickX: number, clickY: number) => {
    if (!activeItemToPlace) {
      setSelectedPlacedInstanceId(null);
      return;
    }

    if (budgetRemaining < activeItemToPlace.cost) {
      showNotice('⚠️ Not enough budget for this item.');
      setActiveItemToPlace(null);
      return;
    }

    // Default bounds check so items don't sit offscreen
    const clampedX = Math.max(10, Math.min(90, clickX));
    const clampedY = Math.max(15, Math.min(88, clickY));

    const newItem: PlacedMandalItem = {
      instanceId: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: activeItemToPlace.type,
      x: clampedX,
      y: clampedY,
      cost: activeItemToPlace.cost,
      ecoScoreDelta: activeItemToPlace.ecoScoreDelta,
      name: activeItemToPlace.name,
      icon: activeItemToPlace.icon,
    };

    sound.playPlacement();
    sound.playCoinSpent();

    const newPlaced = [...mandalConfig.placedItems, newItem];
    const newSpent = mandalConfig.budgetSpent + activeItemToPlace.cost;

    onUpdateMandalConfig({
      placedItems: newPlaced,
      budgetSpent: newSpent,
    });

    showNotice(`✨ Placed ${activeItemToPlace.name}! (-₹${activeItemToPlace.cost})`);
    setActiveItemToPlace(null);
  };

  // Quick auto-add without canvas pinpointing
  const handleQuickAdd = (itemDef: MandalItemDefinition) => {
    if (budgetRemaining < itemDef.cost) {
      showNotice('⚠️ Not enough budget for this item.');
      return;
    }

    // Determine a pleasant staggered default coordinate based on count
    const count = mandalConfig.placedItems.length;
    const presets = [
      { x: 18, y: 35 },
      { x: 82, y: 35 },
      { x: 20, y: 72 },
      { x: 80, y: 72 },
      { x: 30, y: 82 },
      { x: 70, y: 82 },
      { x: 50, y: 22 },
      { x: 15, y: 55 },
      { x: 85, y: 55 },
    ];
    const targetCoord = presets[count % presets.length];

    const newItem: PlacedMandalItem = {
      instanceId: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: itemDef.type,
      x: targetCoord.x,
      y: targetCoord.y,
      cost: itemDef.cost,
      ecoScoreDelta: itemDef.ecoScoreDelta,
      name: itemDef.name,
      icon: itemDef.icon,
    };

    sound.playPlacement();
    sound.playCoinSpent();

    const newPlaced = [...mandalConfig.placedItems, newItem];
    const newSpent = mandalConfig.budgetSpent + itemDef.cost;

    onUpdateMandalConfig({
      placedItems: newPlaced,
      budgetSpent: newSpent,
    });

    showNotice(`✨ Added ${itemDef.name}! (-₹${itemDef.cost})`);
  };

  // Remove a placed item
  const handleRemoveItem = (instanceId: string) => {
    const itemToRemove = mandalConfig.placedItems.find((i) => i.instanceId === instanceId);
    if (!itemToRemove) return;

    sound.playClick();
    const newPlaced = mandalConfig.placedItems.filter((i) => i.instanceId !== instanceId);
    const newSpent = Math.max(0, mandalConfig.budgetSpent - itemToRemove.cost);

    onUpdateMandalConfig({
      placedItems: newPlaced,
      budgetSpent: newSpent,
    });

    setSelectedPlacedInstanceId(null);
    showNotice(`Removed ${itemToRemove.name} (+₹${itemToRemove.cost} refunded)`);
  };

  // Reposition placed item via drag-and-drop
  const handleItemMove = (instanceId: string, newX: number, newY: number) => {
    onUpdateMandalConfig({
      placedItems: mandalConfig.placedItems.map((item) =>
        item.instanceId === instanceId ? { ...item, x: newX, y: newY } : item
      ),
    });
  };

  // Clear all items
  const handleClearAll = () => {
    sound.playClick();
    onUpdateMandalConfig({
      placedItems: [],
      budgetSpent: 0,
    });
    setSelectedPlacedInstanceId(null);
    showNotice('Cleared all mandal decorations.');
  };

  // Handle Rangoli completion
  const handleCompleteRangoli = (design: RangoliDesign) => {
    onUpdateMandalConfig({
      rangoliCompleted: true,
      rangoliDesign: design,
    });
    showNotice('🪷 Sacred Rangoli laid at Bappa’s feet (+15 Creativity & +12 Eco)!');
  };

  // Play Dhol percussion sound
  const handlePlayDhol = () => {
    sound.playPlacement();
    setTimeout(() => sound.playPlacement(), 120);
    setTimeout(() => sound.playPlacement(), 250);
    showNotice('🥁 Nashik Dhol Tasha rhythm resonates through the mandal!');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-3 flex flex-col justify-between min-h-[85vh]">
      {/* Top Mandal Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-2">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Phase 2 • Mandal Architecture & Community Sanctum
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-amber-100">
            Build Bappa’s Sacred Mandal
          </h2>
          <p className="text-xs text-stone-300">
            Enthrone your handcrafted Ganesha and design an eco-friendly festival sanctum within budget.
          </p>
        </div>

        {/* Live Budget & Score Dashboard Bar */}
        <div className="flex items-center gap-2.5 bg-stone-900/90 border border-amber-800/60 rounded-2xl px-4 py-2 shadow-lg">
          {/* Budget Widget */}
          <div className="flex items-center gap-2 pr-3 border-r border-stone-800">
            <Coins className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-[10px] text-stone-400 block uppercase font-bold">
                Budget Remaining
              </span>
              <span
                className={`text-sm font-bold font-heading ${
                  budgetRemaining > 3000
                    ? 'text-emerald-400'
                    : budgetRemaining >= 0
                    ? 'text-amber-300'
                    : 'text-red-400'
                }`}
              >
                ₹{budgetRemaining.toLocaleString()} / ₹{budgetTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Placed Items Count */}
          <div className="px-2">
            <span className="text-[10px] text-stone-400 block uppercase font-bold">Decor Items</span>
            <span className="text-sm font-bold text-amber-200">
              {mandalConfig.placedItems.length} placed
            </span>
          </div>

          {/* Quick Rangoli Status */}
          <button
            onClick={() => setIsRangoliModalOpen(true)}
            className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              mandalConfig.rangoliCompleted
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                : 'bg-amber-950/60 text-amber-300 border-amber-600 hover:bg-amber-900/60'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>{mandalConfig.rangoliCompleted ? '🪷 Rangoli Active' : '+ Draw Rangoli'}</span>
          </button>
        </div>
      </div>

      {/* Theme Selector Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-2 scrollbar-none">
        <span className="text-xs text-amber-400 font-bold uppercase tracking-wider whitespace-nowrap mr-1">
          Theme:
        </span>
        {MANDAL_THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleSelectTheme(theme.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
              mandalConfig.theme === theme.id
                ? `${theme.pillColor} shadow-md font-bold scale-102`
                : 'bg-stone-900 text-stone-400 border-stone-800 hover:bg-stone-850 hover:text-stone-200'
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 items-stretch">
        {/* Left/Center: Visual Mandal Canvas (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full h-80 sm:h-[420px] bg-stone-950 rounded-2xl border-2 border-amber-900/70 shadow-2xl overflow-hidden">
            <MandalRenderer
              config={config}
              mandalConfig={mandalConfig}
              interactive={true}
              onCanvasClick={handleCanvasClick}
              onItemClick={(instId) => setSelectedPlacedInstanceId(instId)}
              onItemMove={handleItemMove}
              selectedItemInstanceId={selectedPlacedInstanceId}
              activeItemTypeToPlace={activeItemToPlace?.type || null}
            />

            {/* Selected item floating action bar */}
            {selectedPlacedInstanceId && (
              <div className="absolute bottom-3 left-4 right-4 bg-stone-900/95 border border-amber-500/60 rounded-xl p-2.5 backdrop-blur-md flex items-center justify-between shadow-xl animate-fade-in">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-200">
                    Selected Item:{' '}
                    {mandalConfig.placedItems.find((i) => i.instanceId === selectedPlacedInstanceId)?.name}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveItem(selectedPlacedInstanceId)}
                  className="flex items-center gap-1.5 py-1 px-3 bg-red-950/80 hover:bg-red-900 text-red-300 rounded-lg text-xs font-semibold border border-red-700/60 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove & Refund</span>
                </button>
              </div>
            )}

            {/* Live Placement Instruction Badge */}
            {activeItemToPlace && (
              <div className="absolute top-3 left-3 right-3 bg-amber-950/90 border border-amber-400 rounded-xl p-2 text-center text-xs text-amber-200 font-bold shadow-lg animate-pulse">
                Click anywhere on the Mandal stage to position {activeItemToPlace.icon} {activeItemToPlace.name}
              </div>
            )}
          </div>

          {/* Bottom Stage Controls & Feedback */}
          <div className="w-full flex items-center justify-between mt-2 px-1">
            <div className="text-xs text-stone-400">
              {feedbackNotice ? (
                <span className="text-amber-300 font-medium animate-fade-in">
                  {feedbackNotice}
                </span>
              ) : (
                <span>Click stage to place • Drag items to reposition • Tap placed items to remove</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayDhol}
                className="py-1 px-2.5 bg-stone-850 hover:bg-stone-800 text-amber-300 text-xs font-semibold rounded-lg border border-amber-900/50 flex items-center gap-1"
                title="Play Dhol percussion rhythm"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Play Dhol</span>
              </button>

              {mandalConfig.placedItems.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="py-1 px-2.5 bg-stone-850 hover:bg-stone-800 text-stone-400 hover:text-stone-200 text-xs rounded-lg border border-stone-800 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Decorator Toolbox & Categories (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col bg-stone-900/80 border border-amber-950/90 rounded-2xl p-3 sm:p-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'decor', label: '🌺 Sacred Decor' },
              { id: 'eco', label: '🌱 Eco & Nature' },
              { id: 'culture', label: '🥁 Culture' },
              { id: 'civic', label: '♿ Community' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat.id as ItemFilterCategory);
                }}
                className={`py-1 px-2.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600/30 border-amber-400 text-amber-200'
                    : 'bg-stone-800/80 border-stone-700/60 text-stone-400 hover:text-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Item Catalog List */}
          <div className="flex-1 overflow-y-auto max-h-[380px] space-y-2 pr-1 scrollbar-thin">
            {filteredCatalog.map((itemDef) => {
              const isAffordable = budgetRemaining >= itemDef.cost;
              const countOfThisType = mandalConfig.placedItems.filter(
                (i) => i.type === itemDef.type
              ).length;

              return (
                <div
                  key={itemDef.type}
                  className={`p-2.5 rounded-xl border transition-all flex flex-col justify-between gap-1.5 ${
                    activeItemToPlace?.type === itemDef.type
                      ? 'bg-amber-950/70 border-amber-400 shadow-md ring-1 ring-amber-400'
                      : isAffordable
                      ? 'bg-stone-850/80 hover:bg-stone-800 border-stone-700/70'
                      : 'bg-stone-900/40 border-stone-800 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{itemDef.icon}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-amber-100">
                            {itemDef.name}
                          </span>
                          {countOfThisType > 0 && (
                            <span className="text-[10px] px-1.5 py-0.2 bg-amber-950 text-amber-400 border border-amber-800 rounded-full font-bold">
                              x{countOfThisType}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-stone-400 line-clamp-1">
                          {itemDef.description}
                        </span>
                      </div>
                    </div>

                    <div className="text-right whitespace-nowrap">
                      <span className="text-xs font-bold font-heading text-amber-300 block">
                        ₹{itemDef.cost}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold">
                        +{itemDef.ecoScoreDelta} Eco
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-stone-800/60">
                    <button
                      disabled={!isAffordable}
                      onClick={() => handleSelectItemToPlace(itemDef)}
                      className={`py-1 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-all ${
                        activeItemToPlace?.type === itemDef.type
                          ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                          : isAffordable
                          ? 'bg-stone-800 hover:bg-stone-750 text-amber-200 border-amber-900/60'
                          : 'bg-stone-900 text-stone-600 border-stone-800 cursor-not-allowed'
                      }`}
                    >
                      <Plus className="w-3 h-3" />
                      <span>Pinpoint Place</span>
                    </button>

                    <button
                      disabled={!isAffordable}
                      onClick={() => handleQuickAdd(itemDef)}
                      className={`py-1 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                        isAffordable
                          ? 'bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold shadow-sm'
                          : 'bg-stone-800 text-stone-600 cursor-not-allowed'
                      }`}
                    >
                      <span>+ Quick Add</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Proceed Bar */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-amber-950/80">
        <div className="flex items-center gap-2 text-xs text-stone-400">
          <Sprout className="w-4 h-4 text-emerald-400" />
          <span>
            Balanced sanctums with natural plants, segregated bins & ramps earn the highest Shilpi honors!
          </span>
        </div>

        <button
          onClick={() => {
            sound.playCelebrationChime();
            sound.playTempleBell();
            onNext();
          }}
          className="flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 text-stone-950 font-extrabold text-sm shadow-xl transition-all hover:scale-102"
        >
          <span>PRANA PRATISHTHA & DARSHAN</span>
          <ArrowRight className="w-4 h-4 text-stone-950" />
        </button>
      </div>

      {/* Rangoli Drawer Modal */}
      <RangoliDrawerModal
        isOpen={isRangoliModalOpen}
        onClose={() => setIsRangoliModalOpen(false)}
        onCompleteRangoli={handleCompleteRangoli}
        isCompleted={mandalConfig.rangoliCompleted}
      />
    </div>
  );
};
