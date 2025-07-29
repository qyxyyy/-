// utils/DateUtils.js
const DateUtils = {
    // 格式化为 yyyy-MM-dd
    formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    },

    // 格式化为 HH:mm:ss
    formatTime(date) {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        const H = String(d.getHours()).padStart(2, '0');
        const m = String(d.getMinutes()).padStart(2, '0');
        const s = String(d.getSeconds()).padStart(2, '0');
        return `${H}:${m}:${s}`;
    },


    // 格式化为 mm:dd:ss（如需求真如此）
    formatToMMDDSS(date) {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        const mm = String(d.getMinutes()).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const ss = String(d.getSeconds()).padStart(2, '0');
        return `${mm}:${dd}:${ss}`;
    },


    // 根据自定义格式输出（支持yyyy,MM,dd,HH,mm,ss）
    format(date, fmt = 'yyyy-MM-dd') {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';

        const map = {
            yyyy: d.getFullYear(),
            MM: String(d.getMonth() + 1).padStart(2, '0'),
            dd: String(d.getDate()).padStart(2, '0'),
            HH: String(d.getHours()).padStart(2, '0'),
            mm: String(d.getMinutes()).padStart(2, '0'),
            ss: String(d.getSeconds()).padStart(2, '0')
        };

        return fmt.replace(/yyyy|MM|dd|HH|mm|ss/g, key => map[key]);
    },

    // 解析字符串为 Date
    parse(str) {
        if (!str) return null;
        const d = new Date(str);
        return isNaN(d.getTime()) ? null : d;
    },

    // 日期加减天数：addDays(date, days)
    addDays(date, days) {
        const d = new Date(date);
        if (isNaN(d.getTime())) return null;
        d.setDate(d.getDate() + days);
        return d;
    },

    // 计算两个日期之间的天数
    diffInDays(start, end) {
        const d1 = new Date(start), d2 = new Date(end);
        if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return NaN;
        return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
    },

    // 验证日期有效性
    isValid(date) {
        const d = new Date(date);
        return !isNaN(d.getTime());
    },

    // 获取当前日期
    now() {
        return new Date();
    },

    // 获取某月最后一天
    getMonthLastDay(date) {
        const d = new Date(date);
        if (isNaN(d.getTime())) return null;
        return new Date(d.getFullYear(), d.getMonth() + 1, 0);
    },

    // 判断闰年
    isLeapYear(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    },

    // 返回 'yyyy年MM月dd日 HH:mm:ss'
    formatDateTime(date) {
        return DateUtils.format(date, 'yyyy年MM月dd日 HH:mm:ss')
    }

};

//
// console.log(DateUtils.formatDate('2024-05-06T12:34:56')); // '2024-05-06'
// console.log(DateUtils.formatTime(new Date()));             // '14:25:09'
// console.log(DateUtils.formatToMMDDSS(new Date()));         // '25:06:21'
// console.log(DateUtils.format(new Date(), 'yyyy年MM月dd日 HH:mm:ss')); // '2024年05月06日 14:25:09'
// console.log(DateUtils.addDays(new Date(), 5));             // 5天后日期对象
// console.log(DateUtils.diffInDays('2024-05-01', '2024-05-06')); // 5
// console.log(DateUtils.isValid('2023-12-01'));              // true
// console.log(DateUtils.getMonthLastDay('2024-02-10'));      // Feb 29, 2024
// console.log(DateUtils.isLeapYear('2024-02-10'));           // true

// 对外暴露 axios 实例
window.DateUtils = DateUtils;