import React, { useEffect } from "react";
import axios from "axios";

const CkeDragdrop = () => {
  useEffect(() => {

    axios
      .post("https://reqres.in/api/register", {
        email: "eve.holt@reqres.in",
        password: "pistol",
      })
      .then((response) => {
      })
      .catch((error) => {
      });
  }, []);

  return <div>testing3</div>;
};

export default CkeDragdrop;
