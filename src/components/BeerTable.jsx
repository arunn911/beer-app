import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import { formatDate } from "../utils";
import { useNavigate } from "react-router-dom";
import { startLoading } from "../redux/beerSlice";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";

export default function BeerTable(props) {
  const {
    beers,
    loading,
    currentPage,
    setPage,
    handleDateChange,
    fetchBeers,
    month,
    handleDropdownChange,
    per_page,
  } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    //  console.log(props, "props--beer--table");
  }, [props]);

  return (
    <div className="containessr">
      <div className="beertable_wrapper">
        <Card>
          <div className="brew_filter">
            <label className="m-0">Data per page</label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                handleDropdownChange(e.target.value);
              }}
              value={per_page}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Form.Select>
            <label className="m-0">Brewed before</label>
            <div className="form-group">
              <input
                type="month"
                className="form-control input-lg"
                onChange={(event) => {
                  handleDateChange(event.target.value);
                }}
                max={formatDate()}
              />
            </div>
          </div>
          {loading ? (
            <div className="spinner_wrapper text-center mt-5 mb-5">
              <Spinner animation="border" variant="primary" />
              <p>Loading...</p>
            </div>
          ) : beers.length === 0 ? (
            <div className="beer_table_wrapper">
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>First Brewed</th>
                    <th>Tagline</th>
                    <th>Contributed By</th>
                    <th>More Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6}>
                      <div className="no_result text-center">
                        <img
                          className="no-result-image"
                          src="/no-result.png"
                          alt="no-results"
                        />
                        <p>
                          <strong>No results found </strong>
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="beer_table_wrapper">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>First Brewed</th>
                    <th>Tagline</th>
                    <th>Contributed By</th>
                    <th>More Details</th>
                  </tr>
                </thead>
                <tbody>
                  {beers.map((beer, index) => {
                    return (
                      <tr key={beer.id}>
                        <td>{beer.id}</td>
                        <td>{beer.name}</td>
                        <td>{beer.first_brewed}</td>
                        <td>{beer.tagline}</td>
                        <td>{beer.contributed_by}</td>
                        <td>
                          <Button
                            variant="plain"
                            onClick={() => {
                              dispatch(startLoading("single"));
                              navigate(`/${beer.id}`);
                            }}
                          >
                            <span className="text-primary bg-none">View</span>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}

          <div className="custom-btn-group">
            <ButtonGroup className="btn-grp">
              <Button
                disabled={currentPage === 1}
                onClick={() => {
                  setPage(currentPage - 1);
                  fetchBeers(currentPage - 1, month, per_page);
                }}
              >
                Previous
              </Button>
              <Button disabled={beers.length === 0}>
                {beers.length === 0 ? "-" : currentPage}
              </Button>
              <Button
                disabled={beers.length < 10}
                onClick={() => {
                  setPage(currentPage + 1);
                  fetchBeers(currentPage + 1, month, per_page);
                }}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        </Card>
      </div>
    </div>
  );
}
