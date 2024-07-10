export interface ThemeType {
  [key: string]: string;
  name: string;
  backgroundColor: string;
  secondaryBackgroundColor: string;
  textColor: string;
  iconColor: string;
  accentColor: string;
}

export interface NoteStyle {
  backgroundColor: string;
  secondaryBackgroundColor: string;
  textColor: string;
  iconColor: string;
  borderColor: string;
  muted: string;
  accent: string;
  secondaryBackgroundColorLighter: string;
  secondaryBackgroundColorDarker: string;
  font: string;
  headerColors: HeaderColors | false;
}

export interface UserNote {
  user_email: string;
  data: string;
  path: string;
  id: string;
  style: NoteStyle;
}

export interface HeaderColors {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
}
