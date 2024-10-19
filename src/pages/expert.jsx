import React, { useEffect, useState } from "react";
import { Page, Box, Text } from "zmp-ui";
import ExpertCard from "../components/expertCard";
import { getExpert } from "api/expert";

const ExpertPage = () => {
  const [experts, setExperts] = useState(null);
  const [expertsInfo, setExpertsInfo] = useState(null);

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const data = await getExpert();
        setExpertsInfo(data);
        setExperts(data.consultants);
        console.log("Get data consultant successful");
      } catch (error) {
        console.log("Error in fetch expert:", error);
      }
    };

    fetchExpert();
  }, []);

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
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experts ? (
          experts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))
        ) : (
          <Text>Loading experts...</Text>
        )}
      </Box>
    </Page>
  );
};

export default ExpertPage;
