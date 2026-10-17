import React, { useState } from 'react';
import { initialNoticeData } from './data/defaultNotice';
import { NoticeData } from './types/notice';
import { DocumentSheet } from './components/DocumentSheet';
import { Printer } from 'lucide-react';

export default function App() {
  const [data] = useState<NoticeData>(initialNoticeData);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 flex flex-col font-sans relative">
      {/* Single PDF / Print Button in the Corner */}
      <div className="no-print fixed top-5 right-5 z-50">
        <button
          type="button"
          onClick={handlePrint}
          className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] border border-slate-700 cursor-pointer"
          title="Распечатать или сохранить в PDF"
        >
          <Printer className="w-4 h-4 text-blue-400" />
          <span>Печать / Скачать PDF</span>
        </button>
      </div>

      {/* Main Document View */}
      <main className="flex-1 overflow-auto p-4 sm:p-10 flex flex-col items-center justify-start">
        <DocumentSheet
          data={data}
          isEditing={false}
          onUpdate={() => {}}
        />
      </main>
    </div>
  );
}
