import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { Button, Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import { cityService } from "services/city";
import { routerService } from "services/routers";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Grid, Row } from "rsuite";
import { InputText } from "components/input";
import { Select } from "components/Select";
import { TimelineRoute } from "components/timeline";
import { DndContext } from "@dnd-kit/core";

function Route() {
  const [cities, setCities] = React.useState([]);
  const [ticketValue, setTicketValue] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [formSubmit, setFormSubmit] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
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
      });
      setLoading(false);
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
          navigate("/routes");
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
        <Card className="card-user">
          <CardHeader>
            <CardTitle tag="h5">Rotas</CardTitle>
          </CardHeader>
          <CardBody>
            <Grid fluid>
              <Row className="show-grid">
                <Col xs="8" style={{ marginBottom: 10 }}>
                  <label>Descrição:</label>
                  <InputText placeholder="Descricão da rota" size="lg" />
                </Col>
                <Col xs="8">
                  <label>Origem:</label>
                  <Select
                    size="lg"
                    placeholder="Lugar de origem"
                    data={cities.map((city) => ({
                      label: city.name,
                      value: city?.id,
                    }))}
                  />
                </Col>
                <Col xs="8">
                  <label>Destino:</label>
                  <Select
                    size="lg"
                    placeholder="Lugar de destino"
                    data={cities.map((city) => ({
                      label: city.name,
                      value: city?.id,
                    }))}
                    style={{}}
                  />
                </Col>
              </Row>
              <Row className="show-grid">
                <Col xs="8">
                  <label>Distancia da rota:</label>
                  <InputText
                    defaultValue={formSubmit?.km || ""}
                    placeholder="80"
                    size="lg"
                    name="km"
                    type="number"
                    onChange={(e) => {
                      setFormSubmit({
                        ...formSubmit,
                        km: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col xs="8">
                  <label>Valor cobrado por km:</label>
                  <InputText
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
                </Col>
                <Col xs="8">
                  <label>Valor estimado da passagem:</label>
                  <InputText
                    defaultValue=""
                    disabled
                    placeholder="R$:0,00"
                    type="text"
                    name="ticketValue"
                    value={ticketValue}
                  />
                </Col>
              </Row>
              <Row>
                <div className="update ml-auto mr-auto">
                  <Button className="btn-round" color="primary" type="submit">
                    {Object.keys(location?.state?.route || {}).length > 0
                      ? "Atualizar Rota"
                      : "Adicionar Nova Rota"}
                  </Button>
                </div>
              </Row>
            </Grid>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Route;
