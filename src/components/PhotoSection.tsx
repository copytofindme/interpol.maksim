import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { EditableText } from './EditableText';

interface PhotoSectionProps {
  photoUrl: string | null;
  photoDate: string;
  photoCaptionName: string;
  isEditing: boolean;
  onPhotoChange: (newUrl: string | null) => void;
  onDateChange: (newDate: string) => void;
  onNameChange: (newName: string) => void;
}

export const PhotoSection: React.FC<PhotoSectionProps> = ({
  photoUrl,
  photoDate,
  photoCaptionName,
  isEditing,
  onPhotoChange,
  onDateChange,
  onNameChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (typeof loadEvent.target?.result === 'string') {
          onPhotoChange(loadEvent.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isEditing) return;
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (typeof loadEvent.target?.result === 'string') {
          onPhotoChange(loadEvent.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center w-[235px] shrink-0">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Mugshot frame */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`relative w-[230px] h-[280px] bg-white border border-gray-400 overflow-hidden flex flex-col items-center justify-center select-none group ${
          isEditing ? 'cursor-pointer hover:border-blue-500' : ''
        }`}
        onClick={() => {
          if (isEditing && !photoUrl) {
            fileInputRef.current?.click();
          }
        }}
      >
        {photoUrl ? (
          <>
            <img
              src={photoUrl}
              alt={photoCaptionName}
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 no-print">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="px-2.5 py-1 bg-white text-slate-900 text-xs font-medium rounded shadow hover:bg-slate-100"
                  title="Заменить фотографию"
                >
                  Заменить
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPhotoChange(null);
                  }}
                  className="p-1 bg-red-600 text-white rounded shadow hover:bg-red-700"
                  title="Удалить фотографию"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center text-gray-400">
            {isEditing ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-slate-700">
                  Загрузить фото
                </span>
                <span className="text-[9.5px] text-slate-400 leading-tight">
                  Перетащите изображение или нажмите сюда
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-300">
                <ImageIcon className="w-8 h-8 opacity-40 mb-1" />
                <span className="text-[10px] tracking-wide uppercase text-gray-400">
                  [ Фотография ]
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Caption under photo */}
      <div className="w-full text-center mt-1.5 flex flex-col items-center">
        <EditableText
          value={photoCaptionName}
          onChange={onNameChange}
          isEditing={isEditing}
          className="font-bold text-[13.5px] leading-tight tracking-wide text-black uppercase"
          placeholder="ИМЯ СУБЪЕКТА"
        />
        <EditableText
          value={photoDate}
          onChange={onDateChange}
          isEditing={isEditing}
          className="text-[12px] leading-tight text-black mt-0.5"
          placeholder="Date of Image : MM/DD/YYYY"
        />
      </div>
    </div>
  );
};
