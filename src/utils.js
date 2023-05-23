export const formatDate = (date = Date.now()) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    return [year, month].join('-');
}

export const isEmpty = (value) => {
    if (!value) return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === 'object' && Object.keys(value).length === 0) return true;
    if (typeof value === 'string' && value.trim().length === 0) return true;
    return false;
}

export const formatDisplayDate = (dateString) => {
    const [month, year] = dateString.split('/');
    const formattedDate = new Date(year, month - 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
    return formattedDate;
};
