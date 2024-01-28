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

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  Row,
  Col,
  Label,
} from "reactstrap";

import "../assets/css/travelsAdd.css";
import { toast } from "react-toastify";
import { cityService } from "services/city";
import { userService } from "services/driver";
import { travelService } from "services/travel";
import { routerService } from "services/routers";
import { serviceVehicles } from "services/vehicle";
import { useLocation, useNavigate } from "react-router-dom";
import { validateCreateTravel } from "./validations/TravelValidaton";

function Travel() {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleSubmit, control, setValue, reset } = useForm();

  const [routes, setRoutes] = useState([]);
  const [cities, setCities] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setLoading(true);
    const data = location?.state?.travel;
    if (data && Object.keys(data).length) {
      setIsUpdate(true);
      reset({
        recurrentTravel: data?.recurrentTravel,
        departureDate: data?.departureDate,
        arrivalDate: data?.arrivalDate,
        idVehicle: data?.vehicleId,
        driverId: data?.driverId,
        idRoute: data?.routeId,
        name: data?.name,
      });
    }
    setLoading(false);
  }, [location?.state?.travel, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    await validateCreateTravel(data);

    if (!isUpdate) await handleCreateNewTravel(data);
    else await handleUpdateTravel(data);

    setLoading(false);
  };

  const handleCreateNewTravel = async (data) => {
    try {
      travelService.create({ ...data });
      toast.success("Viagem cadastrada com sucesso!");
      navigate("/travel");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleUpdateTravel = async (data) => {
    try {
      travelService.update({ ...data });
      toast.success("Viagem atualizada com sucesso!");
      navigate("/travel");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const getAllData = async () => {
    setLoading(true);
    const routes = await routerService.find();
    setRoutes(routes.data.data);
    const cities = await cityService.find();
    setCities(cities.data);
    const drivers = await userService.getAllDrivers();
    setDrivers(drivers.data.data);
    const vehicles = await serviceVehicles.getAll();
    setVehicle(vehicles.data.data);
    setLoading(false);
  };

  useState(() => {
    if (!routes.length && !cities.length) {
      getAllData();
    }
  }, [routes]);

  return (
    <>
      <div className="content">
        <Card className="card-user">
          <CardHeader>
            <CardTitle tag="h5">
              {isUpdate ? "Edição de Viagem" : "Cadastro de Viagem"}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col className="pr-1" md="5">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <FormGroup>
                        <label>Nome</label>
                        <Input
                          defaultValue={field.value}
                          placeholder="Descricao da Viagem"
                          onChange={(e) => setValue}
                          type="text"
                        />
                      </FormGroup>
                    )}
                  />
                </Col>
                <Col className="px-1" md="3">
                  <Controller
                    control={control}
                    name="idRoute"
                    render={({ field }) => (
                      <FormGroup>
                        <Label for="exampleSelect">Rota</Label>
                        <Input
                          id="idRoute"
                          name="idRoute"
                          type="select"
                          defaultValue={field.value}
                          onChange={(e) => setValue}
                        >
                          <option key={897986} defaultChecked>
                            Selecionar Uma Rota
                          </option>
                          {routes.length &&
                            routes.map((route, index) => (
                              <option
                                key={index}
                                value={JSON.stringify(route)}
                                defaultChecked={route.id === field.value}
                              >
                                {route.name}
                              </option>
                            ))}
                        </Input>
                      </FormGroup>
                    )}
                  />
                </Col>
                <Col className="px-1" md="3">
                  <Controller
                    control={control}
                    name="driverId"
                    render={({ field }) => (
                      <FormGroup>
                        <Label for="exampleSelect">Motorista</Label>
                        <Input
                          id="driverId"
                          name="driverId"
                          type="select"
                          placeholder="Digite o Nome do Motorista"
                          defaultValue={field.value}
                          onChange={(e) => setValue}
                        >
                          <option key={897986} value={field.value}>
                            Selecionar Um Motorista
                          </option>
                          {drivers.length &&
                            drivers.map((driver) => {
                              return (
                                <option
                                  value={driver.id}
                                  defaultChecked={driver.id === field.value}
                                >
                                  {driver.name}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    )}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="3">
                  <Controller
                    control={control}
                    name="idVehicle"
                    render={({ field }) => (
                      <FormGroup>
                        <Label for="exampleSelect">Veiculo</Label>
                        <Input
                          id="idVehicle"
                          name="idVehicle"
                          defaultValue={field.value}
                          type="select"
                          value={field.value}
                          onChange={(e) => setValue}
                        >
                          <option key={897986} value={field.value}>
                            {field.value || "Selecionar Um Veiculo"}
                          </option>
                          {vehicles.length &&
                            vehicles.map((vehicleCurrent) => {
                              return (
                                <option value={vehicleCurrent.id}>
                                  {vehicleCurrent.name}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    )}
                  />
                </Col>
                <Col className="px-1" md="3">
                  <Controller
                    control={control}
                    name="departureDate"
                    render={({ field }) => (
                      <FormGroup>
                        <Label for="exampleSelect">Data de Partida</Label>
                        <Input
                          id="departureDate"
                          type="date"
                          defaultValue={field.value
                            ?.toString()
                            ?.substring(0, 10)}
                          onChange={(e) => setValue}
                        ></Input>
                      </FormGroup>
                    )}
                  />
                </Col>
                <Col className="px-1" md="3">
                  <Controller
                    control={control}
                    name="arrivalDate"
                    render={({ field }) => (
                      <FormGroup>
                        <Label for="exampleSelect">Data de Chegada</Label>
                        <Input
                          id="arrivalDate"
                          type="date"
                          defaultValue={field.value
                            ?.toString()
                            ?.substring(0, 10)}
                          onChange={(e) => setValue}
                        ></Input>
                      </FormGroup>
                    )}
                  />
                </Col>
                <Col className="px-1" md="3">
                  <Controller
                    name="recurrentTravel"
                    control={control}
                    render={({ field }) => (
                      <FormGroup>
                        <Label for="exampleSelect">Viagem Recorrente</Label>
                        <Input
                          id="arrivalDate"
                          type="date"
                          defaultValue={field.value
                            ?.toString()
                            ?.substring(0, 10)}
                          onChange={(e) => setValue}
                        ></Input>
                      </FormGroup>
                    )}
                  />
                </Col>
              </Row>

              <Row>
                <div className="update ml-auto mr-auto">
                  <Button
                    className="btn-round"
                    color="primary"
                    type="submit"
                    disabled={loading}
                  >
                    Salvar
                  </Button>
                </div>
              </Row>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Travel;
