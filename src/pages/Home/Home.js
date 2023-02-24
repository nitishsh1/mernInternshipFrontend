import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { BsPlusLg } from "react-icons/bs";
import { FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Alert from "react-bootstrap/Alert";
import Tables from "../../components/Table/Tables";
import Spiner from "../../components/Spinner/Spiner";
import {
  addData,
  dltdData,
  updateData,
} from "../../components/context/ContextProvider";
import { deletefunc, exporttocsvfunc, usergetfunc } from "../../services/Apis";
import { toast } from "react-toastify";
const Home = () => {
  const [showspin, setShowSpin] = useState(true);
  const { useradd, setUseradd } = useContext(addData);
  const { update, setUpdate } = useContext(updateData);
  const { deleteData, setDeleteData } = useContext(dltdData);
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const navigate = useNavigate();
  const addUser = () => {
    navigate("/register");
  };

  // pagination
  // handle prev btn
  const handlePrevious = ()=>{
    setPage(()=>{
      if(page === 1) return page;
      return page - 1
    })
  }

  // handle next btn
  const handleNext = ()=>{
    setPage(()=>{
      if(page === pageCount) return page;
      return page + 1
    })
  }


  // export user
  const exportuser = async () => {
    const response = await exporttocsvfunc();
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank");
    } else {
      toast.error("error !");
    }
  };

  const userGet = async () => {
    const response = await usergetfunc(search, gender, status, sort, page);
    if (response.status === 200) {
      setUserData(response.data.usersdata);
      setPageCount(response.data.Pagination.pageCount);
    } else {
      console.log("error for get user data");
    }
  };

  const deleteUser = async (id) => {
    const response = await deletefunc(id);
    if (response.status === 200) {
      userGet();
      setDeleteData(response.data);
    } else {
      toast.error("error in delete");
    }
  };
  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, gender, status, sort , page]);

  return (
    <>
      {useradd ? (
        <Alert variant="success" onClose={() => setUseradd("")} dismissible>
          {useradd.fname.toUpperCase()} successfully added
        </Alert>
      ) : (
        ""
      )}

      {update ? (
        <Alert variant="primary" onClose={() => setUpdate("")} dismissible>
          {update.fname.toUpperCase()} successfully updated
        </Alert>
      ) : (
        ""
      )}

      {deleteData ? (
        <Alert variant="danger" onClose={() => setDeleteData("")} dismissible>
          {update.fname.toUpperCase()} successfully deleted
        </Alert>
      ) : (
        ""
      )}
      <div className="container">
        <div className="main_div">
          {/* search add btn */}
          <div className="search-add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <Button className="search_btn" variant="success">
                  Search
                </Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button
                onClick={addUser}
                className=" d-flex align-items-center"
                variant="primary"
              >
                <BsPlusLg />
                &nbsp;<span>Add User</span>
              </Button>
            </div>
          </div>
          {/* export , gender , status */}
          <div className="filter_div mt-5 mb-3 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button
                className="export_btn"
                onClick={exportuser}
                variant="primary"
              >
                Export to CSV
              </Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter by Gender</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={`All`}
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={`male`}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={`female`}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Sort By Value */}
            <div className="filter_newold">
              <h3>Sort By Value</h3>
              <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  <FaSort />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")}>
                    New
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>
                    Old
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* filter by status */}
            <div className="filter_status">
              <div className="status">
                <h3>Filter By Status</h3>
                <div className="status_radio d-flex justify-content-between flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={`All`}
                    onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={`Active`}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={`InActive`}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          {showspin ? (
            <Spiner />
          ) : (
            <Tables
              userData={userData}
              deleteUser={deleteUser}
              userGet={userGet}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              page={page}
              pageCount={pageCount}
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
