import { Component } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface DataI {
  onChange: (value: string) => void | null;
  props: boolean;
  initValue: string;
}

type StateI = {
  value: string;
};

export default class HandleInput extends Component<DataI, StateI> {
  constructor(props: DataI) {
    super(props);
    this.state = {
      value: this.props.initValue,
    };
  }

  componentDidMount() {}

  handleChange = (e: string) => {
    this.setState({ value: e });
    const timeout = setTimeout(() => {
      this.props.onChange(this.state.value);
    }, 500);
    return () => clearTimeout(timeout);
  };

  render() {
    return (
      <>
        {/* icon search */}
        <section className="flex gap-2 items-center mt-5 mb-4">
          <AiOutlineSearch style={{ fontSize: "24px", cursor: "pointer" }} />
          <input
            {...this.props}
            type="text"
            className=" p-2 outline-none  bg-transparent border-b  font-light font-sans"
            placeholder="search..."
            onChange={(e) => this.handleChange(e.target.value)}
          />
        </section>
      </>
    );
  }
}
