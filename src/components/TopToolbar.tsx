import React, { useRef } from 'react';
import {
  Edit3,
  Eye,
  Printer,
  Copy,
  SlidersHorizontal,
  RotateCcw,
  UploadCloud,
  Check,
} from 'lucide-react';

interface TopToolbarProps {
  isEditing: boolean;
  onToggleEdit: () => void;
  onOpenExport: () => void;
  onOpenDrawer: () => void;
  onReset: () => void;
  onPhotoUpload: (fileUrl: string) => void;
}

export const TopToolbar: React.FC<TopToolbarProps> = ({
  isEditing,
  onToggleEdit,
  onOpenExport,
  onOpenDrawer,
  onReset,
  onPhotoUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (typeof loadEvent.target?.result === 'string') {
          onPhotoUpload(loadEvent.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="no-print sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white px-4 py-2.5">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-tight text-white text-sm sm:text-base whitespace-nowrap shrink-0">
            Ożaropol Official Notice
          </span>
          <span className="hidden sm:inline-block text-slate-500 text-xs">·</span>
          <span className="hidden sm:inline-block text-xs text-slate-400">
            Генератор карточки учета
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {/* Mode Switch */}
          <button
            type="button"
            onClick={onToggleEdit}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
              isEditing
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {isEditing ? (
              <>
                <Edit3 className="w-3.5 h-3.5" /> Редактирование вкл.
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" /> Предпросмотр (готово)
              </>
            )}
          </button>

          {/* Quick Photo Upload */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            title="Загрузить фотографию"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Загрузить фото</span>
            <span className="md:hidden">Фото</span>
          </button>

          {/* Fields Drawer */}
          <button
            type="button"
            onClick={onOpenDrawer}
            className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            title="Открыть форму полей"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Панель полей</span>
            <span className="md:hidden">Поля</span>
          </button>

          {/* Copy Data for Assistant */}
          <button
            type="button"
            onClick={onOpenExport}
            className="px-3.5 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap shrink-0"
            title="Скопировать данные для передачи ассистенту"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Передать данные ассистенту</span>
          </button>

          {/* Print */}
          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            title="Распечатать или сохранить в PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Печать / PDF</span>
          </button>

          {/* Reset */}
          <button
            type="button"
            onClick={onReset}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Сбросить к исходному шаблону"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
