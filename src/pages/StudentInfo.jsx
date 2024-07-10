import React, { useRef, useState } from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "../assets/img/bar.svg";
import buttonBack from "../assets/img/buttonBackground.svg";
import uploadIcon from "../assets/img/uproadpic.svg";
import { useNavigate } from "react-router-dom";
import "../styles/StudentInfo.css";
import MainNavbar from "./MainNavbar";
import axios from "axios";

const StudentInfo = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  const [uploadFileInfo, setUploadFileInfo] = useState(null);
  const inputRef = useRef(null);
  const setFileInfo = (file) => {
    const { name, size: byteSize, type } = file;
    const size = (byteSize / (1024 * 1024)).toFixed(2) + "mb";
    setUploadFileInfo({ name, size, type });
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFileInfo(file);
  };
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('excel', file)
    setFileInfo(file);
    try {
      const res = await axios.post('http://15.165.16.79:8080/student/upload', formData);
      console.log(res);
    } catch (e) {
      console.error(e)
    }
  };
  const handleClickUpload = () => {
    inputRef.current.click();
  };
  return (
    <div className="StudentInfo">
      <MainNavbar />
      <img src={logo} alt="logoimage" className="StudentInfologo" />
      <div className="StudentInfoeep" onClick={() => handleNavigation("/")}>EEP</div>
      <div className="StudentInfoment">학생 정보 입력</div>
      <img
        src={buttonBack}
        alt="buttonBack"
        className="StudentInfobuttonBack"
      />
      <div className="StudentInfoment2">학생들의 기본 정보를 등록해주세요.</div>
      <div className="StudentInfoContent">
        <div className="StudentInfoUploadWrapper">
          <div
            className="StudentInfoUpload"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {uploadFileInfo ? (
              <ul>
                {Object.entries(uploadFileInfo).map(([key, value]) => (
                  <li key={key}>
                    <p>{key}</p>
                    <p>{value}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <input
                  className="StudentInfoUploadInput"
                  type="file"
                  onChange={handleUpload}
                  ref={inputRef}
                />
                <div className="StudentInfoUploadTop">
                  <img
                    className="StudentInfoUploadTopImage"
                    src={uploadIcon}
                    alt="uploadImage"
                  />
                  <div className="StudentInfoUploadTopText">
                    파일을 드래그 또는{" "}
                    <span
                      className="StudentInfoUploadTopLink"
                      onClick={handleClickUpload}
                    >
                      업로드
                    </span>{" "}
                    해주세요
                  </div>
                </div>
                <div className="StudentInfoUploadMiddle">
                  <div className="StudentInfoUploadLine" />
                  <div className="StudentInfoUploadOr">OR</div>
                  <div className="StudentInfoUploadLine" />
                </div>
                <div className="StudentInfoUploadBottom">
                  <div className="StudentInfoUploadBottomText">내 기기에서</div>
                  <button
                    className="StudentInfoUploadBottomButton"
                    onClick={handleClickUpload}
                  >
                    찾아보기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <img src={bar} alt="bar" className="StudentInfobar" />
      <div className="StudentInfospanTag">
        <span
          className="StudentInfohomeSpan"
          onClick={() => handleNavigation("/")}
        >
          홈
        </span>
        <span
          className="StudentInfobookOfficerSpan"
          onClick={() => handleNavigation("/bookOfficer")}
        >
          도서 관리
        </span>
        <span
          className="StudentInfoDeviceSpan"
          onClick={() => handleNavigation("/Device")}
        >
          기기 관리
        </span>
        <span
          className="studentInfoSpan"
          onClick={() => handleNavigation("/studentInfo")}
        >
          학생 정보 입력
        </span>
        <span
          className="StudentInfoEmergencySpan"
          onClick={() => handleNavigation("/Emergency")}
        >
          비상 연락처
        </span>
      </div>
    </div>
  );
};

export default StudentInfo;
