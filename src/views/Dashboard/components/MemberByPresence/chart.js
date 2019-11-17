import React from 'react';
import palette from 'theme/palette';
import PresentIcon from '@material-ui/icons/Spellcheck';
import ResonIcon from '@material-ui/icons/Warning';
import AbsentIcon from '@material-ui/icons/CancelPresentation';
import moment from 'moment';

export const fillData = (dataPresences, date, index) => {
    let data, statusPresences;
    const { checkDates, classPresences } = dataPresences;
    let listDataPresent = 0;
    let listDataReason = 0;
    let listDataAbsent = 0;
    let subTotal = 0;
    let total = 0;
    if (index === '') {
        if (classPresences.length !== 0) {
            const monthCurrent = moment().format('MM');

            classPresences.forEach(lop => {
                checkDates.forEach(item => {
                    if (item.idClass === lop._id) {
                        item.dateList.forEach(ngay => {
                            if (
                                moment(ngay.date, 'DD/MM/YYYY').format('MM') ===
                                monthCurrent
                            ) {
                                subTotal++;
                            }
                        });
                    }
                });
                total += subTotal * lop.dssv.length;
                subTotal = 0;
            });
            if (total !== 0) {
                classPresences.forEach(lop => {
                    lop.dssv.forEach(sv => {
                        sv.checkDate.forEach(date => {
                            if (
                                moment(date.date, 'DD/MM/YYYY').format('MM') ===
                                    monthCurrent &&
                                date.status
                            ) {
                                listDataPresent++;
                            } else if (
                                moment(date.date, 'DD/MM/YYYY').format('MM') ===
                                    monthCurrent &&
                                !date.status
                            ) {
                                listDataReason++;
                            }
                        });
                    });
                });
                listDataAbsent = total - (listDataPresent + listDataReason);

                data = {
                    datasets: [
                        {
                            data: [
                                Math.round(
                                    (listDataPresent /
                                        (listDataPresent +
                                            listDataAbsent +
                                            listDataReason)) *
                                        100
                                ),
                                Math.round(
                                    (listDataAbsent /
                                        (listDataPresent +
                                            listDataAbsent +
                                            listDataReason)) *
                                        100
                                ),
                                Math.round(
                                    (listDataReason /
                                        (listDataPresent +
                                            listDataAbsent +
                                            listDataReason)) *
                                        100
                                )
                            ],
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
                statusPresences = [
                    {
                        title: 'Present',
                        value: `${Math.round(
                            (listDataPresent /
                                (listDataPresent +
                                    listDataAbsent +
                                    listDataReason)) *
                                100
                        )}`,
                        icon: <PresentIcon />,
                        color: palette.primary.main
                    },
                    {
                        title: 'Absent',
                        value: `${Math.round(
                            (listDataAbsent /
                                (listDataPresent +
                                    listDataAbsent +
                                    listDataReason)) *
                                100
                        )}`,
                        icon: <AbsentIcon />,
                        color: palette.error.main
                    },
                    {
                        title: 'Reson',
                        value: `${Math.round(
                            (listDataReason /
                                (listDataPresent +
                                    listDataAbsent +
                                    listDataReason)) *
                                100
                        )}`,
                        icon: <ResonIcon />,
                        color: palette.warning.main
                    }
                ];
            }
            else
            {
                data = null;
            }
        } else {
            data = null;
        }
    }
    if (index === 0) {
        total = 0;
        subTotal = 0;
        const monthCurrent = moment(date).format('MM');
        classPresences.forEach(lop => {
            checkDates.forEach(item => {
                if (item.idClass === lop._id) {
                    item.dateList.forEach(ngay => {
                        if (
                            moment(ngay.date, 'DD/MM/YYYY').format('MM') ===
                            monthCurrent
                        ) {
                            subTotal++;
                        }
                    });
                }
            });
            total += subTotal * lop.dssv.length;
            subTotal = 0;
        });
        if (total !== 0) {
            classPresences.forEach(lop => {
                lop.dssv.forEach(sv => {
                    sv.checkDate.forEach(date => {
                        if (
                            moment(date.date, 'DD/MM/YYYY').format('MM') ===
                                monthCurrent &&
                            date.status
                        ) {
                            listDataPresent++;
                        } else if (
                            moment(date.date, 'DD/MM/YYYY').format('MM') ===
                                monthCurrent &&
                            !date.status
                        ) {
                            listDataReason++;
                        }
                    });
                });
            });
            listDataAbsent = total - (listDataPresent + listDataReason);

            data = {
                datasets: [
                    {
                        data: [
                            Math.round(
                                (listDataPresent /
                                    (listDataPresent +
                                        listDataAbsent +
                                        listDataReason)) *
                                    100
                            ),
                            Math.round(
                                (listDataAbsent /
                                    (listDataPresent +
                                        listDataAbsent +
                                        listDataReason)) *
                                    100
                            ),
                            Math.round(
                                (listDataReason /
                                    (listDataPresent +
                                        listDataAbsent +
                                        listDataReason)) *
                                    100
                            )
                        ],
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
            statusPresences = [
                {
                    title: 'Present',
                    value: `${Math.round(
                        (listDataPresent /
                            (listDataPresent +
                                listDataAbsent +
                                listDataReason)) *
                            100
                    )}`,
                    icon: <PresentIcon />,
                    color: palette.primary.main
                },
                {
                    title: 'Absent',
                    value: `${Math.round(
                        (listDataAbsent /
                            (listDataPresent +
                                listDataAbsent +
                                listDataReason)) *
                            100
                    )}`,
                    icon: <AbsentIcon />,
                    color: palette.error.main
                },
                {
                    title: 'Reson',
                    value: `${Math.round(
                        (listDataReason /
                            (listDataPresent +
                                listDataAbsent +
                                listDataReason)) *
                            100
                    )}`,
                    icon: <ResonIcon />,
                    color: palette.warning.main
                }
            ];
        } else {
            data = null;
        }
    }
    if(index === 1)
    {
        total = 0; subTotal = 0;
        const start = moment(date).startOf('isoWeek');
        classPresences.forEach(lop => {
            checkDates.forEach(item => {
                if (item.idClass === lop._id) {
                    item.dateList.forEach(ngay => {
                        if (
                            moment(ngay.date, 'DD/MM/YYYY').isSame(start, 'isoWeek')
                        ) {
                            subTotal++;
                        }
                    });
                }
            });
            total += subTotal * lop.dssv.length;
            subTotal = 0;
        });
        if (total !== 0) {
            classPresences.forEach(lop => {
                lop.dssv.forEach(sv => {
                    sv.checkDate.forEach(date => {
                        if (
                            moment(date.date, 'DD/MM/YYYY').isSame(start, 'isoWeek') &&
                            date.status
                        ) {
                            listDataPresent++;
                        } else if (
                            moment(date.date, 'DD/MM/YYYY').isSame(start, 'isoWeek') &&
                            !date.status
                        ) {
                            listDataReason++;
                        }
                    });
                });
            });
            listDataAbsent = total - (listDataPresent + listDataReason);

            data = {
                datasets: [
                    {
                        data: [
                            Math.round(
                                (listDataPresent /
                                    (listDataPresent +
                                        listDataAbsent +
                                        listDataReason)) *
                                    100
                            ),
                            Math.round(
                                (listDataAbsent /
                                    (listDataPresent +
                                        listDataAbsent +
                                        listDataReason)) *
                                    100
                            ),
                            Math.round(
                                (listDataReason /
                                    (listDataPresent +
                                        listDataAbsent +
                                        listDataReason)) *
                                    100
                            )
                        ],
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
            statusPresences = [
                {
                    title: 'Present',
                    value: `${Math.round(
                        (listDataPresent /
                            (listDataPresent +
                                listDataAbsent +
                                listDataReason)) *
                            100
                    )}`,
                    icon: <PresentIcon />,
                    color: palette.primary.main
                },
                {
                    title: 'Absent',
                    value: `${Math.round(
                        (listDataAbsent /
                            (listDataPresent +
                                listDataAbsent +
                                listDataReason)) *
                            100
                    )}`,
                    icon: <AbsentIcon />,
                    color: palette.error.main
                },
                {
                    title: 'Reson',
                    value: `${Math.round(
                        (listDataReason /
                            (listDataPresent +
                                listDataAbsent +
                                listDataReason)) *
                            100
                    )}`,
                    icon: <ResonIcon />,
                    color: palette.warning.main
                }
            ];
        } else {
            data = null;
        }
    }
    if(index === 2)
    {
        total = 0;
        subTotal = 0;
        const yearCurrent = moment(date).format('YYYY');
        classPresences.forEach(lop => {
            checkDates.forEach(item => {
                if (item.idClass === lop._id) {
                    item.dateList.forEach(ngay => {
                        if (
                            moment(ngay.date, 'DD/MM/YYYY').format('YYYY') ===
                            yearCurrent
                        ) {
                            subTotal++;
                        }
                    });
                }
            });
            total += subTotal * lop.dssv.length;
            subTotal = 0;
        });
        if (total !== 0) {
            classPresences.forEach(lop => {
                lop.dssv.forEach(sv => {
                    sv.checkDate.forEach(date => {
                        if (
                            moment(date.date, 'DD/MM/YYYY').format('YYYY') ===
                                yearCurrent &&
                            date.status
                        ) {
                            listDataPresent++;
                        } else if (
                            moment(date.date, 'DD/MM/YYYY').format('YYYY') ===
                                yearCurrent &&
                            !date.status
                        ) {
                            listDataReason++;
                        }
                    });
                });
            });
            listDataAbsent = total - (listDataPresent + listDataReason);

            data = {
                datasets: [
                    {
                        data: [
                            Math.round(
                                (listDataPresent /
                                    (listDataPresent +
                                        listDataAbsent +
                                        listDataReason)) *
                                    100
                            ),
                            Math.round(
                                (listDataAbsent /
                                    (listDataPresent +
                                        listDataAbsent +
                                        listDataReason)) *
                                    100
                            ),
                            Math.round(
                                (listDataReason /
                                    (listDataPresent +
                                        listDataAbsent +
                                        listDataReason)) *
                                    100
                            )
                        ],
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
            statusPresences = [
                {
                    title: 'Present',
                    value: `${Math.round(
                        (listDataPresent /
                            (listDataPresent +
                                listDataAbsent +
                                listDataReason)) *
                            100
                    )}`,
                    icon: <PresentIcon />,
                    color: palette.primary.main
                },
                {
                    title: 'Absent',
                    value: `${Math.round(
                        (listDataAbsent /
                            (listDataPresent +
                                listDataAbsent +
                                listDataReason)) *
                            100
                    )}`,
                    icon: <AbsentIcon />,
                    color: palette.error.main
                },
                {
                    title: 'Reson',
                    value: `${Math.round(
                        (listDataReason /
                            (listDataPresent +
                                listDataAbsent +
                                listDataReason)) *
                            100
                    )}`,
                    icon: <ResonIcon />,
                    color: palette.warning.main
                }
            ];
        } else {
            data = null;
        }
    }
    return {
        data,
        statusPresences
    };
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
