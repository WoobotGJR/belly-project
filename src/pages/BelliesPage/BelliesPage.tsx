import { useCallback, useEffect, useRef, useState } from 'react';
import { Bean } from '../../api/utils/types/types';
import bellyService from '../../api/bellyService/bellyService';
import BeanContainer from '../../components/BeanContainer/BeanContainer';
import Preloader from '../../components/Preloader/Preloader';

import { v4 as uuidv4 } from 'uuid';

import './BelliesPage.css';

const BelliesPage: React.FC = () => {
  const paginationLoaderRef = useRef<HTMLDivElement>(null);
  const [beansList, setBeansList] = useState<Bean[]>([]);

  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Loads more beans
  const loadMoreBeans = useCallback(async () => {
    setLoading(true);
    try {
      const response = await bellyService.getBellies({
        pageIndex,
        pageSize: 10,
      });
      setBeansList((prevBeans) => [...prevBeans, ...response.items]);
      setPageIndex((prevPage) => prevPage + 1);

      if (response.currentPage >= response.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load more beans', error);
    } finally {
      setLoading(false);
    }
  }, [pageIndex]);

  // Observe pagination loader for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMoreBeans();
        }
      },
      { threshold: 1.0 }
    );

    if (paginationLoaderRef.current) {
      observer.observe(paginationLoaderRef.current);
    }

    return () => {
      if (paginationLoaderRef.current) {
        observer.unobserve(paginationLoaderRef.current);
      }
    };
  }, [loadMoreBeans, loading, hasMore]);

  // Loads the first page of beans
  useEffect(() => {
    loadMoreBeans();
  }, []);

  return (
    <main className="bellies-page">
      <h1 className="title">Belly Beans</h1>
      <div className="beans-grid">
        {beansList.map((bean) => {
          return <BeanContainer key={uuidv4()} {...bean} />;
        })}
      </div>
      {loading && <Preloader />}
      <div ref={paginationLoaderRef}></div>
    </main>
  );
};
export default BelliesPage;
