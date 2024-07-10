import { useNavigate } from 'react-router-dom';
import './BeanContainer.css';

interface Props {
  flavorName: string;
  description: string;
  imageUrl: string;
  beanId: number;
}
const BeanContainer: React.FC<Props> = ({
  flavorName,
  description,
  imageUrl,
  beanId,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/belly/${beanId}`);
  };

  console.log(beanId);

  return (
    <div className="bean-wrapper" onClick={handleClick}>
      <img className="bean-image" src={imageUrl} alt="" />
      <h2 className="bean-name">{flavorName}</h2>
      <p className="bean-description">{description}</p>
    </div>
  );
};
export default BeanContainer;
