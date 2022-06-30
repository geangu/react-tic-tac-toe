import Button from './Button';

const Actions = ({ handleNewGame }) => {
  return (
    <div className="actions">
      <Button content={'Nuevo juego'} onClick={handleNewGame} />
    </div>
  );
};

export default Actions;
