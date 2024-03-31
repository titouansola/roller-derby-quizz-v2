type BaseSelectOption = {
  value: number | string;
  label: string;
};
export type SelectOption = BaseSelectOption | string;

export function isSelectOption(
  option: SelectOption
): option is BaseSelectOption {
  return typeof option === 'object' && 'value' in option && 'label' in option;
}
