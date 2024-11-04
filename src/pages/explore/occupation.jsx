import React, { useState, useEffect } from "react";
import { Page, Text, Box } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { getOccupation, getOccupationalGroup } from "api/occupation";

const Occupation = () => {
  const [occupation, setOccupation] = useState([]);
  const [occupationGroup, setOccupationGroup] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOccupation = async () => {
      try {
        const response = await getOccupation();
        setOccupation(response.data.occupations || []);
      } catch (error) {
        console.error("Error in fetch occupations: ", error);
      }
    };

    const fetchOccupationGroup = async () => {
      try {
        const response = await getOccupationalGroup();
        setOccupationGroup(response.data.occupationalGroups || []);
      } catch (error) {
        console.error("Error in fetch occupation group: ", error);
      }
    };

    fetchOccupation();
    fetchOccupationGroup();
  }, []);

  const filteredOccupations = selectedGroupId
    ? occupation.filter(
        (occupation) => occupation.occupationalGroup.id === selectedGroupId
      )
    : occupation;

  return (
    <Page>
      {/* Title */}
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "48px",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        }}
      >
        Ngành nghề
      </Text>
      {/* Occupation Categories */}
      <div
        style={{
          display: "flex",
          overflowX: "hidden", // Hide overflow
          marginBottom: "16px",
          padding: "12px 16px",
          backgroundColor: "#f8f9fa",
        }}
      >
        {selectedGroupId && (
          <Box
            style={{
              flex: "0 0 auto",
              background: "#007bff",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              marginRight: "10px",
            }}
            onClick={() => setSelectedGroupId(null)}
          >
            Tất cả
          </Box>
        )}
        <div
          style={{
            display: "flex",
            transition: "transform 0.5s ease",
          }}
        >
          {occupationGroup.map((group) => (
            <Box
              key={group.id}
              style={{
                flex: "0 0 auto",
                background: "#007bff",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                marginRight: "10px",
              }}
              onClick={() => {
                setSelectedGroupId(group.id);
              }}
            >
              {group.name}
            </Box>
          ))}
        </div>
      </div>

      {/* Display Filtered Occupations */}
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        {filteredOccupations.map((occupation) => (
          <Box
            key={occupation.id}
            style={{
              background: "#f8f9fa",
              padding: "16px",
              borderRadius: "8px",
              height: "240px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
            onClick={() => navigate(`/occupationDetail/${occupation.id}`)}
          >
            <img
              src="https://img.freepik.com/free-vector/happy-people-various-professions-looking-up-flat-set-with-top-view-chef-builder-astronaut-office-worker-isolated-vector-illustration_1284-78642.jpg?t=st=1730741176~exp=1730744776~hmac=b31e9297e8e722db79c23eb23c2279e20dc334a786e6ef24a04fac49b12c229e&w=900"
              role="presentation"
            />
            <Text style={{ fontWeight: "bold", marginTop: "10px" }}>
              {occupation.name}
            </Text>
          </Box>
        ))}
      </Box>
    </Page>
  );
};

export default Occupation;
