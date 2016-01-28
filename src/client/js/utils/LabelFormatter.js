import formatters from './labelFormatters/LabelFormatterList';

class LabelFormatter {

    format(type, label) {
        return formatters[type](label);
    }

}

export default new LabelFormatter;