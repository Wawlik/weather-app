export const formatDate = (isoDate, locale = 'en-US') => {
    const date = new Date(isoDate);
    const dayOfWeek = date.toLocaleDateString(locale, { weekday: 'short' });
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return {
        dayOfWeek, // 'Wed'
        formattedDate: `${day}/${month}`, // '26/04'
    };
};

export const formatFullDate = (isoDate, locale = 'en-US') => {
    const date = new Date(isoDate);
    const dayOfWeek = date.toLocaleDateString(locale, { weekday: 'long' });
    const day = date.getDate();
    const month = date.toLocaleDateString(locale, { month: 'long' });

    return `${dayOfWeek}, ${day} ${month}`; // "Wednesday 26 April"
};

export const formatHour = (isoDateTime, locale = 'en-US') => {
    const date = new Date(isoDateTime);
    const hour = date.toLocaleTimeString(locale, {
        hour: 'numeric',
        hour12: true,
    });
    return hour.toLowerCase(); // "6pm"
};
