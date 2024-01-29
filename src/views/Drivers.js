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
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/css/driver.css";
import { Row, Col, Grid, Input, DatePicker } from "rsuite";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  CardFooter,
  Label,
} from "reactstrap";
import { userService } from "services/driver";
import { Loader } from "components/Loader/Loader";
import { formatDateToInputUpdate } from "../helpers/formatDateToDisplay";
import profileM from "../assets/img/profile-m.jpg";
import capa from "../assets/img/jan-sendereks.jpg";
import { Select } from "components/Select";
import { driverValidation } from "./validations/driverValidation";

function Driver() {
  const { handleSubmit, control, setValue, reset } = useForm();

  const [formSubmit, setFormSubmit] = useState({});
  const [driver, setDriver] = useState({});
  const [isUpdate, setIsUpdate] = useState(false); // eslint-disable-line
  const [loading, setLoading] = useState(false); // eslint-disable-line

  const navigate = useNavigate();
  const id = useLocation().state;

  const uploadProfileImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.querySelector(".profileImageLabel").src = e.target.result;
    };

    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    console.log(formData);
  };

  useState(() => {
    if (id) {
      setLoading(true);
      userService.getById(id).then((res) => {
        const result = res.data.data;
        console.log(result);
        setDriver(result);
        setIsUpdate(true);
        reset({
          id: result.id,
          type: result.type,
          name: result.name,
          email: result.email,
          password: result.password,
          cpf: result.cpf,
          phone: result.phone,
          date_of_birth: result.date_of_birth,
          cnh: result.Driver[0].cnh,
          cnhDateOfIssue: result.Driver[0].cnhDateOfIssue,
          cnhExpirationDate: result.Driver[0].cnhExpirationDate,
        });
        setLoading(false);
      });
    }
  }, [id]);
  const onSubmit = async (data) => {
    try {
      driverValidation(data);
      if (!id) await handleCreateDriver(data);
      else await handleUpdateDriver(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCreateDriver = async (data) => {
    try {
      await userService.create({ ...data });
      toast.success("Motorista cadastrado com sucesso!");
      navigate("/drivers");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateDriver = async (data) => {
    try {
      await userService.update({ ...data });
      toast.success("Motorista atualizado com sucesso!");
      navigate("/drivers");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="content">
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="show-grid">
              <Col xs={8}>
                <Card
                  className="card-user"
                  style={{
                    display: "block",
                  }}
                >
                  <div className="image">
                    <img alt="..." src={capa} />
                  </div>
                  <CardBody>
                    <Grid fluid>
                      <div className="author">
                        <label for="profileImage">
                          <img
                            alt="..."
                            className="avatar profileImageLabel profileImage"
                            src={profileM}
                          />
                        </label>
                        <input
                          type="file"
                          id="profileImage"
                          style={{
                            display: "none",
                          }}
                          onChange={(e) => {
                            uploadProfileImage(e.target.files[0]);
                          }}
                        />
                      </div>
                      <h5 className="title">{formSubmit.name || ""}</h5>
                      <p className="description">{formSubmit.email || ""}</p>

                      <p className="description text-center">
                        {formSubmit.phone || ""}
                      </p>
                    </Grid>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <br />

                    {!!id ? (
                      <div className="button-container">
                        <Row className="show-grid">
                          <Col className="ml-auto" lg="6" md="6" xs="6">
                            <h5>
                              {driver?.Vehicle?.length || 0} <br />
                              <small>Veiculos</small>
                            </h5>
                          </Col>
                          <Col className="ml-auto mr-auto" lg="6" md="6" xs="6">
                            <h5>
                              0 <br />
                              <small>Viagens</small>
                            </h5>
                          </Col>
                        </Row>
                      </div>
                    ) : (
                      <>
                        <br /> <br />
                      </>
                    )}
                  </CardFooter>
                </Card>
              </Col>

              <Col md={16}>
                <Card className="card-user">
                  <CardHeader>
                    <CardTitle tag="h5">
                      {!!id
                        ? "Voce está editando " + formSubmit.name
                        : "Cadastro de Motorista"}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Grid fluid>
                      <Row className="show-grid">
                        <Col xs={8}>
                          <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                              <div className="verticalDirection">
                                <label>Nome</label>
                                <Input
                                  size="lg"
                                  defaultValue={field.value}
                                  placeholder="Nome do Motorista"
                                  onChange={(e) => setValue(field.name, e)}
                                />
                              </div>
                            )}
                          />
                        </Col>
                        <Col xs={8}>
                          <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                              <div className="verticalDirection">
                                <label>Email</label>
                                <Input
                                  type="email"
                                  size="lg"
                                  defaultValue={field.value}
                                  placeholder="Email do Motorista"
                                  onChange={(e) => setValue(field.name, e)}
                                />
                              </div>
                            )}
                          />
                        </Col>
                        <Col xs={8}>
                          <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                              <div className="verticalDirection">
                                <label>Senha</label>
                                <Input
                                  type="password"
                                  size="lg"
                                  defaultValue={field.value}
                                  placeholder="Senha de acesso"
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
                            name="cpf"
                            control={control}
                            render={({ field }) => (
                              <div className="verticalDirection">
                                <label>CPF*</label>
                                <Input
                                  type="text"
                                  size="lg"
                                  defaultValue={field.value}
                                  placeholder="CPF do motorista"
                                  onChange={(e) => setValue(field.name, e)}
                                />
                              </div>
                            )}
                          />
                        </Col>
                        <Col xs={8}>
                          <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                              <div className="verticalDirection">
                                <label>Telefone</label>
                                <Input
                                  type="text"
                                  size="lg"
                                  defaultValue={field.value}
                                  placeholder="Telefone do  motorista"
                                  onChange={(e) => setValue(field.name, e)}
                                />
                              </div>
                            )}
                          />
                        </Col>
                        <Col xs={8}>
                          <Controller
                            control={control}
                            name="date_of_birth"
                            render={({ field }) => (
                              <div className="verticalDirection">
                                <Label for="exampleSelect">
                                  Data de Nascimento
                                </Label>
                                <DatePicker
                                  format="dd/MM/yyyy"
                                  defaultValue={new Date()}
                                  onChange={(e) => {
                                    setValue(
                                      field.name,
                                      new Date(e).toISOString()
                                    );
                                  }}
                                  name="date_of_birth"
                                  size="lg"
                                  placeholder="Data de Partida"
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
                            name="sexo"
                            render={({ field }) => (
                              <div className="verticalDirection">
                                <Label for="exampleSelect">Sexo</Label>
                                <Select
                                  defaultValue={field.value}
                                  data={
                                    [
                                      { label: "Masculino", value: "M" },
                                      { label: "Feminino", value: "F" },
                                      {
                                        label: "Prefiro não informar",
                                        value: "N",
                                      },
                                    ] || []
                                  }
                                  onChange={(e) => setValue(field.name, e)}
                                  placeholder="Sexo"
                                />
                              </div>
                            )}
                          />
                        </Col>
                      </Row>

                      <hr />
                      <Row className="show-grid">
                        <Col xs={8}>
                          <Controller
                            name="cnh"
                            control={control}
                            render={({ field }) => (
                              <div className="verticalDirection">
                                <label>CNH*</label>
                                <Input
                                  type="text"
                                  size="lg"
                                  defaultValue={field.value}
                                  placeholder="N. da CNH do motorista"
                                  onChange={(e) => setValue(field.name, e)}
                                />
                              </div>
                            )}
                          />
                        </Col>
                        <Col xs={8}>
                          <Controller
                            control={control}
                            name="cnhDateOfIssue"
                            render={({ field }) => (
                              <div className="verticalDirection">
                                <Label for="exampleSelect">
                                  Data de Emissao*
                                </Label>
                                <DatePicker
                                  format="dd/MM/yyyy"
                                  defaultValue={new Date()}
                                  onChange={(e) => {
                                    setValue(
                                      field.name,
                                      new Date(e).toISOString()
                                    );
                                  }}
                                  name="departureDate"
                                  size="lg"
                                  placeholder="Data de Emissao da cnh"
                                />
                              </div>
                            )}
                          />
                        </Col>
                        <Col xs={8}>
                          <Controller
                            control={control}
                            name="cnhExpirationDate"
                            render={({ field }) => (
                              <div className="verticalDirection">
                                <Label for="exampleSelect">
                                  Data de Validade*
                                </Label>
                                <DatePicker
                                  format="dd/MM/yyyy"
                                  defaultValue={new Date()}
                                  onChange={(e) => {
                                    setValue(
                                      field.name,
                                      new Date(e).toISOString()
                                    );
                                  }}
                                  name="cnhExpirationDate"
                                  size="lg"
                                  placeholder="Data de validade da cnh"
                                />
                              </div>
                            )}
                          />
                        </Col>
                      </Row>
                      <Row className="show-grid"></Row>
                      <Row className="show-grid">
                        <div className="update ml-auto mr-auto">
                          <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                            disabled={loading}
                          >
                            {isUpdate ? "Atualizar" : "Adicionar"}
                          </Button>
                        </div>
                      </Row>
                    </Grid>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </form>
        )}
      </div>
    </>
  );
}

export default Driver;
