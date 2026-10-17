import React, { useState } from 'react';
import { Copy, Check, Download, Upload, X, FileText } from 'lucide-react';
import { NoticeData } from '../types/notice';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: NoticeData;
  onImport: (importedData: NoticeData) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  data,
  onImport,
}) => {
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Format data clearly for the agent
  const generateAgentSummary = () => {
    return `ПОЖАЛУЙСТА, ЗАФИКСИРУЙ ЭТИ ДАННЫЕ В КОДЕ:

Данные оповещения:
- Заголовок: ${data.mainTitle}
- Дата шапки: ${data.headerDate} (${data.pageNumber})
- Имя субъекта: ${data.primaryInfo.name}
- Статус: ${data.primaryInfo.status}
- Обозначение: ${data.primaryInfo.designation}
- DOC#: ${data.primaryInfo.deptOfCorrection}
- Дата рождения: ${data.primaryInfo.dob}
- Раса: ${data.primaryInfo.race} | Пол: ${data.primaryInfo.sex} | Рост: ${data.primaryInfo.height} | Вес: ${data.primaryInfo.weight}
- Волосы: ${data.primaryInfo.hair} | Глаза: ${data.primaryInfo.eyes}
- Дисклеймер: ${data.legalDisclaimer}
- Псевдонимы: ${data.aliases}
- Адрес: ${data.addressInfo.addressHeader}, ${data.addressInfo.addressLine1}, ${data.addressInfo.addressLine2}
- Источник адреса: ${data.addressInfo.source}, ${data.addressInfo.receivedDate}, ${data.addressInfo.addressType}
- Правонарушения: ${data.qualifyingOffenses.map(o => `${o.adjudicationDate} - ${o.crimeDescription} (${o.jurisdictionAndState})`).join('; ')}
- Жертва: Пол: ${data.victimInfo.sex}, Несовершеннолетний: ${data.victimInfo.minor}
- Транспорт: ${data.vehicleInfo.emptyNotice}
${data.photoUrl ? '- Фото: [Загружено пользователем]' : '- Фото: [Оставлено пустым]'}

=== JSON DATA ===
${JSON.stringify(data, null, 2)}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateAgentSummary());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ozaropol-notice-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    try {
      setImportError(null);
      // Clean up string in case user pasted with the wrapper
      let jsonPart = importText.trim();
      const jsonStart = jsonPart.indexOf('{');
      const jsonEnd = jsonPart.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        jsonPart = jsonPart.slice(jsonStart, jsonEnd + 1);
      }
      const parsed = JSON.parse(jsonPart);
      if (!parsed.primaryInfo || !parsed.mainTitle) {
        throw new Error('Некорректная структура JSON');
      }
      onImport(parsed);
      onClose();
    } catch (err: any) {
      setImportError(err.message || 'Ошибка парсинга JSON');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 no-print">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              Передача данных ассистенту для фиксации
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-900 leading-relaxed">
            <p className="font-semibold mb-1">
              Как зафиксировать ваши изменения:
            </p>
            <p>
              1. Отредактируйте любые тексты прямо на бланке или через панель.
              <br />
              2. Нажмите кнопку <strong>«Скопировать данные для ассистента»</strong> ниже.
              <br />
              3. Отправьте скопированный текст прямо в чат — ассистент зафиксирует эти данные в коде навсегда!
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700">
                Сформированные данные (готовы к отправке):
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadJson}
                  className="text-xs flex items-center gap-1 text-slate-600 hover:text-slate-900 px-2 py-1 border border-slate-200 rounded"
                >
                  <Download className="w-3.5 h-3.5" /> Скачать .json
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={generateAgentSummary()}
              rows={8}
              className="w-full text-[11px] font-mono bg-slate-50 border border-slate-200 rounded p-3 text-slate-800 select-all"
            />
          </div>

          {/* Import section */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700">
                Импорт ранее сохраненного JSON (при необходимости):
              </label>
            </div>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Вставьте сюда JSON для восстановления..."
              rows={3}
              className="w-full text-xs font-mono border border-slate-200 rounded p-2 text-slate-800"
            />
            {importError && (
              <p className="text-xs text-red-600 mt-1">{importError}</p>
            )}
            {importText && (
              <button
                type="button"
                onClick={handleImportSubmit}
                className="mt-2 text-xs bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded flex items-center gap-1.5 font-medium"
              >
                <Upload className="w-3.5 h-3.5" /> Загрузить этот JSON в документ
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50 border-t border-gray-100">
          <span className="text-xs text-slate-500">
            {copied ? 'Скопировано в буфер!' : 'Готово к передаче'}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Закрыть
            </button>
            <button
              onClick={handleCopy}
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Скопировано!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Скопировать для ассистента
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
