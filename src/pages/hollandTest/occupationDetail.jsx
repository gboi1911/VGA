import React, { useEffect, useState } from "react";
import { Page, Box, Text } from "zmp-ui";
import { getOccupationById } from "api/occupation";
import { useParams } from "react-router-dom";

const OccupationDetail = () => {
  const [occupation, setOccupation] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const { id } = useParams();

  const handleShowMore = () => {
    setShowMore(true);
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

  return (
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

    <Page
      className="page"
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        overflow: "hidden",
      }}
    >
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
        <img
          src="https://jobsgo.vn/blog/wp-content/uploads/2021/07/ky-nang-nghe-nghiep-2.jpg"
          alt={occupation.name}
          style={{
            width: "100%",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        />

        {/* Tên công việc */}
        <Text
          style={{
            fontSize: "1.5em",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          {occupation.name}
        </Text>

        {/* Mô tả công việc - đoạn ngắn */}
        <Text
          style={{
            fontSize: "1em",
            color: "#666",
            marginBottom: "15px",
            textAlign: "justify",
          }}
        >
          {occupation.description}
        </Text>

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
        <Text style={{ marginBottom: "15px", color: "#666", textAlign: "justify" }}>
          {occupation.howToWork}
        </Text>



        {/* Hiển thị các phần khác khi showMore là true */}
        {showMore ? (
          <>
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
              {occupation.workEnvironment}
            </Text>
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
            <Text style={{ marginBottom: "15px", color: "#666", textAlign: "justify" }}>
              {occupation.education}
            </Text>

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
            <Text style={{ marginBottom: "15px", color: "#666", textAlign: "justify" }}>
              {occupation.payScale}
            </Text>

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
            <Text style={{ marginBottom: "15px", color: "#666", textAlign: "justify" }}>
              {occupation.jobOutlook}
            </Text>

            <Text
              style={{
                fontSize: "1.2em",
                fontWeight: "bold",
                color: "#333",
                marginBottom: "5px",
              }}
            >
              Kỹ năng cần có:
            </Text>
            <Box
              as="ul"
              style={{ paddingLeft: "20px", marginBottom: "15px", color: "#666" }}
            >
              {occupation.occupationalSkills &&
                occupation.occupationalSkills.map((skill) => (
                  <li key={skill.id} style={{ marginBottom: "8px" }}>
                    {skill.content}
                  </li>
                ))}
            </Box>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleShowMore}
              style={{
                marginTop: "10px",
                color: "#007bff",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                transition: "color 0.3s ease",
              }}
            >
              Xem thêm
            </button>
          </div>
        )}
      </Box>
    </Page>
  );
};

export default OccupationDetail;
