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
import * as Yup from "yup";
import { toast } from "react-toastify";

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
import { cityService } from "services/city";
import { routerService } from "services/routers";
import { useLocation, useParams } from "react-router-dom";

function Route() {
  const [cities, setCities] = React.useState([]);
  const [ticketValue, setTicketValue] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [formSubmit, setFormSubmit] = useState({});

  const location = useLocation()
  console.log('1==>', location.state)
  useEffect(() => {
    setLoading(true);
    if (!cities.length) {
      cityService.find().then((response) => {
        setCities(response.data);
        setLoading(false);
      });
    }
  }, [cities]);

  useEffect(() => {
    if (formSubmit.kmValue && formSubmit.km) {
      setTicketValue(formSubmit.kmValue * formSubmit.km);
    }
  }, [formSubmit]);

  useEffect(() => {
    if (location.state?.route && !Object.keys(formSubmit).length) {
      setFormSubmit({
        name: location.state.route.name,
        origin: location.state.route.originId,
        detiny: location.state.route.destinyId,
        km: location.state.route.km,
        kmValue: location.state.route.kmValue,
      })
      console.log('2==>', formSubmit)
      setLoading(false)
    }
  }, [location.state?.route]);

  const onsubmit = (e) => {
    try {
      e.preventDefault();
      Yup.object({
        name: Yup.string().required("Nome é obrigatório"),
        origin: Yup.string().required("Cidade de origem é obrigatório"),
        destiny: Yup.string().required("Cidade de destino é obrigatório"),
        km: Yup.number().required("Distancia é obrigatório"),
        kmValue: Yup.number().required("Valor do KM é obrigatório"),
      }).validateSync(formSubmit, { abortEarly: true });

      console.log({
        destinyId: formSubmit.destiny,
        km: formSubmit.km,
        name: formSubmit.name,
        originId: formSubmit.origin,
        kmValue: formSubmit.kmvalue,
        pitStops: [],
      });
      routerService
        .create({
          destinyId: formSubmit.destiny,
          km: formSubmit.km,
          name: formSubmit.name,
          originId: formSubmit.origin,
          kmValue: Number(formSubmit.kmValue).toFixed(2),
          pitStops: [],
        })
        .then((response) => {
          console.log(response);
          toast.success("Rota Cadastrada com sucesso!");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.warning(error.message);
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Rotas</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={onsubmit}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Nome</label>
                        <Input
                          defaultValue={formSubmit.name || ""}
                          placeholder="Nome"
                          type="text"
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              name: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <Label for="exampleSelect">Cidade Origem</Label>
                        <Input
                          id="exampleSelect"
                          name="origin"
                          defaultValue={formSubmit?.origin || ""}
                          type="select"
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              origin: e.target.value,
                            });
                          }}
                        >
                          <option value={formSubmit?.destiny || ''}>{location.state?.route.Origin.name || 'Selecionar Uma Origem'}</option>

                          {cities.map((city) => (
                            <option selected={() => {
                              return city.id === formSubmit?.origin
                            }} value={city.id}>{city.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <Label for="exampleSelect">Cidade Destino</Label>
                        <Input
                          id="exampleSelect"
                          name="destiny"
                          defaultValue={formSubmit?.destiny || ""}

                          type="select"
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              destiny: e.target.value,
                            });
                          }}
                        >
                          <option value={formSubmit?.origin || ''}>{location.state?.route.Destiny.name || 'Selecionar Um Destino'}</option>

                          {cities.map((city) => (
                            <option value={city.id}>{city.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Distancia</label>
                        <Input
                          defaultValue={formSubmit?.km || ""}
                          placeholder="80"
                          name="km"
                          type="number"
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              km: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Valor do KM</label>
                        <Input
                          defaultValue={formSubmit?.kmValue || ""}
                          placeholder="ex: 0.7"
                          type="text"
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              kmValue: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Valor do Bilheto</label>
                        <Input
                          defaultValue=""
                          disabled
                          placeholder="R$:0,00"
                          type="text"
                          name="ticketValue"
                          value={ticketValue}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Adicionar Nova Rota
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

export default Route;
