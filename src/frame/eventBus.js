/**
 * Created by zl on 16/10/20.
 *
 * 全局事件订阅器
 */

export default {
    _listeners: {},
    guid: 1,
    on: function (type, fn) {
        if (typeof this._listeners[type] === 'undefined') {
            this._listeners[type] = []
        }
        if (typeof fn === 'function') {
            this._listeners[type].push(fn)
            fn.guid = this.guid
            this.guid++
        }
        return this
    },
    emit: function (type, data) {
        var arrayEvent = this._listeners[type]
        var args = Array.prototype.slice.call(arguments, 1)
        if (arrayEvent instanceof Array) {
            for (var i = 0, length = arrayEvent.length; i < length; i++) {
                if (typeof arrayEvent[i] === 'function') {
                    console.log('ssss', args, arrayEvent[i])
                    arrayEvent[i].apply(this, args)
                }
            }
        }
        return this
    },
    un: function (type, fn) {
        var arrayEvent = this._listeners[type]
        if (typeof type === 'string' && arrayEvent instanceof Array) {
            if (typeof fn === 'function') {
                for (var i = 0, length = arrayEvent.length; i < length; i += 1) {
                    if (arrayEvent[i].guid === fn.guid) {
                        // 通过guid识别function
                        this._listeners[type].splice(i, 1)
                        break
                    }
                }
            } else {
                delete this._listeners[type]
            }
        }
        return this
    }
}
