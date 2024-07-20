import cx from 'classnames';

export function Separator({
  layout = 'vertical',
}: {
  layout?: 'vertical' | 'horizontal';
}) {
  return (
    <div
      className={cx('bg-grey', {
        'h-px w-full my-8': layout === 'vertical',
        'w-px h-full mx-8': layout === 'horizontal',
      })}
    ></div>
  );
}
