import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bean } from '../../api/utils/types/types';
import bellyService from '../../api/bellyService/bellyService';
import Preloader from '../../components/Preloader/Preloader';

import './BellyPage.css';
import { Link } from 'react-router-dom';

const BellyPage: React.FC = () => {
  const [belly, setBelly] = useState<Bean | null>(null);
  const { id } = useParams<string>();

  useEffect(() => {
    (async () => {
      const response = await bellyService.getBellyById(id);
      setBelly(response.data);
    })();
  }, [id]);

  if (!belly) {
    return <Preloader />;
  }

  return (
    <main className="belly-page">
      <Link to="/">
        <button>Back</button>
      </Link>

      <h1 className="title">{belly?.flavorName}</h1>
      <div className="bean-container">
        <img src={belly?.imageUrl} className="image" />
        <div className="details">
          <p className="description">{belly?.description}</p>
          <p className="ingredients">
            <strong>Ingredients:</strong> {belly?.ingredients.join(', ')}
          </p>
          <p className="group">
            <strong>Group:</strong> {belly?.groupName.join(', ')}
          </p>
          <p className="attributes">
            <strong>Attributes:</strong>{' '}
            {belly?.glutenFree ? 'Gluten Free' : 'Not Gluten Free'} |{' '}
            {belly?.kosher ? 'Kosher' : 'Not Kosher'} |{' '}
            {belly?.seasonal ? 'Seasonal' : 'Not Seasonal'}
          </p>
        </div>
      </div>
    </main>
  );
};
export default BellyPage;
