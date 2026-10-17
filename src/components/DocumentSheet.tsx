import React from 'react';
import { NoticeData, QualifyingOffense } from '../types/notice';
import { EditableText } from './EditableText';
import { PhotoSection } from './PhotoSection';
import { Plus, Trash2 } from 'lucide-react';

interface DocumentSheetProps {
  data: NoticeData;
  isEditing: boolean;
  onUpdate: (updater: (prev: NoticeData) => NoticeData) => void;
}

export const DocumentSheet: React.FC<DocumentSheetProps> = ({
  data,
  isEditing,
  onUpdate,
}) => {
  // Update helpers
  const setTopField = (field: 'headerDate' | 'pageNumber' | 'mainTitle', val: string) => {
    onUpdate((prev) => ({ ...prev, [field]: val }));
  };

  const setPrimaryInfo = (field: keyof NoticeData['primaryInfo'], val: string) => {
    onUpdate((prev) => ({
      ...prev,
      primaryInfo: { ...prev.primaryInfo, [field]: val },
    }));
  };

  const setAddressInfo = (field: keyof NoticeData['addressInfo'], val: string) => {
    onUpdate((prev) => ({
      ...prev,
      addressInfo: { ...prev.addressInfo, [field]: val },
    }));
  };

  const setVictimInfo = (field: keyof NoticeData['victimInfo'], val: string) => {
    onUpdate((prev) => ({
      ...prev,
      victimInfo: { ...prev.victimInfo, [field]: val },
    }));
  };

  const updateOffense = (id: string, field: keyof QualifyingOffense, val: string) => {
    onUpdate((prev) => ({
      ...prev,
      qualifyingOffenses: prev.qualifyingOffenses.map((item) =>
        item.id === id ? { ...item, [field]: val } : item
      ),
    }));
  };

  const addOffense = () => {
    const newOffense: QualifyingOffense = {
      id: 'offense-' + Date.now(),
      adjudicationDate: '01/01/2026',
      crimeDescription: 'CRIME DESCRIPTION',
      courtCaseNumber: 'Not Available',
      jurisdictionAndState: 'Federal, FL',
      adjudication: 'Not Available',
    };
    onUpdate((prev) => ({
      ...prev,
      qualifyingOffenses: [...prev.qualifyingOffenses, newOffense],
    }));
  };

  const removeOffense = (id: string) => {
    onUpdate((prev) => ({
      ...prev,
      qualifyingOffenses: prev.qualifyingOffenses.filter((o) => o.id !== id),
    }));
  };

  return (
    <div
      className={`print-sheet bg-white text-black w-full max-w-[760px] mx-auto shadow-xl border border-gray-300 p-8 pt-6 transition-all ${
        isEditing ? 'is-editing ring-2 ring-blue-500/30' : ''
      }`}
      style={{
        minHeight: '1050px',
        boxSizing: 'border-box',
        fontFamily: 'Arial, Helvetica, "Liberation Sans", sans-serif',
      }}
    >
      {/* Top Header metadata */}
      <div className="flex justify-between items-center text-[12px] text-black font-normal mb-1">
        <EditableText
          value={data.headerDate}
          onChange={(v) => setTopField('headerDate', v)}
          isEditing={isEditing}
          placeholder="MM/DD/YYYY"
        />
        <EditableText
          value={data.pageNumber}
          onChange={(v) => setTopField('pageNumber', v)}
          isEditing={isEditing}
          placeholder="Page 1 of 1"
        />
      </div>

      {/* Main Title */}
      <div className="text-center mb-3">
        <EditableText
          value={data.mainTitle}
          onChange={(v) => setTopField('mainTitle', v)}
          isEditing={isEditing}
          tag="h1"
          className="text-[15.5px] font-bold text-black tracking-tight"
          placeholder="Agency Department of Law Enforcement - Title"
        />
      </div>

      {/* Primary Section (Photo + Primary Information Table) */}
      <div className="flex gap-4 items-start mb-4">
        {/* Photo Box */}
        <PhotoSection
          photoUrl={data.photoUrl}
          photoDate={data.photoDate}
          photoCaptionName={data.photoCaptionName}
          isEditing={isEditing}
          onPhotoChange={(url) => onUpdate((prev) => ({ ...prev, photoUrl: url }))}
          onDateChange={(d) => onUpdate((prev) => ({ ...prev, photoDate: d }))}
          onNameChange={(n) => onUpdate((prev) => ({ ...prev, photoCaptionName: n }))}
        />

        {/* Primary Information Table & Disclaimer */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="notice-header-bar">Primary Information</div>
            <table className="notice-table">
              <tbody>
                <tr>
                  <td className="w-[42%] text-right font-bold pr-2 whitespace-nowrap">
                    Designation :
                  </td>
                  <td>
                    <EditableText
                      value={data.primaryInfo.designation}
                      onChange={(v) => setPrimaryInfo('designation', v)}
                      isEditing={isEditing}
                      asLink
                      placeholder="Sexual Offender"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right font-bold pr-2 whitespace-nowrap">
                    Name :
                  </td>
                  <td className="font-semibold uppercase">
                    <EditableText
                      value={data.primaryInfo.name}
                      onChange={(v) => setPrimaryInfo('name', v)}
                      isEditing={isEditing}
                      placeholder="NAME"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right font-bold pr-2 whitespace-nowrap">
                    Status :
                  </td>
                  <td>
                    <EditableText
                      value={data.primaryInfo.status}
                      onChange={(v) => setPrimaryInfo('status', v)}
                      isEditing={isEditing}
                      placeholder="Supervised - US Probation"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right font-bold pr-2 whitespace-nowrap">
                    Dept of Correction# :
                  </td>
                  <td>
                    <EditableText
                      value={data.primaryInfo.deptOfCorrection}
                      onChange={(v) => setPrimaryInfo('deptOfCorrection', v)}
                      isEditing={isEditing}
                      asLink
                      placeholder="Not Available"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right font-bold pr-2 whitespace-nowrap">
                    Date Of Birth :
                  </td>
                  <td>
                    <EditableText
                      value={data.primaryInfo.dob}
                      onChange={(v) => setPrimaryInfo('dob', v)}
                      isEditing={isEditing}
                      placeholder="MM/DD/YYYY"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right font-bold pr-2 whitespace-nowrap">
                    Race :
                  </td>
                  <td>
                    <EditableText
                      value={data.primaryInfo.race}
                      onChange={(v) => setPrimaryInfo('race', v)}
                      isEditing={isEditing}
                      placeholder="White"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right font-bold pr-2 whitespace-nowrap">
                    Sex :
                  </td>
                  <td>
                    <EditableText
                      value={data.primaryInfo.sex}
                      onChange={(v) => setPrimaryInfo('sex', v)}
                      isEditing={isEditing}
                      placeholder="Male"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right font-bold pr-2 whitespace-nowrap">
                    Hair :
                  </td>
                  <td>
                    <EditableText
                      value={data.primaryInfo.hair}
                      onChange={(v) => setPrimaryInfo('hair', v)}
                      isEditing={isEditing}
                      placeholder="Brown"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right font-bold pr-2 whitespace-nowrap">
                    Eyes :
                  </td>
                  <td>
                    <EditableText
                      value={data.primaryInfo.eyes}
                      onChange={(v) => setPrimaryInfo('eyes', v)}
                      isEditing={isEditing}
                      placeholder="Blue"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right font-bold pr-2 whitespace-nowrap">
                    Height :
                  </td>
                  <td>
                    <EditableText
                      value={data.primaryInfo.height}
                      onChange={(v) => setPrimaryInfo('height', v)}
                      isEditing={isEditing}
                      placeholder="5'09&quot;"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right font-bold pr-2 whitespace-nowrap">
                    Weight :
                  </td>
                  <td>
                    <EditableText
                      value={data.primaryInfo.weight}
                      onChange={(v) => setPrimaryInfo('weight', v)}
                      isEditing={isEditing}
                      placeholder="198 lbs"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Legal Notice Below Primary Table */}
          <div className="mt-2 text-center px-1">
            <EditableText
              value={data.legalDisclaimer}
              onChange={(v) => onUpdate((prev) => ({ ...prev, legalDisclaimer: v }))}
              isEditing={isEditing}
              multiline
              tag="p"
              className="text-[11.5px] leading-[1.3] text-black font-normal"
              placeholder="Legal disclaimer text..."
            />
          </div>
        </div>
      </div>

      {/* Aliases Section */}
      <div className="mb-3">
        <div className="notice-header-bar">Aliases</div>
        <table className="notice-table">
          <tbody>
            <tr>
              <td className="py-1">
                <EditableText
                  value={data.aliases}
                  onChange={(v) => onUpdate((prev) => ({ ...prev, aliases: v }))}
                  isEditing={isEditing}
                  placeholder="Not Available"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Scars, Marks & Tattoos Section */}
      <div className="mb-3">
        <div className="notice-header-bar">Scars, Marks & Tattoos</div>
        <table className="notice-table">
          <thead>
            <tr>
              <th className="notice-sub-header w-1/3">Type</th>
              <th className="notice-sub-header w-1/3">Body Location</th>
              <th className="notice-sub-header w-1/3">Count</th>
            </tr>
          </thead>
          <tbody>
            {data.hasScarsReported && data.scarsMarksTattoos.length > 0 ? (
              data.scarsMarksTattoos.map((scar) => (
                <tr key={scar.id}>
                  <td>{scar.type}</td>
                  <td>{scar.location}</td>
                  <td>{scar.count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-1">
                  <EditableText
                    value={data.scarsEmptyText}
                    onChange={(v) => onUpdate((prev) => ({ ...prev, scarsEmptyText: v }))}
                    isEditing={isEditing}
                    placeholder="None Reported"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Address Information Section */}
      <div className="mb-3">
        <div className="notice-header-bar">Address Information</div>
        <table className="notice-table">
          <thead>
            <tr>
              <th className="notice-sub-header w-[45%]">Address</th>
              <th className="notice-sub-header w-[42%]">Address Source information</th>
              <th className="notice-sub-header w-[13%]">Map Link</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-top leading-snug py-1">
                <div>
                  <EditableText
                    value={data.addressInfo.addressHeader}
                    onChange={(v) => setAddressInfo('addressHeader', v)}
                    isEditing={isEditing}
                    className="font-normal block"
                    placeholder="Last Reported Address"
                  />
                </div>
                <div>
                  <EditableText
                    value={data.addressInfo.addressLine1}
                    onChange={(v) => setAddressInfo('addressLine1', v)}
                    isEditing={isEditing}
                    className="font-normal block"
                    placeholder="City, State Zip"
                  />
                </div>
                <div>
                  <EditableText
                    value={data.addressInfo.addressLine2}
                    onChange={(v) => setAddressInfo('addressLine2', v)}
                    isEditing={isEditing}
                    className="font-normal block"
                    placeholder="County"
                  />
                </div>
              </td>
              <td className="align-top leading-snug py-1">
                <div>
                  <EditableText
                    value={data.addressInfo.source}
                    onChange={(v) => setAddressInfo('source', v)}
                    isEditing={isEditing}
                    className="font-normal block"
                    placeholder="Source: Agency"
                  />
                </div>
                <div>
                  <EditableText
                    value={data.addressInfo.receivedDate}
                    onChange={(v) => setAddressInfo('receivedDate', v)}
                    isEditing={isEditing}
                    className="font-normal block"
                    placeholder="Received Date: MM/DD/YYYY"
                  />
                </div>
                <div>
                  <EditableText
                    value={data.addressInfo.addressType}
                    onChange={(v) => setAddressInfo('addressType', v)}
                    isEditing={isEditing}
                    className="font-normal block"
                    placeholder="Address Type: Permanent"
                  />
                </div>
              </td>
              <td className="align-middle text-center py-1">
                <EditableText
                  value={data.addressInfo.mapLinkText}
                  onChange={(v) => setAddressInfo('mapLinkText', v)}
                  isEditing={isEditing}
                  placeholder="N/A"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Crime Information - Qualifying Offenses Section */}
      <div className="mb-3">
        <div className="notice-header-bar flex items-center justify-between">
          <span className="flex-1 text-center">Crime Information - Qualifying Offenses</span>
          {isEditing && (
            <button
              type="button"
              onClick={addOffense}
              className="text-[11px] bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded font-normal flex items-center gap-1 no-print shrink-0"
              title="Добавить правонарушение"
            >
              <Plus className="w-3 h-3" /> Добавить
            </button>
          )}
        </div>
        <table className="notice-table">
          <thead>
            <tr>
              <th className="notice-sub-header w-[16%]">Adjudication Date</th>
              <th className="notice-sub-header w-[38%]">Crime Description</th>
              <th className="notice-sub-header w-[16%]">Court Case Number</th>
              <th className="notice-sub-header w-[15%]">Jurisdiction &amp; State</th>
              <th className="notice-sub-header w-[15%]">Adjudication</th>
              {isEditing && <th className="notice-sub-header w-[5%] no-print"></th>}
            </tr>
          </thead>
          <tbody>
            {data.qualifyingOffenses.map((offense) => (
              <tr key={offense.id}>
                <td className="align-middle text-center">
                  <EditableText
                    value={offense.adjudicationDate}
                    onChange={(v) => updateOffense(offense.id, 'adjudicationDate', v)}
                    isEditing={isEditing}
                    placeholder="MM/DD/YYYY"
                  />
                </td>
                <td className="align-middle font-normal uppercase leading-tight py-1">
                  <EditableText
                    value={offense.crimeDescription}
                    onChange={(v) => updateOffense(offense.id, 'crimeDescription', v)}
                    isEditing={isEditing}
                    multiline
                    placeholder="CRIME DESCRIPTION"
                  />
                </td>
                <td className="align-middle text-center">
                  <EditableText
                    value={offense.courtCaseNumber}
                    onChange={(v) => updateOffense(offense.id, 'courtCaseNumber', v)}
                    isEditing={isEditing}
                    placeholder="Not Available"
                  />
                </td>
                <td className="align-middle text-center">
                  <EditableText
                    value={offense.jurisdictionAndState}
                    onChange={(v) => updateOffense(offense.id, 'jurisdictionAndState', v)}
                    isEditing={isEditing}
                    asLink
                    placeholder="Federal, FL"
                  />
                </td>
                <td className="align-middle text-center">
                  <EditableText
                    value={offense.adjudication}
                    onChange={(v) => updateOffense(offense.id, 'adjudication', v)}
                    isEditing={isEditing}
                    placeholder="Not Available"
                  />
                </td>
                {isEditing && (
                  <td className="text-center no-print">
                    <button
                      type="button"
                      onClick={() => removeOffense(offense.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Удалить запись"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Victim Information Section */}
      <div className="mb-3">
        <div className="notice-header-bar">Victim Information</div>
        <table className="notice-table">
          <thead>
            <tr>
              <th className="notice-sub-header w-1/2">Sex</th>
              <th className="notice-sub-header w-1/2">Minor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center py-1">
                <EditableText
                  value={data.victimInfo.sex}
                  onChange={(v) => setVictimInfo('sex', v)}
                  isEditing={isEditing}
                  placeholder="Unknown"
                />
              </td>
              <td className="text-center py-1">
                <EditableText
                  value={data.victimInfo.minor}
                  onChange={(v) => setVictimInfo('minor', v)}
                  isEditing={isEditing}
                  placeholder="Yes"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Vehicle Information Section */}
      <div className="mb-3">
        <div className="notice-header-bar">Vehicle Information</div>
        <table className="notice-table">
          <thead>
            <tr>
              <th className="notice-sub-header w-[17%]">Vehicle Make</th>
              <th className="notice-sub-header w-[17%]">Vehicle Model</th>
              <th className="notice-sub-header w-[16%]">Vehicle Color</th>
              <th className="notice-sub-header w-[16%]">Vehicle Year</th>
              <th className="notice-sub-header w-[17%]">Vehicle Body</th>
              <th className="notice-sub-header w-[17%]">Tag Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="py-1">
                <EditableText
                  value={data.vehicleInfo.emptyNotice}
                  onChange={(v) =>
                    onUpdate((prev) => ({
                      ...prev,
                      vehicleInfo: { ...prev.vehicleInfo, emptyNotice: v },
                    }))
                  }
                  isEditing={isEditing}
                  placeholder="No registered/owned vehicle information on file for this subject"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
