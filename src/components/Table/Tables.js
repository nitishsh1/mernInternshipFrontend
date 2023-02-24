import React from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { AiFillCaretDown, AiFillEye, AiFillDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import "./table.css";
import { BASE_URL } from "../../services/helper";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { statuschangefunc } from "../../services/Apis";
import Paginations from "../Pagination/Paginations";

const Tables = ({ userData, deleteUser,userGet, handlePrevious, handleNext, page, pageCount, setPage }) => {
  const handleChange = async (id, status) => {
    const response = await statuschangefunc(id, status);

    if (response.status === 200) {
      userGet();
      toast.success("Status Updated")
    } else {
      toast.error("error ")
    }
  }
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className="shadow">
              <Table className="align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>&nbsp;&nbsp;&nbsp;Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.length > 0 ? (
                    userData.map((data, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1 + (page - 1)*4}</td>
                            <td>{data.fname + data.lname}</td>
                            <td>{data.email}</td>
                            <td>{data.gender === "Male" ? "M" : "F"}</td>
                            <td className="d-flex align-items-center">
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  className="dropdown_btn"
                                  id="dropdown-basic"
                                >
                                  <Badge
                                    bg={
                                      data.status === "Active"
                                        ? "primary"
                                        : "danger"
                                    }
                                  >
                                    {data.status} <AiFillCaretDown />
                                  </Badge>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={() => handleChange(data._id, "Active")}>Active</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(data._id, "InActive")}>InActive</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td className="img_parent">
                              <img
                                src={`${BASE_URL}/uploads/${data.profile}`}
                                alt="img"
                              />
                            </td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="light"
                                  className="action"
                                  id="dropdown-basic"
                                >
                                  <BsThreeDotsVertical />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/user-profile/${data._id}`}
                                      className="text-decoration-none"
                                    >
                                      <AiFillEye style={{ color: "green" }} />{" "}
                                      <span>View</span>
                                    </NavLink>
                                  </Dropdown.Item>

                                  <Dropdown.Item>
                                    <NavLink
                                      to={`edit/${data._id}`}
                                      className="text-decoration-none"
                                    >
                                      <FiEdit style={{ color: "blue" }} />{" "}
                                      <span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() => deleteUser(data._id)}
                                  >
                                    <AiFillDelete style={{ color: "red" }} />{" "}
                                    <span>Delete</span>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <div className="no_data text-center">No Data</div>
                  )}
                </tbody>
              </Table>
              <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
        <ToastContainer />

      </div>
    </>
  );
};

export default Tables;
