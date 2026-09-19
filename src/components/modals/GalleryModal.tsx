import React from 'react';
import { X, Trophy, RefreshCw, Trash2, Download, Sparkles, Sprout } from 'lucide-react';
import { SavedCreation, IdolConfig, MandalConfig } from '../../types';
import { getSavedCreations, deleteSavedCreation } from '../../utils/gameLogic';
import { GaneshaRenderer } from '../GaneshaRenderer';
import { downloadShareCard } from '../../utils/canvasCard';
import { sound } from '../../utils/audio';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecreate: (config: IdolConfig, mandalConfig?: MandalConfig) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, onRecreate }) => {
  const [creations, setCreations] = React.useState<SavedCreation[]>([]);

  React.useEffect(() => {
    if (isOpen) {
      setCreations(getSavedCreations());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (id: string) => {
    sound.playClick();
    const updated = deleteSavedCreation(id);
    setCreations(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-stone-900 border-2 border-amber-600/60 rounded-2xl shadow-2xl p-6 text-amber-50">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-amber-400 hover:text-amber-200 hover:bg-stone-800 transition-colors"
          aria-label="Close gallery"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 text-xs font-semibold mb-2">
            <Trophy className="w-4 h-4" /> Sacred Workshop Records
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-amber-200">
            My Handcrafted Bappas
          </h2>
          <p className="text-sm text-stone-400 mt-1">
            Every Ganesha you have created with your hands and saved to your device.
          </p>
        </div>

        {creations.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-xl border border-dashed border-amber-800/60 bg-stone-800/40">
            <Sparkles className="w-12 h-12 text-amber-500/60 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-amber-200">No Handcrafted Bappas Yet</h3>
            <p className="text-sm text-stone-400 max-w-md mx-auto mt-1 mb-6">
              Step into the virtual workshop and mold your first natural clay Ganesha with your own hands!
            </p>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all"
            >
              Start Creating Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {creations.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-xl bg-stone-800/90 border border-amber-900/60 hover:border-amber-500/50 transition-all p-4 shadow-lg overflow-hidden"
              >
                <div>
                  <div className="relative w-full h-56 bg-radial from-amber-900/30 to-stone-950 rounded-lg overflow-hidden flex items-center justify-center border border-amber-950/80">
                    <GaneshaRenderer config={item.config} stage="final-reveal" className="w-48 h-56" />
                    <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-stone-900/85 border border-amber-500/30 text-[10px] font-semibold text-amber-300">
                      {item.config.material === 'natural-clay' ? '🌱 Shaadu Clay' : item.config.material === 'paper-pulp' ? '🪨 Paper Pulp' : '⚠️ Traditional PoP'}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-lg font-bold font-heading text-amber-100 truncate">
                        🙏 {item.name}
                      </h3>
                    </div>
                    <span className="text-[11px] text-stone-400 block">{item.createdAt}</span>

                    {/* Scores row */}
                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-700/60 text-center">
                      <div className="bg-stone-900/70 p-1.5 rounded-lg">
                        <span className="text-[10px] text-emerald-400 block font-semibold flex items-center justify-center gap-1">
                          <Sprout className="w-3 h-3" /> ECO
                        </span>
                        <span className="text-sm font-bold text-emerald-300">{item.scores.eco}</span>
                      </div>
                      <div className="bg-stone-900/70 p-1.5 rounded-lg">
                        <span className="text-[10px] text-amber-400 block font-semibold">🎨 CRAFT</span>
                        <span className="text-sm font-bold text-amber-300">{item.scores.creativity}</span>
                      </div>
                      <div className="bg-stone-900/70 p-1.5 rounded-lg">
                        <span className="text-[10px] text-orange-400 block font-semibold">⭐ TOTAL</span>
                        <span className="text-sm font-bold text-orange-300">{item.scores.overall}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-700/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      onRecreate(item.config, item.mandalConfig);
                      onClose();
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-200 text-xs font-semibold transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Re-enter Sanctum
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      downloadShareCard(item.config, item.scores, item.mandalConfig);
                    }}
                    className="p-2 rounded-lg bg-stone-700/60 hover:bg-stone-700 text-amber-300 hover:text-white transition-colors"
                    title="Export Share Card"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg bg-stone-700/60 hover:bg-red-950 text-stone-400 hover:text-red-400 transition-colors"
                    title="Delete Creation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
