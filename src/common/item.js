import { Button, ButtonGroup } from "react-bootstrap";

const Items = (props) => {
  const { img, name, price, count } = props;

  return (
    <>
      <div className="card" style="width: 18rem;">
        <img src={img} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{price}</p>
          <ButtonGroup size="sm">
            <Button variant="secondary">+</Button>
            <Button variant="secondary">{count}</Button>
            <Button variant="secondary">-</Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};

export default Items;
