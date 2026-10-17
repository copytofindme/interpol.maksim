import React, { useState } from 'react';
import { X, User, MapPin, AlertTriangle, Shield, Car } from 'lucide-react';
import { NoticeData } from '../types/notice';

interface EditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: NoticeData;
  onUpdate: (updater: (prev: NoticeData) => NoticeData) => void;
}

export const EditDrawer: React.FC<EditDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<'primary' | 'address' | 'crimes' | 'other'>('primary');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col no-print animate-in slide-in-from-right duration-200">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Быстрое редактирование полей
          </h2>
          <p className="text-[11px] text-slate-500">
            Изменения сразу отображаются на бланке
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white px-2">
        <button
          onClick={() => setActiveTab('primary')}
          className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'primary'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-3.5 h-3.5" /> Основное
        </button>
        <button
          onClick={() => setActiveTab('address')}
          className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'address'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" /> Адрес
        </button>
        <button
          onClick={() => setActiveTab('crimes')}
          className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'crimes'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" /> Статьи
        </button>
        <button
          onClick={() => setActiveTab('other')}
          className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'other'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Shield className="w-3.5 h-3.5" /> Прочее
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {activeTab === 'primary' && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Главный заголовок документа (сверху)
              </label>
              <input
                type="text"
                value={data.mainTitle}
                onChange={(e) =>
                  onUpdate((prev) => ({ ...prev, mainTitle: e.target.value }))
                }
                className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Дата в шапке
                </label>
                <input
                  type="text"
                  value={data.headerDate}
                  onChange={(e) =>
                    onUpdate((prev) => ({ ...prev, headerDate: e.target.value }))
                  }
                  className="w-full text-xs border border-slate-300 rounded px-2 py-1.5"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Страница
                </label>
                <input
                  type="text"
                  value={data.pageNumber}
                  onChange={(e) =>
                    onUpdate((prev) => ({ ...prev, pageNumber: e.target.value }))
                  }
                  className="w-full text-xs border border-slate-300 rounded px-2 py-1.5"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Имя субъекта (Name)
              </label>
              <input
                type="text"
                value={data.primaryInfo.name}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    photoCaptionName: e.target.value,
                    primaryInfo: { ...prev.primaryInfo, name: e.target.value },
                  }))
                }
                className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 uppercase font-medium"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Designation
              </label>
              <input
                type="text"
                value={data.primaryInfo.designation}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    primaryInfo: {
                      ...prev.primaryInfo,
                      designation: e.target.value,
                    },
                  }))
                }
                className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 text-blue-600"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Status
              </label>
              <input
                type="text"
                value={data.primaryInfo.status}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    primaryInfo: { ...prev.primaryInfo, status: e.target.value },
                  }))
                }
                className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Dept of Correction#
              </label>
              <input
                type="text"
                value={data.primaryInfo.deptOfCorrection}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    primaryInfo: {
                      ...prev.primaryInfo,
                      deptOfCorrection: e.target.value,
                    },
                  }))
                }
                className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Date Of Birth
                </label>
                <input
                  type="text"
                  value={data.primaryInfo.dob}
                  onChange={(e) =>
                    onUpdate((prev) => ({
                      ...prev,
                      primaryInfo: { ...prev.primaryInfo, dob: e.target.value },
                    }))
                  }
                  className="w-full text-xs border border-slate-300 rounded px-2 py-1.5"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Race
                </label>
                <input
                  type="text"
                  value={data.primaryInfo.race}
                  onChange={(e) =>
                    onUpdate((prev) => ({
                      ...prev,
                      primaryInfo: { ...prev.primaryInfo, race: e.target.value },
                    }))
                  }
                  className="w-full text-xs border border-slate-300 rounded px-2 py-1.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Sex
                </label>
                <input
                  type="text"
                  value={data.primaryInfo.sex}
                  onChange={(e) =>
                    onUpdate((prev) => ({
                      ...prev,
                      primaryInfo: { ...prev.primaryInfo, sex: e.target.value },
                    }))
                  }
                  className="w-full text-xs border border-slate-300 rounded px-2 py-1.5"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Hair
                </label>
                <input
                  type="text"
                  value={data.primaryInfo.hair}
                  onChange={(e) =>
                    onUpdate((prev) => ({
                      ...prev,
                      primaryInfo: { ...prev.primaryInfo, hair: e.target.value },
                    }))
                  }
                  className="w-full text-xs border border-slate-300 rounded px-2 py-1.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Eyes
                </label>
                <input
                  type="text"
                  value={data.primaryInfo.eyes}
                  onChange={(e) =>
                    onUpdate((prev) => ({
                      ...prev,
                      primaryInfo: { ...prev.primaryInfo, eyes: e.target.value },
                    }))
                  }
                  className="w-full text-xs border border-slate-300 rounded px-2 py-1.5"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Height
                </label>
                <input
                  type="text"
                  value={data.primaryInfo.height}
                  onChange={(e) =>
                    onUpdate((prev) => ({
                      ...prev,
                      primaryInfo: {
                        ...prev.primaryInfo,
                        height: e.target.value,
                      },
                    }))
                  }
                  className="w-full text-xs border border-slate-300 rounded px-2 py-1.5"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Weight
                </label>
                <input
                  type="text"
                  value={data.primaryInfo.weight}
                  onChange={(e) =>
                    onUpdate((prev) => ({
                      ...prev,
                      primaryInfo: {
                        ...prev.primaryInfo,
                        weight: e.target.value,
                      },
                    }))
                  }
                  className="w-full text-xs border border-slate-300 rounded px-2 py-1.5"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Подпись даты под фото
              </label>
              <input
                type="text"
                value={data.photoDate}
                onChange={(e) =>
                  onUpdate((prev) => ({ ...prev, photoDate: e.target.value }))
                }
                className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Юридическое предупреждение (под таблицей)
              </label>
              <textarea
                value={data.legalDisclaimer}
                rows={3}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    legalDisclaimer: e.target.value,
                  }))
                }
                className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5"
              />
            </div>
          </div>
        )}

        {activeTab === 'address' && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Заголовок адреса
              </label>
              <input
                type="text"
                value={data.addressInfo.addressHeader}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    addressInfo: {
                      ...prev.addressInfo,
                      addressHeader: e.target.value,
                    },
                  }))
                }
                className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Строка адреса 1 (Город, штат, индекс)
              </label>
              <input
                type="text"
                value={data.addressInfo.addressLine1}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    addressInfo: {
                      ...prev.addressInfo,
                      addressLine1: e.target.value,
                    },
                  }))
                }
                className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Строка адреса 2 (Округ / County)
              </label>
              <input
                type="text"
                value={data.addressInfo.addressLine2}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    addressInfo: {
                      ...prev.addressInfo,
                      addressLine2: e.target.value,
                    },
                  }))
                }
                className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5"
              />
            </div>

            <div className="pt-2 border-t border-slate-200">
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Источник (Source)
              </label>
              <input
                type="text"
                value={data.addressInfo.source}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    addressInfo: {
                      ...prev.addressInfo,
                      source: e.target.value,
                    },
                  }))
                }
                className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Received Date
              </label>
              <input
                type="text"
                value={data.addressInfo.receivedDate}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    addressInfo: {
                      ...prev.addressInfo,
                      receivedDate: e.target.value,
                    },
                  }))
                }
                className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Address Type
              </label>
              <input
                type="text"
                value={data.addressInfo.addressType}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    addressInfo: {
                      ...prev.addressInfo,
                      addressType: e.target.value,
                    },
                  }))
                }
                className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Map Link
              </label>
              <input
                type="text"
                value={data.addressInfo.mapLinkText}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    addressInfo: {
                      ...prev.addressInfo,
                      mapLinkText: e.target.value,
                    },
                  }))
                }
                className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5"
              />
            </div>
          </div>
        )}

        {activeTab === 'crimes' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Правонарушения и статьи (Qualifying Offenses):
            </p>
            {data.qualifyingOffenses.map((offense, idx) => (
              <div
                key={offense.id}
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs"
              >
                <div className="font-semibold text-slate-700">
                  Запись #{idx + 1}
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block">
                    Дата (Adjudication Date)
                  </label>
                  <input
                    type="text"
                    value={offense.adjudicationDate}
                    onChange={(e) =>
                      onUpdate((prev) => ({
                        ...prev,
                        qualifyingOffenses: prev.qualifyingOffenses.map((o) =>
                          o.id === offense.id
                            ? { ...o, adjudicationDate: e.target.value }
                            : o
                        ),
                      }))
                    }
                    className="w-full border rounded px-2 py-1 bg-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block">
                    Описание преступления (Crime Description)
                  </label>
                  <textarea
                    rows={2}
                    value={offense.crimeDescription}
                    onChange={(e) =>
                      onUpdate((prev) => ({
                        ...prev,
                        qualifyingOffenses: prev.qualifyingOffenses.map((o) =>
                          o.id === offense.id
                            ? { ...o, crimeDescription: e.target.value }
                            : o
                        ),
                      }))
                    }
                    className="w-full border rounded px-2 py-1 bg-white uppercase"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 block">
                      Case Number
                    </label>
                    <input
                      type="text"
                      value={offense.courtCaseNumber}
                      onChange={(e) =>
                        onUpdate((prev) => ({
                          ...prev,
                          qualifyingOffenses: prev.qualifyingOffenses.map((o) =>
                            o.id === offense.id
                              ? { ...o, courtCaseNumber: e.target.value }
                              : o
                          ),
                        }))
                      }
                      className="w-full border rounded px-2 py-1 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block">
                      Jurisdiction & State
                    </label>
                    <input
                      type="text"
                      value={offense.jurisdictionAndState}
                      onChange={(e) =>
                        onUpdate((prev) => ({
                          ...prev,
                          qualifyingOffenses: prev.qualifyingOffenses.map((o) =>
                            o.id === offense.id
                              ? { ...o, jurisdictionAndState: e.target.value }
                              : o
                          ),
                        }))
                      }
                      className="w-full border rounded px-2 py-1 bg-white text-blue-600"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'other' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Псевдонимы (Aliases)
              </label>
              <input
                type="text"
                value={data.aliases}
                onChange={(e) =>
                  onUpdate((prev) => ({ ...prev, aliases: e.target.value }))
                }
                className="w-full border rounded px-2.5 py-1.5"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Особые приметы (Scars, Marks & Tattoos)
              </label>
              <input
                type="text"
                value={data.scarsEmptyText}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    scarsEmptyText: e.target.value,
                  }))
                }
                className="w-full border rounded px-2.5 py-1.5"
              />
            </div>

            <div className="pt-2 border-t border-slate-200">
              <label className="font-semibold text-slate-700 block mb-2">
                Victim Information
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">
                    Victim Sex
                  </label>
                  <input
                    type="text"
                    value={data.victimInfo.sex}
                    onChange={(e) =>
                      onUpdate((prev) => ({
                        ...prev,
                        victimInfo: { ...prev.victimInfo, sex: e.target.value },
                      }))
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">
                    Victim Minor
                  </label>
                  <input
                    type="text"
                    value={data.victimInfo.minor}
                    onChange={(e) =>
                      onUpdate((prev) => ({
                        ...prev,
                        victimInfo: {
                          ...prev.victimInfo,
                          minor: e.target.value,
                        },
                      }))
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <label className="font-semibold text-slate-700 block mb-1">
                Vehicle Information (Запись о транспорте)
              </label>
              <input
                type="text"
                value={data.vehicleInfo.emptyNotice}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    vehicleInfo: {
                      ...prev.vehicleInfo,
                      emptyNotice: e.target.value,
                    },
                  }))
                }
                className="w-full border rounded px-2.5 py-1.5"
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
        >
          Готово
        </button>
      </div>
    </div>
  );
};
