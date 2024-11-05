import React, { useState, useEffect } from "react";
import { Page, Text, Box, Input } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { getUniversity } from "api/university";

const University = () => {
  const [universities, setUniversities] = useState([]);
  const [filteredUniversity, setFilteredUniversity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await getUniversity();
        setUniversities(response.data._universities);
        setFilteredUniversity(response.data._universities);
      } catch (error) {
        console.error("Error in fetch universities: ", error);
      }
    };

    fetchUniversities();
  }, []);

  const handleSearch = (text) => {
    if (text.length < 2) {
      setFilteredUniversity(universities);
    } else {
      const results = universities.filter((item) =>
        item.account.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUniversity(results);
    }
  };

  return (
    <Page>
      {/* Title */}
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "38px",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        }}
      >
        Đại học
      </Text>
      <Input.Search
        label="Label"
        placeholder="Trường đại học bạn muốn tìm ?"
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        {filteredUniversity.map((university) => (
          <Box
            key={university.id}
            style={{
              background: "#f8f9fa",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
            onClick={() => navigate(`/universityDetail/${university.id}`)}
          >
            <img
              src="https://img.freepik.com/free-photo/harvard-university-cambridge-usa_1268-14363.jpg?t=st=1730792592~exp=1730796192~hmac=42fcd53feeadc8ec715f921aebe589e40f358baeba4d390d8c58c98ee8735fcd&w=1060"
              role="presentation"
            />
            <Text style={{ fontWeight: "bold", marginTop: "10px" }}>
              {university.account.name}
            </Text>
          </Box>
        ))}
      </Box>
    </Page>
  );
};

export default University;
