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
import { userService } from "../services/driver";
import { useNavigate } from "react-router-dom";
import { Loader } from "components/Loader/Loader";
import { Paginations } from "components/Pagination/Pagination";

function Tables() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState([]);

  useState(() => {
    if (!drivers.length) {
      setLoading(true);
      userService
        .getAll()
        .then((res) => {
          console.log(res.data.data);
          setDrivers(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [drivers]);

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
                <CardTitle tag="h4">Motoristas</CardTitle>

                <Button>Criar Novo</Button>
              </CardHeader>

              {!loading && drivers.length > 0 ? (
                <CardBody>
                  <Table responsive>
                    <thead color="#000">
                      <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                      </tr>
                    </thead>

                    <tbody>
                      {drivers.map((driver, index) => (
                        <tr
                          style={{ cursor: "pointer" }}
                          key={index}
                          // onClick={() => {
                          //   navigate(`/add/driver`);
                          // }}
                        >
                          <td>{driver.User.name}</td>
                          <td>{driver.User.email}</td>
                          <td>{driver.User.phone}</td>
                          <td
                            className="text-right"
                            onClick={() =>
                              navigate(`/add/driver`, { state: driver.User.id })
                            }
                          >
                            <Button color="primary">Editar</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Paginations
                    totalPages={3}
                    callback={() => {}}
                    pageCurrent={0}
                  />
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

export default Tables;
