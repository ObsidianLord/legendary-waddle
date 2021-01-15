export interface Option {
  title: string;
  price: number;
}

export interface Select {
  title: string;
  items: Array<Option>
}

export interface WizardVariant {
  title: string;
  description: string;
  color: string;
  price_default: number;
  options: Array<Option>
  select: Array<Select>
}

export interface WizardStep {
  title: string;
  variants: Array<WizardVariant>;
}