export interface QualifyingOffense {
  id: string;
  adjudicationDate: string;
  crimeDescription: string;
  courtCaseNumber: string;
  jurisdictionAndState: string;
  adjudication: string;
}

export interface ScarMarkTattoo {
  id: string;
  type: string;
  location: string;
  count: string;
}

export interface NoticeData {
  headerDate: string;
  pageNumber: string;
  mainTitle: string;
  photoUrl: string | null;
  photoDate: string;
  photoCaptionName: string;

  primaryInfo: {
    designation: string;
    name: string;
    status: string;
    deptOfCorrection: string;
    dob: string;
    race: string;
    sex: string;
    hair: string;
    eyes: string;
    height: string;
    weight: string;
  };

  legalDisclaimer: string;

  aliases: string;

  hasScarsReported: boolean;
  scarsMarksTattoos: ScarMarkTattoo[];
  scarsEmptyText: string;

  addressInfo: {
    addressHeader: string;
    addressLine1: string;
    addressLine2: string;
    source: string;
    receivedDate: string;
    addressType: string;
    mapLinkText: string;
  };

  qualifyingOffenses: QualifyingOffense[];

  victimInfo: {
    sex: string;
    minor: string;
  };

  vehicleInfo: {
    emptyNotice: string;
    hasVehicles: boolean;
    vehicles: Array<{
      id: string;
      make: string;
      model: string;
      color: string;
      year: string;
      body: string;
      tagNumber: string;
    }>;
  };
}
