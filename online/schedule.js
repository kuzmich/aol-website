document.addEventListener("DOMContentLoaded", function() {
    // console.log(document.readyState);
    moment.locale('ru');

    const table = document.querySelector('tbody');
    const now = moment();
    const halfAnHourAgo = moment().subtract(30, 'minutes');
    const tomorrow = moment().add(1, 'days');
    let lastDate = null;

    function humanReadableDate(d, lastDate) {
        if (!d.isSame(lastDate, 'day')) {
            if (d.isSame(now, 'day')) {
                return d.format('сегодня, dddd')
            } else if (d.isSame(tomorrow, 'day')) {
                return d.format('завтра, dddd')
            } else if (d.isSame(now, 'week')) {
                return d.format('dddd, D MMMM')
            } else {
                return d.format('D MMMM, dddd')
            }
        } else {
            return ''
        }
    }

    for (let item of schedule) {
        let start = moment(item['start']);
        if (!start.isSameOrAfter(halfAnHourAgo)) {
            continue
        }
        let row = `
            <tr>
            <td>${humanReadableDate(start, lastDate)}</td>
            <td><a href="${item['url']}#offerBlock" target="_blank">${start.format('HH:mm')}</a></td>
            <td>${item['city']}</td>
            </tr>
        `;
        table.insertAdjacentHTML('beforeend', row);
        lastDate = start;
    }
})
