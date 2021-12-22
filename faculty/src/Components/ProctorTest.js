import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Room from "./../video/Room";
import store from "./../store";
import { AiFillCamera } from "react-icons/ai";

function ProctorTest() {
  let { testid } = useParams();
  const [token, setToken] = useState(null);
  let userid = store.getState().auth.user.id;

  useEffect(() => {
    async function getToken() {
      const data = await fetch("/video/token", {
        method: "POST",
        body: JSON.stringify({
          identity: userid,
          room: testid,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setToken(data.token);
    }
    getToken();
  }, [testid, userid]);

  const handleLogout = useCallback((event) => {
    console.log("logout");
    event.preventDefault();
    setToken(null);
  }, []);

  return (
    <div>
      <div>
        <Room roomName={testid} token={token} handleLogout={handleLogout} />
      </div>
    </div>
  );
}

export default ProctorTest;
