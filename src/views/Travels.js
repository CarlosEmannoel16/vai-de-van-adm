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
import * as yup from "yup";
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
import { routerService } from "services/routers";
import "../assets/css/travelsAdd.css";
import { cityService } from "services/city";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faLocationDot,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { userService } from "services/driver";
import { serviceVehicles } from "services/vehicle";
import { travelService } from "services/travel";
import { useLocation, useNavigate } from "react-router-dom";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Travel() {
  const [routes, setRoutes] = useState([]);

  const [pitStops, setPitStops] = useState([]);
  const [cities, setCities] = useState([]);
  const [dataToForm, setDataToForm] = useState({});
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicle] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location?.state?.travel && !Object.keys(dataToForm).length) {
      console.log("setendo");
      setDataToForm({
        ...location.state?.travel,
      });
      let pitStops = [...location.state?.travel?.TripStops];
      pitStops[0] = {
        ...pitStops[0],
        fixed: true,
      };
      setPitStops(pitStops);
    }
  }, [location?.state?.travel]);

  const handleButtonAddPitStop = () => {
    if (pitStops.length === 0) {
      toast.warning("Selecione uma rota");
      return;
    }
    if (pitStops.length >= 2) {
      const pitStops1 = [...pitStops];
      const lastPitStop = pitStops1[pitStops1.length - 1];
      pitStops1[pitStops1.length - 1] = { fixed: false };
      pitStops1.push(lastPitStop);
      setPitStops(pitStops1);
    }
  };

  const handleSelectRouter = (routerString) => {
    const router = JSON.parse(routerString);
    if (pitStops.length === 0) {
      setPitStops([
        {
          fixed: true,
          cityIdFromTo: router.Origin.id,
          name: router.Origin.name,
          tripStopOrder: 0,
        },
        {
          fixed: true,
          cityIdFromTo: router.Destiny.id,
          name: router.Destiny.name,
          tripStopOrder: 999,
        },
      ]);
      setDataToForm({
        ...dataToForm,
        routeId: router.id,
      });
    } else {
      const pitStops1 = [...pitStops];
      pitStops1[0] = {
        fixed: true,
        cityIdFromTo: router.Origin.id,
        name: router.Origin.name,
        tripStopOrder: 0,
      };
      pitStops1[pitStops1.length - 1] = {
        fixed: true,
        cityIdFromTo: router.Destiny.id,
        name: router.Destiny.name,
        tripStopOrder: 999,
      };
      setDataToForm({
        ...dataToForm,
        routeId: router.id,
      });
      setPitStops([...pitStops1]);
    }
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await yup
        .object()
        .shape({
          arrivalDate: yup.string().required("Data de Chegada é obrigatório"),
          departureDate: yup.string().required("Data de Partida é obrigatório"),
          description: yup.string().required("Descrição é obrigatório"),
          driverId: yup.string().required("Motorista é obrigatório"),
          idVehicle: yup.string().required("Veiculo é obrigatório"),
          routeId: yup.string().required("Rota é obrigatório"),
        })
        .validate(dataToForm, {
          abortEarly: true,
        });

      pitStops.map((pitStop) => {
        if (!pitStop.distanceFromLastStop && !pitStop.fixed) {
          throw new Error("Distancia entre paradas é obrigatório");
        }
      });

      if (!location?.state?.travel) {
        travelService
          .create({ ...dataToForm, tripStops: pitStops })
          .then((res) => {
            setLoading(false);
            toast.success("Viagem cadastrada com sucesso");
            navigate("/travel");
          })
          .catch((e) => {
            setLoading(false);
            toast.error(e.message);
          });
        return;
      }
      travelService
        .update({ ...dataToForm, tripStops: pitStops })
        .then((res) => {
          setLoading(false);
          toast.success("Viagem Atualizada com sucesso");
          navigate("/travel");
        })
        .catch((e) => {
          setLoading(false);
          toast.error(e.message);
        });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleSelectCity = (city, index) => {
    const cityData = JSON.parse(city);
    const copyPitStops = [...pitStops];
    copyPitStops[index] = {
      ...pitStops[index],
      cityIdFromTo: cityData.id,
      tripStopOrder: index,
      name: cityData.name,
    };
    setPitStops(copyPitStops);
  };

  useState(() => {
    if (!routes.length && !cities.length) {
      // setLoading(true);
      routerService
        .find()
        .then((res) => {
          setRoutes(res.data.data);
          // setLoading(false);
        })
        .then(() => {
          cityService.find().then((response) => {
            setCities(response.data);
          });
        })
        .then(() => {
          userService.getAll().then((response) => {
            setDrivers(response.data.data);
          });
        })
        .then(() => {
          serviceVehicles.getAll().then((response) => {
            setVehicle(response.data.data);
          });
        })
        .catch((err) => {
          toast.error("Erro ao buscar dados");
        });
    }
  }, [routes]);

  return (
    <>
      <div className="content">
        <Card className="card-user">
          <CardHeader>
            <CardTitle tag="h5">
              {" "}
              {!!location.state?.travel
                ? "Edicao de Viagem"
                : "Cadastro de Viagem"}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={onSubmit}>
              <Row>
                <Col className="pr-1" md="5">
                  <FormGroup>
                    <label>Nome</label>
                    <Input
                      defaultValue={dataToForm?.description || ""}
                      placeholder="Descricao da Viagem"
                      onChange={(e) =>
                        setDataToForm({
                          ...dataToForm,
                          description: e.target.value,
                        })
                      }
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col className="px-1" md="3">
                  <FormGroup>
                    <Label for="exampleSelect">Rota</Label>
                    <Input
                      id="idRoute"
                      name="idRoute"
                      type="select"
                      defaultValue={JSON.stringify(dataToForm?.Route)}
                      onChange={(e) => {
                        handleSelectRouter(e.target.value);
                      }}
                    >
                      <option
                        key={897986}
                        value={JSON.stringify(dataToForm?.Route)}
                      >
                        {dataToForm?.Route?.name || "Selecionar Uma Rota"}
                      </option>
                      {routes.length &&
                        routes.map((route, index) => (
                          <option key={index} value={JSON.stringify(route)}>
                            {route.name}
                          </option>
                        ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col className="px-1" md="3">
                  <FormGroup>
                    <Label for="exampleSelect">Motorista</Label>
                    <Input
                      id="driverId"
                      name="driverId"
                      type="select"
                      placeholder="Digite o Nome do Motorista"
                      defaultValue={dataToForm?.Driver?.User?.id}
                      onChange={(e) =>
                        setDataToForm({
                          ...dataToForm,
                          driverId: e.target.value,
                        })
                      }
                    >
                      <option key={897986} value={dataToForm?.Driver?.User?.id}>
                        {dataToForm?.Driver?.User?.name ||
                          "Selecionar Um Motorista"}
                      </option>
                      {drivers.length &&
                        drivers.map((driver) => {
                          if (driver.User.Driver.length > 0)
                            return (
                              <option value={driver.User.id}>
                                {driver.User.name}
                              </option>
                            );
                        })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="3">
                  <FormGroup>
                    <Label for="exampleSelect">Veiculo</Label>
                    <Input
                      id="idVehicle"
                      name="idVehicle"
                      defaultValue={dataToForm?.Vehicle?.id}
                      type="select"
                      onChange={(e) =>
                        setDataToForm({
                          ...dataToForm,
                          idVehicle: e.target.value,
                        })
                      }
                    >
                      <option key={897986} value={dataToForm?.Vechicle?.id}>
                        {dataToForm?.Vechicle?.description ||
                          "Selecionar Um Veiculo"}
                      </option>
                      {vehicles.length &&
                        vehicles.map((vh) => {
                          return (
                            <option value={vh.id}>{vh.description}</option>
                          );
                        })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col className="px-1" md="3">
                  <FormGroup>
                    <Label for="exampleSelect">Data de Partida</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      defaultValue={dataToForm?.departureDate
                        ?.toString()
                        ?.substring(0, 10)}
                      onChange={(e) =>
                        setDataToForm({
                          ...dataToForm,
                          departureDate: e.target.value,
                        })
                      }
                    ></Input>
                  </FormGroup>
                </Col>
                <Col className="px-1" md="3">
                  <FormGroup>
                    <Label for="exampleSelect">Data de Chegada</Label>
                    <Input
                      id="arrivalDate"
                      type="date"
                      defaultValue={dataToForm?.arrivalDate
                        ?.toString()
                        ?.substring(0, 10)}
                      onChange={(e) =>
                        setDataToForm({
                          ...dataToForm,
                          arrivalDate: e.target.value,
                        })
                      }
                    ></Input>
                  </FormGroup>
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
            </Form>
          </CardBody>
        </Card>

        {pitStops.length > 0 &&
          pitStops.map((pitStop, index) => (
            <Row
              style={{
                height: "250px",
              }}
            >
              <Col md="1">
                <Card className="card-user">
                  <CardBody
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    {pitStop.fixed ? (
                      <>
                        <FontAwesomeIcon
                          className="leftTimeLineIcon"
                          icon={faLocationDot}
                        />
                        <FontAwesomeIcon icon={faBus} size="lg" />
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          className="leftTimeLineIcon"
                          icon={faMapPin}
                        />
                      </>
                    )}
                    <span>
                      {pitStop.tripStopOrder === 0
                        ? "Origem"
                        : pitStop.tripStopOrder === 999
                        ? "Destino"
                        : ""}
                    </span>
                  </CardBody>
                </Card>
              </Col>
              <Col md="11">
                <Card className="card-user" style={{ minHeight: "30px" }}>
                  <CardBody>
                    <FormGroup>
                      <Label for="exampleSelect">Cidade</Label>
                      <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        disabled={pitStop.fixed}
                        onChange={(e) =>
                          handleSelectCity(e.target.value, index)
                        }
                      >
                        {pitStop.fixed ? (
                          <option
                            key={pitStop.cityIdFromTo}
                            value={pitStop.cityIdFromTo}
                          >
                            {pitStop.name}
                          </option>
                        ) : (
                          cities.length &&
                          cities.map((city, index) => (
                            <option key={index} value={JSON.stringify(city)}>
                              {city.name}
                            </option>
                          ))
                        )}
                      </Input>
                    </FormGroup>
                    {!pitStop.fixed ? (
                      <Row>
                        <Col className="pr-1" md="3">
                          <FormGroup>
                            <label>Distancia da ultima parada</label>
                            <Input
                              defaultValue=""
                              placeholder="Km"
                              type="text"
                              onChange={(e) => {
                                const copyPitStops = [...pitStops];
                                copyPitStops[index] = {
                                  ...copyPitStops[index],
                                  distanceFromLastStop: e.target.value,
                                };
                                setPitStops(copyPitStops);
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="3">
                          <FormGroup>
                            <label>Distancia da origem</label>
                            <Input
                              defaultValue=""
                              placeholder="Km"
                              type="text"
                              disabled={true}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="6"></Col>
                      </Row>
                    ) : (
                      <></>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ))}

        <Row
          onClick={() => {
            handleButtonAddPitStop();
          }}
        >
          <Col md="12">
            <Card className="TravelAdd">Adicionar Nova Parada</Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Travel;
