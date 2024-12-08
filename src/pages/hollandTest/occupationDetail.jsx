import React, { useEffect, useState } from "react";
import { Page, Box, Text, Header, Icon, Modal } from "zmp-ui";
import { getOccupationById } from "api/occupation";
import { useParams } from "react-router-dom";
import { postStudentCare } from "api/major";

const OccupationDetail = ({ studentId }) => {
  const [occupation, setOccupation] = useState([]);
  const [showMore, setShowMore] = useState({}); // Lưu trạng thái xem thêm cho từng thuộc tính
  const { id } = useParams();
  const [selectedValue, setSelectedValue] = useState("");
  const [visible, setVisible] = useState(false);

  const handleShowMore = (field) => {
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
  useEffect(() => {
    const fetchOccupation = async () => {
      try {
        const response = await getOccupationById(id);
        setOccupation(response.data.data);
      } catch (error) {
        console.error("Error in fetching occupation: ", error);
      }
    };

    fetchOccupation();
  }, [id]);

  // return (
  // <Page
  //   className="page"
  //   style={{
  //     padding: "20px",
  //     backgroundColor: "#f9f9f9",
  //     overflow: "hidden",
  //   }}
  // >
  //   <Box
  //     style={{
  //       borderRadius: "10px",
  //       padding: "20px",
  //       backgroundColor: "#ffffff",
  //       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  //       marginBottom: "30px",
  //       marginTop: "50px",
  //     }}
  //   >
  //     <img
  //       src={
  //         "https://jobsgo.vn/blog/wp-content/uploads/2021/07/ky-nang-nghe-nghiep-2.jpg"
  //       }
  //       alt={occupation.name}
  //       style={{
  //         width: "100%",
  //         borderRadius: "10px",
  //         marginBottom: "15px",
  //       }}
  //     />
  //     <Text
  //       style={{
  //         fontSize: "1.5em",
  //         fontWeight: "bold",
  //         color: "#333",
  //         marginBottom: "10px",
  //       }}
  //     >
  //       {occupation.name}
  //     </Text>
  //     <Text
  //       style={{
  //         fontSize: "1em",
  //         color: "#666",
  //         marginBottom: "15px",
  //         textAlign: "justify",
  //       }}
  //     >
  //       {occupation.description}
  //     </Text>
  //     <Text
  //       style={{
  //         fontSize: "1.2em",
  //         fontWeight: "bold",
  //         color: "#333",
  //         marginBottom: "5px",
  //       }}
  //     >
  //       Mô tả công việc:
  //     </Text>
  //     <Text
  //       style={{ marginBottom: "15px", color: "#666", textAlign: "justify" }}
  //     >
  //       {occupation.howToWork}
  //     </Text>
  //     <Text
  //       style={{
  //         fontSize: "1.2em",
  //         fontWeight: "bold",
  //         color: "#333",
  //         marginBottom: "5px",
  //       }}
  //     >
  //       Môi trường làm việc:
  //     </Text>
  //     <Text style={{ marginBottom: "15px", color: "#666" }}>
  //       {occupation.workEnvironment}
  //     </Text>
  //     <Text
  //       style={{
  //         fontSize: "1.2em",
  //         fontWeight: "bold",
  //         color: "#333",
  //         marginBottom: "5px",
  //       }}
  //     >
  //       Trình độ học vấn:
  //     </Text>
  //     <Text
  //       style={{ marginBottom: "15px", color: "#666", textAlign: "justify" }}
  //     >
  //       {occupation.education}
  //     </Text>
  //     <Text
  //       style={{
  //         fontSize: "1.2em",
  //         fontWeight: "bold",
  //         color: "#333",
  //         marginBottom: "5px",
  //       }}
  //     >
  //       Mức lương:
  //     </Text>
  //     <Text
  //       style={{ marginBottom: "15px", color: "#666", textAlign: "justify" }}
  //     >
  //       {occupation.payScale}
  //     </Text>
  //     <Text
  //       style={{
  //         fontSize: "1.2em",
  //         fontWeight: "bold",
  //         color: "#333",
  //         marginBottom: "5px",
  //       }}
  //     >
  //       Cơ hội thăng tiến:
  //     </Text>
  //     <Text
  //       style={{ marginBottom: "15px", color: "#666", textAlign: "justify" }}
  //     >
  //       {occupation.jobOutlook}
  //     </Text>
  //     <Text
  //       style={{
  //         fontSize: "1.2em",
  //         fontWeight: "bold",
  //         color: "#333",
  //         marginBottom: "5px",
  //       }}
  //     >
  //       Kỹ năng cần có:
  //     </Text>
  //     <Box
  //       as="ul"
  //       style={{ paddingLeft: "20px", marginBottom: "15px", color: "#666" }}
  //     >
  //       {occupation.occupationalSkills &&
  //         occupation.occupationalSkills.map((skill) => (
  //           <li key={skill.id} style={{ marginBottom: "8px" }}>
  //             {skill.content}
  //           </li>
  //         ))}
  //     </Box>
  //   </Box>
  // </Page>
  const handleCare = () => {
    // Update the selectedValue state
    const newSelectedValue = selectedValue === 3 ? 0 : 3;
    setSelectedValue(newSelectedValue);

    // Payload should use the updated selectedValue
    const payload = {
      studentId: studentId,
      majorOrOccupationId: id,
      rating: newSelectedValue, // Use the new selectedValue
      isMajor: false,
    };

    // Define async function outside the handler for better readability
    const postStudentCareData = async () => {
      try {
        const response = await postStudentCare(payload);
        console.log("Post Success:", response); // Optionally log the response
      } catch (error) {
        console.error("Error in post student care: ", error);
      }
    };

    // Call the async function
    postStudentCareData();
  };

  const handleVeryCare = () => {
    // Update the selectedValue state
    const newSelectedValue = selectedValue === 5 ? 0 : 5;
    setSelectedValue(newSelectedValue);

    // Payload should use the updated selectedValue
    const payload = {
      studentId: studentId,
      majorOrOccupationId: id,
      rating: newSelectedValue, // Use the new selectedValue
      isMajor: false,
    };

    // Define async function outside the handler for better readability
    const postStudentCareData = async () => {
      try {
        const response = await postStudentCare(payload);
        console.log("Post Success:", response); // Optionally log the response
      } catch (error) {
        console.error("Error in post student care: ", error);
      }
    };

    // Call the async function
    postStudentCareData();
  };

  return (
    <Page
      className="page"
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        overflow: "hidden",
      }}
    >
      <Header title="Chi tiết nghề nghiệp" />
      <Box
        style={{
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "30px",
          marginTop: "50px",
        }}
      >
        {/* Hình ảnh */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Optional if vertical centering is needed
          }}
        >
          <img
            src={occupation.image}
            alt={occupation?.name || "Occupation"}
            style={{
              width: "60%",
              height: "auto",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          />
        </div>

        {/* Tên công việc */}
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
            {occupation?.name}
          </Text>
          <Icon
            icon={selectedValue ? "zi-heart-solid" : "zi-heart"}
            onClick={() => setVisible(true)}
            style={{ color: "red" }}
          />
        </div>

        {/* Mô tả công việc - đoạn ngắn */}
        <Text
          style={{
            fontSize: "1em",
            color: "#666",
            marginBottom: "15px",
            textAlign: "justify",
            marginTop: "10px",
          }}
        >
          {truncateText(occupation?.description, 500)}
          {occupation?.description?.length > 500 && !showMore?.description && (
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => handleShowMore("description")}
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
          {showMore?.description && occupation?.description && (
            <>
              {occupation?.description}
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

        {/* Mô tả công việc chi tiết */}
        <Text
          style={{
            fontSize: "1.2em",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "5px",
          }}
        >
          Mô tả công việc:
        </Text>
        <Text
          style={{ marginBottom: "15px", color: "#666", textAlign: "justify" }}
        >
          {truncateText(occupation?.howToWork, 500)}
          {occupation?.howToWork?.length > 500 && !showMore?.howToWork && (
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => handleShowMore("howToWork")}
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
          {showMore?.howToWork && (
            <>
              {occupation?.howToWork}
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => handleShowLess("howToWork")}
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

        {/* Môi trường làm việc */}
        <Text
          style={{
            fontSize: "1.2em",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "5px",
          }}
        >
          Môi trường làm việc:
        </Text>
        <Text style={{ marginBottom: "15px", color: "#666" }}>
          {truncateText(occupation?.workEnvironment, 500)}
          {occupation?.workEnvironment?.length > 500 &&
            !showMore?.workEnvironment && (
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => handleShowMore("workEnvironment")}
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
          {showMore?.workEnvironment && (
            <>
              {occupation?.workEnvironment}
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => handleShowLess("workEnvironment")}
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

        {/* Trình độ học vấn */}
        <Text
          style={{
            fontSize: "1.2em",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "5px",
          }}
        >
          Trình độ học vấn:
        </Text>
        <Text style={{ marginBottom: "15px", color: "#666" }}>
          {truncateText(occupation?.education, 500)}
          {occupation?.education?.length > 500 && !showMore?.education && (
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => handleShowMore("education")}
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
          {showMore?.education && (
            <>
              {occupation?.education}
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => handleShowLess("education")}
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

        {/* Mức lương */}
        <Text
          style={{
            fontSize: "1.2em",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "5px",
          }}
        >
          Mức lương:
        </Text>
        <Text style={{ marginBottom: "15px", color: "#666" }}>
          {truncateText(occupation?.payScale, 500)}
          {occupation?.payScale?.length > 500 && !showMore?.payScale && (
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => handleShowMore("payScale")}
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
          {showMore?.payScale && (
            <>
              {occupation?.payScale}
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => handleShowLess("payScale")}
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

        {/* Cơ hội thăng tiến */}
        <Text
          style={{
            fontSize: "1.2em",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "5px",
          }}
        >
          Cơ hội thăng tiến:
        </Text>
        <Text style={{ marginBottom: "15px", color: "#666" }}>
          {truncateText(occupation?.jobOutlook, 500)}
          {occupation?.jobOutlook?.length > 500 && !showMore?.jobOutlook && (
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => handleShowMore("jobOutlook")}
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
          {showMore?.jobOutlook && (
            <>
              {occupation?.jobOutlook}
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => handleShowLess("jobOutlook")}
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
      </Box>
      <Modal
        visible={visible}
        title="Mức độ quan tâm nghề nghiệp"
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
          <Box
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
          </Box>
          {/* Option 2: Rất quan tâm */}
          <Box
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
      </Modal>
    </Page>
  );
};

export default OccupationDetail;
