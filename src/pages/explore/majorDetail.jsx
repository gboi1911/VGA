import React, { useState, useEffect } from "react";
import EastIcon from "@mui/icons-material/East";
import { Page, Text, Box, Header, Icon, Modal, Radio } from "zmp-ui";
import { useParams, useNavigate } from "react-router-dom";
import { getMajorById, postStudentCare } from "api/major";

const MajorDetail = ({ studentId }) => {
  const { id } = useParams();
  const [major, setMajor] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showMore, setShowMore] = useState({}); // Lưu trạng thái xem thêm cho từng thuộc tính
  const [selectedValue, setSelectedValue] = useState("");
  const [visible, setVisible] = useState(false);
  console.log(showMore);

  const navigate = useNavigate();

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Thêm 6 tư vấn viên mỗi lần bấm
  };
  const handleShowMore1 = (field) => {
    setShowMore((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleShowLess = (field) => {
    setShowMore((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const fetchMajorDetail = async () => {
    try {
      const response = await getMajorById(id, studentId);
      setMajor(response.data.data);
      setSelectedValue(response.data.data.careLevel);
    } catch (error) {
      console.error("Error fetching major details:", error);
    }
  };

  useEffect(() => {
    fetchMajorDetail();
  }, [id]);

  if (!major) {
    return <Text>Đang tải...</Text>;
  }

  // const handleCare = () => {
  //   // Update the selectedValue state
  //   const newSelectedValue = selectedValue === 3 ? 0 : 3;
  //   setSelectedValue(newSelectedValue);

  //   // Payload should use the updated selectedValue
  //   const payload = {
  //     studentId: studentId,
  //     majorOrOccupationId: id,
  //     rating: newSelectedValue, // Use the new selectedValue
  //     isMajor: true,
  //   };

  //   // Define async function outside the handler for better readability
  //   const postStudentCareData = async () => {
  //     try {
  //       const response = await postStudentCare(payload);
  //       console.log("Post Success:", response); // Optionally log the response
  //     } catch (error) {
  //       console.error("Error in post student care: ", error);
  //     }
  //   };

  //   // Call the async function
  //   postStudentCareData();
  // };

  const handleVeryCare = () => {
    // Update the selectedValue state
    const newSelectedValue = selectedValue === 5 ? 0 : 5;
    setSelectedValue(newSelectedValue);

    // Payload should use the updated selectedValue
    const payload = {
      studentId: studentId,
      majorOrOccupationId: id,
      rating: newSelectedValue, // Use the new selectedValue
      isMajor: true,
    };

    // Define async function outside the handler for better readability
    const postStudentCareData = async () => {
      try {
        // Call the postStudentCare API with the payload
        const response = await postStudentCare(payload);
        console.log("Post Success:", response); // Optionally log the response

        // After posting, fetch the updated major details
        fetchMajorDetail(); // Call fetchMajorDetail to get updated data
      } catch (error) {
        console.error("Error in post student care: ", error);
      }
    };

    // Call the async function
    postStudentCareData();
  };

  return (
    <Page className="page" style={{ marginTop: "36px" }}>
      <Header title="Chi tiết ngành học" />
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          //alignItems: "flex-start",
          padding: "20px",
        }}
      >
        {/* Major Image */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Optional if vertical centering is needed
          }}
        >
          <img
            src={
              major.image ||
              "https://img.freepik.com/free-vector/professional-people-labor-day_24908-56745.jpg?t=st=1730737111~exp=1730740711~hmac=9a3489f4390c2eef0e7b3f9aab0f75a4ada397baf20c3d1cb8786feff0f0113d&w=740"
            }
            alt={major.name}
            style={{
              width: "60%",
              height: "100%",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          />
        </div>
        {/* Major Name */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // Ensures space between the items
            borderBottom: "1px solid #ccc", // Adds a line below the row
            paddingBottom: "8px", // Padding below the items to separate them from the line
          }}
        >
          <Text
            style={{
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {major.name}
          </Text>
          <div style={{ display: "flex" }}>
            <Icon
              icon={selectedValue ? "zi-heart-solid" : "zi-heart"}
              onClick={handleVeryCare}
              style={{ color: "red" }}
            />
            <Text
              style={{
                color: "grey",
                fontSize: "16px",
                marginLeft: "2px",
                marginTop: "2px",
              }}
            >
              {major.numberCare}
            </Text>
          </div>
        </div>
        <Text style={{ marginTop: "5px", fontSize: "18px", textAlign: "end" }}>
          {major.code}
        </Text>

        {/* Major Description */}
        <Text
          style={{
            fontSize: "16px",
            color: "#666",
            marginBottom: "24px",
            textAlign: "justify",
            marginTop: "10px",
          }}
        >
          {truncateText(major?.description, 500)}
          {major?.description?.length > 500 && !showMore.description && (
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => handleShowMore1("description")}
                style={{
                  marginTop: "5px",
                  color: "#007bff",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Xem thêm
              </button>
            </Box>
          )}
          {showMore.description && major?.description && (
            <>
              {major.description}
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => handleShowLess("description")}
                  style={{
                    marginTop: "5px",
                    color: "#007bff",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Thu gọn
                </button>
              </Box>
            </>
          )}
        </Text>
        {/* Suggested Occupations */}
        <Text
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}
        >
          Ngành nghề phù hợp
        </Text>
        <div>
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              marginBottom: "16px",
              alignItems: "center",
            }}
          >
            {major.occupations.slice(0, visibleCount).map((occupation) => (
              <Box
                key={occupation.id}
                style={{
                  background: "#f8f9fa",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  marginBottom: "8px",
                  flex: "0 0 auto",
                  marginRight: "10px",
                  width: "220px",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/occupationDetail/${occupation.id}`)}
              >
                {/* Centered Image */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center", // Optional if vertical centering is needed
                  }}
                >
                  <img
                    src={
                      occupation.image ||
                      "https://img.freepik.com/free-vector/collection-police-illustration_23-2148521822.jpg?t=st=1730737506~exp=1730741106~hmac=435fe33a5949a8cc6d0507ede5684de43c9dc61c0549429698ee374ce71afd29&w=1060"
                    }
                    alt={occupation.name}
                    style={{
                      width: "60%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                {/* Occupation Name */}
                <Box
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    height: "50px",
                    marginTop: "10px",
                  }}
                >
                  <Text bold>{occupation.name}</Text>
                </Box>
              </Box>
            ))}

            {/* Nút "Xem thêm" */}
            {visibleCount < major.occupations.length && (
              <button
                onClick={handleShowMore}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "none",
                  borderRadius: "50%",
                  padding: "10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                  width: "40px",
                  height: "40px",
                  margin: "10px auto",
                }}
              >
                <EastIcon style={{ fontSize: "20px", color: "#007bff" }} />
              </button>
            )}
          </div>
        </div>
        {/* Suggested Universities */}
        <Text
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}
        >
          Trường đại học có đào tạo
        </Text>
        <div>
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              marginBottom: "16px",
              alignItems: "center",
            }}
          >
            {major.universities.slice(0, visibleCount).map((university) => (
              <Box
                key={university.id}
                style={{
                  background: "#f8f9fa",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  marginBottom: "8px",
                  flex: "0 0 auto",
                  marginRight: "10px",
                  width: "220px",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/universityDetail/${university.id}`)}
              >
                {/* Centered Image */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center", // Optional if vertical centering is needed
                  }}
                >
                  <img
                    src={
                      university.image ||
                      "https://img.freepik.com/free-photo/harvard-university-cambridge-usa_1268-14363.jpg?t=st=1730792592~exp=1730796192~hmac=42fcd53feeadc8ec715f921aebe589e40f358baeba4d390d8c58c98ee8735fcd&w=1060"
                    }
                    alt={university.name}
                    style={{
                      width: "60%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                {/* Occupation Name */}
                <Box
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    height: "50px",
                    marginTop: "10px",
                  }}
                >
                  <Text bold>{university.name}</Text>
                </Box>
              </Box>
            ))}

            {/* Nút "Xem thêm" */}
            {visibleCount < major.universities.length && (
              <button
                onClick={handleShowMore}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "none",
                  borderRadius: "50%",
                  padding: "10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                  width: "40px",
                  height: "40px",
                  margin: "10px auto",
                }}
              >
                <EastIcon style={{ fontSize: "20px", color: "#007bff" }} />
              </button>
            )}
          </div>
        </div>
      </Box>
      {/* <Modal
        visible={visible}
        title="Mức độ quan tâm ngành học"
        onClose={() => setVisible(false)}
      >
        <Box
          style={{
            display: "flex", // Ensures flex layout
            justifyContent: "center", // Centers the options horizontally
            alignItems: "center", // Centers the options vertically
            gap: "20px", // Adds space between the two options
            width: "100%", // Ensures the container spans the full width
          }}
        >
          {/* Option 1: Quan tâm */}
      {/* <Box
            onClick={handleCare}
            style={{
              padding: "16px 24px",
              borderRadius: "12px",
              textAlign: "center",
              backgroundColor: selectedValue === 3 ? "#FF9900" : "#EEEEEE",
              transition: "all 0.3s",
              flex: "1", // Makes both options equal in size
              maxWidth: "200px", // Optional: Prevents the boxes from stretching too much
            }}
          >
            <Text
              bold
              style={{ color: selectedValue === 3 ? "white" : "black" }}
            >
              Quan tâm
            </Text>
          </Box> */}
      {/* Option 2: Rất quan tâm */}
      {/* <Box
            onClick={handleVeryCare}
            style={{
              padding: "16px 24px",
              borderRadius: "12px",
              textAlign: "center",
              backgroundColor: selectedValue === 5 ? "#FF6600" : "#EEEEEE",
              transition: "all 0.3s",
              flex: "1", // Makes both options equal in size
              maxWidth: "200px", // Optional: Prevents the boxes from stretching too much
            }}
          >
            <Text
              bold
              style={{ color: selectedValue === 5 ? "white" : "black" }}
            >
              Rất quan tâm
            </Text>
          </Box>
        </Box>
      </Modal> */}
    </Page>
  );
};

export default MajorDetail;
