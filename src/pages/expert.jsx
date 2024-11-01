import React, { useEffect, useState } from "react";
import { Page, Box, Text, Input } from "zmp-ui";
import ExpertCard from "../components/expertCard";
import { getExpert } from "api/expert";

const ExpertPage = () => {
  const [experts, setExperts] = useState([]);
  const [filteredExperts, setFilteredExperts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const data = await getExpert();
        setExperts(data.consultants);
        setFilteredExperts(data.consultants); // Initialize filtered experts
        console.log("Get data consultant successful");
      } catch (error) {
        console.log("Error in fetch expert:", error);
      }
    };

    fetchExpert();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.length < 2) {
      setFilteredExperts(experts); // Reset to all experts if query is less than 2 characters
    } else {
      const results = experts.filter(expert =>
        expert.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredExperts(results);
    }
  };

  return (
    <Page className="page p-4 bg-gray-100 w-full">
      <Box className="mb-6">
        <Text
          className="text-center text-4xl font-bold mb-6 mt-4"
          style={{
            fontFamily: "Poppins, sans-serif",
            color: "#0066CC",
            fontSize: "2.5em",
            letterSpacing: "0.02em",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          Tư vấn viên
        </Text>
      </Box>
      <Input.Search
        label="Label"
        placeholder="Tư vấn viên bạn muốn tìm?"
        onChange={e => handleSearch(e.target.value)}
        style={{ marginTop: "10px" }}
      />
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4" mt={3}>
        {filteredExperts.length > 0 ? (
          filteredExperts.map(expert => (
            <ExpertCard key={expert.id} expert={expert} />
          ))
        ) : (
          <Text>Không tìm thấy.</Text>
        )}
      </Box>
    </Page>
  );
};

export default ExpertPage;
