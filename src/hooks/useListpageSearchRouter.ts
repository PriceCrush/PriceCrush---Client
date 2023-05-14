import { useRouter } from 'next/router';

interface ListpageSearchRouterProps {
  searchTerm?: string;
  categoryId?: string;
}

type queryType = {
  searchTerm?: string;
  categoryId?: string;
};

export const useListpageSearchRouter = ({
  searchTerm,
  categoryId,
}: ListpageSearchRouterProps) => {
  const router = useRouter();
  const query: queryType = {};
  if (searchTerm) query['searchTerm'] = searchTerm;
  if (categoryId) query['categoryId'] = categoryId;
  router.push({
    pathname: '/search',
    query,
  });
};
