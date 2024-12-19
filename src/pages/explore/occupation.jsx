import React, { useState, useEffect } from "react";
import { Page, Text, Box, Header, Input } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { getOccupation, getOccupationalGroup } from "api/occupation";
import { Link } from "react-router-dom";

const Occupation = () => {
  const [occupation, setOccupation] = useState([]);
  const [occupationGroup, setOccupationGroup] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
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
        const response = await getOccupationalGroup(searchValue);
        setOccupationGroup(response.data.occupationalGroups || []);
      } catch (error) {
        console.error("Error in fetch occupation group: ", error);
      }
    };

    fetchOccupation();
    fetchOccupationGroup();
  }, [searchValue]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    console.log("Search value:", e.target.value); // Thay bằng logic xử lý tìm kiếm
  };

  const filteredOccupations = selectedGroupId
    ? occupation.filter(
        (occupation) => occupation.occupationalGroup.id === selectedGroupId
      )
    : occupation;

  return (
    <>
      <Page className="page">
        <Header
          showBackIcon={true}
          textColor="white" // Truyền textColor vào header
          title={
            <div className="header-title">
              <Input.Search
                style={{
                  width: "70%",
                  height: "36px",
                  border: "1px solid ",
                  borderRadius: "8px",
                  padding: "0 12px",
                  fontSize: "14px",
                  outline: "none",
                  background: "transparent", // Đặt nền của input thành trong suốt
                  color: "white",
                }}
                type="text"
                placeholder="Tìm kiếm danh mục nghề nghiệp..."
                value={searchValue}
                onChange={handleSearchChange}
                className="header-search-input"
              />
            </div>
          }
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            //  gap: "10px",
          }}
        >
          {occupationGroup
            .filter((occupationGroup) => occupationGroup?.status)
            .map((group) => (
              <Link
                to={`/occupation/${group.id}`}
                key={group.id}
                style={{ textDecoration: "none" }}
              >
                <Box
                  key={group.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "10px",
                    backgroundColor: "#fff",
                    borderBottom: "1px solid #e0e0e0",

                    // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Icon */}
                  <img
                    src={group.image}
                    alt={group.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "10%",
                    }}
                  />

                  {/* Nội dung */}
                  <Box
                    style={{
                      width: "100%", // Đảm bảo Box chiếm hết chiều rộng
                    }}
                  >
                    <Text size="small" bold style={{ marginBottom: "5px" }}>
                      {group.name}
                    </Text>
                    <Text size="xxSmall" color="text.secondary">
                      {group?.description.length > 100
                        ? `${group.description.slice(0, 100)}...`
                        : group.description}
                    </Text>
                  </Box>
                </Box>
              </Link>
            ))}
        </div>
      </Page>
    </>
  );
};

export default Occupation;
