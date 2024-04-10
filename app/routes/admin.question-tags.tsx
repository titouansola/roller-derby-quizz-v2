import { useTranslation } from 'react-i18next';
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { SignedIn } from '@clerk/remix';
import { userService } from '~/features/users/services/user.service.server';
import { questionTagsService } from '~/features/question-tags/services/question-tags-service.server';
import { TagList } from '~/features/question-tags/components/TagList';
import { TagForm } from '~/features/question-tags/components/TagForm';
import { questionTagValidator } from '~/features/question-tags/form/question-tag-form';
import { zfd } from 'zod-form-data';

export async function loader(args: LoaderFunctionArgs) {
  await userService.currentUserIsAdmin(args);
  const tags = await questionTagsService.getAll();
  return json(tags);
}

export default function Component() {
  const { t } = useTranslation();
  const tags = useLoaderData<typeof loader>();
  return (
    <SignedIn>
      <h1>{t('question_tags')}</h1>
      <TagList tags={tags} />
      <TagForm />
    </SignedIn>
  );
}

export async function action(args: LoaderFunctionArgs) {
  await userService.currentUserIsAdmin(args);
  const formData = await args.request.formData();
  //
  const action = formData.get('_action');
  switch (action) {
    case 'create':
      return createTag(formData);
    case 'update':
      return updateTag(formData);
    case 'delete':
      return deleteTag(formData);
    default:
      throw new Error('Invalid action');
  }
}

async function createTag(formData: FormData) {
  const { error, data } = await questionTagValidator.validate(formData);
  if (!!error || !data) {
    throw new Error('MALFORMED_REQUEST');
  }
  return questionTagsService.create(data);
}

async function updateTag(formData: FormData) {
  const { error, data } = await questionTagValidator.validate(formData);
  if (!!error || !data) {
    throw new Error('MALFORMED_REQUEST');
  }
  return questionTagsService.update(data);
}

async function deleteTag(formData: FormData) {
  const id = parseInt((formData.get('id') as string) ?? '0');
  if (!(id > 0)) {
    throw new Error('MALFORMED_REQUEST');
  }
  return questionTagsService.delete(id);
}
