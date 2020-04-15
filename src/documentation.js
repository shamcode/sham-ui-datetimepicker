/**
 * Options for DateTimePicker
 * @typedef {Object} DateTimePickerOptions
 * @property {Date} value Selected date. By default current date
 * @property {Function} onChange. Callback for onChange. By default () => {}
 * @property {Boolean} showTime Show time selector. By default true
 * @property {Boolean} disabled Can change date. By default false
 * @property {Function} isDateSelectable Callback for test date for selectable. By default () => true
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
