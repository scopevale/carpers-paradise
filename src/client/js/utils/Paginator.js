import _ from 'lodash';

class Paginator {

    paginateData(fullData, pageSize, currentPage) {

        pageSize = Math.min(pageSize, fullData.length);

        let lastIndex = (currentPage ? currentPage.lastIndex : undefined);

        lastIndex = (lastIndex === 0 ? undefined : lastIndex);

        let trimmed = fullData.slice(0, lastIndex);

        let result = _.takeRight(trimmed, pageSize);

        while (result.length < pageSize) {
            result.push(fullData[fullData.length + lastIndex]);
            lastIndex++;
        }

        return {
            reducedData: result,
            lastIndex: lastIndex || 0
        };

    }

    previous(fullData, currentPage) {

        if (currentPage.lastIndex === ((fullData.length - currentPage.length) * -1)) {
            return currentPage;
        }

        let pageSize = currentPage.reducedData.length,
            lastIndex = currentPage.lastIndex - pageSize;

        let trimmed = fullData.slice(0, lastIndex);

        let result = _.takeRight(trimmed, pageSize);

        while (result.length < pageSize) {
            result.push(fullData[fullData.length + lastIndex]);
            lastIndex++;
        }

        return {
            reducedData: result,
            lastIndex: lastIndex
        };
    }

    next(fullData, currentPage) {

        if (currentPage.lastIndex === 0) {
            return currentPage;
        }

        let pageSize = currentPage.reducedData.length,
            lastIndex = currentPage.lastIndex;

        let trimmed = fullData.slice(lastIndex);

        let result = _.take(trimmed, pageSize);

        while (result.length < pageSize) {
            lastIndex--;
            result.unshift(fullData[fullData.length + lastIndex]);
        }

        lastIndex = Math.min(currentPage.lastIndex + pageSize, 0);

        return {
            reducedData: result,
            lastIndex: lastIndex
        };
    }
}

export default new Paginator;