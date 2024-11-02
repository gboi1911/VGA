import React from "react";
import { Page, Box, Text } from "zmp-ui";
import { useLocation } from "react-router-dom";

const OccupationDetail = () => {
  const location = useLocation();
  const { occupation } = location.state || {};

  return (
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
        <img
          src={
            "https://jobsgo.vn/blog/wp-content/uploads/2021/07/ky-nang-nghe-nghiep-2.jpg"
          }
          alt={occupation.name}
          style={{
            width: "100%",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        />
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
        <Text
          style={{
            fontSize: "1em",
            color: "#666",
            marginBottom: "15px",
          }}
        >
          {occupation.description}
        </Text>
        <Text
          style={{
            fontSize: "1.1em",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "5px",
          }}
        >
          Mô tả công việc:
        </Text>
        <Text style={{ marginBottom: "15px", color: "#666" }}>
          {occupation.howToWork}
        </Text>
        <Text
          style={{
            fontSize: "1.1em",
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
            fontSize: "1.1em",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "5px",
          }}
        >
          Trình độ học vấn:
        </Text>
        <Text style={{ marginBottom: "15px", color: "#666" }}>
          {occupation.education}
        </Text>
        <Text
          style={{
            fontSize: "1.1em",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "5px",
          }}
        >
          Mức lương:
        </Text>
        <Text style={{ marginBottom: "15px", color: "#666" }}>
          {occupation.payScale}
        </Text>
        <Text
          style={{
            fontSize: "1.1em",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "5px",
          }}
        >
          Cơ hội thăng tiến:
        </Text>
        <Text style={{ marginBottom: "15px", color: "#666" }}>
          {occupation.jobOutlook}
        </Text>
      </Box>
    </Page>
  );
};

export default OccupationDetail;
