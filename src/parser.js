import yaml from 'js-yaml';

const parseData = (data, format) => {
  switch (format) {
    case 'json':
      try {
        return JSON.parse(data);
      } catch (e) {
        throw new Error('JSON is not valid');
      }

    case 'yml':
    case 'yaml':
      try {
        return yaml.load(data);
      } catch (e) {
        throw new Error('YAML is not valid');
      }
    default:
      throw new Error(`Unknown data format - ${format}`);
  }
};

export default parseData;
