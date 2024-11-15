import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Page, Text, Box } from "zmp-ui";

import { getOccupationGroupId } from "api/occupation";

export default function Occupationbygroup() {

    const [occupation, setOccupation] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const getOccupationbygroup = async () => {
            try {
                const response = await getOccupationGroupId(id);
                setOccupation(response.data.occupations);
            } catch (error) {
                console.error("Error fetching occupation details:", error);
            }
        }
        getOccupationbygroup();
    }, [id]);

    return (
        <Page className="page">
            {/* <Box
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    padding: "16px",
                }}
            >
                {occupation.map((item) => (
                    <Link to={`/occupationDetail/${item.id}`} key={item.id} style={{ textDecoration: "none" }}>
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
                                src="https://work247.vn/pictures/images/major-la-gi-6.jpg"
                                alt="hello"
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
                                {item.name}
                            </Text>
                        </Box>
                    </Link>
                ))}
            </Box> */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                //  gap: "10px",
            }}>
                {occupation.map((item) => (
                    <Link to={`/occupationDetail/${item.id}`} key={item.id} style={{ textDecoration: "none" }}>
                        <Box
                            key={item.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "10px",
                                backgroundColor: "#fff",
                                borderBottom: "1px solid #e0e0e0",


                                // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            {/* Icon */}
                            <img
                                src='https://cdn-icons-png.flaticon.com/128/7388/7388554.png'
                                alt={item.name}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                }}
                            />

                            {/* Nội dung */}
                            <Box style={{
                                width: "100%", // Đảm bảo Box chiếm hết chiều rộng
                            }}>
                                <Text size="small" bold>
                                    {item.name}
                                </Text>
                                {/* <Text size="xxSmall" color="text.secondary">
                  {category.description}
                </Text> */}
                            </Box>
                        </Box>
                    </Link>
                ))}
            </div>
        </Page>
    );
}
