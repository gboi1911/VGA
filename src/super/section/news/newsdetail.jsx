import { useEffect, useState } from "react";
import { Page, Text, List, Box, Header } from "zmp-ui";
import { Link, Route, useParams } from "react-router-dom";
import { getNewsDetail } from "api/news";

export default function NewDetail() {
  const [newsDetail, setNewsDetail] = useState(null);
  const { id } = useParams();
  console.log(newsDetail);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await getNewsDetail(id);
        setNewsDetail(response.data);
      } catch (error) {
        console.log("Error fetching news detail:", error);
      }
    };
    fetchNewsDetail();
  }, [id]);

  return (
    <Page
      style={{
        marginLeft: "10px",
        marginRight: "10px",
        width: "97%",
        marginTop: "80px",
        marginBottom: "80px",
      }}
    >
      <Header title="Tin tức" />
      <Box>
        <Text size="large" bold>
          {newsDetail?.title}
        </Text>
        <Text
          style={{ marginTop: "10px", marginBottom: "10px" }}
          size="small"
          className="text-gray-500"
        >
          {newsDetail?.createdAt}
        </Text>
      </Box>
      <Box style={{ whiteSpace: "normal" }}>
        {newsDetail?.content.split("\n").map((paragraph, index) => (
          <Text key={index} style={{ marginBottom: "8px" }}>
            {paragraph}
          </Text>
        ))}
      </Box>
      <Box
        style={{
          height: "auto",
          overflow: "hidden",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        {newsDetail?.imageNews?.map((image, index) => (
          <Box
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={image.imageUrl}
              alt="image"
              style={{ width: "90%", height: "200px" }}
            />
            <Text size="xxxSmall" style={{ textAlign: "center" }}>
              {image?.descriptionTitle}
            </Text>
          </Box>
        ))}
      </Box>
    </Page>
  );
}
