import React, { useState, useEffect } from "react";
import { Page, Text, Box, Input, Header } from "zmp-ui";
import { useNavigate, useParams } from "react-router-dom";
import { getUniversity } from "api/university";
import { Link } from "react-router-dom";
import { getExpert } from "../api/expert/index.jsx";

export default function AllExpert() {
  const [experts, setExperts] = useState([]);
  console.log("experts", experts);
  const { id } = useParams();

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await getExpert({ idUniversity: id });
        setExperts(response.data?.consultants); // Đảm bảo response có `data`
      } catch (error) {
        console.error("Failed to fetch experts:", error);
      }
    };

    fetchExperts();
  }, [id]);

  return (
    <>
      <Page className="page">
        <Header title="Đại học" />
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            padding: "16px",
          }}
        >
          {experts?.map((expert, index) => (
            <Link
              to={`/expertDetail/${expert.id}`}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={
                    expert?.image_Url ||
                    "https://img.freepik.com/premium-photo/business-woman-standing-with-pen-clipboard-her-hands_28586-86.jpg?w=1060"
                  }
                  alt={expert?.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <Text
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    height: "40px",
                  }}
                >
                  {expert?.name}
                </Text>
                <Text
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  {expert?.description}
                </Text>
              </Box>
            </Link>
          ))}
        </Box>
      </Page>
    </>
  );
}
