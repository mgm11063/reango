export interface IReport {
  id: number;
  title: string;
  datetime: string;
  department: string;
  place: string;
  is_equipment: number;
  is_amount: number;
  is_speed: number;
  is_change: number;
  rater: [];
  report_content: IReportContent[];
}

export interface IReportForm {
  title: string;
  datetime: string;
  department: string;
  place: string;
  is_equipment: number;
  is_amount: number;
  is_speed: number;
  is_change: number;
  rater: [];
  report_content: IReportContent[];
}

export interface IReportContent {
  work: string;
  content: string;
  overload: string;
  frequency: string;
  no1: boolean;
  no2: boolean;
  no3: boolean;
  no4: boolean;
  no5: boolean;
  no6: boolean;
  no7: boolean;
  no8: boolean;
  no9: boolean;
  no10: boolean;
  no11: boolean;
}

export interface IRoomTag {
  name: string;
}
