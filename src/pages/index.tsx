import styled from 'styled-components';
import { AiFillAccountBook } from 'react-icons/ai';
import * as S from '@/components/stylecomponents/styles';
import Link from 'next/link';
import useSWR from 'swr';
import { tempFetch } from '@/utils/apis';
import { productsDetailsProps } from '@/types/productsDetailType';

const TempCon = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.color.GRAY};
  font-size: 3rem;
`;

export default function Home() {
  const { data: productData } = useSWR<productsDetailsProps[]>(
    'http://localhost:4000/products',
    tempFetch
  );

  return (
    <main>
      <TempCon>
        <span>
          PriceCrush 프로젝트 Client <AiFillAccountBook />
        </span>

        {productData &&
          productData.map((item, index) => (
            <Link
              key={index}
              href={{
                pathname: `/products/${item.id}`,
                query: {
                  ...item,
                },
              }}
            >
              {item.productName}
            </Link>
          ))}

        <div>
          <S.ButtonBase variant="warning" size="xl">
            wow
          </S.ButtonBase>
        </div>
      </TempCon>
    </main>
  );
}
