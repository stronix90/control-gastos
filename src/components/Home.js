import RecordsContainer from "./RecordsContainer.js";
import Resume from "./Resume.js";
import Form from "./Form.js";
import CustomModal from "./Modal.js";

const Home = () => {
  return (
    <div className="container my-3">
      <Form />
      <RecordsContainer />
      <Resume />
      <CustomModal />
    </div>
  );
};

export default Home;
