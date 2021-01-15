export interface VariantInput {
  isSelected: boolean,
  options: Array<boolean>
  select: Array<number>
}

export interface StepInput {
  variants: Array<VariantInput>;
}