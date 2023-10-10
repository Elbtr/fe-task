import { Component, ReactNode } from "react";
import { findAllML } from "../../untils/api";
import Table from "./Table";

interface HeroML {
  listHero: HeroT[];
  isLoading: boolean;
}

interface HeroT {
  hero_avatar: string;
  hero_id: number;
  hero_name: string;
  hero_role: string;
  hero_specially: string;
}
export default class ListHero extends Component<object, HeroML> {
  constructor(props: object) {
    super(props);
    this.state = {
      listHero: [] || null,
      isLoading: true,
    };
  }

  componentDidMount(): void {
    this.fetchAPI();
  }

  fetchAPI() {
    fetch(findAllML, {
      method: "GET",
    })
      .then((result: Response) => {
        return result.json();
      })
      .then((result) => {
        // console.log(result.hero);

        return this.setState({ listHero: result.hero, isLoading: false });
      });
  }

  render(): ReactNode {
    const { listHero, isLoading } = this.state;

    const loading: JSX.Element = <h1 className="text-center">Loading</h1>;

    return (
      <>
        <h1>LIST HERO</h1>
        {isLoading === false ? <Table listHero={listHero} /> : loading}
      </>
    );
  }
}
