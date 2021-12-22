import React, { useEffect } from "react";
import axios from "axios";

const CkeDragdrop = () => {
  useEffect(() => {
    console.log("testing1");

    axios
      .post("https://reqres.in/api/register", {
        email: "eve.holt@reqres.in",
        password: "pistol",
      })
      .then((response) => {
        console.log("testing2");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div>testing3</div>;
};

export default CkeDragdrop;
