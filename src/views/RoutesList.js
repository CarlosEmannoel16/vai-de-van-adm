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
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { routerService } from "services/routers";
import { Loader } from "components/Loader/Loader";

function RoutesList() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState([]);

  useState(() => {
    if (!routes.length) {
      setLoading(true);
      routerService
        .find()
        .then((res) => {
          console.log("data====>", res.data.data);
          setRoutes(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [routes]);

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
                <CardTitle tag="h4">Rotas</CardTitle>
                <CardTitle
                  style={{ cursor: "pointer" }}
                  tag="h3"
                  onClick={() => {
                    navigate(`/add/route`);
                  }}
                >
                  <i className="nc-icon nc-simple-add" />
                </CardTitle>
              </CardHeader>

              {!loading && routes.length > 0 ? (
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Nome</th>
                        <th>Origem</th>
                        <th>Destino</th>
                        <th>Distancia</th>
                        <th className="text-right">Editar</th>
                      </tr>
                    </thead>

                    <tbody>
                      {routes.map((routeCurrent, index) => (
                        <tr
                          style={{ cursor: "pointer" }}
                          key={index}
                          onClick={() => {
                            navigate(`/add/route`, {
                              state: { route: routeCurrent },
                            });
                          }}
                        >
                          <td>{routeCurrent.name}</td>
                          <td>{routeCurrent?.Origin?.name}</td>
                          <td>{routeCurrent?.Destiny?.name}</td>
                          <td>{routeCurrent.km} Km</td>
                          <td className="text-right">Editar</td>
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

export default RoutesList;
