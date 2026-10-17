import { NoticeData } from '../types/notice';
import { defaultPhotoUrl } from './subjectPhoto';

export const initialNoticeData: NoticeData = {
  headerDate: '10/17/2026',
  pageNumber: 'Page 1 of 1',
  mainTitle: 'Ożaropol Department of Law Enforcement - Sexual Offender/Predator',
  photoUrl: defaultPhotoUrl,
  photoDate: 'Date of Image : 05/10/2026',
  photoCaptionName: 'MAKSIM PATRICK PEARL',

  primaryInfo: {
    designation: 'Sexual Offender',
    name: 'MAKSIM PATRICK PEARL',
    status: 'Absconded / Non-Compliant',
    deptOfCorrection: 'Not Available',
    dob: '08/??/2008',
    race: 'White',
    sex: 'Male',
    hair: 'Light Brown',
    eyes: 'Blue',
    height: "5'7\" + 1 potato",
    weight: '220 lbs + 2 potatoes',
  },

  legalDisclaimer:
    'MAKSIM PATRICK PEARL is a sexual offender under Ożaropol law. Positive identification cannot be established unless a fingerprint comparison is made.',

  aliases: 'Not Available',

  hasScarsReported: false,
  scarsEmptyText: 'None Reported',
  scarsMarksTattoos: [],

  addressInfo: {
    addressHeader: 'Last Reported Address: Wzgórze 56, pokój 22, Warsztaty',
    addressLine1: 'Ożarów 27-530',
    addressLine2: 'Poland',
    source: 'Source: Internat',
    receivedDate: 'Received Date: 10/16/2026',
    addressType: 'Address: Wzgórze 56, pokój 22, Warsztaty',
    mapLinkText: 'N/A',
  },

  qualifyingOffenses: [
    {
      id: 'offense-1',
      adjudicationDate: '10/6/2026',
      crimeDescription: 'SEX OFFENSE, FEDERAL (POSSESSION OF CHILD PORNOGRAPHY)',
      courtCaseNumber: 'Not Available',
      jurisdictionAndState: 'Federal, Ożarów',
      adjudication: 'Not Available',
    },
  ],

  victimInfo: {
    sex: 'Female, 67 y.o',
    minor: 'Yes',
  },

  vehicleInfo: {
    emptyNotice: 'No registered/owned vehicle information on file for this subject',
    hasVehicles: false,
    vehicles: [],
  },
};
