import type { Tag } from '@/@types';

export const getTagsOptions = (tags: Tag[]) => {
  return tags.map((tagCur) => {
    return {
      title: tagCur.name,
      value: tagCur.id,
    };
  });
};
