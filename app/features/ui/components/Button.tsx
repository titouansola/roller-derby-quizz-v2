import { useTranslation } from 'react-i18next';
import { LucideIcon } from 'lucide-react';
import classNames from 'classnames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  Icon?: LucideIcon;
  //
  full?: boolean;
  round?: boolean;
  small?: boolean;
  ghost?: boolean;
};

export function Button(props: ButtonProps) {
  const { label, Icon, full, round, small, ghost, ...htmlBtnProps } = props;
  const { t } = useTranslation();
  //
  return (
    <button
      {...htmlBtnProps}
      //
      data-full={full}
      data-round={round}
      data-regular={!round}
      data-small={small}
      //
      className={classNames(
        'flex justify-center items-center gap-2 rounded-3xl px-4 py-2 transition-colors',
        !ghost &&
          'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 focus:outline-none disabled:bg-gray-50 aria-current-page:bg-gray-200',
        'data-full:w-full',
        'data-round:w-8 data-round:h-8 data-round:p-0 data-round:rounded-full',
        'data-round:data-small:w-6 data-round:data-small:h-6',
        'data-small:text-[12px] data-regular:data-small:px-3'
      )}
    >
      {Icon && <Icon size={small ? 14 : 18} />}
      {!!label && t(label)}
    </button>
  );
}
