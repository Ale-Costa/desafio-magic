export interface Set {
  code: string;
  name: string;
  type: string;
  booster?: (string | string[])[];
  releaseDate: Date;
  block: string;
  onlineOnly: boolean;
}
