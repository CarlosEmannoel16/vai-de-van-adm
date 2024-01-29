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
import { useForm, Controller } from "react-hook-form";

import { toast } from "react-toastify";
import { Row, Col, Grid, Input, Toggle } from "rsuite";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
} from "reactstrap";
import { userService } from "services/driver";
import { serviceVehicles } from "services/vehicle";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Select } from "components/Select";
import { vehicleValidation } from "./validations/vehicleValidation";

function Vehicle() {
  const { handleSubmit, control, setValue, reset, watch } = useForm();

  let { state } = useLocation();

  const [formSubmit, setFormSubmit] = useState({ with_air: true });
  const [drivers, setDriver] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(false); // [1
  const params = useParams();
  const navigate = useNavigate();

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
        ownerName: state.ownerName || "",
        with_air: true,
      });
      setLoading(false);
    }
  }, []);

  const onsubmit = async (data) => {
    try {
      console.log("DATA", data);
      setLoading(true);
      vehicleValidation(data);

      if (!isUpdate) await handlerCreateVehicle(data);
      else await handlerUpdateVehicle(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handlerCreateVehicle = async (data) => {
    try {
      await serviceVehicles.create(data);
      toast.success("Veiculo cadastrado com sucesso");
      setTimeout(() => {
        navigate(`/list/vehicles`);
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlerUpdateVehicle = async (data) => {
    try {
      await serviceVehicles.update(data);
      toast.success("Veiculo atualizado com sucesso");
      setTimeout(() => {
        navigate(`/list/vehicles`);
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="content">
        <Card className="card-user">
          <CardHeader>
            <CardTitle tag="h5">Cadastro de Veiculos</CardTitle>
          </CardHeader>
          <CardBody>
            <Grid fluid>
              <form onSubmit={handleSubmit(onsubmit)}>
                <Row className="show-grid">
                  <Col xs={8}>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <div className="verticalDirection">
                          <label>Nome</label>
                          <Input
                            name="description"
                            size="lg"
                            defaultValue={field.value}
                            placeholder="Descricao do Veiculo"
                            onChange={(e) => setValue(field.name, e)}
                          />
                        </div>
                      )}
                    />
                  </Col>
                  <Col xs={8}>
                    <Controller
                      name="plate"
                      control={control}
                      render={({ field }) => (
                        <div className="verticalDirection">
                          <label>Placa</label>
                          <Input
                            name="description"
                            size="lg"
                            defaultValue={field.value}
                            placeholder="Placa do veiculo"
                            onChange={(e) => setValue(field.name, e)}
                          />
                        </div>
                      )}
                    />
                  </Col>
                  <Col xs={8}>
                    <Controller
                      name="amount_of_accents"
                      control={control}
                      render={({ field }) => (
                        <div className="verticalDirection">
                          <label>Quantidade de Lugares*</label>
                          <Input
                            name="description"
                            size="lg"
                            defaultValue={field.value}
                            placeholder="Quantidade de Lugares"
                            onChange={(e) => setValue(field.name, e)}
                          />
                        </div>
                      )}
                    />
                  </Col>
                </Row>
                <Row className="show-grid">
                  <Col xs={8}>
                    <Controller
                      name="cor"
                      control={control}
                      render={({ field }) => (
                        <div className="verticalDirection">
                          <label>Cor*</label>
                          <Input
                            name="description"
                            size="lg"
                            defaultValue={field.value}
                            placeholder="Cor do veiculo"
                            onChange={(e) => setValue(field.name, e)}
                          />
                        </div>
                      )}
                    />
                  </Col>
                  <Col xs={8}>
                    <Controller
                      name="ownerName"
                      control={control}
                      render={({ field }) => (
                        <div className="verticalDirection">
                          <label>Proprietário</label>
                          <Input
                            name="description"
                            size="lg"
                            defaultValue={field.value}
                            placeholder="Nome do proprietário do veiculo"
                            onChange={(e) => setValue(field.name, e)}
                          />
                        </div>
                      )}
                    />
                  </Col>
                </Row>
                <Row className="show-grid">
                  <Col xs={8}>
                    <Controller
                      control={control}
                      name="with_air"
                      render={({ field }) => (
                        <div className="verticalDirection">
                          <Label for="exampleSelect">
                            Possui Ar-Condicionado
                          </Label>
                          <Toggle
                            size="lg"
                            checkedChildren="Sim"
                            unCheckedChildren="Não"
                            onChange={(e) => {
                              console.log(e);
                              setValue(field.name, e);
                            }}
                          />
                        </div>
                      )}
                    />
                  </Col>
                </Row>
                <hr />

                <Row className="show-grid">
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
              </form>
            </Grid>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Vehicle;
