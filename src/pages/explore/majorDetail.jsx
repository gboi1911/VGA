import React, { useState, useEffect } from "react";
import EastIcon from '@mui/icons-material/East';
import { Page, Text, Box } from "zmp-ui";
import { useParams, useNavigate } from "react-router-dom";
import { getMajorById } from "api/major";

const MajorDetail = () => {
  const { id } = useParams();
  const [major, setMajor] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showMore, setShowMore] = useState({}); // Lưu trạng thái xem thêm cho từng thuộc tính
  console.log(showMore);

  const navigate = useNavigate();

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 6); // Thêm 6 tư vấn viên mỗi lần bấm
  };
  const handleShowMore1 = (field) => {
    setShowMore((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleShowLess = (field) => {
    setShowMore((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

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
          //alignItems: "flex-start",
          padding: "20px",
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
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          {major.name}
        </Text>

        {/* Major Description */}
        <Text
          style={{
            fontSize: "16px",
            color: "#666",
            marginBottom: "24px",
            textAlign: "justify",
          }}
        >
          {truncateText(major?.description, 500)}
          {major?.description?.length > 500 && !showMore.description && (
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => handleShowMore1("description")}
                style={{
                  marginTop: "5px",
                  color: "#007bff",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Xem thêm
              </button>
            </Box>
          )}
          {showMore.description && major?.description && (
            <>
              {major.description}
              <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={() => handleShowLess("description")}
                  style={{
                    marginTop: "5px",
                    color: "#007bff",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Thu gọn
                </button>
              </Box>
            </>
          )}
        </Text>

        {/* Suggested Occupations */}
        <Text
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}
        >
          Ngành nghề phù hợp
        </Text>
        <div>
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              marginBottom: "16px",
              alignItems: "center",
            }}
          >
            {major.occupations.slice(0, visibleCount).map((occupation) => (
              <Box
                key={occupation.id}
                style={{
                  background: "#f8f9fa",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  marginBottom: "8px",
                  alignItems: "center",
                  flex: "0 0 auto",
                  marginRight: "10px",
                  width: "220px",
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
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <Box
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    height: "50px",
                  }}
                >
                  <Text bold>{occupation.name}</Text>
                </Box>
              </Box>
            ))}

            {/* Nút "Xem thêm" */}
            {visibleCount < major.occupations.length && (
              <button
                onClick={handleShowMore}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "none",
                  borderRadius: "50%",
                  padding: "10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                  width: "40px",
                  height: "40px",
                  margin: "10px auto",
                }}
              >
                <EastIcon style={{ fontSize: "20px", color: "#007bff" }} />
              </button>
            )}
          </div>
        </div>
        {/* Suggested Universities */}
        <Text
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}
        >
          Trường đại học phù hợp
        </Text>
        <Box style={{ width: "100%" }}>
          {major.universities.map((university) => (
            <Box
              key={university.id}
              style={{
                background: "#f8f9fa",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: "8px",
                alignItems: "center",
                flex: "0 0 auto",
                marginRight: "10px",
                width: "220px",
              }}
              onClick={() => navigate(`/universityDetail/${university.id}`)}
            >
              <img
                src={
                  university.imageUrl ||
                  "https://img.freepik.com/free-photo/harvard-university-cambridge-usa_1268-14363.jpg?t=st=1730792592~exp=1730796192~hmac=42fcd53feeadc8ec715f921aebe589e40f358baeba4d390d8c58c98ee8735fcd&w=1060"
                }
                alt={university.name}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                {university.name}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Page>
  );
};

export default MajorDetail;
