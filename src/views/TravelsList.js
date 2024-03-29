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
import { travelService } from "services/travel";
import { toast } from "react-toastify";
import { formatDateToDisplay } from "helpers/formatDateToDisplay";
import { Loader } from "components/Loader/Loader";

function TravelList() {
  const [travel, setTravel] = useState([]);
  const [loading, setLoading] = useState(false);

  useState(() => {
    if (!travel.length) {
      setLoading(true);
      travelService
        .getAll()
        .then((res) => {
          if (res?.data.length === 0) {
            toast.warn("Nenhuma viagem cadastrada");
          }
          setTravel(res.data || []);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [travel]);

  const navigate = useNavigate();

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CardTitle tag="h4">Viagens</CardTitle>
                <Button
                  onClick={() => {
                    navigate(`/add/travel`);
                  }}
                >
                  Criar Novo
                </Button>
              </CardHeader>

              {!loading && travel.length > 0 ? (
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Descricao</th>
                        <th>rota</th>
                        <th>Data da viagem</th>
                        <th>Motorista</th>
                        <th>Veiculo</th>
                        <th>Status</th>
                        <th className="text-right">Editar</th>
                      </tr>
                    </thead>

                    <tbody>
                      {travel.map((travelCurrent, index) => (
                        <tr style={{ cursor: "pointer" }} key={index}>
                          <td>{travelCurrent?.description}</td>
                          <td>{travelCurrent?.routeDescription}</td>
                          <td>
                            {formatDateToDisplay(travelCurrent?.departureDate)}
                          </td>
                          <td>{travelCurrent?.driverName}</td>
                          <td>{travelCurrent?.vehicleName}</td>
                          <td>
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                display: "inline-block",
                                marginRight: "5px",
                                backgroundColor: `${
                                  travelCurrent?.status === "DESABILITADA"
                                    ? "#808080"
                                    : travelCurrent?.status === "CANCELADA"
                                    ? "#FF0000"
                                    : travelCurrent?.status === "EM ANDAMENTO"
                                    ? "#FFA500"
                                    : "#008000"
                                }`,
                              }}
                            ></div>
                            {travelCurrent?.status}
                          </td>
                          <td
                            className="text-right"
                            onClick={() => {
                              navigate(`/add/travel`, {
                                state: { travel: travelCurrent },
                              });
                            }}
                          >
                            Editar
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

export default TravelList;
