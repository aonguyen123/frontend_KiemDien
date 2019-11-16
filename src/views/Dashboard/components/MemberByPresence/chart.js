import React from 'react';
import palette from 'theme/palette';
import PresentIcon from '@material-ui/icons/Spellcheck';
import ResonIcon from '@material-ui/icons/Warning';
import AbsentIcon from '@material-ui/icons/CancelPresentation';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import moment from 'moment';

export const fillData = (presences, index) => {
    console.log(presences);

    const start = startOfWeek(new Date());
    const end = endOfWeek(new Date());
    console.log(moment().isBetween(start, end));

    const data = {
        datasets: [
            {
                data: [80, 5, 15],
                backgroundColor: [
                    palette.primary.main,
                    palette.error.main,
                    palette.warning.main
                ],
                borderWidth: 5,
                borderColor: palette.white,
                hoverBorderColor: palette.white
            }
        ],
        labels: ['Present', 'Absent', 'Reason']
    };
    return data;
};

export const data = {
    datasets: [
        {
            data: [80, 5, 15],
            backgroundColor: [
                palette.primary.main,
                palette.error.main,
                palette.warning.main
            ],
            borderWidth: 5,
            borderColor: palette.white,
            hoverBorderColor: palette.white
        }
    ],
    labels: ['Present', 'Absent', 'Reason']
};

export const options = {
    legend: {
        display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 0 },
    tooltips: {
        enabled: true,
        mode: 'index',
        intersect: false,
        borderWidth: 1,
        borderColor: palette.divider,
        backgroundColor: palette.white,
        titleFontColor: palette.text.primary,
        bodyFontColor: palette.text.secondary,
        footerFontColor: palette.text.secondary
    }
};

export const devices = [
    {
        title: 'Present',
        value: '63',
        icon: <PresentIcon />,
        color: palette.primary.main
    },
    {
        title: 'Absent',
        value: '15',
        icon: <AbsentIcon />,
        color: palette.error.main
    },
    {
        title: 'Reson',
        value: '23',
        icon: <ResonIcon />,
        color: palette.warning.main
    }
];