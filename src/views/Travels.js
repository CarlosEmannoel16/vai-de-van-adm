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
import "../index.css";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, DatePicker, Row, Col, Grid } from "rsuite";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
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
import { Select } from "components/Select";

function Travel() {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleSubmit, control, setValue, reset, watch } = useForm();

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
      console.log("DATA===>", data);
      setIsUpdate(true);
      reset({
        recurrentTravel: data?.recurrentTravel,
        departureDate: data?.departureDate,
        arrivalDate: data?.arrivalDate,
        idVehicle: data?.vehicleId,
        driverId: data?.driverId,
        idRoute: data?.routeId,
        description: data?.description,
      });
    }
    setLoading(false);
  }, [location?.state?.travel, reset]);

  const onSubmit = async (data) => {
    try {
      console.log("DATA", data);
      setLoading(true);
      await validateCreateTravel(data);

      if (!isUpdate) await handleCreateNewTravel(data);
      else await handleUpdateTravel(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleCreateNewTravel = async (data) => {
    try {
      console.log("DATA", data);
      await travelService.create({ ...data });
      toast.success("Viagem cadastrada com sucesso!");
      navigate("/travel");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateTravel = async (data) => {
    try {
      travelService.update({ ...data });
      toast.success("Viagem atualizada com sucesso!");
      navigate("/travel");
    } catch (error) {
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

  console.log(watch("name"));

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
            <Grid fluid>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                            value={field.value}
                            defaultValue={field.value}
                            placeholder="Descricao da Viagem"
                            onChange={(e) => setValue(field.name, e)}
                          />
                        </div>
                      )}
                    />
                  </Col>
                  <Col xs={8}>
                    <Controller
                      control={control}
                      name="idRoute"
                      render={({ field }) => (
                        <div className="verticalDirection">
                          <Label for="exampleSelect">Rota</Label>
                          <Select
                            defaultValue={field.value}
                            value={field.value}
                            data={routes.map((route) => ({
                              label: route.name,
                              value: route.id,
                            }))}
                            onChange={(e) => setValue(field.name, e)}
                            placeholder="Selecione uma Rota"
                          />
                        </div>
                      )}
                    />
                  </Col>
                  <Col xs={8}>
                    <Controller
                      control={control}
                      name="driverId"
                      render={({ field }) => (
                        <>
                          <Label for="exampleSelect">Motorista</Label>
                          <Select
                            value={field.value}
                            defaultValue={field.value}
                            data={drivers.map((driver) => ({
                              label: driver.name,
                              value: driver.id,
                            }))}
                            onChange={(e) => setValue(field.name, e)}
                            placeholder="Selecione um Motorista"
                          />
                        </>
                      )}
                    />
                  </Col>
                </Row>
                <Row className="show-grid">
                  <Col xs={4}>
                    <Controller
                      control={control}
                      name="idVehicle"
                      render={({ field }) => (
                        <>
                          <Label for="exampleSelect">Veiculo</Label>
                          <Select
                            defaultValue={field.value}
                            value={field.value}
                            data={vehicles.map((vehicle) => ({
                              label: vehicle.name,
                              value: vehicle.id,
                            }))}
                            onChange={(e) => setValue(field.name, e)}
                            placeholder="Selecione um Veiculo"
                          />
                        </>
                      )}
                    />
                  </Col>
                  <Col xs={4}>
                    <Controller
                      control={control}
                      name="departureDate"
                      render={({ field }) => (
                        <div className="verticalDirection">
                          <Label for="exampleSelect">Data de Partida</Label>
                          <DatePicker
                            format="dd/MM/yyyy"
                            defaultValue={new Date()}
                            onChange={(e) => {
                              new Date(e).toISOString();
                              setValue(field.name, new Date(e).toISOString());
                            }}
                            name="departureDate"
                            size="lg"
                            placeholder="Data de Partida"
                          />
                        </div>
                      )}
                    />
                  </Col>
                  <Col xs={4}>
                    <Controller
                      control={control}
                      name="departureDate"
                      render={({ field }) => (
                        <div className="verticalDirection">
                          <Label for="exampleSelect">Horário da partida</Label>
                          <DatePicker
                            format="HH:mm:ss"
                            defaultValue={new Date()}
                            onChange={(e) => {
                              new Date(e).toISOString();
                              setValue(field.name, new Date(e).toISOString());
                            }}
                            name="departureDateHour"
                            size="lg"
                            placeholder="Horário da partida"
                          />
                        </div>
                      )}
                    />
                  </Col>
                  <Col xs={4}>
                    <Controller
                      control={control}
                      name="arrivalDate"
                      render={({ field }) => (
                        <div className="verticalDirection">
                          <Label for="exampleSelect">Data de Chegada</Label>
                          <DatePicker
                            format="dd/MM/yyyy"
                            placeholder="Data de Chegada"
                            defaultValue={new Date()}
                            onChange={(e) =>
                              setValue(field.name, new Date(e).toISOString())
                            }
                            name="arrivalDate"
                            size="lg"
                          />
                        </div>
                      )}
                    />
                  </Col>
                  <Col xs={4}>
                    <Controller
                      control={control}
                      name="arrivalDate"
                      render={({ field }) => (
                        <div className="verticalDirection">
                          <Label for="exampleSelect">Horário de Chegada</Label>
                          <DatePicker
                            format="HH:mm:ss"
                            placeholder="Data de Chegada"
                            defaultValue={new Date()}
                            onChange={(e) =>
                              setValue(field.name, new Date(e).toISOString())
                            }
                            name="arrivalDateHour"
                            size="lg"
                          />
                        </div>
                      )}
                    />
                  </Col>
                  <Col xs={4}>
                    <Controller
                      control={control}
                      name="idVehicle"
                      render={({ field }) => (
                        <>
                          <Label for="exampleSelect">Veiculo</Label>
                          <Select
                            defaultValue={field.value}
                            value={field.value}
                            data={vehicles.map((vehicle) => ({
                              label: vehicle.name,
                              value: vehicle.id,
                            }))}
                            onChange={(e) => setValue(field.name, e)}
                            placeholder="Selecione um Veiculo"
                          />
                        </>
                      )}
                    />
                  </Col>
                </Row>

                <Row className="show-grid">
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
            </Grid>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Travel;
