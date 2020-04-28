import React from "react";
import Main from "./Main.js";
import "./App.css";

const SearchBar = ({ fetch, change, query }) => {
  return (
    <div id="current" className="wrapper">
      <nav className=" navbar-fixed-top">
        <div className="container margin-left">
          <form
            className="card my-6"
            onSubmit={(e) => {
              e.preventDefault();
              fetch();
            }}
          >
            <div className="card-body row no-gutters align-items-center">
              <div className="col">
                <input
                  className="form-control form-control-lg form-control-borderless"
                  type="search"
                  placeholder="Search ..."
                  value={query}
                  onChange={(e) => change(e)}
                />
              </div>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Weather Data from{" "}
        <a
          href="https://openweathermap.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Openweathermap.org
        </a>
      </p>
    </footer>
  );
};
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseURL: "https://api.openweathermap.org/data/2.5/weather?",
      APIkey: "d8bff38ae1579f6cceb9ff42065a7922",
      query: "Paris",
      forecast: {},
    };
  }

  componentDidMount = () => {
    this.query();
  };

  query = () => {
    let url =
      this.state.baseURL +
      "q=" +
      this.state.query +
      "&appid=" +
      this.state.APIkey;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          console.log("success");
          return response.json();
        }
      })
      .then((data) => {
        let weather = data.weather[0];
        let description = weather.description;
        let main = data.main;
        let temp = main.temp;
        let icon = weather.icon;
        let sys = data.sys;
        let countryCode = sys.country.toLowerCase();
        let city = data.name;
        let forecast = {
          temp: temp,
          description: description,
          icon: icon,
          code: countryCode,
          city: city,
        };
        this.setState({ forecast: forecast });
        console.log(forecast);
        this.setState({ query: "" });
      });
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  render() {
    return (
      <div>
        <SearchBar
          fetch={this.query}
          change={this.handleChange}
          query={this.state.query}
        />
        <Main forecast={this.state.forecast} />
        <Footer />
      </div>
    );
  }
}
