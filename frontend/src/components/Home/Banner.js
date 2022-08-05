import React from "react";
import logo from "../../imgs/logo.png";
import agent from "../../agent";

const Banner = (props) => {
  const [searchVisible, setSearchVisible] = React.useState(false);

  const searchChangeHandler = (e) => {
    const title = e.target.value || "";

    if (title.length < 3) {
      return;
    }

    props.onSearch(
      title,
      (page) => agent.Items.byTitle(title, page),
      agent.Items.byTitle(title)
    );
  };

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div className={"d-flex align-items-center justify-content-center"}>
          <span className="p-2">
            A place to{" "}
            <button
              id="get-part"
              style={{ all: "unset" }}
              onClick={() => setSearchVisible(true)}
            >
              get
            </button>
          </span>
          {searchVisible && (
            <span className={"pr-3 d-flex align-items-center bg-white rounded"}>
              <input
                id="search-box"
                className="form-control border-0"
                type="text"
                placeholder="What is it that you truly desire?"
                onChange={searchChangeHandler}
              />
              <i className="ion-search text-muted"></i>
            </span>
          )}
          <span className={"p-2"}> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
