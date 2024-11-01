import { Calendar } from 'antd';
// import ReactTimeslotCalendar from "react-timeslot-calendar";
import { Text } from "zmp-ui";
// import moment from "moment";

export default function CalendarPage() {
    // const onPanelChange = (value, mode) => {
    //     console.log(value.format('YYYY-MM-DD'), mode);
    // };

    return (
        // <Calendar onPanelChange={onPanelChange} />
        <div className="App">
            <Text.Header style={{ textAlign: 'center' }} size='large'>Danh sách những lịch đã được hoàn thành</Text.Header>
            {/* <ReactTimeslotCalendar
                initialDate={moment([2017, 3, 24]).format()}
                let
                timeslots={[
                    ["1", "2"], // 1:00 AM - 2:00 AM
                    ["2", "3"], // 2:00 AM - 3:00 AM
                    ["4", "6"], // 4:00 AM - 6:00 AM
                    "5", // 5:00 AM
                    ["4"] // 4:00 AM - 6:00 AM - 7:00AM - 8:00AM
                ]}
            /> */}
        </div>
    );
}
