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
import { useNavigate, useParams } from "react-router-dom";

function Route() {
  const [cities, setCities] = React.useState([]);
  const [ticketValue, setTicketValue] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [formSubmit, setFormSubmit] = useState({});
  const { id } = useParams();
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

  useEffect(() => {}, []);

  const onsubmit = (e) => {
    try {
      e.preventDefault();
      Yup.object({
        name: Yup.string().required("Nome é obrigatório"),
        origin: Yup.string().required("Cidade de origem é obrigatório"),
        detiny: Yup.string().required("Cidade de destino é obrigatório"),
        km: Yup.number().required("Distancia é obrigatório"),
        kmValue: Yup.number().required("Valor do KM é obrigatório"),
      }).validateSync(formSubmit, { abortEarly: true });

      console.log({
        destinyId: formSubmit.detiny,
        km: formSubmit.km,
        name: formSubmit.name,
        originId: formSubmit.origin,
        kmValue: formSubmit.kmvalue,
        pitStops: [],
      });
      routerService
        .create({
          destinyId: formSubmit.detiny,
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
                          defaultValue=""
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
                          type="select"
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              origin: e.target.value,
                            });
                          }}
                        >
                          {cities.map((city) => (
                            <option value={city.id}>{city.name}</option>
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
                          type="select"
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              detiny: e.target.value,
                            });
                          }}
                        >
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
                          defaultValue=""
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
                          defaultValue=""
                          placeholder="R$ 0.70"
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
                          placeholder="0,00"
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
