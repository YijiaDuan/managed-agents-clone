export interface Template {
  id: string;
  name: string;
  description: string;
  connectorIcons: { initial: string; color: string }[];
  highlighted?: boolean;
}
