import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleBeer } from "../redux/beerSlice";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Card, ListGroup, Spinner } from "react-bootstrap";
import { formatDisplayDate, isEmpty } from "../utils";

export default function BeerDetail(props) {
  const { beerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { beers } = useSelector((state) => state);
  const { currentBeerDetails: beerDetail, singleBeerLoading } = beers;
  //   console.log(beers, "currentBeerDetails");
  useEffect(() => {
    dispatch(getSingleBeer(beerId));
  }, []);
  return (
    <section className="beer_details">
      <Card>
        {singleBeerLoading ? (
          <div className="spinner_wrapper text-center mt-5 mb-5">
            <Spinner animation="border" variant="primary" />
            <p>Loading...</p>
          </div>
        ) : isEmpty(beerDetail) ? (
          <div className="no_result text-center">
            <img
              className="no-result-image"
              src="/no-result.png"
              alt="no-results"
            />
            <p className="d-flex flex-column align-items-center">
              <strong>No results found </strong>
              <button
                className="back_btn_dark"
                variant="plain"
                onClick={() => navigate(-1)}
              >
                <img src="/back.svg" />
                Go back
              </button>
            </p>
          </div>
        ) : (
          <div className="beer_detail_wrapper section_padding">
            <div className="back_container mb-2">
              <div className="column-back">
                <button
                  className="back_btn"
                  variant="plain"
                  onClick={() => navigate(-1)}
                >
                  <img src="/back.svg" />
                  Go back
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3 text-center bg_dark beer_image_container">
                <img
                  className="beer_image"
                  src={beerDetail.image_url}
                  alt={beerDetail.name}
                />
              </div>
              <div className="col-sm-9">
                <div className="row margin_row">
                  <div className="mt-3 col-sm-4">
                    <b>Name :</b> <span>{beerDetail.name}</span>
                  </div>
                  <div className="mt-3 col-sm-3">
                    <b>First brewed :</b>{" "}
                    <span>{formatDisplayDate(beerDetail.first_brewed)}</span>
                  </div>
                  <div className="mt-3 col-sm-5">
                    <b>Contributed by :</b>{" "}
                    <span>{beerDetail.contributed_by}</span>
                  </div>
                  <div className="mt-3 col-12">
                    <b>Description :</b> <span>{beerDetail.description}</span>
                  </div>
                  <div className="mt-3 col-12">
                    <Badge pill bg="info">
                      {beerDetail.tagline}
                    </Badge>
                  </div>
                  <div className="mt-3 col-12">
                    <b>Tips :</b> <span>{beerDetail.brewers_tips}</span>
                  </div>
                  <div className="mt-3 col-12">
                    <b>Food pairing :</b>
                    <ListGroup as="ol" numbered>
                      {beerDetail.food_pairing.map((food, index) => (
                        <ListGroup.Item as="li" key={index}>
                          {food}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                  <div className="col-sm-6 mt-3">
                    <b>Boil volume : </b>
                    <span>
                      {beerDetail.boil_volume.value +
                        " " +
                        beerDetail.boil_volume.unit}
                    </span>
                  </div>
                  <div className="col-sm-6 mt-3">
                    <b>Brewed volume : </b>
                    <span>
                      {beerDetail.volume.value + " " + beerDetail.volume.unit}
                    </span>
                  </div>
                  <div className="col-sm-6 mt-3">
                    <b>OG(Original gravity) : </b>
                    <span>{(beerDetail.target_og / 1000).toFixed(3)}</span>
                  </div>
                  <div className="col-sm-6 mt-3">
                    <b>FG(Final gravity) : </b>
                    <span>{(beerDetail.target_fg / 1000).toFixed(3)}</span>
                  </div>
                  <div className="col-sm-6 mt-3">
                    <b>ABV(Alcohol by volume) : </b>
                    <span>{beerDetail.abv}</span>
                  </div>
                  <div className="col-sm-6 mt-3">
                    <b>Attenuation level : </b>
                    <span>{beerDetail.attenuation_level}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </section>
  );
}
