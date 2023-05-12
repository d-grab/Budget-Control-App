import HomePlans from "components/Plans/HomePlans";
import HomeTransactions from "components/Transactions/HomeTransactions";
import HeroContainer from "../../components/HeroContainer/HeroContainer";

const Home = () => {
  return (
    <div className="home">
      <HeroContainer />
      <HomePlans />
      <HomeTransactions />
    </div>
  );
};

export default Home;