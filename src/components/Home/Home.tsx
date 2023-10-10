import { Component } from "react";
import ListHero from "./ListHero";

export default class extends Component {
  render() {
    return (
      <>
        <div className=" mx-4 h-max mb-5  mt-5 flex flex-col gap-4 ">
          {/* title */}
          <h1 className="text-center pt-3 font-extrabold font-serif text-[28px]">
            List Hero Mobile Legends
          </h1>

          {/* list hero */}
          <div className="w-full h-max px-4  py-14">
            <ListHero />
          </div>
        </div>
      </>
    );
  }
}
