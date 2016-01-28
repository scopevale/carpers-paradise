import _ from 'lodash';

class DataFilter {

    filterYTypes(data, yTypes) {

        let indices = [];

        let result = _.cloneDeep(data);

        result.yTypes.forEach((yType, index) => {
            if (yTypes.indexOf(yType) === -1) {
                indices.push(index);
            }
        });

        result.y.forEach((yArray) => {
             _.pullAt(yArray, indices);
        });

        _.pullAt(result.yTypes, indices);

        return result;

    }

}

export default new DataFilter;