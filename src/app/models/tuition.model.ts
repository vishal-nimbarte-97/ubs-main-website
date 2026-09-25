export type TuitionProgrammeType = 'residential' | 'non-residential';

export interface TuitionFeeRow {
  id?: number;

  // preferred canonical fields for the tuition tables
  programmeType?: TuitionProgrammeType;
  course?: string;
  academicYear?: string;
  singleStudent?: string;
  marriedStudentWithQuarters?: string;
  english?: string;
  hindi?: string;
  marathi?: string;

  // legacy compatibility for existing API payloads
  programmeName?: string;
  mainCampus?: string;
  onlineCampus?: string;
  extension?: string;

  isActive?: boolean;
}
