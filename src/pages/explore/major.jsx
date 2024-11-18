import React, { useState, useEffect } from "react";
import { Page, Text, Box, Header } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { getMajor, getMajorCategory } from "api/major";
import { Link } from "react-router-dom";

const Major = () => {
  const [majorCategories, setMajorCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMajorCategories = async () => {
      try {
        const response = await getMajorCategory();
        setMajorCategories(response.data.majorCategorys || []);
      } catch (error) {
        console.error("Error fetching major categories:", error);
      }
    };

    fetchMajorCategories();
  }, []);

  // const filteredMajors = selectedCategoryId
  //   ? majors.filter((major) => major.majorCategoryId === selectedCategoryId)
  //   : majors;

  return (
    // <Page className="page">
    //   {/* Title */}
    //   <Text
    //     style={{
    //       fontSize: "24px",
    //       fontWeight: "bold",
    //       textAlign: "center",
    //       marginBottom: "48px",
    //       marginTop: "40px",
    //       textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
    //     }}
    //   >
    //     Ngành học
    //   </Text>

    //   {/* Major Categories */}
    //   <div
    //     style={{
    //       display: "flex",
    //       overflowX: "auto", // Hide overflow
    //       marginBottom: "16px",
    //       padding: "12px 16px",
    //       backgroundColor: "#f8f9fa",
    //     }}
    //   >
    //     {selectedCategoryId && (
    //       <Box
    //         style={{
    //           flex: "0 0 auto",
    //           background: "#007bff",
    //           color: "white",
    //           padding: "10px 20px",
    //           borderRadius: "8px",
    //           marginRight: "10px",
    //         }}
    //         onClick={() => setSelectedCategoryId(null)}
    //       >
    //         <Text bold>Tất cả</Text>
    //       </Box>
    //     )}
    //     <div
    //       style={{
    //         display: "flex",
    //         transition: "transform 0.5s ease",
    //       }}
    //     >
    //       {majorCategories.map((category) => (
    //         <Box
    //           key={category.id}
    //           style={{
    //             flex: "0 0 auto",
    //             background: "#007bff",
    //             color: "white",
    //             padding: "10px 20px",
    //             borderRadius: "8px",
    //             marginRight: "10px",
    //           }}
    //           onClick={() => {
    //             setSelectedCategoryId(category.id);
    //           }}
    //         >
    //           <Text bold>{category.name}</Text>
    //         </Box>
    //       ))}
    //     </div>
    //   </div>

    //   {/* Display Filtered Majors in Two Columns */}
    //   <Box
    //     style={{
    //       display: "grid",
    //       gridTemplateColumns: "repeat(2, 1fr)",
    //       gap: "16px",
    //     }}
    //   >
    //     {filteredMajors.map((major) => (
    //       <Box
    //         key={major.id}
    //         style={{
    //           background: "#f8f9fa",
    //           padding: "16px",
    //           borderRadius: "8px",
    //           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    //           display: "flex",
    //           flexDirection: "column",
    //           alignItems: "center",
    //           textAlign: "center",
    //         }}
    //         onClick={() => navigate(`/majorDetail/${major.id}`)}
    //       >
    //         <img
    //           src="https://img.freepik.com/premium-vector/cute-boy-happy-graduation-with-cap-gown-cute-kawaii-chibi-cartoon_695415-469.jpg?w=740"
    //           role="presentation"
    //         />
    //         <Text style={{ fontWeight: "bold", marginTop: "10px" }}>
    //           {major.name}
    //         </Text>
    //       </Box>
    //     ))}
    //   </Box>
    // </Page>
    <Page className="page">
      <Header title="Danh mục ngành học" />
      {/* <Box
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          padding: "16px",
        }}
      >
        {majorCategories.map((category) => (
          <Link to={`/major/${category?.id}`} key={category.id} style={{ textDecoration: "none" }}>
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
                src='https://work247.vn/pictures/images/major-la-gi-6.jpg'
                alt='hello'
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
                  height: "50px",
                }}
              >
                {category.name}
              </Text>
            </Box>
          </Link>
        ))}
      </Box> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          //  gap: "10px",
        }}
      >
        {majorCategories
          .filter((majorCategories) => majorCategories?.status)
          .map((category) => (
            <Link
              to={`/major/${category?.id}`}
              key={category.id}
              style={{ textDecoration: "none" }}
            >
              <Box
                key={category.id}
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
                  src="https://cdn-icons-png.flaticon.com/128/7388/7388554.png"
                  alt={category.name}
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
                    {category.name}
                  </Text>
                  <Text size="xxSmall" color="text.secondary">
                    {/* {category.description} */}
                    "Cung cấp các dịch vụ lắp đặt, bảo trì và sửa chữa cho hệ
                    thống, thiết bị hoặc cơ sở vật chất nhằm đảm bảo "
                  </Text>
                </Box>
              </Box>
            </Link>
          ))}
      </div>
    </Page>
  );
};

export default Major;
