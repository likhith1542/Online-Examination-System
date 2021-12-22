import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddStudent() {
  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState([]);
  const [regns, setRegns] = useState([]);
  const [dbids, setDbids] = useState([]);

  const processCSV = (str, delim = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    for (const h in headers) {
      headers[h] = headers[h].trim();
    }
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });

    setCsvArray(newArray);
  };

  useEffect(() => {
    for (let i = 0; i < csvArray.length; i++) {
      if (csvArray[i].RegNo !== undefined) {
        setRegns((rns) => [...rns, csvArray[i].RegNo]);
        axios
          .get("http://localhost:5000/api/users/get/" + csvArray[i].RegNo)
          .then((res) => {
            if (res.data.ids) {
              setDbids((dbid) => [...dbid, res.data.ids]);
            }
          })
          .catch((err) => {
          });
      }
    }
  }, [csvArray]);



  let { testid } = useParams();

  const submit = () => {
    let myquery = { dbids: dbids };

    axios
      .post("http://localhost:5000/api/tests/addstudents/" + testid, myquery)
      .then((result)=>{
      }).catch((err)=>{
      })
  };

  const upload = () => {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      processCSV(text);
    };

    reader.readAsText(file);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "calc(100vh - 70px)",
        alignItems: "center",
      }}
    >
      <form id="csv-form">
        <input
          type="file"
          accept=".csv"
          id="csvFile"
          onChange={(e) => {
            setCsvFile(e.target.files[0]);
          }}
        ></input>
        <br />
        <button
          style={{ marginTop: "25px", marginRight: "50px" }}
          onClick={(e) => {
            e.preventDefault();
            if (csvFile) upload();
          }}
        >
          Upload
        </button>
        <button
          style={{ marginTop: "25px" }}
          onClick={(e) => {
            e.preventDefault();
            if (csvFile) submit();
          }}
        >
          Submit
        </button>
        <br />
        <br />
        {regns.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Registration Number</th>
                </tr>
              </thead>
              <tbody>
                {regns.map((item, i) => (
                  <tr key={i}>
                    <td>{item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}
      </form>
    </div>
  );
}

export default AddStudent;
