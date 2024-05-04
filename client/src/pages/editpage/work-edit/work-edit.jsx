import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/navbar";
import "./work-edit.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WorkEdit(props) {
  const [work, setWork] = useState([]);
  const [newwork, setNewWork] = useState();
  const id = useParams().id;
  const [isGot, setGot] = useState(false);
  if (isGot == false) {
    axios
      .get("http://localhost:8080/getwork/service/" + id)
      .then((response) => {
        setWork(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setGot(true);
  }

  const changeHandler = (e) => {
    if (e.target.id == "work") {
      setNewWork(e.target.files[0]);
    }
  };

  const saveHandler = (e) => {
    e.preventDefault();
    if (newwork != null) {
      const formdata = new FormData();
      formdata.append("newwork", newwork);
      axios
        .put("http://localhost:8080/updatework/service/" + id, formdata)
        .then((response) => {
          if (response.data == "updated") {
            toast.success("work is updated", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setInterval(() => {
              window.location.reload();
            }, 2000);
          } else {
            toast.error("Cant update work", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Cant save work", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      toast.warn("File Cant be empty", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    axios
      .delete(
        "http://localhost:8080/deletework/service/" + id + "/" + e.target.id
      )
      .then((response) => {
        if (response.data == "deleted") {
          toast.success("Deleted succesfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setInterval(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error("cant delete the work", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div>
      <Navbar login={props.login} id={id} />
      <div className="work-edit">
        <div className="work-edit-box">
          <div className="heading-work">
            <h1>My work</h1>
            <div className="newinput">
              <h1>Add New Image</h1>
              <form onSubmit={saveHandler}>
                <input type="file" onChange={changeHandler} id="work" />
                <button type="submit">Save</button>
              </form>
            </div>
          </div>
          <div className="work-container-edit">
            {work.map((item) => (
              <div className="work-box">
                <img src={"data:image/jpeg;base64," + item.work} />
                <form className="delete" id={item.id} onSubmit={deleteHandler}>
                  <button type={"submit"}>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
