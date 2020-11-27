// data在前
class SuccessModel {
    constructor(data, message) {
        this.data = data
        this.message = message
        this.status = 1
    }
}
// message在前
class ErrorModel {
    constructor(message, data) {
        this.data = data
        this.message = message
        this.status = 0
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}