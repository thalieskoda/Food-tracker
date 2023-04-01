import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleDestination = () => {
  const { country } = useParams();

  const [destination, setDestination] = useState(null);
  useEffect(() => {
    fetch(`/profile/${country}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error("Error");
        }
        setDestination(data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <> Single Destination </>;
};

export default SingleDestination;
