import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { SelectExperience } from '~/db/schemas';

export function Experiences({
  experiences,
}: {
  experiences: SelectExperience[];
}) {
  const { t } = useTranslation();
  //
  if (experiences.length === 0) {
    return (
      <div>
        <p>{t('experiences.empty')}</p>
        <Link to="experiences/create">
          <button>{t('experiences.add_first')}</button>
        </Link>
      </div>
    );
  }
  //
  return (
    <div>
      <Link to="experiences/create">
        <button>{t('add')}</button>
      </Link>
      {experiences.map((experience) => (
        <div key={experience.id}>
          <Link to={`experiences/${experience.id}`}>
            <button>{t('edit')}</button>
          </Link>
          <p>{experience.title}</p>
          <p>{experience.positions.join(', ')}</p>
          <p>{experience.date}</p>
          <p>{experience.location}</p>
          <p>{experience.notes}</p>
        </div>
      ))}
    </div>
  );
}
