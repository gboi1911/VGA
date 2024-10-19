import React from "react";
import { Page, Box, Text, Input } from "zmp-ui";

const HomePage = () => {
  // Assuming the image is in a folder named 'assets' within the 'src' directory
  const imageUrl =
    "https://cdn.123job.vn/123job/uploads/2021/04/22/2021_04_22______02612dd7ec3826597c3e6f46c945ed07.jpg";

  return (
    <Page className="page p-4 bg-gray-100 w-full">
      <img
        src={imageUrl} // Use relative or absolute path based on your project structure
        alt="FPT Polytechnic uniform image" // Descriptive alt text
        className="w-100 h-34 rounded-md mt-3"
      />
      <Input.Search
        label="Label"
        placeholder="Trường đại học bạn muốn tìm ?"
        onSearch={(text) => console.log(text)}
        style={{ marginTop: "10px" }}
      />
      <Text className="ml-2 mt-3" bold style={{ fontSize: "1.2em" }}>
        Tin tức mới nhất
      </Text>
      <Box mt={3} ml={2} className="bg-white rounded-lg shadow-md">
        <Box flex>
          <img
            src="https://caodang.fpt.edu.vn/wp-content/uploads/1-255-1.jpg"
            alt="image"
            width={120}
          />
          <Box ml={4} mt={1}>
            <Text bold size="xLarge">
              Title
            </Text>
            <Text>Content</Text>
            <Text size="xxSmall" className="text-blue-600 ml-44">
              Xem thêm
            </Text>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default HomePage;
