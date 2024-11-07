import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Box from '@mui/material/Box';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Text from '@mui/material/Typography';
import Typography from '@mui/material/Typography';

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})(({ theme, isSelected, isHovered, day }) => ({
    borderRadius: 0,
    ...(isSelected && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
        },
    }),
    ...(isHovered && {
        backgroundColor: theme.palette.primary.light,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.light,
        },
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.primary.dark,
            '&:hover, &:focus': {
                backgroundColor: theme.palette.primary.dark,
            },
        }),
    }),
    ...(day.day() === 0 && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
    }),
    ...(day.day() === 6 && {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
    }),
}));



const isInSameWeek = (dayA, dayB) => dayA.isSame(dayB, 'week');

function Day(props) {
    const { day, selectedDay, hoveredDay, ...other } = props;

    return (
        <CustomPickersDay
            {...other}
            day={day}
            sx={{ px: 2.5 }}
            disableMargin
            selected={false}
            isSelected={isInSameWeek(day, selectedDay)}
            isHovered={isInSameWeek(day, hoveredDay)}
        />
    );
}
// Fake data cho từng ngày trong tuần
const fakeData = {
    '2022-04-17': [
        { time: '08:00 - 09:00', student: 'Nguyen Van A' },
        { time: '10:00 - 11:00', student: 'Tran Thi B' },
    ],
    '2022-04-18': [
        { time: '09:00 - 10:00', student: 'Le Van C' },
        { time: '11:00 - 12:00', student: 'Pham Thi D' },
    ],
    '2022-04-19': [
        { time: '13:00 - 14:00', student: 'Nguyen Thi E' },
    ],
    '2022-04-20': [
        { time: '08:00 - 09:00', student: 'Do Van F' },
        { time: '10:00 - 11:00', student: 'Hoang Thi G' },
        { time: '14:00 - 15:00', student: 'Le Thi H' },
    ],
    '2022-04-21': [
        { time: '10:00 - 11:00', student: 'Nguyen Van I' },
        { time: '15:00 - 16:00', student: 'Tran Thi K' },
    ],
    '2022-04-22': [
        { time: '09:00 - 10:00', student: 'Nguyen Van L' },
        { time: '13:00 - 14:00', student: 'Pham Thi M' },
    ],
    '2022-04-23': [
        { time: '08:00 - 09:00', student: 'Nguyen Van N' },
        { time: '12:00 - 13:00', student: 'Le Thi O' },
        { time: '15:00 - 16:00', student: 'Hoang Van P' },
    ],
};

export default function WeekPicker() {
    const [hoveredDay, setHoveredDay] = React.useState(null);
    const [value, setValue] = React.useState(dayjs('2022-04-17'));
    const [activeDays, setActiveDays] = React.useState({});
    const startOfWeek = value.startOf('week');
    console.log('startOfWeek', startOfWeek);
    const weekDays = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
    console.log('weekDays', weekDays);

    const toggleTimeslots = (day) => {
        console.log('day', day.format('YYYY-MM-DD'));
        setActiveDays((prevActiveDays) => ({
            ...prevActiveDays,
            [day.format('YYYY-MM-DD')]: !prevActiveDays[day.format('YYYY-MM-DD')],
        }));
    };
    return (
        <Box>
            <Typography variant="h6" sx={{ pb: 2, textAlign: 'center', backgroundColor: 'aliceblue' }}>
                Chọn lịch Tuần
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    style={{ backgroundColor: 'aliceblue', margin: '0px', width: 'auto' }}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    showDaysOutsideCurrentMonth
                    slots={{ day: Day }}
                    slotProps={{
                        day: (ownerState) => ({
                            selectedDay: value,
                            hoveredDay,
                            onPointerEnter: () => setHoveredDay(ownerState.day),
                            onPointerLeave: () => setHoveredDay(null),
                        }),
                    }}
                />
            </LocalizationProvider>
            <Box sx={{ backgroundColor: '#fff', borderRadius: '5px', margin: '5px', padding: '10px' }}>
                {/* <Box sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', mb: 2 }}>
                    <CalendarTodayIcon />  {value.format('DD/MM/YYYY')}
                </Box> */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {weekDays.map((day) => (
                        <React.Fragment key={day.format('YYYY-MM-DD')}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    backgroundColor: activeDays[day.format('YYYY-MM-DD')] ? '#e0f7fa' : 'white'
                                }}
                                onClick={() => toggleTimeslots(day)}
                            >
                                <Text>{day.format('dddd, DD/MM/YYYY')}</Text>
                            </Box>
                            {activeDays[day.format('YYYY-MM-DD')] && (
                                <Box sx={{ mt: 1, ml: 3, pl: 2, borderLeft: '2px solid #22c55e' }}>
                                    <Text variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Timeslots
                                    </Text>
                                    {(fakeData[day.format('YYYY-MM-DD')] || []).map((slot, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '5px',
                                                border: '1px solid #ddd',
                                                borderRadius: '5px',
                                                marginTop: '5px',
                                                backgroundColor: '#f9f9f9'
                                            }}
                                        >
                                            <Text>{slot.time}</Text>
                                            <Text>{slot.student}</Text>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </React.Fragment>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
