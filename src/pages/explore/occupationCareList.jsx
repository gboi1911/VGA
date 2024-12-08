import React, { useState, useEffect } from "react";
import { Page, Text, Box, Header } from "zmp-ui";
import { Link } from "react-router-dom";
import { getListCare } from "api/major";

const OccupationCareList = ({ studentId }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await getListCare(studentId);
        setList(response.data.data.listOccupation);
      } catch (error) {
        console.error("Error in fetch list:", error);
      }
    };

    if (studentId) {
      fetchList();
    }
  }, [studentId]);

  return (
    <Page style={{ marginTop: "36px" }}>
      <Header title="Danh sách nghề nghiệp quan tâm" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {list && list.length > 0 ? (
          list.map((item) => (
            <Link
              to={`/occupationDetail/${item.majorOrOccupationId}`}
              key={item.majorOrOccupationId}
              style={{ textDecoration: "none" }}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "10px",
                  backgroundColor: "#fff",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <img
                  src={
                    item.image ||
                    "https://cdn-icons-png.freepik.com/256/10171/10171019.png?ga=GA1.1.1580058560.1730717628&semt=ais_hybrid"
                  }
                  alt={item.majorOrOccupationName}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                    borderRadius: "10%",
                  }}
                />

                <Box style={{ width: "100%" }}>
                  <Text size="small" bold style={{ marginBottom: "5px" }}>
                    {item.majorOrOccupationName}
                  </Text>
                  {/* <Text size="xxSmall" color="text.secondary">
                    Rating: {item.rating}
                  </Text> */}
                </Box>
              </Box>
            </Link>
          ))
        ) : (
          <Text>No data available.</Text>
        )}
      </div>
    </Page>
  );
};

export default OccupationCareList;
