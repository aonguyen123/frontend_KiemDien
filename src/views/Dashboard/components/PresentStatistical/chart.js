import palette from 'theme/palette';
import moment from 'moment';

export const fillData = (dataPresences, chooseWeek) => {
    const { indexChoose, chooseWeekDate } = chooseWeek;
    let data,
            total = 0,
            subTotal = 0,
            Mon = 0,
            Tue = 0,
            Wed = 0,
            Thu = 0,
            Fri = 0,
            Sat = 0,
            Sun = 0;
        const { checkDates, classPresences } = dataPresences;
        const dayFirstWeek = moment()
                .subtract(1, 'weeks')
                .startOf('isoWeek'),
            dayLastWeek = moment()
                .subtract(1, 'weeks')
                .endOf('isoWeek');

    if (indexChoose === '' || indexChoose === 0) {
        
        classPresences.forEach(lop => {
            checkDates.forEach(item => {
                if (item.idClass === lop._id) {
                    item.dateList.forEach(ngay => {
                        if (
                            moment(ngay.date, 'DD/MM/YYYY').isBetween(
                                dayFirstWeek,
                                dayLastWeek,
                                null,
                                '[]'
                            )
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
                            moment(date.date, 'DD/MM/YYYY').isSame(
                                dayFirstWeek,
                                'isoWeek'
                            ) &&
                            moment(date.date, 'DD/MM/YYYY').format('dddd') ===
                                'Monday' &&
                            date.status
                        ) {
                            Mon++;
                        }
                        if (
                            moment(date.date, 'DD/MM/YYYY').isSame(
                                dayFirstWeek,
                                'isoWeek'
                            ) &&
                            moment(date.date, 'DD/MM/YYYY').format('dddd') ===
                                'Tuesday' &&
                            date.status
                        ) {
                            Tue++;
                        }
                        if (
                            moment(date.date, 'DD/MM/YYYY').isSame(
                                dayFirstWeek,
                                'isoWeek'
                            ) &&
                            moment(date.date, 'DD/MM/YYYY').format('dddd') ===
                                'Wednesday' &&
                            date.status
                        ) {
                            Wed++;
                        }
                        if (
                            moment(date.date, 'DD/MM/YYYY').isSame(
                                dayFirstWeek,
                                'isoWeek'
                            ) &&
                            moment(date.date, 'DD/MM/YYYY').format('dddd') ===
                                'Thursday' &&
                            date.status
                        ) {
                            Thu++;
                        }
                        if (
                            moment(date.date, 'DD/MM/YYYY').isSame(
                                dayFirstWeek,
                                'isoWeek'
                            ) &&
                            moment(date.date, 'DD/MM/YYYY').format('dddd') ===
                                'Friday' &&
                            date.status
                        ) {
                            Fri++;
                        }
                        if (
                            moment(date.date, 'DD/MM/YYYY').isSame(
                                dayFirstWeek,
                                'isoWeek'
                            ) &&
                            moment(date.date, 'DD/MM/YYYY').format('dddd') ===
                                'Saturday' &&
                            date.status
                        ) {
                            Sat++;
                        }
                        if (
                            moment(date.date, 'DD/MM/YYYY').isSame(
                                dayFirstWeek,
                                'isoWeek'
                            ) &&
                            moment(date.date, 'DD/MM/YYYY').format('dddd') ===
                                'Sunday' &&
                            date.status
                        ) {
                            Sun++;
                        }
                    });
                });
            });
            data = {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Present',
                        backgroundColor: 'rgba(241, 91, 193, 0.27)',
                        data: [Mon, Tue, Wed, Thu, Fri, Sat, Sun],
                        fill: 'origin'
                    }
                ]
            };
        } else {
            data = null;
        }
    }
    if(indexChoose === 1)
    {
        total = 0; subTotal = 0;
        Mon = 0;Tue = 0;Wed = 0;Thu = 0;Fri = 0;Sat = 0;Sun = 0;

        const dayFirstWeek = moment(chooseWeekDate).startOf('isoWeek'),
            dayLastWeek = moment(chooseWeekDate).endOf('isoWeek');

        classPresences.forEach(lop => {
            checkDates.forEach(item => {
                if (item.idClass === lop._id) {
                    item.dateList.forEach(ngay => {
                        if (
                            moment(ngay.date, 'DD/MM/YYYY').isBetween(
                                dayFirstWeek,
                                dayLastWeek,
                                null,
                                '[]'
                            )
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
                            moment(date.date, 'DD/MM/YYYY').isSame(
                                dayFirstWeek,
                                'isoWeek'
                            ) &&
                            moment(date.date, 'DD/MM/YYYY').format('dddd') ===
                                'Monday' &&
                            date.status
                        ) {
                            Mon++;
                        }
                        if (
                            moment(date.date, 'DD/MM/YYYY').isSame(
                                dayFirstWeek,
                                'isoWeek'
                            ) &&
                            moment(date.date, 'DD/MM/YYYY').format('dddd') ===
                                'Tuesday' &&
                            date.status
                        ) {
                            Tue++;
                        }
                        if (
                            moment(date.date, 'DD/MM/YYYY').isSame(
                                dayFirstWeek,
                                'isoWeek'
                            ) &&
                            moment(date.date, 'DD/MM/YYYY').format('dddd') ===
                                'Wednesday' &&
                            date.status
                        ) {
                            Wed++;
                        }
                        if (
                            moment(date.date, 'DD/MM/YYYY').isSame(
                                dayFirstWeek,
                                'isoWeek'
                            ) &&
                            moment(date.date, 'DD/MM/YYYY').format('dddd') ===
                                'Thursday' &&
                            date.status
                        ) {
                            Thu++;
                        }
                        if (
                            moment(date.date, 'DD/MM/YYYY').isSame(
                                dayFirstWeek,
                                'isoWeek'
                            ) &&
                            moment(date.date, 'DD/MM/YYYY').format('dddd') ===
                                'Friday' &&
                            date.status
                        ) {
                            Fri++;
                        }
                        if (
                            moment(date.date, 'DD/MM/YYYY').isSame(
                                dayFirstWeek,
                                'isoWeek'
                            ) &&
                            moment(date.date, 'DD/MM/YYYY').format('dddd') ===
                                'Saturday' &&
                            date.status
                        ) {
                            Sat++;
                        }
                        if (
                            moment(date.date, 'DD/MM/YYYY').isSame(
                                dayFirstWeek,
                                'isoWeek'
                            ) &&
                            moment(date.date, 'DD/MM/YYYY').format('dddd') ===
                                'Sunday' &&
                            date.status
                        ) {
                            Sun++;
                        }
                    });
                });
            });
            data = {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Present',
                        backgroundColor: 'rgba(241, 91, 193, 0.27)',
                        data: [Mon, Tue, Wed, Thu, Fri, Sat, Sun],
                        fill: 'origin'
                    }
                ]
            };
        } else {
            data = null;
        }
    }
    return {
        data
    };
};

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    lineTension: 0,
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
    },

    layout: { padding: 0 },
    scales: {
        xAxes: [
            {
                gridLines: {
                    borderDash: [2]
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    borderDash: [2],
                    color: palette.divider,
                    zeroLineBorderDash: [2],
                    zeroLineColor: palette.divider
                }
            }
        ]
    }
};
