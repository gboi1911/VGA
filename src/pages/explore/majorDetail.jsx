import React, { useState, useEffect } from "react";
import { Page, Text, Box } from "zmp-ui";
import { useParams, useNavigate } from "react-router-dom";
import { getMajorById } from "api/major";

const MajorDetail = () => {
  const { id } = useParams();
  const [major, setMajor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMajorDetail = async () => {
      try {
        const response = await getMajorById(id);
        setMajor(response.data.data);
      } catch (error) {
        console.error("Error fetching major details:", error);
      }
    };

    fetchMajorDetail();
  }, [id]);

  if (!major) {
    return <Text>Đang tải...</Text>;
  }

  return (
    <Page className="page">
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "20px",
          textAlign: "center",
        }}
      >
        {/* Major Image */}
        <img
          src={
            major.imageUrl ||
            "https://img.freepik.com/free-vector/professional-people-labor-day_24908-56745.jpg?t=st=1730737111~exp=1730740711~hmac=9a3489f4390c2eef0e7b3f9aab0f75a4ada397baf20c3d1cb8786feff0f0113d&w=740"
          }
          alt={major.name}
          style={{
            width: "100%",
            height: "200px",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        />

        {/* Major Name */}
        <Text
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}
        >
          {major.name}
        </Text>

        {/* Major Description */}
        <Text style={{ fontSize: "16px", color: "#666", marginBottom: "24px" }}>
          {major.description}
        </Text>

        {/* Suggested Occupations */}
        <Text
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}
        >
          Ngành nghề phù hợp
        </Text>
        <div
          style={{
            display: "flex",
            overflowX: "auto", // Hide overflow
            marginBottom: "16px",
          }}
        >
          {major.occupations.map((occupation) => (
            <Box
              key={occupation.id}
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
              onClick={() => navigate(`/occupationDetail/${occupation.id}`)}
            >
              <img
                src={
                  occupation.imageUrl ||
                  "https://img.freepik.com/free-vector/collection-police-illustration_23-2148521822.jpg?t=st=1730737506~exp=1730741106~hmac=435fe33a5949a8cc6d0507ede5684de43c9dc61c0549429698ee374ce71afd29&w=1060"
                }
                alt={occupation.name}
                style={{
                  width: "150px",
                  height: "100px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              />
              <Text bold>{occupation.name}</Text>
            </Box>
          ))}
        </div>
        {/* Suggested Universities */}
        <Text
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}
        >
          Trường đại học phù hợp
        </Text>
        <Box style={{ width: "100%", padding: "0 20px" }}>
          {major.universities.map((university) => (
            <Box
              key={university.id}
              style={{
                background: "#f8f9fa",
                padding: "12px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: "8px",
                textAlign: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{university.name}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Page>
  );
};

export default MajorDetail;
