import React, { useEffect, useState } from "react";
import { Box, Text, Icon, Modal, Input, Button } from "zmp-ui";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getTimebyId } from "api/expert"; // Import the API method

const BookingCard = ({
  consultantName,
  studentName,
  startTime,
  endTime,
  status,
  consultationDay,
  dayId,
}) => {
  const [link, setLink] = useState(""); // Store the link state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [image, setImage] = useState(null); // State for storing uploaded image
  const [inputText, setInputText] = useState(""); // State for input text

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const response = await getTimebyId(dayId); // Fetch data using dayId
        // Assuming the note contains the Google Meet link
        const meetLink = response.data.data.note;
        setLink(meetLink); // Set the Google Meet link to state
      } catch (error) {
        console.log("Error in fetch link: ", error);
      }
    };
    fetchLink();
  }, [dayId]);

  // Handle modal opening/closing
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Create a local URL for the uploaded image
    }
  };

  // Handle report button click
  const handleReport = () => {
    console.log("Report submitted with input:", inputText, "and image:", image);
    toggleModal(); // Close the modal after reporting
  };

  return (
    <Box
      className="booking-card rounded-lg shadow-md"
      mt={2}
      style={{ position: "relative" }}
    >
      <div className="p-2 ml-2">
        <Text bold>Tư vấn viên: {consultantName}</Text>
        <Text>
          Thời gian: {startTime} - {endTime}
        </Text>
        <Text>Ngày: {consultationDay}</Text>
        {link && (
          <div className="flex items-center">
            <Text>Link Google Meet: </Text>
            <Text
              className="ml-2 text-blue-500 cursor-pointer"
              // Optional: Show an alert when copied
            >
              {link}
            </Text>
            <CopyToClipboard text={link}>
              <Icon icon="zi-copy" onClick={() => alert("Đã sao chép link!")} />
            </CopyToClipboard>
          </div>
        )}
        <Text
          bold
          className={status ? "text-green-600" : "text-red-600"}
          style={{ marginTop: "5px" }}
        >
          {status ? "Thành công" : "Thất bại"}
        </Text>
      </div>

      {/* Warning Icon in the top-right corner */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
        onClick={toggleModal} // Open the modal when clicked
      >
        <Icon icon="zi-warning" style={{ color: "red" }} />
      </div>

      {/* Modal for report */}
      <Modal
        visible={isModalOpen}
        onClose={toggleModal}
        title="Báo cáo buổi tư vấn"
      >
        <div className="p-4">
          {/* Input for report */}
          <Input.TextArea
            label="Mô tả"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Nhập chi tiết vấn đề của bạn"
          />

          <div
            style={{
              textAlign: "center",
              padding: "20px",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            <h3>Hình ảnh chứng minh</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px dashed #aaa",
                padding: "20px",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              {/* Custom file upload button */}
              <label
                htmlFor="file-upload"
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#fff",
                  backgroundColor: "#0099FF",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "24px", marginRight: "8px" }}>+</span>{" "}
                Chọn ảnh
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>

            {image && (
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={image}
                  alt="Uploaded Preview"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </div>
            )}
          </div>

          {/* Center the button */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button
              onClick={handleReport}
              style={{ backgroundColor: "orange", width: "100px" }}
            >
              Gửi
            </Button>
          </div>
        </div>
      </Modal>
    </Box>
  );
};

export default BookingCard;
