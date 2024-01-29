/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { serviceVehicles } from "services/vehicle";
import { Loader } from "components/Loader/Loader";
import ModalConfirmation from "components/Modal/ModalConfirmation";
import { toast } from "react-toastify";

function ListVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const deleteVehicle = () => {
    serviceVehicles
      .deleteById(id)
      .then((res) => {
        setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
        toast.success("Veiculo excluido com sucesso!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useState(() => {
    if (!vehicles.length) {
      setLoading(true);
      serviceVehicles
        .getAll()
        .then((res) => {
          console.log(res.data.data);
          setVehicles(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [vehicles]);

  const navigate = useNavigate();

  return (
    <>
      <div className="content">
        <Row>
          <ModalConfirmation
            open={open}
            setOpen={setOpen}
            action={deleteVehicle}
            title={"Excluir veiculo"}
            text={"Tem certeza que deseja excluir este veiculo?"}
          />
          <Col md="12">
            <Card>
              <CardHeader
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CardTitle tag="h4">Veiculos</CardTitle>

                <Button
                  onClick={(e) => {
                    console.log(e);
                    navigate(`/vehicle`);
                  }}
                >
                  Criar Novo
                </Button>
              </CardHeader>

              {!loading && vehicles.length > 0 ? (
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Nome</th>
                        <th>Capacidade máxima</th>
                        <th>Cor</th>
                        <th>Placa</th>
                        <th className="text-right">Editar</th>
                        <th className="text-right">Excluir</th>
                      </tr>
                    </thead>

                    <tbody>
                      {vehicles.map((vehicle, index) => (
                        <tr
                          style={{ cursor: "pointer" }}
                          key={index}
                          // onClick={() => {
                          //   navigate(`/add/driver`);
                          // }}
                        >
                          <td>{vehicle.name}</td>
                          <td>{vehicle.quantitySeats}</td>
                          <td>{vehicle.color}</td>
                          <td>{vehicle.plate}</td>
                          <td
                            className="text-right"
                            onClick={(e) =>
                              navigate("/vehicle", {
                                state: vehicle,
                              })
                            }
                          >
                            Editar
                          </td>
                          <td
                            className="text-right"
                            onClick={() => {
                              setId(vehicle.id);
                              setOpen(true);
                            }}
                          >
                            Excluir
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              ) : (
                <Loader />
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ListVehicles;
