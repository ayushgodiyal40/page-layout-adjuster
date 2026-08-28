import React, { useState } from 'react';
import { Page, PageOrientation, SourcePhoto } from '../types';
import { Printer, X, CheckCircle, Info } from 'lucide-react';

interface PrintModalProps {
  pages: Page[];
  sourcePhotos: SourcePhoto[];
  orientation: PageOrientation;
  globalGrayscale: boolean;
  onClose: () => void;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  pages,
  orientation,
  globalGrayscale,
  onClose,
}) => {
  const [selectedRange, setSelectedRange] = useState<'all' | 'current'>('all');
  const [copies, setCopies] = useState<number>(1);
  const [use100PercentScale, setUse100PercentScale] = useState<boolean>(true);

  const handleTriggerPrint = () => {
    window.print();
    onClose();
  };

  return (
    <div
      id="print-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150"
    >
      <div
        id="print-modal-dialog"
        className="bg-neutral-900 border border-neutral-700 text-neutral-100 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-semibold tracking-tight">Print Preparation</h2>
          </div>
          <button
            id="print-modal-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 space-y-2">
            <div className="flex justify-between items-center text-neutral-300">
              <span className="text-neutral-400">Paper Standard:</span>
              <span className="font-semibold text-white">ISO A4 (210 × 297 mm)</span>
            </div>
            <div className="flex justify-between items-center text-neutral-300">
              <span className="text-neutral-400">Orientation:</span>
              <span className="font-semibold text-white capitalize">{orientation}</span>
            </div>
            <div className="flex justify-between items-center text-neutral-300">
              <span className="text-neutral-400">Total Document Pages:</span>
              <span className="font-semibold text-indigo-400">{pages.length} Page(s)</span>
            </div>
            <div className="flex justify-between items-center text-neutral-300">
              <span className="text-neutral-400">Color Mode:</span>
              <span className="font-semibold text-white">
                {globalGrayscale ? 'Grayscale (B&W)' : 'Full Color (RGB / CMYK)'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Print Range</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  id="print-range-all"
                  onClick={() => setSelectedRange('all')}
                  className={`px-3 py-2 rounded-lg border text-left transition-colors ${
                    selectedRange === 'all'
                      ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                      : 'bg-neutral-800/60 border-neutral-700 text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <div className="font-semibold">All Pages ({pages.length})</div>
                  <div className="text-[11px] text-neutral-400">Print entire document</div>
                </button>
                <button
                  type="button"
                  id="print-range-current"
                  onClick={() => setSelectedRange('current')}
                  className={`px-3 py-2 rounded-lg border text-left transition-colors ${
                    selectedRange === 'current'
                      ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                      : 'bg-neutral-800/60 border-neutral-700 text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <div className="font-semibold">Current Page Only</div>
                  <div className="text-[11px] text-neutral-400">Active canvas page</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Copies</label>
              <input
                id="print-input-copies"
                type="number"
                min="1"
                max="50"
                value={copies}
                onChange={(e) => setCopies(Math.max(1, Number(e.target.value)))}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-1.5 text-white font-mono text-xs"
              />
            </div>

            {/* Crucial Actual Size / 100% warning */}
            <div className="p-3 bg-amber-950/30 border border-amber-800/50 rounded-lg text-amber-200 flex gap-2.5 items-start">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <div className="font-semibold text-amber-300 mb-0.5">
                  Important for Accurate Photo Dimensions:
                </div>
                In your browser&apos;s print dialog, ensure <strong>Scale</strong> is set to{' '}
                <strong>Actual Size / 100%</strong> (not &quot;Fit to printable area&quot;) so photo
                dimensions remain 100% physically exact.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-800 bg-neutral-950">
          <button
            id="print-cancel-btn"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-colors"
          >
            Cancel
          </button>
          <button
            id="print-proceed-btn"
            onClick={handleTriggerPrint}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow transition-colors"
          >
            <Printer className="w-4 h-4" />
            Open Print Dialog
          </button>
        </div>
      </div>
    </div>
  );
};
