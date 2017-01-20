export default {
    modules: [`environment`, `dict`, `countdown`, `countdown-status`, `todo`, `todo-status`, `extract`, `tabs`],
    snow: {
        Snow3num: 80,
        Snow3Size: 10,
        Snow3Speed: 1
    },
    filter: {
        blur: {
            unit: "px",
            min: 0,
            max: 15
        },
        grayscale: {
            unit: "%",
            min: 0,
            max: 100
        },
        brightness: {
            unit: "%",
            min: 100,
            max: 0
        }
    }
}