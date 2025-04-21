
export const transDate = (ms, type = 'yyyy-MM-dd HH:mm:ss') => {
    ms = new Date(ms)
    let hasY = type.includes('yyyy')
    let hasM = type.includes('MM')
    let hasD = type.includes('dd')
    let hasH = type.includes('HH')
    let hasm = type.includes('mm')
    let hasS = type.includes('ss')
    let allHas = (hasY || hasM || hasD) && (hasm || hasH || hasS)
    const time = new Date(ms)
    const y = time.getFullYear()
    const m = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1 + ''
    const d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    const h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
    const mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
    const s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
    return (
        (!hasY ? '' : y + '-') +
        (!hasM ? '' : m + '-') +
        (!hasD ? '' : d) +
        (allHas ? ' ' : '') +
        (!hasH ? '' : h + ':') +
        (!hasm ? '' : mm + ':') +
        (hasS ? s : '')
    )
}

export const getTimeAgo = date => {
    console.log(date)
    date = new Date(date)
    const now = new Date()
    const diffInMs = now - date // 计算时间差（毫秒）

    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) // 转换为天数

    if (diffInDays <= 7) {
        if (diffInDays == 0) {
            return '刚刚'
        }
        return `${diffInDays}天前`
    } else if (diffInDays <= 28) {
        // 4周大约28天
        const diffInWeeks = Math.floor(diffInDays / 7)
        return `${diffInWeeks}周前`
    } else if (diffInDays <= 365) {
        // 12个月大约365天
        const diffInMonths = Math.floor(diffInDays / 30) // 近似计算月份
        return `${diffInMonths}月前`
    } else {
        const diffInYears = Math.floor(diffInDays / 365)
        return `${diffInYears}年前`
    }
}
