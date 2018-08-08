module.exports = {
    notificationDateFilter: function (startDate,endDate) {
        if ((Date.parse(endDate) <= Date.parse(startDate))) {
            return 'false';
        }
        return 'true';
    }
}