import RecordsContainer from "./RecordsContainer.js";
import Resume from "./Resume.js";
import Form from "./Form.js";

const Home = () => {
  return (
    <div className="container my-3">
      <Form />
      <RecordsContainer />
      <Resume />
    </div>
  );
};

export default Home;
