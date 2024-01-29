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
import { Row, Col, Grid } from "rsuite";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  CardFooter,
  Label,
} from "reactstrap";
import { userService } from "services/driver";
import { Loader } from "components/Loader/Loader";
import { formatDateToInputUpdate } from "../helpers/formatDateToDisplay";
import profileM from "../assets/img/profile-m.jpg";
import capa from "../assets/img/jan-sendereks.jpg";

function Driver() {
  const { handleSubmit, control, setValue, reset, watch } = useForm();

  const [formSubmit, setFormSubmit] = useState({});
  const [driver, setDriver] = useState({});
  const [isUpdate, setIsUpdate] = useState(false); // eslint-disable-line
  const [loading, setLoading] = useState(false); // eslint-disable-line

  const navigate = useNavigate();
  const id = useLocation().state;

  const uploadProfileImage = (file) => {
    console.log(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      alert(e.target.result);
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
        setFormSubmit({
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
        }); // eslint-disable-line
        setLoading(false);
      });
    }
  }, [id]);
  const onSubmit = (e) => {
    try {
      e.preventDefault();

      if (!id) {
        userService.create(formSubmit).then((res) => {
          toast.success("Motorista cadastrado com sucesso!");
          setTimeout(() => {
            navigate("/drivers");
          }, 2000);
        });
      } else {
        userService.update(formSubmit).then((res) => {
          toast.success("Motorista Atualizado com sucesso!");
          setTimeout(() => {
            navigate("/drivers");
          }, 2000);
        });
      }
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
                          <FormGroup>
                            <label>CPF*</label>
                            <Input
                              placeholder="09878912343"
                              type="text"
                              value={formSubmit.cpf || ""}
                              onChange={(e) => {
                                setFormSubmit({
                                  ...formSubmit,
                                  cpf: e.target.value,
                                });
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={8}>
                          <FormGroup>
                            <label>Telefone</label>
                            <Input
                              placeholder="88997017654"
                              type="text"
                              value={formSubmit.phone || ""}
                              onChange={(e) => {
                                setFormSubmit({
                                  ...formSubmit,
                                  phone: e.target.value,
                                });
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="show-grid">
                        <Col xs={8}>
                          <FormGroup>
                            <label>Data de Nascimento</label>
                            <Input
                              type="date"
                              defaultValue={formatDateToInputUpdate(
                                driver?.date_of_birth ||
                                  new Date().toISOString()
                              )}
                              onChange={(e) => {
                                setFormSubmit({
                                  ...formSubmit,
                                  date_of_birth: e.target.value,
                                });
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={8}>
                          <FormGroup>
                            <Label for="exampleSelect">Sexo</Label>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
                            >
                              <option>Selecionar</option>
                              <option>Masculino</option>
                              <option>Feminino</option>
                              <option> Não binário </option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>

                      <hr />
                      <Row className="show-grid">
                        <Col xs={8}>
                          <FormGroup>
                            <label>CNH</label>
                            <Input
                              placeholder=""
                              type="text"
                              value={formSubmit.cnh || ""}
                              onChange={(e) => {
                                setFormSubmit({
                                  ...formSubmit,
                                  cnh: e.target.value,
                                });
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={8}>
                          <FormGroup>
                            <label>Data de Emissao*</label>
                            <Input
                              type="date"
                              defaultValue={formatDateToInputUpdate(
                                formSubmit?.cnhDateOfIssue ||
                                  new Date().toISOString()
                              )}
                              onChange={(e) => {
                                setFormSubmit({
                                  ...formSubmit,
                                  cnhDateOfIssue: e.target.value,
                                });
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={8}>
                          <FormGroup>
                            <label>Data de Validade*</label>
                            <Input
                              type="date"
                              defaultValue={formatDateToInputUpdate(
                                formSubmit?.cnhExpirationDate ||
                                  new Date().toISOString()
                              )}
                              onChange={(e) => {
                                setFormSubmit({
                                  ...formSubmit,
                                  cnhExpirationDate: e.target.value,
                                });
                              }}
                            />
                          </FormGroup>
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
