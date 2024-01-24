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
import { useLocation } from "react-router-dom";

function Vehicle() {
  let { state } = useLocation();
  console.log(state);

  const [formSubmit, setFormSubmit] = useState({ with_air: true });
  const [drivers, setDriver] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(false); // [1
  const params = useParams();
  const navigate = useNavigate();
  const onsubmit = (e) => {
    try {
      setLoading(true);
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
            setLoading(false);
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
            setLoading(false);
          });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
    e.preventDefault();
  };

  useState(() => {
    if (!drivers.length) {
      setLoading(true);
      userService
        .getAll()
        .then((res) => {
          setDriver(res.data.data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Erro ao buscar motoristas");
          setLoading(false);
        });
    }
  }, [drivers]);

  useEffect(() => {
    if (state && state.id) {
      setLoading(true);

      setIsUpdate(true);
      setVehicle(state);

      setFormSubmit({
        id: state.id || "",
        description: state.name || "",
        plate: state.plate || "",
        amount_of_accents: state.quantitySeats || "",
        cor: state.color || "",
        ownerId: "",
        with_air: true,
      });
      setLoading(false);
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
                          defaultValue={vehicle.quantitySeats || ""}
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
                          <option value="">Selecionar um Proprietário</option>
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
                        disabled={loading}
                      >
                        {Object.keys(vehicle).length ? "Salvar" : "Adicionar"}
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
