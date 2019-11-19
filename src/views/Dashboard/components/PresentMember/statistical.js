export const getData = data => {
    const { checkDates, classPresences } = data;
    let total = 0, listDataPresent = 0, listDataReason = 0, listDataAbsent = 0, rs = 0;

    classPresences.forEach(lop => {
        if(lop.status)
        {
            checkDates.forEach(item => {
                if(lop._id === item.idClass)
                {
                    total += item.dateList.length * lop.dssv.length;
                }
            });
        }
    });
    if(total !== 0)
    {

        classPresences.forEach(lop => {
            if(lop.status)
            {
                lop.dssv.forEach(sv => {
                    sv.checkDate.forEach(date => {
                        if (date.status === true) {
                            listDataPresent++;
                        } else if (date.status === false) {
                            listDataReason++;
                        }
                    });
                });
            }
        });

    }
    listDataAbsent = total - (listDataPresent + listDataReason);

    rs = (listDataPresent / (listDataPresent + listDataAbsent + listDataReason)) *100;
    const n = parseFloat(rs);
    rs = Math.round(n * 10) / 10;

    return rs;
};