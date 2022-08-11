import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useAddRetrait, useCreateRetrait } from "../hooks/useAddRetrait";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Retrait = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [filteredData, setFilteredData] = useState([]);

  const { mutate } = useAddRetrait();

  const [num_compte, setNumCompte] = useState("");
  const [id_client, setIdClient] = useState("");
  const [num_cheque, setNumCheque] = useState("");
  const [montant_retrait, setMontantRetrait] = useState("");
  const [date_retrait, setDateRetrait] = useState("");

  const { loading, data, refetch } = useCreateRetrait();

  const addNewRetrait = async (e) => {
    e.preventDefault();
    const retrait = {
      num_compte,
      id_client,
      num_cheque,
      montant_retrait,
      date_retrait,
    };

    mutate(retrait);
    handleClose();
    refetch();
  };

  const handlefilter = (event) => {
    const searchUser = event.target.value;
    const newfilter = data.data.data.filter((value) => {
      return value.num_compte.toLowerCase().includes(searchUser.toLowerCase());
    });

    if (searchUser == "") {
      setFilteredData(data.data.data);
    } else setFilteredData(newfilter);
  };

  return (
    <div>
      <div
        className="top"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 className="page-header">Retrait</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <button
            style={{
              padding: "15px 20px",
              background: "rgb(37, 150, 190)",
              color: "white",
              fontWeight: "600",
              marginBottom: "30px",
              borderRadius: "15px",
            }}
            onClick={handleOpen}
          >
            Retrait
          </button>
          <div className="topnav__search">
            <input
              type="text"
              placeholder="Recherche..."
              onChange={handlefilter}
            />
            <i className="bx bx-search"></i>
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            sx={style}
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-textarea"
              label="Numero Compte"
              placeholder="Numero Compte"
              name="num_compte"
              multiline
              style={{ width: "50%" }}
              onChange={(e) => setNumCompte(e.target.value)}
              value={num_compte}
            />
            <TextField
              id="outlined-textarea"
              label="Numero Client"
              placeholder="Numero Client"
              name="id_client"
              multiline
              style={{ width: "50%" }}
              onChange={(e) => setIdClient(e.target.value)}
              value={id_client}
            />
            <TextField
              id="outlined-textarea"
              label="Numero Cheque"
              placeholder="Numero Cheque"
              name="num_cheque"
              multiline
              style={{ width: "50%" }}
              onChange={(e) => setNumCheque(e.target.value)}
              value={num_cheque}
            />
            <TextField
              id="outlined-textarea"
              label="date"
              placeholder="date"
              name="date_retrait"
              multiline
              style={{ width: "50%" }}
              onChange={(e) => setDateRetrait(e.target.value)}
              value={date_retrait}
            />
            <TextField
              id="outlined-textarea"
              label="Montant"
              placeholder="Montant"
              name="montant_retrait"
              multiline
              style={{ width: "50%" }}
              onChange={(e) => setMontantRetrait(e.target.value)}
              value={montant_retrait}
            />

            <button
              style={{
                width: " 50%",
                marginLeft: "50%",
                padding: "10px 20px",
                background: "rgb(37, 150, 190)",
                color: "white",
                fontWeight: "600",
              }}
              onClick={addNewRetrait}
            >
              Ajouter
            </button>
          </Box>
        </Modal>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <th>Numero retrait</th>
                    <th>Numero client</th>
                    <th>Numero de compte</th>
                    <th>Numero de cheque </th>
                    <th>Montant</th>
                    <th>Date </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length == 0
                    ? data.data.data.map((item, i) => {
                        return (
                          <tr>
                            <th style={{ textAlign: "center" }} key={i}>
                              {item.id_retrait}
                            </th>
                            <td style={{ textAlign: "center" }}>
                              {item.id_client}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.num_compte}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.num_cheque}
                            </td>
                            <td>{item.montant_retrait}</td>
                            <td>{item.date_retrait}</td>
                          </tr>
                        );
                      })
                    : filteredData.map((item, i) => {
                        return (
                          <tr>
                            <th style={{ textAlign: "center" }} key={i}>
                              {item.id_retrait}
                            </th>
                            <td style={{ textAlign: "center" }}>
                              {item.id_client}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.num_compte}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.num_cheque}
                            </td>
                            <td>{item.montant_retrait}</td>
                            <td>{item.date_retrait}</td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Retrait;
