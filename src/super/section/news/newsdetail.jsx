import { useEffect, useState } from "react";
import { Page, Text, List, Box, Header, Spinner } from "zmp-ui";
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

  if (!newsDetail) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner />
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <>
      <Page>
        <Header title="Tin tức" />
        <Box style={{ padding: 10 }}>
          <Text size="large" bold style={{ marginBottom: 10 }}>
            {newsDetail?.title}
          </Text>
          {newsDetail?._HashTag?.map((tag, index) => (
            <Link
              to={`/majorDetail/${tag?.keys}`}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <Text
                className="text-gray-500"
                style={{
                  textAlign: "justify",
                }}
              >
                {`# ${tag?.values}`}
              </Text>
            </Link>
          ))}
          <Text
            style={{ marginTop: "10px", marginBottom: "10px" }}
            size="small"
            className="text-gray-500"
          >
            {newsDetail?.createdAt}
          </Text>
        </Box>
        <Box style={{ whiteSpace: "normal", padding: 10 }}>
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
    </>
  );
}
