import React, { useState } from 'react';
import { X, Award, BookOpen, Video, Terminal, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ContestAboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContestAboutModal: React.FC<ContestAboutModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'contest' | 'features' | 'script' | 'dev'>('contest');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-stone-900 border-2 border-amber-500/70 rounded-2xl shadow-2xl p-6 text-amber-50">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-amber-400 hover:text-amber-200 hover:bg-stone-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 text-xs font-semibold mb-2">
            <Award className="w-4 h-4" /> Ganesh Chaturthi Game Design Contest
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-amber-200">
            SHILPI — CREATE YOUR GANESHA
          </h2>
          <p className="text-xs sm:text-sm text-amber-300/90 font-medium italic mt-1">
            “YOUR HANDS. YOUR BAPPA. OUR EARTH.” — Make with Mitti. Celebrate with Bhakti.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-700/80 mb-5 gap-2 overflow-x-auto pb-1">
          {[
            { id: 'contest', label: 'Contest Overview', icon: BookOpen },
            { id: 'features', label: 'Unique Features', icon: Sparkles },
            { id: 'script', label: '1-3 Min Demo Script', icon: Video },
            { id: 'dev', label: 'Tech & Local Run', icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-amber-600 text-white shadow'
                    : 'text-stone-400 hover:text-amber-200 hover:bg-stone-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Contest Overview */}
        {activeTab === 'contest' && (
          <div className="space-y-4 text-sm text-stone-200">
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/40">
              <h3 className="text-base font-bold text-amber-300 font-heading mb-1.5">
                Core Contest Concept
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                <strong>Shilpi</strong> is an interactive workshop game designed for the Ganesh Chaturthi Game Design Contest.
                Instead of being a generic trivia quiz or a repetitive clicker, the main gameplay empowers the player to
                <strong> handcraft and sculpt their own natural clay Ganesha idol</strong> from scratch.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700">
                <h4 className="font-semibold text-amber-300 text-xs uppercase tracking-wider mb-1">
                  🌱 Educational Mission
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Inspires families to choose Shaadu mitti (natural clay) over non-biodegradable plaster, and emphasizes home bucket or artificial tank immersion to safeguard water bodies.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700">
                <h4 className="font-semibold text-amber-300 text-xs uppercase tracking-wider mb-1">
                  🙏 Cultural Reverence
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  100% culturally respectful. Lord Ganesha is never placed in combat or harm. The entire journey radiates sacred craft, devotion (Bhakti), and community harmony.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50">
              <h4 className="font-semibold text-emerald-300 text-xs uppercase tracking-wider mb-1">
                The Shilpi Motto
              </h4>
              <p className="text-xs text-emerald-200 italic">
                “You didn't just choose a Ganesha. You created one. Your hands created the form. Your choices shaped the celebration. Your materials can help shape a cleaner tomorrow.”
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Unique Features */}
        {activeTab === 'features' && (
          <div className="space-y-3 text-sm text-stone-200">
            {[
              {
                title: 'Live Sculptural Transformation',
                desc: 'The idol is not a static picture. It visually evolves from a raw clay lump, to modeled torso, sculpted elephant head, crown, and sacred adornments.',
              },
              {
                title: 'Tactile Clay Preparation Mini-Game',
                desc: 'Authentic 5-step preparation (Water sprinkling, Kneading, Pressing, Shaping, Air bubble popping) with a real-time Clay Quality meter and sensory feedback.',
              },
              {
                title: 'Devotional Customization Depth',
                desc: 'Choose eye styles (Calm, Joyful, Classical), ear architecture (Classic fan, Supakarna winnowing, Scalloped), trunk directions (Idampuri, Valampuri, Urdhva), and postures (Padmasana, Sthanaka).',
              },
              {
                title: 'Authentic Offerings & Sacred Items',
                desc: '21 blades of sacred Durva grass, fresh Marigold garlands, cotton Janeyu, terracotta oil diya with living flame, and loyal Mooshak.',
              },
              {
                title: 'Natural Pigments Workshop',
                desc: 'Learn about Haldi (Turmeric), Chandan (Sandalwood), Geru (Red ochre), and Neem leaf pigments with non-toxic, eco-responsible education.',
              },
              {
                title: 'Integrated Multi-Dimensional Scoring',
                desc: 'Dynamic scoring across Eco, Creativity, Tradition, and Learning with authentic titles like "Prakriti Shilpi" and "Kala Shilpi".',
              },
              {
                title: 'Standalone High-Res PNG Share Card',
                desc: 'Instant client-side HTML5 Canvas rendering to download a personalized festival card for family and social celebration.',
              },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-stone-800/70 border border-stone-700/60">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-200 text-xs sm:text-sm">{f.title}</h4>
                  <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Demo Video Script */}
        {activeTab === 'script' && (
          <div className="space-y-3 text-xs sm:text-sm text-stone-300">
            <div className="p-3 bg-stone-800 rounded-xl border border-amber-800/40">
              <span className="font-bold text-amber-400 block mb-1">⏱️ 0:00 - 0:25 | Hook & Main Menu</span>
              <p className="leading-relaxed italic">
                “Every year, millions welcome Lord Ganesha. But what if this year, you created Bappa with your own hands? Welcome to SHILPI: Create Your Ganesha. Today, we step into a traditional Indian artisan workshop to sculpt an eco-friendly idol from natural river clay.”
              </p>
            </div>
            <div className="p-3 bg-stone-800 rounded-xl border border-amber-800/40">
              <span className="font-bold text-amber-400 block mb-1">⏱️ 0:25 - 1:00 | Mitti Preparation Mini-Game</span>
              <p className="leading-relaxed italic">
                “We select natural Shaadu clay for a +100 Eco Bonus. In Stage 2, we interactively prepare the mitti: sprinkling pure water, kneading out lumps, pressing, and popping trapped air bubbles until the quality meter glows '✨ PERFECT CLAY'!”
              </p>
            </div>
            <div className="p-3 bg-stone-800 rounded-xl border border-amber-800/40">
              <span className="font-bold text-amber-400 block mb-1">⏱️ 1:00 - 2:00 | Sculpting & Divine Customization</span>
              <p className="leading-relaxed italic">
                “Notice how our Ganesha dynamically comes alive! We sculpt the serene pot belly (Lambodara) and cross-legged Padmasana posture. Then, we carve meditative eyes, wide Supakarna ears, and an Idampuri left-turned trunk. We adorn Bappa with a fresh flower crown, 21 sacred Durva blades, and light a clay diya.”
              </p>
            </div>
            <div className="p-3 bg-stone-800 rounded-xl border border-amber-800/40">
              <span className="font-bold text-amber-400 block mb-1">⏱️ 2:00 - 3:00 | Cinematic Reveal & Impact</span>
              <p className="leading-relaxed italic">
                “We choose home-bucket immersion with plant seeds. In the final sanctum reveal, temple bells chime, marigold petals rain, and our Ganesha is revealed! With a 96/100 Eco Score and 'Prakriti Shilpi' title, we export our official share card. Your Hands. Your Bappa. Our Earth. Ganpati Bappa Morya!”
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Dev & Tech Instructions */}
        {activeTab === 'dev' && (
          <div className="space-y-4 text-xs sm:text-sm text-stone-200">
            <div className="p-3.5 bg-stone-950 rounded-xl font-mono text-stone-300 border border-stone-800">
              <span className="text-amber-400 font-bold block mb-2 font-sans text-xs">🚀 How to Run Locally</span>
              <code>git clone &lt;repo-url&gt;</code><br />
              <code>cd shilpi-ganesha</code><br />
              <code>npm install</code><br />
              <code>npm run dev</code><br />
              <span className="text-emerald-400 block mt-2 font-sans text-xs">Opens in browser at http://localhost:3000</span>
            </div>

            <div className="p-3.5 bg-stone-950 rounded-xl font-mono text-stone-300 border border-stone-800">
              <span className="text-amber-400 font-bold block mb-2 font-sans text-xs">📦 How to Deploy</span>
              <code>npm run build</code><br />
              <span className="text-stone-400 block mt-1 font-sans text-xs">Generates standalone static bundle in <code>dist/</code> ready for Cloud Run, Vercel, Netlify, or GitHub Pages. Zero backend requirements.</span>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-800/70 border border-stone-700">
              <h4 className="font-semibold text-amber-300 text-xs mb-1">🎮 Controls & Browser Support</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                • Mouse / Tap / Drag touch support for desktop & mobile.<br />
                • Sound synthesized via pure Web Audio API (no external mp3 files required).<br />
                • Canvas & SVG vector graphics ensure crisp rendering on 4K, tablets, and phones.<br />
                • Fully responsive across Chrome, Edge, Firefox, Safari, and Android/iOS browsers.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-stone-700/80 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all"
          >
            Close Presentation
          </button>
        </div>
      </div>
    </div>
  );
};
