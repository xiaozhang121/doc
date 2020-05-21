import $ from '../common/utils/utility.js'
export function apiArticleList(params) {
    return $.request({
        url: '/app/v1_1/articles',
        params
    })
}