import { useParams } from "@remix-run/react";

const Events = () => {
  const { id } = useParams();

  return <div>Events: {id}</div>;
};

export default Events;
