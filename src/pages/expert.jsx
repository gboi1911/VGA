import React, { useEffect, useState } from "react";
import { Page, Box, Text, Input, Tabs, Header } from "zmp-ui";
import ExpertCard from "../components/expertCard";
import { getExpert, getBooking } from "api/expert";
import BookingCard from "../components/bookingCard";
import { text } from "@fortawesome/fontawesome-svg-core";
import { useLocation } from "react-router-dom";

const ExpertPage = ({ studentId }) => {
  const [experts, setExperts] = useState([]);
  const [filteredExperts, setFilteredExperts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState([]);
  const location = useLocation();
  const initialTab = location.state?.tab || "consultant";

  const fetchBookings = async () => {
    try {
      const response = await getBooking(studentId);
      setBookings(response.data.bookings);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    // const fetchExpert = async () => {
    //   try {
    //     const data = await getExpert();
    //     setExperts(data.consultants);
    //     setFilteredExperts(data.consultants);
    //     console.log("Get data consultant successful");
    //   } catch (error) {
    //     console.log("Error in fetch expert:", error);
    //   }
    // };
    // fetchExpert();
    fetchBookings();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.length < 2) {
      setFilteredExperts(experts);
    } else {
      const results = experts.filter((expert) =>
        expert.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredExperts(results);
    }
  };

  const reloadPage = () => {
    fetchBookings();
  }

  return (
    <>
      <Page className="page w-full">
        <Header title="Lịch sử đã đặt tư vấn" style={{ textAlign: "start" }} />
        {bookings && bookings.length > 0 ? (
          <Box
            style={{
              backgroundColor: "#FFFFFF",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            {/* <Box className="mb-6">
          <Text
            bold
            className="text-center mb-8 mt-4"
            style={{
              fontSize: "2.5em",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            Tư vấn
          </Text>
        </Box> */}
            <Box
              style={{
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <Box mb={10} className="p-4 bg-white rounded-lg shadow-md">
                {bookings.map((booking, index) => (
                  <BookingCard
                    key={index}
                    consultantName={booking.consultantName}
                    startTime={booking.startTime}
                    endTime={booking.endTime}
                    consultationDay={booking.consultationDay}
                    status={booking.status}
                    dayId={booking.consultationTimeId}
                    id={booking.id}
                    onImageChange={(e) => handleImageChange(1, e)}
                    onStatusChange={reloadPage} // Truyền hàm reloadPage
                  />
                ))}
              </Box>
              {/* <Tabs defaultActiveKey={initialTab}> */}
              {/* <Tabs.Tab key="consultant" label="Tư vấn viên">
              <Input.Search
                label="Label"
                placeholder="Tư vấn viên bạn muốn tìm?"
                onChange={(e) => handleSearch(e.target.value)}
                style={{ marginTop: "10px" }}
                maxLength={25}
                clearable
              />
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4" mt={3}>
                {filteredExperts.length > 0 ? (
                  filteredExperts.map((expert) => (
                    <ExpertCard key={expert.id} expert={expert} />
                  ))
                ) : (
                  <Text>Không tìm thấy.</Text>
                )}
              </Box>
            </Tabs.Tab> */}
              {/* <Tabs.Tab key="history" label="Lịch sử đặt lịch">
              <Box mb={10} className="p-4 bg-white rounded-lg shadow-md">
                {bookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    consultantName={booking.consultantName}
                    startTime={booking.startTime}
                    endTime={booking.endTime}
                    consultationDay={booking.consultationDay}
                    status={booking.status}
                    dayId={booking.consultationTimeId}
                  />
                ))}
              </Box>
            </Tabs.Tab> */}
              {/* </Tabs> */}
            </Box>
          </Box>
        ) : (
          <Text style={{ textAlign: "center", marginTop: "20px" }}>
            Hiện chưa có lịch đã đặt
          </Text>
        )}
      </Page>
    </>
  );
};

export default ExpertPage;
