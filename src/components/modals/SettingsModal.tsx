import React from 'react';
import { X, Volume2, VolumeX, Eye, Trash2, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isMuted,
  onToggleMute,
}) => {
  const [clearedNotice, setClearedNotice] = React.useState(false);

  if (!isOpen) return null;

  const handleClearCache = () => {
    sound.playClick();
    if (window.confirm('Clear all saved handcrafted Bappas from your local storage?')) {
      localStorage.removeItem('shilpi_saved_creations_v1');
      setClearedNotice(true);
      setTimeout(() => setClearedNotice(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-stone-900 border-2 border-amber-600/60 rounded-2xl shadow-2xl p-6 text-amber-50">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-amber-400 hover:text-amber-200 hover:bg-stone-800 transition-colors"
          aria-label="Close settings"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold font-heading text-amber-200 mb-1">
          Workshop Settings
        </h2>
        <p className="text-xs text-stone-400 mb-6">
          Adjust sound and local workshop preferences
        </p>

        <div className="space-y-4">
          {/* Audio toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-800/80 border border-stone-700">
            <div className="flex items-center gap-3">
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-stone-400" />
              ) : (
                <Volume2 className="w-5 h-5 text-amber-400" />
              )}
              <div>
                <span className="text-sm font-semibold text-stone-100 block">Sound Effects & Bells</span>
                <span className="text-xs text-stone-400">Web Audio bells, dhol, & clay cues</span>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onToggleMute();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                !isMuted ? 'bg-amber-600 text-white' : 'bg-stone-700 text-stone-300'
              }`}
            >
              {!isMuted ? 'ON' : 'MUTED'}
            </button>
          </div>

          {/* Local Storage Data */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-800/80 border border-stone-700">
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-stone-400" />
              <div>
                <span className="text-sm font-semibold text-stone-100 block">Clear Saved Creations</span>
                <span className="text-xs text-stone-400">Reset local browser creations</span>
              </div>
            </div>
            <button
              onClick={handleClearCache}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-700 hover:bg-red-950 hover:text-red-300 text-stone-300 transition-colors"
            >
              Reset Data
            </button>
          </div>

          {clearedNotice && (
            <div className="p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Local creation cache has been cleared!
            </div>
          )}

          {/* Devotional Note */}
          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-900/40 text-center">
            <p className="text-[11px] text-amber-300/80 italic">
              SHILPI v1.0.0 • Ganesh Chaturthi Special Edition<br />
              “Make with Mitti. Celebrate with Bhakti.”
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
