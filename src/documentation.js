/**
 * Options for DateTimePicker
 * @typedef {Object} DateTimePickerOptions
 * @property {Date} value Selected date. By default current date
 * @property {Function} onChange Callback for onChange. By default () => {}
 * @property {boolean} showTime Show time selector. By default true
 * @property {string} displayMode Mode for display. By default 'dom' (day of month)
 * @property {Function} isDateSelectable Callback for test date for selectable. By default () => true
 * @property {Function} classForDate Callback for add custom class for date. By default () => ''
 *
 */

/**
 * DateTime picker for sham-ui
 * @class DateTimePicker
 * @classdesc
 * @property {DateTimePickerOptions} options
 * @example
 * {% import DateTimePicker from 'sham-ui-datetimepicker' %}
 *   ...
 *   <DateTimePicker/>
 *   ...
 */
