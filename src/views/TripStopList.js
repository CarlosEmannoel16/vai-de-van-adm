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
import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Loader } from "components/Loader/Loader";
import { cityService } from "services/city";
import { toast } from "react-toastify";
import { formatDateToDisplay } from "helpers/formatDateToDisplay";

function TripStopList() {
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);

  useState(() => {
    if (!cities.length) {
      cityService
        .find()
        .then((response) => {
          setCities(response.data);
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Erro ao buscar cidades");
        });
    }
  }, [cities]);

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
                <CardTitle tag="h4">Paradas</CardTitle>
                <Button>Criar Nova</Button>
              </CardHeader>
              <CardHeader
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <FormGroup switch>
                  <input type="switch" role="switch" />
                  <Label check>Mostrar Paradas desabilitadas</Label>
                </FormGroup>
              </CardHeader>

              {!loading && cities.length > 0 ? (
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Nome</th>
                        <th>Data da Criacao</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cities.map((citieCurrent, index) => (
                        <tr
                          style={{ cursor: "pointer" }}
                          key={index}
                          onClick={() => {
                            navigate(`/add/route`, {
                              state: { route: citieCurrent },
                            });
                          }}
                        >
                          <td>{citieCurrent.name}</td>
                          <td>
                            {formatDateToDisplay(citieCurrent.created_at)}
                          </td>

                          <td className="text-right">
                            <Button color="primary">Editar</Button>
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

export default TripStopList;
