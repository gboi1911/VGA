import React, { useState, useEffect } from "react";
import { Page, Text, Box } from "zmp-ui";
import { useParams, useNavigate } from "react-router-dom";
import { getUniversityById, getRegionById } from "api/university";
import { getExpert } from "api/expert";

const UniversityDetail = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [locations, setLocations] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await getUniversityById(id);
        const universityData = response.data;
        setUniversity(universityData);

        const locationPromises = universityData.universityLocations.map(
          async (location) => {
            const regionResponse = await getRegionById(location.regionId);
            return {
              ...location,
              regionName: regionResponse.data.name,
            };
          }
        );

        const locationData = await Promise.all(locationPromises);
        setLocations(locationData);
      } catch (error) {
        console.error("Error in fetching university or location data: ", error);
      }
    };

    const fetchConsultants = async () => {
      try {
        const response = await getExpert();
        if (response.consultants) {
          const consultantsData = response.consultants.filter(
            (consultant) => consultant.university?.id === id
          );
          setConsultants(consultantsData);
        } else {
          console.log("No consultants data found in the response.");
        }
      } catch (error) {
        console.error("Error in fetching consultants data: ", error);
      }
    };

    fetchUniversity();
    fetchConsultants();
  }, [id]);

  if (!university) {
    return <Text>Đang tải...</Text>;
  }

  return (
    <Page>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <img
          src={
            university.imageUrl ||
            "https://img.freepik.com/premium-photo/large-brick-building-with-tower-that-says-university-america_551880-7776.jpg?w=1380"
          }
          alt={university.account.name}
          style={{
            width: "100%",
            height: "200px",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        />
        <Text
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
        >
          {university.account.name}
        </Text>
        <Text style={{ fontSize: "16px", color: "#666", marginBottom: "6px" }}>
          Mã trường: {university.code}
        </Text>
        <Text style={{ fontSize: "16px", color: "#666", marginBottom: "6px" }}>
          Năm thành lập: {university.establishedYear}
        </Text>
        <Text style={{ fontSize: "16px", color: "#666", marginBottom: "6px" }}>
          Email: {university.account.email}
        </Text>
        <Text style={{ fontSize: "16px", color: "#666", marginBottom: "6px" }}>
          Hotline: {university.account.phone}
        </Text>

        {/* Display university location(s) */}
        <Box>
          {locations.length > 1 ? (
            <>
              {locations.map((location, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    marginBottom: "6px",
                  }}
                >
                  Phân hiệu {location.regionName}: {location.address}
                </Text>
              ))}
            </>
          ) : (
            locations.map((location, index) => (
              <Text key={index} style={{ fontSize: "16px", color: "#666" }}>
                Địa chỉ: {location.address}
              </Text>
            ))
          )}
        </Box>
        <Text
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "6px",
            marginTop: "16px",
          }}
        >
          Mô tả
        </Text>
        <Text style={{ fontSize: "16px", color: "#666", marginBottom: "6px" }}>
          {university.description}
        </Text>
        <Text
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "8px",
            marginTop: "16px",
          }}
        >
          Tư vấn viên được đề xuất
        </Text>

        <div
          style={{ display: "flex", overflowX: "hidden", marginBottom: "16px" }}
        >
          {consultants.map((consultant) => (
            <Box
              key={consultant.id}
              style={{
                background: "#f8f9fa",
                padding: "10px",
                borderRadius: "8px",
                width: "180px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: "0 0 auto",
                marginRight: "10px",
              }}
              onClick={() => navigate(`/expertDetail/${consultant.id}`)}
            >
              <img
                src={
                  consultant.image_Url ||
                  "https://img.freepik.com/premium-photo/business-woman-standing-with-pen-clipboard-her-hands_28586-86.jpg?w=1060"
                }
                alt={consultant.name}
                style={{
                  width: "150px",
                  height: "100px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              />
              <Text bold>{consultant.name}</Text>
              <Text
                style={{ fontSize: "14px", color: "#666", textAlign: "center" }}
              >
                {consultant.consultantLevel.name}
              </Text>
            </Box>
          ))}
        </div>
      </Box>
    </Page>
  );
};

export default UniversityDetail;
