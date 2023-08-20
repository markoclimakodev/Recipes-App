type PathNameProps = {
  title: string,
  icon: string
};

export type PathNames = {
  meals: PathNameProps;
  drinks: PathNameProps;
  profile: PathNameProps;
  'done-recipes': PathNameProps;
  'favorite-recipes': PathNameProps;
};

export type FormSearch = {
  searchInput: string;
  searchRadio: 'ingredient' | 'name' | 'first_letter' ;
};

export type SearchBarProps = {
  pageTitle: string;
};
