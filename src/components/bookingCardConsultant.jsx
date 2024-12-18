import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Text, Icon, Modal, Button, Input } from "zmp-ui"; // Import Modal and Button
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getTimebyId } from "api/expert";
import { getHistoryTest } from "api/personal";
import { createComment } from "api/super";
import { getDay } from "../api/expert/index";

export default function BookingCardConsultant({
  studentName,
  startTime,
  endTime,
  status,
  consultationDay,
  dayId,
  studentId,
  id,
  onStatusChange,
}) {
  console.log("consultationDay", consultationDay);

  const [link, setLink] = useState(""); // Store the Google Meet link
  const [dataStudent, setDataStudent] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [dialogVisible, setDialogVisible] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [onDialogVisible, setOnDialogVisible] = useState("");
  const [comment, setComment] = useState("");
  console.log("dialogVisible", dialogVisible);
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  let userID = localStorage.getItem("userID");

  const options = [
    { name: "Thành công", value: 2 },
    { name: "Hủy bỏ", value: 3 },
  ];

  const handleStatus = (status) => {
    // if (status === 2) {
    //   setDialogVisible("Success");
    //   handleClose();
    // } else if (status === 3) {
    //   setDialogVisible('Cancel');
    //   handleClose();
    // } else {
    //   setDialogVisible('Pending');
    // }
    if (status) {
      setDialogVisible("TypeBooking");
      setFormDataComment({
        type: status,
      });

      handleClose();
    }
  };

  const handleCreateComment = async () => {
    try {
      const response = await createComment({ formDataComment, id });
      if (response.status === 200) {
        setDialogVisible(false);
        setFormDataComment({
          comment: "",
          type: "",
        });
        if (onStatusChange) {
          onStatusChange(); // Gọi callback để thông báo lên component cha
        }
      }
    } catch (error) {
      console.error("Error in change status:", error.response);
      setErrorMessage(error.response.data.message);
      setOnDialogVisible("Fail");
      setFormDataComment({
        comment: "",
        type: "",
      });
    }
  };

  const [formDataComment, setFormDataComment] = useState({
    comment: "",
    type: "",
  });

  const handleChangeComment = (e) => {
    setFormDataComment({
      ...formDataComment,
      comment: e.target.value,
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const response = await getTimebyId(dayId);
        const meetLink = response.data.data.note;
        setLink(meetLink);
      } catch (error) {
        console.error("Error in fetching link: ", error);
      }
    };

    const fetchDataStudent = async () => {
      try {
        const response = await getHistoryTest(studentId);
        setDataStudent(response.data);
      } catch (error) {
        console.error("Error in fetching student data:", error);
      }
    };

    fetchLink();
    fetchDataStudent();
  }, [dayId, studentId]);

  const handleModalOpen = () => setIsModalVisible(true);
  const handleModalClose = () => setIsModalVisible(false);

  return (
    <Box className="booking-card rounded-lg shadow-md" mt={2}>
      <div className="p-2 ml-2">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Text bold>Học sinh: {studentName}</Text>
          <div>
            {status === 1 && (
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            )}
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                },
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={index}
                  selected={option === "Pyxis"}
                  onClick={() => handleStatus(option?.value)}
                >
                  {option?.name}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        <Box>
          <Modal
            visible={dialogVisible === "TypeBooking"}
            title="Nhập cảm nhận của bạn"
            onClose={() => setDialogVisible(false)}
            actions={[
              {
                text: "Đóng",
                close: true,
                justifyContent: "center",
              },
              {
                text: "Tạo mới",
                highLight: true,
                onClick: () => {
                  handleCreateComment(); // Gọi handleCreate khi bấm "Tạo mới"
                },
              },
            ]}
          >
            {" "}
            <Input
              clearable
              type="text"
              placeholder="Nhập bình luận"
              value={formDataComment?.comment}
              onChange={handleChangeComment}
              style={{ width: "100%", marginTop: "10px" }}
            />
          </Modal>
          <Modal
            title="Thông báo"
            visible={onDialogVisible === "Fail"}
            onClose={() => setOnDialogVisible(false)}
          >
            <Text style={{ textAlign: "center" }}>{errorMessage}</Text>
          </Modal>
          {/* <Modal
            visible={dialogVisible === "Cancel"}
            title="Chúc mừng bạn đã tạo lịch thành công"
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
            <Input
              clearable
              type="text"
              placeholder="Nhập bình luận"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ width: "100%", marginTop: "10px" }}
            />
          </Modal> */}
        </Box>
        <Text>
          Thời gian: {startTime} - {endTime}
        </Text>
        <Text>Ngày: {consultationDay}</Text>
        {link && (
          <div className="flex items-center">
            <Text>Link Google Meet: </Text>
            <Text className="ml-2 text-blue-500 cursor-pointer">{link}</Text>
            <CopyToClipboard text={link}>
              <Icon icon="zi-copy" onClick={() => alert("Đã sao chép link!")} />
            </CopyToClipboard>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text>Kết quả kiểm tra tính cách:&nbsp;</Text>
          <Text
            className="text-blue-500 cursor-pointer"
            onClick={handleModalOpen}
          >
            Xem thông tin
          </Text>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text>Tình trạng:&nbsp;</Text>
          <Text
            bold
            className={
              status === 1
                ? "text-yellow-600"
                : status === 2
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {status === 1 ? "Đang chờ" : status === 2 ? "Thành công" : "Đã hủy"}
          </Text>
        </div>
      </div>

      {/* Modal for displaying student details */}
      <Modal
        visible={isModalVisible}
        onClose={handleModalClose}
        title="Thông tin học sinh"
      >
        <Box p={2}>
          {dataStudent.historyTests?.map((test, index) => (
            <Box key={test.personalTestId} mb={2}>
              <Text bold>Tên bài kiểm tra: {test.personalTestName}</Text>
              <Text>Mã nhóm: {test.personalGroupCode}</Text>
              <Text>
                Nhóm: {test.personalGroupName} - {test.personalGroupDescription}
              </Text>
              <Text>Ngày làm: {new Date(test.date).toLocaleString()}</Text>
            </Box>
          ))}
          {dataStudent.historyMajor?.length === 0 && (
            <Text>Chưa có thông tin ngành nghề.</Text>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
