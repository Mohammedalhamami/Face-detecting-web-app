import React, { Component } from "react";
import "./App.css";
import { Navigation } from "./components/Navigation/Navigation";
import { Logo } from "./components/Logo/Logo";
import { ImageLinkForm } from "./components/ImageLinkForm/ImageLinkForm";
import { Rank } from "./components/Rank/Rank";
import Particle from "./components/Particle/Particle.js";
import { FaceRecognition } from "./components/FaceRecongnition/FaceRecognition.js";
import { SignIn } from "./components/Signin/SignIn.js";
import { Register } from "./components/Register/Register.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: {},
      route: "signin",
      isSignedIn: false,
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({ imageURL: this.state.input });

    // const raw = JSON.stringify({
    //   user_app_id: {
    //     user_id: USER_ID,
    //     app_id: APP_ID,
    //   },
    //   inputs: [
    //     {
    //       data: {
    //         image: {
    //           url: this.state.imageURL,
    //           // "base64": IMAGE_BYTES_STRING
    //         },
    //       },
    //     },
    //   ],
    // });

    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: "Key " + PAT,
    //   },
    //   body: raw,
    // };

    // app.models.predict("face-detection", this.state.input).then((response) => {
    //   console.log("hi", response);
    //   fetch(
    //     "https://api.clarifai.com/v2/models/" +
    //       MODEL_ID +
    //       "/versions/" +
    //       MODEL_VERSION_ID +
    //       "/outputs",
    //     requestOptions
    //   )
    //     .then((response) => response.json())
    //     .then((result) => {
    //       // this.displayFaceBox(this.calculateFaceLocation(result));
    //       console.log(result);
    //     })
    //     .catch((error) => console.log("error", error));
    // });
  };
  onRouteChange = (route) => {
    if (route === "home") {
      this.setState({ isSignedIn: true });
    } else {
      this.setState({ isSignedIn: false });
    }
    this.setState({ route: route });
  };
  render() {
    const { isSignedIn, route, box, imageURL } = this.state;
    return (
      <div className="App">
        <Particle />

        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : route === "register" ? (
          <Register onRouteChange={this.onRouteChange} />
        ) : (
          <>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition imageURL={imageURL} box={box} />
          </>
        )}
      </div>
    );
  }
}

export default App;
