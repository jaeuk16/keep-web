import React from "react";
import BookOfficer from "./BookOfficer";

const Registration = () => {
  const [registrationDate, setRegistrationDate] = useState(getTodayDate());
  const [bookName, setBookName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setRegistrationDate(getTodayDate());
  }, []);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    const data = {
      title: bookName,
      date: registrationDate,
      image: imageDataUrl,
    };

    console.log("Registering device with data:", data);

    try {
      const response = await fetch("http://3.34.2.12:8080/device/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("등록 성공!");
      } else {
        console.error("Failed to register device:", response);
        alert("등록 실패!");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    navigate("/bookOfficer");
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageDataUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageDataUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  return (
    <div className="BookEntry">
      <div className="BookOfficerBlur">
        <Device />
      </div>
      <div className="BookEntryForm">
        <form onSubmit={handleRegister}>
          <p className="BookEntryMent"> 도서 등록 </p>
          <div className="UproadContainer" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>이미지를 드래그 해 주세요</p>
            ) : (
              <button
                type="button"
                className="UploadButton"
                onClick={() => document.getElementById("fileInput").click()}
              >
                이미지 업로드
              </button>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {imageFile && (
              <div>
                <p className="imgResultMent">
                  업로드된 이미지: {imageFile.name}
                </p>
              </div>
            )}
            <img src={Uproad} alt="UproadImage" className="Uproad" />
          </div>

          <label className="EntryTitle">도서명</label>
          <input
            type="text"
            name="title"
            className="TitleInput"
            placeholder="제목을 입력하세요."
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />

          <label className="EntryDate">등록일</label>
          <span className="DateInput">{registrationDate}</span>

          <button type="submit" className="EntryBtn">
            등록
          </button>
          <button
            type="button"
            className="EntryCancelBtn"
            onClick={handleCancel}
          >
            취소
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
