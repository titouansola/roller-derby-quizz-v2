import { useTranslation } from 'react-i18next';
import { LucideIcon } from 'lucide-react';
import cx from 'classnames';
import { Loader } from './Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | 'primary'
    | 'tint'
    | 'outline'
    | 'ghost'
    | 'nav'
    | 'success'
    | 'danger';
  label?: string;
  Icon?: LucideIcon;
  loading?: boolean;
  //
  full?: boolean;
  round?: boolean;
  small?: boolean;
};

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    label,
    Icon,
    full,
    round,
    small,
    loading,
    disabled,
    ...htmlBtnProps
  } = props;
  const { t } = useTranslation();
  //
  return (
    <button
      {...htmlBtnProps}
      //
      disabled={disabled || loading}
      //
      data-full={full}
      data-round={round}
      data-regular={!round}
      data-small={small}
      //
      className={cx(
        'flex justify-center items-center gap-2 rounded-full px-4 py-2 border-2 font-bold select-none transition-colors',
        //
        variant === 'primary' &&
          'bg-dark text-light border-transparent hover:bg-dark-hover active:bg-dark-active focus:outline-none disabled:opacity-50',
        //
        variant === 'tint' &&
          'bg-primary border-transparent hover:bg-primary-hover active:bg-primary-active focus:outline-none disabled:opacity-50',
        //
        variant === 'outline' &&
          'bg-ghost border-dark hover:bg-ghost-hover active:bg-ghost-active focus:outline-none disabled:opacity-50',
        //
        variant === 'nav' &&
          'bg-transparent border-transparent hover:bg-transparent-hover active:bg-transparent-active focus:outline-none disabled:opacity-50 aria-current-page:bg-primary-active aria-current-page:text-light',
        //
        variant === 'ghost' &&
          'bg-ghost border-transparent hover:bg-ghost-hover active:bg-ghost-active focus:outline-none disabled:opacity-50',
        //
        variant === 'success' &&
          'bg-success text-light border-transparent hover:bg-success-hover active:bg-success-active focus:outline-none disabled:opacity-50',
        //
        variant === 'danger' &&
          'bg-danger text-light border-transparent hover:bg-danger-hover active:bg-danger-active focus:outline-none disabled:opacity-50',
        //
        'data-full:w-full',
        //
        'data-round:w-8 data-round:h-8 data-round:p-0 data-round:rounded-full',
        'data-round:data-small:w-6 data-round:data-small:h-6',
        //
        'data-small:text-[12px] data-regular:data-small:px-3 data-regular:data-small:py-1'
      )}
    >
      {!loading ? (
        <>
          {Icon && <Icon size={small ? 14 : 18} />}
          {!!label && t(label)}
        </>
      ) : (
        <Loader />
      )}
    </button>
  );
}
