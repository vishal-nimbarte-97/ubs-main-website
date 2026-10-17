export interface AlumniProfile {
  id?: number;
  name: string;
  title: string;
  period: string;
  image: string;
  summary: string;
  details: string;
  heading?: string;
  introImage?: string;
  introParagraphs?: string[];
  isActive: boolean;
}
