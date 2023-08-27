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
import { toast } from "react-toastify";
import * as Yup from "yup";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
} from "reactstrap";
import { userService } from "services/driver";
import { serviceVehicles } from "services/vehicle";
import { useNavigate, useParams } from "react-router-dom";

function Vehicle() {
  // id                String   @id @default(uuid())
  // amount_of_accents Int
  // plate             String
  // with_air          Boolean
  // Travel            Travel[]
  // cor               String
  // created_at        DateTime @default(now())
  // update_at         DateTime @default(now()) @updatedAt
  // Owner             User     @relation(fields: [ownerId], references: [id], onDelete: Cascade, onUpdate: Cascade)
  // ownerId
  const [formSubmit, setFormSubmit] = useState({ with_air: true });
  const [drivers, setDriver] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [vehicle, setVehicle] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const onsubmit = (e) => {
    try {
      Yup.object({
        description: Yup.string().required("Descrição é obrigatório"),
        plate: Yup.string().required("Placa é obrigatório"),
        amount_of_accents: Yup.number().required(
          "Quantidade de acentos é obrigatório"
        ),
        cor: Yup.string().required("Cor é obrigatório"),
        ownerId: Yup.string().required("Proprietário é obrigatório"),
      }).validateSync(formSubmit, { abortEarly: true });

      if (!isUpdate) {
        serviceVehicles
          .create({
            ...formSubmit,
            with_air: formSubmit.with_air === "false" ? false : true,
          })
          .then((res) => {
            toast.success("Veiculo cadastrado com sucesso");
            setTimeout(() => {
              navigate(`/list/vehicles`);
            }, 1000);
          });
      } else {
        serviceVehicles
          .update({
            ...formSubmit,
            with_air: formSubmit.with_air === "false" ? false : true,
          })
          .then((res) => {
            toast.success("Veiculo cadastrado com sucesso");
            setTimeout(() => {
              navigate(`/list/vehicles`);
            }, 1000);
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
    e.preventDefault();
  };

  useState(() => {
    if (!drivers.length) {
      userService
        .getAll()
        .then((res) => {
          setDriver(res.data.data);
        })
        .catch(() => {
          toast.error("Erro ao buscar motoristas");
        });
    }
  }, [drivers]);

  useEffect(() => {
    console.log(params);
    if (params?.id) {
      serviceVehicles
        .getById(params.id)
        .then((res) => {
          setIsUpdate(true);
          setVehicle(res.data);
          console.log(res.data);
          setFormSubmit({
            id: res.data.id || "",
            description: res.data.description || "",
            plate: res.data.plate || "",
            amount_of_accents: res.data.amount_of_accents || "",
            cor: res.data.cor || "",
            ownerId: res.data.ownerId || "",
            with_air: res.data.with_air || true,
          });
        })
        .catch(() => {
          toast.error("Erro ao buscar veiculo");
        });
    }
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md={"12"}>
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Cadastro de Veiculos</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={onsubmit}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Descricao*</label>
                        <Input
                          placeholder="Descricao"
                          type="text"
                          defaultValue={vehicle?.description || ""}
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              description: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Placa*</label>
                        <Input
                          placeholder="Placa"
                          defaultValue={vehicle?.plate || ""}
                          type="text"
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              plate: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Quantidade de Acentos*</label>
                        <Input
                          placeholder="0"
                          type="number"
                          defaultValue={vehicle.amount_of_accents || ""}
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              amount_of_accents: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Cor*</label>
                        <Input
                          placeholder="Azul"
                          type="text"
                          defaultValue={vehicle.cor || ""}
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              cor: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <Label for="exampleSelect">Proprietário</Label>
                        <Input
                          name="ownerId"
                          type="select"
                          defaultValue={vehicle?.ownerId || ""}
                          disabled={!drivers.length}
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              ownerId: e.target.value,
                            });
                          }}
                        >
                          {drivers.length ? (
                            drivers.map((dr) => {
                              if (dr.User.Driver.length) {
                                return (
                                  <option value={dr.User.id}>
                                    {dr.User.name}
                                  </option>
                                );
                              } else return <></>;
                            })
                          ) : (
                            <></>
                          )}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <Label for="exampleSelect">
                          Possui Ar-Condicionado
                        </Label>
                        <Input
                          defaultValue={vehicle?.with_air || true}
                          type="select"
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              with_air: e.target.value,
                            });
                          }}
                        >
                          <option value={true}>{"Sim"}</option>
                          <option value={false}>{"Nao"}</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr />

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        {Object.keys(vehicle).length ? "Editar" : "Adicionar"}
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Vehicle;