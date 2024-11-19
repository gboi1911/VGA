import React, { useEffect, useState } from "react";
import { Page, Box, Text, Input, Tabs, Header, } from "zmp-ui";
import ExpertCard from "../components/expertCard";
import { getExpert, getBooking } from "api/expert";
import BookingCard from "../components/bookingCard";
import { text } from "@fortawesome/fontawesome-svg-core";

const ExpertPage = ({ studentId }) => {
  const [experts, setExperts] = useState([]);
  const [filteredExperts, setFilteredExperts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const data = await getExpert();
        setExperts(data.consultants);
        setFilteredExperts(data.consultants);
        console.log("Get data consultant successful");
      } catch (error) {
        console.log("Error in fetch expert:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await getBooking(studentId);
        setBookings(response.data.bookings);
      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };

    fetchExpert();
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

  return (
    <Page className="page w-full" style={{ marginTop: "40px" }}>
      <Header title="Tư vấn" showBackIcon={false} style={{ textAlign: 'center' }} />
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
            backgroundColor: "#FFCC66",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <Tabs>
            <Tabs.Tab key="consultant" label="Tư vấn viên">
              <Input.Search
                label="Label"
                placeholder="Tư vấn viên bạn muốn tìm?"
                onChange={(e) => handleSearch(e.target.value)}
                style={{ marginTop: "10px" }}
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
            </Tabs.Tab>
            <Tabs.Tab key="history" label="Lịch sử đặt lịch">
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
            </Tabs.Tab>
          </Tabs>
        </Box>
      </Box>
    </Page>
  );
};

export default ExpertPage;
