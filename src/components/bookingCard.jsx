import React, { useEffect, useState } from "react";
import { Box, Text, Icon, Modal, Input, Button } from "zmp-ui";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getTimebyId, putReport } from "api/expert"; // Import the API method
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebaseConfig";

const BookingCard = ({
  consultantName,
  studentName,
  startTime,
  endTime,
  status,
  consultationDay,
  dayId,
  id,
  onStatusChange,
}) => {
  const [link, setLink] = useState(""); // Store the link state
  // const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [image, setImage] = useState(); // State for storing uploaded image
  const [dialogVisible, setDialogVisible] = useState("");
  const [inputText, setInputText] = useState(""); // State for input text
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

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

  useEffect(() => {
    fetchLink();
  }, [dayId]);

  // Handle modal opening/closing
  // const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileName = file.name;

      // setIsUploading(true);

      try {
        const storageRef = ref(storage, `images/${fileName}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setImage(url);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false); // Upload complete
      }
    }
  };

  // Handle report button click
  const handleReport = () => {
    if (!image) {
      alert("Vui lòng cung cấp hình ảnh chứng minh!");
      return;
    }
    console.log("Report submitted with input:", inputText, "and image:", image);
    const payload = {
      comment: inputText,
      image: image,
    };
    const apiPutReport = async () => {
      try {
        const response = await putReport(id, payload);
        if (response && response.status === 200) {
          setDialogVisible("CreateReport");
          if (onStatusChange) {
            onStatusChange();
          }
        }
      } catch (error) {
        console.error("Error in create report: ", error.response);
        setErrorMessage(error.response.data.message);
        setDialogVisible("CreateReportFail");
        setInputText("");
        setImage(null);
      }
    };

    apiPutReport();
    // toggleModal();
    fetchLink();
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
            <Text style={{ color: "blue", textDecoration: "underline" }}>
              {" "}
              Link
            </Text>
            <CopyToClipboard text={link}>
              <Icon icon="zi-copy" onClick={() => alert("Đã sao chép link!")} />
            </CopyToClipboard>
          </div>
        )}
        <Text
          bold
          className={
            status === 1
              ? "text-yellow-600"
              : status === 2
              ? "text-green-600"
              : status === 3
              ? "text-red-600"
              : "text-orange-600"
          }
          style={{ marginTop: "5px" }}
        >
          {status === 1
            ? "Chưa diễn ra"
            : status === 2
            ? "Đã diễn ra"
            : status === 3
            ? "Đã hủy"
            : "Đã tố cáo"}
        </Text>
      </div>

      {/* Warning Icon in the top-right corner */}
      {(status === 1 || status === 2) && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
          onClick={() => setDialogVisible("warning")} // Open the modal when clicked
        >
          <Icon icon="zi-exclamation" style={{ color: "orange" }} />
        </div>
      )}

      {/* Modal for report */}
      <Modal
        visible={dialogVisible === "report"}
        onClose={() => setDialogVisible(false)}
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
                htmlFor={`file-upload-${id}`}
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
                id={`file-upload-${id}`}
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
      <Modal
        visible={dialogVisible === "CreateReport"}
        title="Tố cáo thành công"
        onClose={() => setDialogVisible(false)}
        actions={[
          {
            text: "Đóng",
            close: true,
            justifyContent: "center",
          },
        ]}
      >
        {" "}
        <Text style={{ textAlign: "center" }}>
          Tố cáo thành công. Chúng tôi sẽ gửi kết quả sớm nhất cho bạn.
        </Text>
      </Modal>
      <Modal
        visible={dialogVisible === "warning"}
        title="Lưu ý"
        onClose={() => setDialogVisible(false)}
        // actions={[
        //   {
        //     text: "Đóng",
        //     close: true,
        //     justifyContent: "center",
        //   },
        // ]}
      >
        <Modal
          visible={dialogVisible === "warning"}
          title="Lưu ý"
          onClose={() => setDialogVisible(false)}
          actions={[
            {
              text: "Đóng",
              close: true,
              justifyContent: "center",
            },
            {
              text: "Đồng ý",
              onClick: () => setDialogVisible("report"),
            },
          ]}
        >
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Luật Báo Cáo Vi Phạm Tư Vấn Viên
          </Text>

          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            1. Thời gian gửi báo cáo:
          </Text>
          <Text style={{ marginBottom: 10 }}>
            - Báo cáo chỉ được chấp nhận sau khi buổi tư vấn chính thức bắt đầu.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            - Các báo cáo gửi trước thời gian bắt đầu buổi tư vấn sẽ bị từ chối.
          </Text>

          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            2. Yêu cầu về nội dung và hình ảnh minh chứng:
          </Text>
          <Text style={{ marginBottom: 10 }}>
            - Báo cáo phải chứa đầy đủ thông tin mô tả rõ ràng hành vi vi phạm
            của tư vấn viên.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            - Hình ảnh cung cấp phải có nội dung liên quan trực tiếp đến báo cáo
            vi phạm, cụ thể:
          </Text>
          <Text style={{ marginLeft: 10, marginBottom: 5 }}>
            - Hình ảnh cần thể hiện được bằng chứng vi phạm (ví dụ: đoạn chat,
            ảnh màn hình, hình ảnh hoặc tài liệu khác).
          </Text>
          <Text style={{ marginLeft: 10, marginBottom: 10 }}>
            - Nội dung trên hình ảnh phải rõ ràng, không bị chỉnh sửa, mờ hoặc
            cắt xén.
          </Text>

          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            3. Quy trình xử lý báo cáo:
          </Text>
          <Text style={{ marginBottom: 10 }}>
            - Sau khi gửi báo cáo, hệ thống hoặc quản trị viên sẽ kiểm tra và
            xác minh tính chính xác của báo cáo dựa trên nội dung và hình ảnh
            cung cấp.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            - Báo cáo thiếu thông tin hoặc không đáp ứng yêu cầu trên sẽ bị từ
            chối mà không cần thông báo thêm.
          </Text>

          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            4. Hậu quả của báo cáo không hợp lệ:
          </Text>
          <Text style={{ marginBottom: 10 }}>
            - Người gửi báo cáo sai sự thật hoặc báo cáo không đúng quy định sẽ
            bị cảnh cáo hoặc bị hạn chế quyền sử dụng ứng dụng.
          </Text>

          <Text style={{ fontStyle: "italic", marginTop: 10 }}>
            Lưu ý: Hãy đảm bảo cung cấp đầy đủ và trung thực thông tin để bảo vệ
            quyền lợi của bạn và đảm bảo tính công bằng trong ứng dụng.
          </Text>
        </Modal>
      </Modal>
      <Modal
        visible={dialogVisible === "CreateReportFail"}
        title="Tố cáo thất bại"
        onClose={() => setDialogVisible(false)}
        actions={[
          {
            text: "Đóng",
            close: true,
            justifyContent: "center",
          },
        ]}
      >
        <Text style={{ textAlign: "center" }}>
          {errorMessage || "Tố cáo thất bại. Vui lòng thử lại sau."}
        </Text>
      </Modal>
    </Box>
  );
};

export default BookingCard;
