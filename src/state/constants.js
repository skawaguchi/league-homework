export const testRanges = [
    {
        baseRangeText: '9:00-10:00',
        subtractiveRangeText: '9:00-9:30',
        outputText: '9:30-10:00'
    },
    {
        baseRangeText: '9:00-10:00',
        subtractiveRangeText: '9:00-10:00',
        outputText: ''
    },
    {
        baseRangeText: '9:00-9:30',
        subtractiveRangeText: '9:30-15:00',
        outputText: '9:00-9:30'
    },
    {
        baseRangeText: '9:00-9:30, 10:00-10:30',
        subtractiveRangeText: '9:15-10:15',
        outputText: '9:00-9:15, 10:15-10:30'
    },
    {
        baseRangeText: '9:00-11:00, 13:00-15:00',
        subtractiveRangeText: '9:00-9:15, 10:00-10:15, 12:30-16:00',
        outputText: '9:15-10:00, 10:15-11:00'
    }
];
