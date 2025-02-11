import { CSSProperties } from "react";

export interface CodeEditorProps {
  value: string;
  defaultValue?: string;
  onChange: Function;
  style?: CSSProperties;
  defaultCode?: string;
  dependencies?: string[];
  useEncrypt?: boolean;
  debounceTime?: number;
  theme?: "vs" | "vs-dark"
}
